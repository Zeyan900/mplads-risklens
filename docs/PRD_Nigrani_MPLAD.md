# Product Requirements Document — Nigrani MPLAD

**Product name:** Nigrani MPLAD (working name; also referred to as MPLADS Risk Intelligence Platform)
**Problem statement:** SIH 2026, PS 26102 — "Development of an AI-powered system to detect anomalies, fraud, and inefficiencies in MPLAD Scheme implementation"
**Sponsor:** Ministry of Statistics and Programme Implementation (MoSPI), Data Informatics & Innovation Division
**Document type:** Product Requirements Document (PRD) for an autonomous/agentic coding tool to scaffold and build against
**Status:** Draft v1.0

> Note for the build agent: this PRD defines *what* to build and *why*. A separate `TECH.md` will define the exact tech stack, repo structure, and infra choices — do not lock in specific frameworks based on this document alone unless explicitly stated below.

---

## 1. Background

The Members of Parliament Local Area Development Scheme (MPLADS) gives each MP an annual entitlement (currently ₹5 crore/year) to recommend local development works — roads, drains, community halls, water infrastructure — executed through a chain: **MP recommends → District Authority sanctions & assigns an Implementing Agency → Implementing Agency executes and raises vendor payment requests at each stage → work is marked complete.** All of this now runs through the eSAKSHI portal (`mplads.mospi.gov.in`, live since 1 April 2023).

At national scale this produces well over 150,000 individual work records, thousands of implementing agencies, and tens of thousands of vendors — far more than existing manual, post-facto audit processes (like CAG reviews) can meaningfully check. Real audit findings include works paid for with zero physical progress, the same asset claimed for funding twice, and works executed without competitive tendering. The Ministry wants an AI system that surfaces the small number of records that actually need human attention, with evidence attached, instead of relying on manual sampling after the fact.

---

## 2. Goals

- **G1.** Ingest MPLADS work-level data (sanctions, recommendations, expenditure, vendor payments, photo/document status) from available public and authorised sources.
- **G2.** Run multiple independent detection channels over that data to surface anomalies, likely fraud indicators, and inefficiencies.
- **G3.** Combine channel outputs into a single **explainable risk score (0–100)** per work, with the specific evidence behind the score always visible.
- **G4.** Support a **human-in-the-loop review workflow**: an officer sees the flag, the evidence, and can verify / dismiss / escalate it — and that decision is logged and (later) used to improve the system.
- **G5.** Provide **role-based dashboards** for four audiences: Ministry (national), State Nodal Authority (state), District Authority (district, operational review queue), and MP (their own constituency, transparency-oriented).
- **G6.** Every output must be **auditable**: every risk flag traces back to the specific rule/model/evidence that produced it, and every officer decision is logged with a timestamp and actor.

## 3. Non-goals (out of scope for v1)

- **NG1.** This system does not make final determinations of fraud or initiate any enforcement/legal action. It only prioritizes and surfaces items for human review.
- **NG2.** No write access to the actual eSAKSHI portal or any live government system — this is a monitoring/analytics layer, not a replacement for MPLADS' operational systems of record.
- **NG3.** No real-time integration with PFMS, GeM, or bank settlement systems in v1 — cross-scheme checks in v1 use downloadable open datasets, not live APIs.
- **NG4.** No mobile app in v1 — web dashboard only.
- **NG5.** No automated notification/SMS/email alerting in v1 (dashboard-only alerts is sufficient for MVP).

---

## 4. Users & personas

