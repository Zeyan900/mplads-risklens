# MPLADS RiskLens
## Explainable Early-Warning and Evidence Review System for Public Works

**Problem Statement ID:** SIH 26102  
**Project Category:** Governance / Public Administration / Digital Monitoring  
**Project Type:** Smart India Hackathon MVP and frontend prototype  
**Repository:** https://github.com/Zeyan900/mplads-risklens  
**Working Team Name:** CivicLens  
**Tagline:** *Turning public data into public accountability.*

---

## 1. Executive Summary

MPLADS RiskLens is an explainable early-warning dashboard designed to help public authorities review and prioritise public-works records. The system converts work-level information into a structured review queue by highlighting signals such as payment and physical-progress mismatch, delayed completion, unusual peer costs, duplicate-looking works, and incomplete supporting evidence.

RiskLens is intentionally designed as a **decision-support and review tool**, not as an automated fraud-detection or punishment system. Each alert explains why a work was surfaced, shows the evidence available, and suggests a practical next action for a human reviewer. This approach supports accountable governance while reducing the risk of opaque or premature conclusions.

The current MVP is a frontend-first prototype using synthetic demonstration records. It includes a responsive government-service-portal interface, a review dashboard, work-level evidence details, CSV upload and validation, and local data-lineage tracking.

---

## 2. Problem Statement

Public-works programmes generate large volumes of administrative and implementation data. In practice, this information may be spread across spreadsheets, progress reports, payment records, agency submissions, completion evidence, and district-level monitoring systems.

This creates several operational difficulties:

1. Officials may not have a prioritised view of which works need attention first.
2. Progress updates can become stale while payments continue to move forward.
3. Similar or duplicate-looking works may be difficult to identify across agencies or districts.
4. Unusual costs may remain hidden without peer comparison.
5. Missing completion certificates, invoices, photographs, or measurement records can delay effective review.
6. Existing dashboards may show data without explaining the reason for a warning or the next action required.

The core problem is therefore not simply the absence of data. It is the absence of an **explainable, evidence-led review layer** that helps a human decision-maker move from raw records to a defensible next step.

---

## 3. Proposed Solution

RiskLens introduces a review-oriented workflow with five principles:

### 3.1 Explainability

Every surfaced record includes a plain-language reason, supporting evidence, observed values, and a suggested next action.

### 3.2 Human-in-the-loop review

The system does not make a final finding. A reviewer can request evidence, escalate a record, or dismiss a signal.

### 3.3 Evidence before accusation

The interface uses language such as “needs review,” “evidence gap,” or “payment/progress mismatch” instead of labelling a work as fraudulent.

### 3.4 Traceable data intake

CSV imports record the source filename, import time, row count, warnings, validation status, and a lightweight fingerprint.

### 3.5 Progressive implementation

The MVP focuses on the smallest useful review workflow. Production integrations, authentication, persistence, and live government data can be added after the workflow has been validated with stakeholders.

---

## 4. Objectives

The primary objectives of MPLADS RiskLens are to:

- Provide a single review-oriented view of monitored public works.
- Help authorities prioritise records where additional evidence could change the next action.
- Make each alert understandable to a non-technical reviewer.
- Support consistent review actions across districts and implementing agencies.
- Preserve basic data lineage for imported work-record snapshots.
- Establish a foundation for future integration with approved government data sources.
- Avoid opaque, irreversible, or unsupported automated conclusions.

---

## 5. Target Users

| User | Primary need |
|---|---|
| District Authority | Prioritise works that require evidence or follow-up. |
| Member of Parliament / MPLADS stakeholder | Review implementation status and identify works requiring attention. |
| District monitoring team | Track incomplete evidence, delays, payments, and agency follow-ups. |
| Auditor or inspection team | Use explainable signals to plan sample checks and document review trails. |
| Implementing agency | Respond to evidence requests and clarify work-level exceptions. |
| Programme administrator | Monitor patterns across districts and agencies. |

---

## 6. MVP Scope

### Included in the MVP

- Dashboard overview for a Madhya Pradesh workspace.
- KPI cards for works monitored, works needing review, high-severity alerts, and amount at review risk.
- District-level review-priority chart.
- Risk-mix summary.
- Searchable work queue.
- Severity and signal filters.
- Work-detail review drawer.
- Evidence timeline.
- Suggested next action.
- Human-review disposition controls.
- CSV upload interface.
- Required-column and row-level validation.
- Numeric and percentage-range validation.
- Warnings for unrecognised columns.
- Local import-lineage history.
- Responsive mobile layout.
- Framer Motion page-entry animation.
- Development-only CSS Studio integration.

### Explicitly outside the MVP

- Live MPLADS or eSAKSHI API integration.
- Production database persistence.
- User authentication and authorisation.
- Official government decision-making or automatic sanction changes.
- Automated fraud declarations.
- Production file storage.
- Automated email, SMS, or workflow notifications.
- Fully trained machine-learning risk models.

---

## 7. Core Functional Workflow

