# Nigrani MPLAD — Website Design Tech Stack
## Smart India Hackathon 2026 | Hacksmiths

### 1. Product Design Goal

Nigrani MPLAD is an evidence-first risk-intelligence web application for MPLADS works. The website should help authorised users quickly answer:

- Which works need review?
- Why was a work flagged?
- What evidence supports the signal?
- What should the reviewer check next?
- What happened after the review?

The interface must use neutral language such as **Risk for Review**, **Needs Evidence**, **Unusual Pattern**, **Payment-Progress Mismatch**, and **Delay Risk**. It must not label a person, MP, vendor, or agency as fraudulent.

---

## 2. Recommended Frontend Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | **Next.js (App Router)** | Main web application, routing, layouts and production build |
| Language | **TypeScript** | Type-safe frontend development |
| Styling | **Tailwind CSS** | Fast, consistent responsive styling |
| UI Components | **shadcn/ui** | Accessible cards, dialogs, tables, tabs, dropdowns, forms |
| Icons | **Lucide React** | Consistent interface icons |
| Maps | **Leaflet + react-leaflet** | MPLADS work locations, proximity and GIS views |
| Charts | **Recharts** | Risk trends, work status, payment/progress and agency analytics |
| Forms | **React Hook Form + Zod** | Review forms, filters and validation |
| Server/Data State | **TanStack Query** | API requests, caching and loading/error states |
| Local UI State | **Zustand** or React state | Filters, selected work, map state and lightweight UI state |
| API Contract | **REST/JSON** | Connect Next.js frontend to FastAPI backend |
| Backend boundary | **FastAPI + Pydantic** | Risk calculations, data processing and API layer |
| Database | **PostgreSQL + PostGIS** | Work records, risk data and geospatial queries |
| Deployment | **Docker Compose** | Reproducible hackathon demo environment |

### MVP rule

Keep the frontend simple and inspectable. Do not introduce micro-frontends, Kafka, blockchain, or unnecessary real-time infrastructure.

---

# 3. Visual Design System

## Design Direction

**Government intelligence dashboard + modern SaaS analytics**

The interface should feel:

- Professional
- Trustworthy
- Evidence-driven
- Data-dense but readable
- Modern without looking like a generic AI dashboard
- Suitable for government officers and auditors

### Color roles

Use a restrained palette rather than making every risk state bright.

- Primary: deep navy / government-blue
- Surface: white
- Secondary surface: very light blue/gray
- Border: subtle neutral gray
- Success: green
- Warning: amber
- Review risk: red/orange used sparingly
- Information: blue
- Neutral: gray

Risk colors should communicate **review priority**, not guilt.

### Typography

Recommended:

- **Inter** or **Geist Sans** for the interface
- Strong, compact headings
- Medium-weight labels
- Regular body text
- Monospace only for IDs, reference numbers and technical values

### Spacing

Use a consistent 4/8px spacing system.

Recommended dashboard spacing:

- Page padding: 24–32px
- Section gap: 24px
- Card padding: 16–20px
- Small control gap: 8–12px
- Border radius: 10–16px

---

# 4. Core Website Screens

## A. Login / Role Selection — MVP

For the hackathon demo, use a controlled demo role selector.

Roles:

1. District Authority
2. State Nodal Authority
3. MoSPI / Central View
4. MP / MP Staff
5. Implementing Agency
6. Auditor

Production should replace this with proper role-based authentication.

---

## B. District Risk Dashboard

### Header

- Nigrani MPLAD logo
- District selector
- Date/data freshness indicator
- Role indicator
- User menu

### KPI cards

1. Total Works
2. Ongoing Works
3. Works Needing Review
4. Evidence Gaps
5. Overdue Works

Do not make the KPI cards imply wrongdoing.

### Main dashboard

**Review Queue**

Columns:

- Priority
- Work ID
- Work name
- Category
- District/Location
- Risk signals
- Risk score
- Last update
- Review status

Example:

> High — MPLAD-2026-DL-0142 — Community Water Tank — Payment-Progress Mismatch — 78/100 — 52 days ago