| Persona | Needs | Primary view |
|---|---|---|
| **Ministry analyst (MoSPI)** | National risk heatmap, trend lines by state/theme, ability to drill into any state | National dashboard |
| **State Nodal Authority (SNA) officer** | Risk distribution across districts in their state | State drill-down dashboard |
| **District Authority officer** | A short, prioritized queue of works needing review, each with evidence | Review queue + work detail |
| **MP (or MP's office)** | Transparent, non-accusatory view of their own constituency's implementation health | Constituency transparency view |
| **System / data engineer** | Reliable ingestion, clear data lineage, ability to add new detection rules | Admin / ingestion tooling (internal only) |

Every persona except the system role is **read-mostly**; only the District Authority officer role can take review actions (verify / dismiss / escalate).

---

## 5. Core use cases

- **UC-1**: A District Authority officer logs in and sees a queue of works ranked by risk score, highest first, each showing the top 1-2 reasons it was flagged.
- **UC-2**: The officer opens a flagged work and sees: the full work record, which detection channel(s) fired, the specific evidence (e.g. "cost is 3.2x the district median for this work category"), and any relevant photos/documents.
- **UC-3**: The officer marks the flag as Verified (confirmed issue), Dismissed (false positive, with a reason), or Escalated (needs higher authority).
- **UC-4**: A Ministry analyst opens the national dashboard and sees risk concentration by state, filterable by work category and time period.
- **UC-5**: An MP's office opens their constituency view and sees the status and risk profile of their own recommended works — framed as transparency, never accusation.
- **UC-6**: The system ingests a new batch of work/vendor/payment data on a schedule and re-runs all detection channels, updating risk scores.

---

## 6. Functional requirements

### 6.1 Data ingestion & standardization
- **FR-1.1**: Ingest work-level records (see §8 for real field structure) from CSV/XLSX/Parquet exports on a scheduled or manual basis.
- **FR-1.2**: Normalize state/district/constituency identifiers against Local Government Directory (LGD) codes — the real data already carries an LGD-mapped district column (`implementing_district_per_lgd`, `implementing_district_lgd_code`); use this as the canonical join key rather than free-text district names.
- **FR-1.3**: Deduplicate and fuzzy-match vendor and implementing-agency names (the same vendor appears with inconsistent capitalization/spacing across records — see §8.2 example).
- **FR-1.4**: Maintain a `data_as_on` / ingestion-timestamp field on every record for lineage and staleness tracking.
- **FR-1.5**: Clearly tag every record with its provenance (source dataset name + fetch date) so any output can be traced back to where the number came from.

### 6.2 Compliance rule engine
- **FR-2.1**: Encode the numeric/categorical rules from the official MPLADS Guidelines (April 2023) as discrete, independently-toggleable checks (see §9 for the actual rule values).
- **FR-2.2**: Each rule produces a pass/fail + a plain-language reason string, never a bare boolean.
- **FR-2.3**: Rules must be data-driven (e.g. a config file or DB table of thresholds), not hardcoded, so thresholds can be updated without a code change.

### 6.3 Statistical/ML anomaly detection
- **FR-3.1**: For each work category (e.g. "Construction of roads...", "Repair and Renovation"), compute a peer-group cost distribution (by state/district or nationally when local sample size is too small) and flag works whose `recommended_amount` or `expenditure_amount` is a statistical outlier (e.g. Isolation Forest and/or z-score against peer group).
- **FR-3.2**: Flag works where `expenditure_amount` (from vendor payments) substantially exceeds `recommended_amount` (cost overrun) or where large payments are released against work with no progress/completion signal.
- **FR-3.3**: Every anomaly flag must report the peer group used and the work's percentile/z-score within it — not just "anomalous."

### 6.4 Duplicate & split-work detection
- **FR-4.1**: Use text similarity (e.g. TF-IDF or embedding cosine similarity) on `work_description` within the same district/constituency to catch near-duplicate work claims across years.
- **FR-4.2**: Flag clusters of same-category, same-agency works recommended close together in time and geography whose individual amounts sit just under a tendering/approval threshold — a possible sign of splitting one large work into several smaller ones to avoid scrutiny.

### 6.5 Cross-scheme double-funding detection
- **FR-5.1**: Where geolocation is available (village/GP level), cross-reference MPLADS work records against other public infrastructure scheme datasets (e.g. PMGSY road works, Jal Jeevan Mission water works) for the same asset type in the same location and overlapping time window.
- **FR-5.2**: This is explicitly a **candidate-generation** feature, not a determination — output a "possible overlap, needs verification" flag with both records shown side by side.

### 6.6 Vendor network analysis
- **FR-6.1**: Build a graph of `vendor_name` ↔ `work` ↔ `implementing_agency_name` ↔ district edges from the vendor payment dataset (see §8.2).
- **FR-6.2**: Flag vendors that receive a disproportionate share of payments within a single implementing agency or district relative to the vendor population there (concentration/centrality measure).
- **FR-6.3**: Flag implementing-agency/vendor pairs with unusually high repeat-award frequency in a short window (real example: the same vendor "Haneefa Construction" appears twice in a small sample of one district's payments across two different works — see §8.2).

### 6.7 Photo / documentation forensics
- **FR-7.1**: The real data carries an explicit `image_status` field (`Not Available` / presumably `Available` when uploaded). Flag any work where payment has been released or the work marked complete while `image_status = Not Available` — this is a zero-cost, immediately implementable check using a real existing field.
- **FR-7.2** *(stretch)*: Where photos are actually retrievable, run perceptual hashing to detect the same image reused across unrelated works, and EXIF/geotag comparison against the work's recorded district/constituency coordinates.

### 6.8 Explainable risk scoring engine
- **FR-8.1**: Combine all channel outputs (6.2–6.7) into a single composite score from 0–100 per work.
- **FR-8.2**: The score must always be accompanied by a structured breakdown: which channels fired, their individual severity, and a human-readable one-line reason per channel (e.g. "Cost overrun: 3.2x district median for this category").
- **FR-8.3**: No channel output may be silently dropped from the explanation — if it contributed to the score, it must appear in the breakdown.
- **FR-8.4**: The scoring engine must never use an LLM to *decide* the score. An LLM may only be used downstream to phrase the plain-language explanation from the already-computed structured evidence.

### 6.9 Officer review workflow
- **FR-9.1**: A review queue, sorted by risk score descending, filterable by state/district/category/score range.
- **FR-9.2**: Each queue item opens into a detail view showing the full record, all flags, and the evidence for each.
- **FR-9.3**: Officer actions: Verify (confirms issue), Dismiss (with a required free-text reason), Escalate (routes to a higher authority — SNA or Ministry level).
- **FR-9.4**: Every action is logged with timestamp, actor, and reason — this log is the audit trail (FR-10.4 depends on this).
- **FR-9.5** *(stretch, v2)*: Officer decisions feed back into the scoring engine as labeled examples for periodic model retraining.

### 6.10 Dashboards
- **FR-10.1**: National dashboard (Ministry) — risk distribution map by state, trend over time, breakdown by work category.
- **FR-10.2**: State dashboard (SNA) — same views scoped to one state, drill into districts.
- **FR-10.3**: District dashboard (District Authority) — the review queue (FR-9.1) plus district-level summary stats.
- **FR-10.4**: MP transparency view — read-only, shows the MP's own recommended/sanctioned/completed works and their risk status, framed neutrally (no "fraud" language — use "needs verification" framing throughout the entire product, not just this view).
- **FR-10.5**: Every dashboard must show its data's `data_as_on` timestamp visibly, since underlying data is refreshed periodically, not real-time.

---

## 7. Non-functional requirements

- **NFR-1 (Explainability)**: No risk flag may be shown to any user without its underlying evidence being simultaneously visible or one click away.
- **NFR-2 (Auditability)**: All ingestion runs, scoring runs, and officer actions are logged immutably with timestamps.
- **NFR-3 (Non-accusatory framing)**: All user-facing copy refers to flags as "needs verification" / "worth a second look," never "fraud detected" or "confirmed violation." Only a human officer's own "Verified" action may use stronger language, and only in their own annotation.
- **NFR-4 (Data provenance)**: Every number shown anywhere in the UI must be traceable to a source dataset and fetch date.
- **NFR-5 (Performance)**: The review queue and dashboards must remain responsive against the full national dataset scale (150,000+ work records, 140,000+ payment records) — this requires proper indexing/pre-aggregation, not naive full-table scans per page load.
- **NFR-6 (Access control)**: Role-based access — a District Authority officer should only see/act on their own district by default; state and national roles are read-only roll-ups unless explicitly granted review rights.
- **NFR-7 (Synthetic data honesty)**: Wherever synthetic data is used to fill gaps in public data availability, it must be clearly labeled as synthetic in the UI and never blended indistinguishably with real records.

---

## 8. Data model & real sample data

This section uses **actual, current government data** (Ministry of Statistics and Programme Implementation, via the Dataful open-data platform, last updated 7 September 2026) so the build agent has a concrete, real shape to build against — not a guessed schema.

### 8.1 Entity: `RecommendedWork`

Source: *"18th Lok Sabha MPLADS: State, Lok Sabha Constituency wise Work Name wise total amount of works recommended by each MP from MPLADS"* — 175,298 rows, 18 columns, period 2024–2026.

| Field | Example value |
|---|---|
| `data_as_on` | 18-08-2026 |
| `state` | Andaman and Nicobar Islands |
| `implementing_district_per_source` | South Andamans |
| `implementing_district_per_lgd` | South Andamans |
| `implementing_district_lgd_code` | 602 |
| `loksabha_constituency` | Andaman And Nicobar Islands |
| `house_name` | 18th Lok Sabha |
| `loksabha_MP_name` | Bishnu Pada Ray |
| `work_category` | Trust and Society |
| `unique_work_number` | WS/MP18275/2025-2026/183102 |
| `work_name` | Construction of community centers and community halls |
| `implementing_agency_name` | Implementing District Authority(SA) |
| `work_description` | Con. Bore well with water tank (60000 Ltr capacity), boundary wall with gate, parking space, toilets with bathroom, drainage system, rain harvesting system at Sri Guruji Community Centre, Dollygunj |
| `date_of_recommendation` | 18-03-2025 |
| `image_status` | Not Available |
| `recommended_amount` | 49,92,971 |
| `units` | recommended_amount in indian rupees |

Note the `image_status = Not Available` on a fully-specified, already-costed work — this is a real, present-day example of exactly the signal described in FR-7.1.

### 8.2 Entity: `VendorPayment`

Source: *"18th Lok Sabha MPLADS: State, Lok Sabha Constituency, Work Name, Vendor Name wise amount spent by each MP from MPLADS"* — 143,257 rows, 15 columns, period 2024–2026.

| Field | Example row A | Example row B |
|---|---|---|
| `data_as_on` | 18-08-2026 | 18-08-2026 |
| `state` | Andaman and Nicobar Islands | Andaman and Nicobar Islands |
| `implementing_district_per_lgd` | South Andamans | South Andamans |
| `implementing_district_lgd_code` | 602 | 602 |
| `loksabha_constituency` | Andaman And Nicobar Islands | Andaman And Nicobar Islands |
| `loksabha_MP_name` | Bishnu Pada Ray | Bishnu Pada Ray |
| `work` | Security gates in streets/public place for safety purpose | Construction of roads, link roads, pathways... |
| `implementing_agency_name` | EE (SAD, APWD) | EE (SAD, APWD) |
| `vendor_name` | **Haneefa Construction** | **Haneefa Construction** |
| `expenditure_date` | 09-04-2026 | 25-06-2025 |
| `payment_status` | Payment Success | Payment Success |
| `expenditure_amount` | 1,189,292 | 803,540 |
| `units` | expenditure_amount in indian rupees | expenditure_amount in indian rupees |

Rows A and B are **real records** from the same district/implementing agency, showing the same vendor (`Haneefa Construction`) paid for two different works. This is a genuine, present-day instance of the pattern FR-6.3 is designed to surface — not a hypothetical.

### 8.3 Derived entities the build agent should model explicitly

- `District` (canonical, keyed by LGD code — do not key anything on free-text district names)
- `ImplementingAgency` (deduplicated/normalized from `implementing_agency_name`)
- `Vendor` (deduplicated/normalized from `vendor_name` — note real-world casing inconsistency, e.g. "rakib construction" vs "RAMESH CONSTRUCTION")
- `RiskFlag` (work_id, channel, severity, evidence_json, created_at)
- `RiskScore` (work_id, score_0_100, breakdown_json, computed_at, model_version)
- `ReviewAction` (work_id, officer_id, action [verify/dismiss/escalate], reason, timestamp)

---

## 9. Business rules (from official MPLADS Guidelines, April 2023)

Encode these as the initial content of the compliance rule engine (§6.2):

| Rule | Threshold |
|---|---|
| Annual entitlement per MP | ₹5 crore/year |
| Mandatory allocation to SC-majority areas | ≥ 15% of entitlement |
| Mandatory allocation to ST-majority areas | ≥ 7.5% of entitlement |
| Cap on works executed via trusts/societies | ₹75 lakh per project |
| Sanction turnaround | Within 75 days of recommendation |
| First installment cap — government implementing agency | 75% of estimated cost |
| First installment cap — NGO/society implementing agency | 60% of estimated cost |
| Minimum work cost (general) | ~₹1 lakh (exceptions permitted) |
| Prohibited categories | Pure maintenance works, repeat maintenance of the same asset, individual benefit items (e.g. personal equipment) |

Flag any `RecommendedWork` whose `work_category = Trust and Society` and `recommended_amount > 75,00,000` as a compliance violation candidate — this is directly checkable against the real schema in §8.1.

---

## 10. Success metrics / acceptance criteria

- **AC-1**: Given a batch of ≥10,000 real work records, the system ingests, standardizes, and scores all of them without manual intervention.
- **AC-2**: Every risk flag surfaced in the review queue has a non-empty, human-readable evidence string.
- **AC-3**: An officer can go from "queue" → "work detail" → "action taken" in 3 clicks or fewer.
- **AC-4**: The four dashboard views (Ministry/SNA/District/MP) each load and render for a dataset of realistic national scale within an acceptable time budget (to be defined precisely in `TECH.md`).
- **AC-5**: 100% of numbers displayed in any dashboard can be traced to a source record via a visible "data as on" date and dataset name.
- **AC-6**: The compliance rule engine correctly flags the real Trust-and-Society example in §8.1 style data when its amount exceeds ₹75 lakh.
- **AC-7**: The vendor-network channel correctly surfaces the real repeat-vendor pattern shown in §8.2 given that data.

---

## 11. Data sources (real, current)

- **Recommended works (18th Lok Sabha)** — dataful.in/datasets/22567 — 175,298 rows, updated 07-Sep-2026
- **Vendor-level expenditure (18th Lok Sabha)** — dataful.in/datasets/22565 — 143,257 rows, updated 07-Sep-2026
- **Completed-works expenditure (18th Lok Sabha)** — dataful.in/datasets/22566
- **17th Lok Sabha works & funds (historical)** — dataful.in/datasets/18533
- **State-wise released/sanctioned/expended summary (1993–2025)** — dataful.in/datasets/18542
- **Official MPLADS Guidelines, April 2023 (PDF)** — mplads.gov.in
- **eSAKSHI portal process documentation** — mplads.mospi.gov.in
- **Empowered Indian MPLADS transparency dataset** — empoweredindian.in/mplads
- **PMGSY GeoSadak open data** (for cross-scheme checks, §6.5) — geosadak-pmgsy.nic.in/OpenData
- **Jal Jeevan Mission dataset** (for cross-scheme checks, §6.5) — openbudgetsindia.org
- **Local Government Directory (LGD) codes** — lgdirectory.gov.in

All datasets above are public and directly downloadable (CSV/XLSX/Parquet) — no authentication or authorised-access request is required to build and demo against them.

---

## 12. Assumptions & open questions

- **A-1**: We assume geolocation for cross-scheme matching (§6.5) will need to be approximated at district/constituency level in v1, since exact GPS coordinates are not present in the datasets pulled so far — confirm before implementing FR-5.1 with precise radius-based matching.
- **A-2**: We assume `implementing_district_lgd_code` is a reliable, stable join key across all MPLADS datasets — verify this holds across the 17th and 18th Lok Sabha datasets before relying on it as the canonical key.
- **Q-1**: Should officer accounts and role assignment be modeled with a real auth system in v1, or is a seeded/mocked set of roles sufficient for a hackathon-stage demo? (Affects FR-9 and NFR-6 scope.)
- **Q-2**: Is a live scheduled ingestion job required for the demo, or is a manual "load latest export" action sufficient? (Affects FR-1.1 scope.)

---

## 13. Out of scope / future work

- Predictive delay modeling (estimating which in-progress works are likely to miss completion deadlines)
- Mobile inspection workflow for field officers
- Citizen-facing complaint/feedback intake
- Direct integration with PFMS, GeM, or state procurement systems
- Automated retraining pipeline from officer feedback (v2)

---

## 14. Related deliverable

A separate `TECH.md` document will specify: exact backend/frontend framework choices, database schema DDL, deployment target, API contract, and repo folder structure. Build against this PRD's functional requirements and data model; treat all technology choices as pending until `TECH.md` is provided.