### Step 1: Open the district workspace

The reviewer enters the workspace and sees the number of works monitored, works requiring review, high-severity alerts, and amount associated with open review signals.

### Step 2: Understand priority distribution

The district visualisation shows where surfaced works are concentrated. This helps the reviewer understand whether review demand is isolated or distributed across multiple districts.

### Step 3: Filter the review queue

The reviewer can search by work name or implementing agency and filter by severity or signal type.

### Step 4: Open a work record

The detail drawer shows:

- Work identity and location.
- Risk-priority score.
- Reason for surfacing.
- Evidence currently available.
- Sanctioned amount and paid amount.
- Physical progress.
- Expected completion date.
- Implementing agency.
- Evidence timeline.
- Suggested next action.

### Step 5: Record a human review disposition

The reviewer can select one of three local demo actions:

- **Needs evidence** — request missing or updated documentation.
- **Escalate** — send the record for higher-level review.
- **Dismiss** — close the signal when the available context is sufficient.

### Step 6: Import a new snapshot

The reviewer can upload a CSV file. The system validates the structure and values before enabling import.

### Step 7: Preserve lineage

The importer records a local lineage entry with source filename, timestamp, row count, warnings, validation status, and a lightweight fingerprint.

---

## 8. Risk Signals in the Prototype

### 8.1 Payment / progress mismatch

Surfaces works where financial progress appears materially ahead of reported physical progress.

**Example evidence:** A high paid amount combined with low or stale physical progress.

### 8.2 Delay signal

Surfaces works that are beyond their expected completion window or have not been updated recently.

**Example evidence:** Expected completion date has passed while reported progress remains incomplete.

### 8.3 Cost / peer signal

Surfaces works whose unit cost or total cost appears unusual compared with comparable local works.

**Example evidence:** A cost materially above the peer median for similar work categories.

### 8.4 Duplicate-looking work signal

Surfaces records that appear similar based on location, work description, agency, or other available identifiers.

**Example evidence:** Two records with matching descriptions and close geographic proximity.

### 8.5 Evidence-gap signal

Surfaces records where required supporting material is missing.

**Example evidence:** Missing completion certificate, measurement record, invoice, or final progress evidence.

These signals are triage mechanisms. They do not prove wrongdoing and should be investigated using approved procedures.

---

## 9. CSV Import and Validation

### Required columns

```text
work_id
work_name
district
sanctioned_amount
status
```

### Optional columns

```text
implementing_agency
progress_percent
paid_amount
sanction_date
expected_completion
latitude
longitude
```

### Validation rules

The MVP checks that:

- A CSV file has been selected.
- A header row exists.
- All required columns are present.
- Each row has a work identifier.
- `sanctioned_amount` is numeric when supplied.
- `paid_amount` is numeric when supplied.
- `progress_percent` is numeric and between 0 and 100 when supplied.
- Unrecognised columns are surfaced as warnings.
- At least one valid data row exists before import is enabled.

### Lineage fields

Each successful local import records:

| Field | Purpose |
|---|---|
| Import ID | Identifies the intake event. |
| Original filename | Preserves the source reference. |
| Import timestamp | Records when the snapshot entered the workspace. |
| Row count | Records the number of data rows. |
| Warning count | Records non-blocking validation warnings. |
| Validation status | Shows whether the snapshot passed validation. |
| Lightweight fingerprint | Provides a simple source reference for the prototype. |

The current lineage history is local UI state. A production implementation should use immutable server-side audit records and a cryptographic file hash.

---

## 10. System Architecture

```text
+----------------------------+
| District Authority / User  |
+-------------+--------------+
              |
              v
+----------------------------+
| React Dashboard UI         |
| - Overview                 |
| - Review Queue             |
| - Work Detail              |
| - CSV Intake Desk          |
+-------------+--------------+
              |
              v
+----------------------------+
| Client-side Review Logic   |
| - Search and filters       |
| - CSV parser               |
| - Validation rules         |
| - Local lineage state      |
+-------------+--------------+
              |
              v
+----------------------------+
| Synthetic MVP Data         |
| Future: approved APIs,     |
| secure database, storage   |
+----------------------------+
```

The current implementation is intentionally frontend-only. This makes the MVP easy to demonstrate while keeping the future data architecture open for stakeholder validation.

---

## 11. Technology Stack

### Frontend

- **React 19** for component-based UI development.
- **TypeScript** for type safety.
- **Vite** for development and production builds.
- **Tailwind CSS 4** for responsive styling.
- **shadcn/ui foundation** for reusable interface primitives.
- **Lucide React** for icons.
- **Framer Motion** for controlled page-entry animation.
- **Sonner** for action feedback and import notifications.
- **Wouter** for lightweight client-side routing.

### Data handling

- Browser **File API / FileReader** for local CSV reading.
- Custom lightweight CSV parser for the MVP.
- Client-side validation logic.
- Local React state for demo lineage history.

### Development experience