### Right-side / secondary panel

**Risk Signal Distribution**

- Compliance
- Payment-Progress
- Cost Outlier
- Duplicate
- Delay
- GIS/Photo Evidence

---

# 5. Risk Review Queue

This is the most important operational screen.

### Filters

- District
- Constituency
- Work category
- Status
- Risk detector
- Severity
- Date range
- Implementing Agency
- Evidence availability

### Sorting

- Review priority
- Risk score
- Days overdue
- Last update
- Payment-progress gap
- Cost deviation

### Table interaction

Clicking a row opens the **Work Intelligence Panel**.

---

# 6. Work Intelligence / Evidence Page

This should be the strongest screen in the demo.

## Header

**Community Water Tank**

`MPLAD-2026-DL-0142`

Status:

- In Progress
- Needs Review

### Top summary

- Sanctioned amount
- Amount paid
- Physical progress
- Days since sanction
- Expected completion
- Last evidence update

### Risk explanation card

Title:

**Payment-Progress Mismatch — Needs Review**

Show:

- Payment ratio: 78%
- Certified physical progress: 30%
- Gap: 48 percentage points
- Last progress update: 52 days ago

### Why this matters

Plain-language explanation:

> Payment is materially ahead of certified physical progress. The system recommends checking the latest measurement/progress evidence before the next payment request.

### Evidence section

Show linked evidence:

- Sanction record
- Payment records
- Progress report
- Latest photo
- Completion certificate
- Measurement reference
- Relevant guideline/rule

Every evidence item should show its source and date where available.

---

# 7. Suggested Action Panel

The system should not make the final decision.

### Suggested next action

Examples:

- Request measurement/progress certificate
- Request revised schedule
- Verify BoQ and SoR reference
- Compare nearby works
- Assign field inspection
- Request missing completion evidence

### Reviewer decision

Buttons:

- Valid explanation
- Documentation requested
- Inspection assigned
- Escalated under procedure

Add:

- Reviewer notes
- Due date
- Attachment/evidence upload
- Save decision

---

# 8. GIS / Map Screen

## Main map

Use:

**Leaflet + react-leaflet**

Map elements:

- Work markers
- Risk-priority markers
- District boundaries where available
- Nearby-work radius
- Selected work
- Duplicate candidates

### Map popup

Example:

**MPLAD-2026-DL-0142**

- Community Water Tank
- In Progress
- Needs Review
- 78/100 review risk
- 1 nearby similar work

### Duplicate-work visualization

When two works are selected:

- Draw connecting line
- Show distance
- Show similarity score
- Show sanction dates
- Show facility/site identifiers

Example:

> 42 m apart · 0.91 description similarity · sanctions 18 days apart

The interface should say **Potential Duplicate or Split Work**, not “Duplicate Fraud”.

---

# 9. Analytics / Insights Screen

## Portfolio charts

Use Recharts.

Recommended visualisations:

### Work lifecycle

Bar chart:

Recommended → Sanctioned → In Progress → Completed

### Risk distribution

Horizontal bars:

- Compliance
- Payment-Progress
- Cost
- Duplicate
- Delay
- GIS/Photo

### Payment vs progress

Scatter plot:

- X-axis: physical progress %
- Y-axis: payment %
- Highlight large gaps for review

### Delay analysis

Bar/area chart:

- Works by days since sanction
- Expected completion threshold
- Overdue works

### Cost comparison

Box/strip style comparison:

- Selected work
- Comparable local works
- Median
- Interquartile range

Avoid visualisations that imply certainty where data is incomplete.

---

# 10. Implementing Agency Profile

This is an operational profile, not a fraud score.

### Show

- Number of works
- Completed works
- Overdue works
- Evidence gaps
- Median progress
- Payment-progress mismatch count
- Unresolved review alerts
- Review outcomes

### Example wording

**Delivery Pattern Needs Review**

> 5 of 8 works are overdue and 4 have stale-update alerts.

Always show the portfolio size so users can interpret the signal.

---

# 11. Audit Trail Screen

