# Nigrani MPLAD — Explainable Risk Intelligence for MPLADS Works
### Smart India Hackathon 2026 | Problem Statement: PS 26102
**Sponsor:** Ministry of Statistics and Programme Implementation (MoSPI), Data Informatics & Innovation Division  
**Team:** Hacksmiths  
**Live Prototype URL:** `http://localhost:3000`

---

## 📌 Executive Summary

The Members of Parliament Local Area Development Scheme (MPLADS) enables MPs to recommend local development works (roads, drains, community halls, drinking water infrastructure) executed through a multi-tier pipeline:
$$\text{MP Recommends} \longrightarrow \text{District Authority Sanctions} \longrightarrow \text{Agency Executes} \longrightarrow \text{Milestone Disbursement} \longrightarrow \text{Completion}$$

At national scale, this encompasses **>175,000 work records** and **>140,000 vendor disbursements**. 

**Nigrani MPLAD** is an evidence-first risk intelligence platform that moves beyond generic dashboards to provide active decision support. Rather than making automated accusations, the platform surfaces items requiring verification with non-accusatory framing (*Needs Review*, *Payment-Progress Mismatch*, *Cost Outlier*, *Potential Duplicate*), attaches verifiable audit evidence, and provides an auditable human-in-the-loop determination workflow.

---

## 🚀 Core Features

1. **GIGW 3.0 + Apple-Restrained Visual Identity**:
   - Institutional Indian Government credibility paired with functional Liquid Glass navigation.
   - Strictly non-accusatory language (*Risk for Review*, *Needs Evidence*, *Unusual Pattern*).
   - High-contrast, double-encoded risk badges adhering to GIGW accessibility guidelines.

2. **Multi-Channel Anomaly & Compliance Engine**:
   - **Compliance Rule Engine:** Checks statutory guidelines (e.g. ₹75 Lakh Trust & Society cap per project).
   - **Payment-Progress Mismatch:** Identifies works where monetary release materially outpaces certified physical progress (e.g. 78% payment vs 30% progress).
   - **Spatial Duplicate & Split-Work Detection:** Vector GIS linking near-duplicate works (e.g. 42m separation, 0.91 lexical description cosine similarity).
   - **Vendor Concentration:** Analyzes repeat-award frequency and procurement dominance within implementing agencies.
   - **Visual Documentation Forensics:** Flags works marked complete or disbursed with `image_status = Not Available`.
   - **Schedule Turnaround Tracking:** Monitors 75-day statutory sanction limit from MP recommendation.

3. **Human-in-the-Loop Determination Workflow**:
   - District officers can take 4 standardized administrative actions:
     - **Assign Field Inspection** (dispatches junior engineer for physical measurement & photo capture)
     - **Request Documentation** (requests physical Measurement Book or revised BoQ)
     - **Valid Explanation / Dismiss** (records documented exemption)
     - **Escalate Under Procedure** (routes to State Nodal Authority)
   - Every determination is permanently recorded in the immutable chronological audit trail with timestamp and actor name.

4. **Internal System Administration Console (`/admin`)**:
   - **Admin Credentials:** `ID: Prototype20` | `Password: Admintest@1234`
   - Dynamically reconfigure codified rule thresholds without redeploying code.
   - Toggle individual detection channels on/off.
   - Simulate batch ingestion runs and inject custom test work records.
   - Export full audit logs as CSV.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | **Next.js (App Router)** | Modern SSR/SSG web application, file-based routing |
| **Language** | **TypeScript** | Type-safe domain models & interfaces |
| **Styling** | **Tailwind CSS** | GIGW palette tokens & Apple Liquid Glass utilities |
| **Icons** | **Lucide React** | Consistent, accessible iconography |
| **Charts** | **Recharts** | Lifecycle funnels, risk distribution, disbursement scatter plots |
| **Maps** | **Leaflet & Vector Spatial Canvas** | GIS work plotting, district boundaries, duplicate linkage |
| **Data Engine** | **Client & In-Memory Storage Engine** | Grounded in real 18th Lok Sabha MoSPI schema (`RecommendedWork`, `VendorPayment`) |

---

## 📂 Project Structure

```text
nigrani-mplad/
├── docs/                                 # Foundational Documentation & Specifications
│   ├── PRD_Nigrani_MPLAD.md             # Complete Product Requirements Document
│   ├── Nigrani_MPLAD_Website_Design_Tech_Stack.md
│   └── Nigrani_MPLAD_UI_UX_Design_Specification.md
├── src/
│   ├── app/                              # Next.js App Router Pages
│   │   ├── page.tsx                      # Landing / Portal Page
│   │   ├── dashboard/                    # District Decision Dashboard
│   │   ├── review-queue/                 # Priority Review Queue
│   │   ├── works/                        # Works Registry & Dossiers
│   │   │   └── [workId]/                 # Work Intelligence & Evidence Dossier
│   │   ├── map/                          # GIS Map Intelligence
│   │   ├── agencies/                     # Implementing Agency Profiles
│   │   ├── analytics/                    # Portfolio Risk Analytics
│   │   ├── evidence/                     # Central Evidence Dossier Store
│   │   ├── audit-trail/                  # Immutable Chronological Audit Trail
│   │   ├── data-sources/                 # Data Lineage & Provenance
│   │   ├── login/                        # Role Selection Gateway
│   │   └── admin/                        # System Administration Console
│   │       └── login/                    # Admin Gateway Login (Prototype20)
│   ├── components/                       # Reusable UI & Business Components
│   │   ├── AppShell.tsx                  # Unified Layout Shell
│   │   ├── Header.tsx                    # Institutional Topbar
│   │   ├── Sidebar.tsx                   # Apple-restrained Navigation
│   │   ├── MetricCard.tsx                # Contextual KPI Cards
│   │   ├── RiskEvidenceCard.tsx          # Signature Evidence UI Component
│   │   ├── WorkTable.tsx                 # Searchable & Filterable Table
│   │   ├── EvidenceDrawer.tsx            # Slide-over Raw Document Inspector
│   │   ├── OfficerDecisionModal.tsx      # Determination Recording Modal
│   │   ├── GISMapComponent.tsx           # Vector Spatial Map Engine
│   │   └── Charts/                       # Recharts Analytics Visualizers
│   ├── lib/
│   │   ├── seed-data.ts                  # 100+ Works Grounded in MoSPI 18th LS Data
│   │   ├── storage.ts                    # LocalStorage Persistence Engine
│   │   ├── admin-auth.ts                 # Admin Session & Credential Handler
│   │   ├── admin-rules.ts                # Configurable Thresholds & Detectors
│   │   ├── constants.ts                  # System Constants & Guidelines Thresholds
│   │   └── utils.ts                      # Indian Currency & Formatting Helpers
│   └── types/
│       └── mplad.ts                      # Domain TypeScript Interfaces
```

---

## ⚡ Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Zeyan900/mplads-risklens.git
cd mplads-risklens
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm run start
```

---

## 🔑 Admin Access

- **Route:** `/admin/login` or click **Admin** in the header.
- **Admin ID:** `Prototype20`
- **Password:** `Admintest@1234`

---

## 📜 Provenance & Disclaimers

- Grounded in official **MoSPI 18th Lok Sabha Open Datasets** (Catalog #22567, #22565) and **MPLADS Guidelines (April 2023)**.
- Local Government Directory (LGD) codes serve as canonical spatial join keys.
- **Honesty in Demonstration (NFR-7):** Fictional test cases are visibly tagged as `Synthetic Demo Control` and are never represented as official government determinations of wrongdoing.