- **CSS Studio 1.2.0** for development-only visual editing.
- CSS Studio starts only when `import.meta.env.DEV` is true.
- CSS Studio is not intended to be shipped to production users.

### Hosting and delivery

- Manus WebDev static project template.
- Public GitHub source repository.
- Vite development server and static build workflow.

---

## 12. Repository Structure

```text
client/
  src/
    components/
      CsvImport.tsx       CSV upload, validation, and lineage UI
      ui/                  Reusable interface primitives
    pages/
      Home.tsx             Main RiskLens dashboard
    contexts/              Theme context
    lib/                   Utility helpers
    App.tsx                App shell and route configuration
    main.tsx               React entry point and CSS Studio startup
    index.css              Global design tokens and portal styling
  index.html               Browser document shell
server/                    Static-template compatibility server
shared/                    Shared constants/types placeholder
README.md                  Repository overview
PROJECT_DOCUMENTATION.md   Submission-ready project report
LICENSE                    MIT License
package.json               Scripts and dependencies
```

---

## 13. Local Setup

### Prerequisites

- Node.js 22 or later.
- pnpm 10 or npm.
- Git.

### Installation

```bash
git clone https://github.com/Zeyan900/mplads-risklens.git
cd mplads-risklens
pnpm install
```

### Development

```bash
pnpm dev
```

Open the Vite URL shown in the terminal.

### Type checking

```bash
pnpm check
```

### Production build

```bash
pnpm build
```

### Preview the production build

```bash
pnpm preview
```

---

## 14. Testing and Verification

The MVP was checked for:

- TypeScript errors.
- Vite development-server health.
- Responsive desktop layout.
- Responsive mobile layout.
- Dashboard navigation and review interactions.
- Detail drawer opening and closing.
- Search and filter controls.
- CSV intake modal opening.
- Empty upload state.
- Required-column validation state.
- CSV warnings and validation messaging.
- Local lineage-history presentation.
- Development-only CSS Studio startup.

A future production release should add automated unit tests for parsing and validation, browser-based end-to-end tests, accessibility testing, security testing, and data-quality regression fixtures.

---

## 15. Data Privacy and Security Considerations

The current repository contains synthetic data only. It does not include live government records, API keys, private credentials, or production user information.

For production deployment, the following controls are recommended:

- Role-based access control.
- Strong authentication and session management.
- Encryption in transit and at rest.
- Secure upload scanning and file-size limits.
- Immutable audit logs.
- Cryptographic source-file hashes.
- Data retention and deletion policies.
- Environment-specific secret management.
- Input sanitisation and CSV formula-injection protection.
- Formal security and privacy review before handling official records.

---

## 16. Current Limitations

- Demo records are synthetic.
- Uploaded records are not persisted after a full refresh.
- There is no production backend or database.
- There is no official MPLADS/eSAKSHI connector.
- The CSV parser is intentionally lightweight and does not yet handle every quoted-field edge case.
- Risk signals are prototype rules, not approved audit policy.
- Fingerprints are lightweight demo identifiers, not cryptographic hashes.
- Authentication, permissions, and multi-tenant workspaces are not implemented.
- The system should not be used to make final allegations or administrative decisions.

---

## 17. Future Roadmap

### Phase 1: Reliable data foundation

- Add backend ingestion service.
- Persist source snapshots and validation results.
- Use PostgreSQL for works, agencies, districts, alerts, and review actions.
- Add cryptographic file hashing and immutable lineage events.

### Phase 2: Secure collaboration

- Add authentication and role-based access.
- Add district, state, and programme-level permissions.
- Add reviewer comments and evidence attachments.
- Add notification and escalation workflows.

### Phase 3: Approved data integration

- Integrate approved government data sources.
- Add scheduled ingestion and reconciliation.
- Track schema versions and source freshness.
- Add data-quality monitoring.

### Phase 4: Advanced review intelligence

- Add map-based proximity and duplicate checks.
- Add configurable policy rules.
- Add peer benchmarks by category and geography.
- Add exportable review briefs and audit reports.
- Evaluate statistical or machine-learning assistance only with governance controls.

---

## 18. Responsible Use Statement

MPLADS RiskLens is designed to assist review, not replace official judgement. A signal is an invitation to inspect evidence. It is not proof of corruption, fraud, negligence, or wrongdoing.

Any operational deployment should be governed by approved departmental policy, documented review procedures, human accountability, appeal mechanisms, accessibility requirements, and regular evaluation for false positives and data-quality problems.

---

## 19. Team

**CivicLens** is the working team identity for this project.

The project combines frontend engineering, public-policy problem framing, data validation, explainable analytics, and human-centred workflow design.

---

## 20. Conclusion

MPLADS RiskLens demonstrates how public-works data can be transformed into a calm, explainable, and action-oriented review experience. The MVP focuses on a practical first step: identify records that deserve attention, explain why they were surfaced, preserve the source trail, and leave the final decision with a responsible human reviewer.

The prototype is intentionally narrow so that the workflow can be validated before investing in production integrations, databases, automation, and advanced analytics.