Show a chronological activity timeline.

Example:

- 10:32 — Alert generated
- 10:45 — Officer opened evidence packet
- 11:02 — Documentation requested
- 13:18 — Agency uploaded progress document
- 14:05 — Officer updated review outcome

Fields:

- Actor role
- Action
- Entity
- Timestamp
- Previous state
- New state

The audit trail demonstrates human control and accountability.

---

# 12. Data Quality / Provenance UI

Because the MVP uses public and synthetic data, make this visible.

Add a small badge:

**Data Source: Synthetic Demo**

Other possible labels:

- Public Source
- Authorised Integration
- Derived Metric
- Synthetic Demo

### Data freshness

Show:

> Last data refresh: 18 Sep 2026, 08:00

### Missing-data warning

Example:

> Progress evidence unavailable. Risk confidence reduced. Missing data is not evidence of wrongdoing.

---

# 13. Dashboard Navigation

Recommended sidebar:

```text
Nigrani MPLAD

Overview
Review Queue
Works
Risk Signals
Map Intelligence
Agencies
Analytics
Evidence
Audit Trail

────────────────
Data & Sources
Settings
```

On smaller screens, collapse to icons + drawer.

---

# 14. Component Architecture

Recommended reusable components:

```text
<AppShell />
<Sidebar />
<Topbar />
<MetricCard />
<RiskBadge />
<StatusBadge />
<ReviewPriority />
<RiskSignalCard />
<WorkTable />
<WorkRow />
<WorkDetail />
<EvidenceCard />
<EvidenceTimeline />
<RiskExplanation />
<SuggestedAction />
<ReviewerDecision />
<AgencySummary />
<AgencyRiskSignals />
<MapView />
<WorkMapMarker />
<DuplicateConnection />
<ChartCard />
<DataFreshness />
<DataSourceBadge />
<FilterBar />
<AuditTimeline />
<EmptyState />
<LoadingState />
<ErrorState />
```

---

# 15. Suggested Website Routes

```text
/
├── /login
├── /dashboard
├── /review-queue
├── /works
│   └── /[workId]
├── /map
├── /risk-signals
├── /agencies
│   └── /[agencyId]
├── /analytics
├── /evidence
├── /audit-trail
└── /settings
```

---

# 16. Recommended Project Folder Structure

```text
nigrani-mplad/
├── app/
│   ├── dashboard/
│   ├── review-queue/
│   ├── works/
│   ├── map/
│   ├── agencies/
│   ├── analytics/
│   ├── evidence/
│   └── audit-trail/
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── works/
│   ├── risk/
│   ├── map/
│   ├── evidence/
│   └── charts/
│
├── lib/
│   ├── api.ts
│   ├── utils.ts
│   ├── constants.ts
│   └── risk-formatters.ts
│
├── hooks/
├── types/
├── public/
└── data/
    └── synthetic/
```

---

# 17. Frontend ↔ Backend Boundary

The website should consume a clean REST API from FastAPI.

Example endpoints:

```text
GET  /api/dashboard/summary
GET  /api/works
GET  /api/works/{work_id}
GET  /api/works/{work_id}/evidence
GET  /api/risks
GET  /api/risks/{alert_id}
GET  /api/agencies
GET  /api/agencies/{agency_id}
GET  /api/map/works
GET  /api/analytics
GET  /api/audit-log

POST /api/reviews
POST /api/evidence
```

Keep risk computation in Python/FastAPI rather than duplicating business logic in React.

---

# 18. Synthetic Demo Data

For the hackathon website:

- 80–120 fictional works
- 60 normal works
- 5 seeded delay risks
- 5 payment/progress mismatches
- 4 cost outliers
- 3 near-duplicate works
- 3 agency-pattern risks
- 2 reused-photo/wrong-location cases

The UI should clearly identify synthetic data.

Do not represent synthetic cases as actual government records.

---

# 19. Five Demo Screens to Perfect

If development time is limited, prioritise these:

### 1. District Dashboard
Shows the complete portfolio and review queue.

### 2. Work Intelligence Page
Shows one work with the full evidence-backed explanation.

### 3. GIS Map
Shows nearby works and the duplicate-work signal.

### 4. Agency Profile
Shows repeated operational patterns with counts and context.

### 5. Reviewer / Audit Trail
Shows that a human verifies the alert and records the outcome.

These five screens can tell the complete Nigrani story during an SIH demo.

---

# 20. Responsive Design

### Desktop

Primary target:

- 1440px+
- Dense dashboard
- Sidebar navigation
- Multi-column cards

### Laptop

Target:

- 1024–1439px
- Collapsible sidebar
- Two-column dashboard

### Tablet

Target:

- 768–1023px
- Stacked cards
- Scrollable data tables
- Map remains interactive

### Mobile

Target:

- 360–767px
- Bottom/compact navigation
- Cards become vertical
- Tables become list views
- Work intelligence remains readable

The SIH presentation/demo will likely use a laptop or large screen, so desktop UX should receive the highest design priority.

---

# 21. Accessibility

Minimum requirements:

- Keyboard navigable controls
- Visible focus states
- Semantic HTML
- Accessible labels
- Sufficient text contrast
- Do not rely on color alone for risk status
- Tooltips for unfamiliar icons
- Screen-reader labels for map/chart controls
- Clear error messages

Example:

Instead of only a red dot, display:

**High — Needs Review**

---

# 22. AI/ML Presentation in the UI

Do not show:

> Fraud Probability: 87%

Instead show:

> **Review Risk: 78/100**

Then explain the score through contributing signals:

```text
Payment-progress mismatch     +30
Stale progress evidence       +18
Delay risk                     +16
Cost outlier                   +14
────────────────────────────────
Review risk                    78/100
```

The score should always have an explanation.

---

# 23. Evidence-First Interaction Pattern

Every risk alert should follow:

```text
SIGNAL
   ↓
WHY FLAGGED?
   ↓
DATA EVIDENCE
   ↓
BENCHMARK / RULE
   ↓
SUGGESTED CHECK
   ↓
HUMAN DECISION
   ↓
AUDIT LOG
```

This is the core UX principle of Nigrani MPLAD.

---

# 24. MVP vs Future Website Features

## MVP

- Next.js dashboard
- Synthetic dataset
- Work lifecycle
- Review queue
- Rule-based alerts
- Payment-progress mismatch
- Cost outlier
- Duplicate detection
- Delay risk
- GIS map
- Evidence packet
- Agency profile
- Reviewer decision
- Audit trail
- Data provenance labels

## Future

- Authorised eSAKSHI connector
- PFMS integration
- State procurement integration
- Mobile field inspection workflow
- GPS/time-stamped inspection evidence
- Advanced image-assisted checks
- Network analysis
- Multi-scheme risk intelligence

---

# 25. Recommended Design Principle

### “Less dashboard. More decision support.”

The website should not simply show hundreds of charts.

A reviewer should be able to move from:

**Portfolio → Work → Risk → Evidence → Action → Decision**

in a few clicks.

The strongest visual hierarchy is:

**What needs attention? → Why? → Show me the evidence → What should I check? → Record what happened.**

---

## Final Website Stack

```text
                 NIGRANI MPLAD WEB APP
                         │
                Next.js + TypeScript
                         │
              Tailwind CSS + shadcn/ui
                         │
        ┌────────────────┼────────────────┐
        │                │                │
     Leaflet          Recharts       React Hook Form
     + GIS            Analytics          + Zod
        │                │                │
        └────────────────┼────────────────┘
                         │
                  TanStack Query
                         │
                    REST / JSON
                         │
                  FastAPI + Pydantic
                         │
             PostgreSQL + PostGIS
                         │
             Evidence / Synthetic Data
```

### One-line stack for the SIH PPT

**Next.js • TypeScript • Tailwind CSS • shadcn/ui • Leaflet • Recharts • FastAPI • PostgreSQL/PostGIS • Python • Docker**

### Design identity

**Evidence-first • Explainable • Human-in-the-loop • Government-ready • Responsive**
