# MPLADS RiskLens

> An explainable early-warning dashboard for reviewing public works, evidence, and implementation risks.

**Problem Statement ID:** SIH 26102  
**Project type:** Smart India Hackathon MVP / governance technology prototype  
**Current implementation:** Frontend-first static React prototype

## What is MPLADS RiskLens?

MPLADS RiskLens is a review-support dashboard designed around a simple governance need: help district authorities and public representatives identify which public works deserve evidence-led attention first.

The product does **not** label a work as fraudulent or replace an audit. It surfaces explainable signals—such as payment/progress mismatch, delivery delay, peer-cost outliers, duplicate-looking works, and incomplete evidence—so a human reviewer can decide what to request next.

## Problem Context

Public-works monitoring often involves fragmented spreadsheets, delayed progress updates, incomplete completion evidence, and limited visibility across implementing agencies. This creates a practical review problem: officials may have data, but not a clear prioritisation layer that explains which record requires attention and why.

RiskLens is a prototype response to that problem. It focuses on transparent triage, traceable evidence, and human review rather than opaque automated accusations.

## MVP Features

- Government-service-portal visual language for a district authority workspace.
- Overview metrics for works monitored, works needing review, high-severity alerts, and amount at review risk.
- District-level review-priority visualisation.
- Risk-mix summary for payment/progress, delay, cost/peer, and evidence-gap signals.
- Searchable and filterable review queue.
- Explainable work-detail drawer with reason, evidence, work snapshot, timeline, and suggested next action.
- Human-review dispositions: needs evidence, escalate, or dismiss.
- CSV intake desk for local work-record snapshots.
- CSV validation for required columns, missing values, numeric fields, progress ranges, and unrecognised columns.
- Import lineage history containing filename, import timestamp, row count, warning count, validation status, and a lightweight file fingerprint.
- Responsive desktop and mobile layouts.
- Restrained Framer Motion page-entry animation.
- Development-only CSS Studio integration for visual editing.

## CSV Format

The importer requires these columns:

```text
work_id,work_name,district,sanctioned_amount,status
```

The following fields are optional:

```text
implementing_agency,progress_percent,paid_amount,sanction_date,expected_completion,latitude,longitude
```

Example:

```csv
work_id,work_name,district,sanctioned_amount,status,progress_percent,paid_amount
MP-DEMO-001,Primary school toilet block,Dewas,1250000,Ongoing,62,780000
```

CSV data is currently parsed in the browser. The MVP does not transmit uploaded files to a government system or persist imported records after a full refresh.

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui component foundation
- Framer Motion
- Lucide React
- Sonner notifications
- Wouter client-side routing
- Browser File API / FileReader for CSV intake
- CSS Studio for development-only visual editing
- Manus WebDev static project template

## Project Structure

```text
client/
  src/
    components/       Reusable UI and CSV import workflow
    pages/            Dashboard page
    contexts/         Theme context
    lib/              Shared utilities
    App.tsx           App shell and routes
    main.tsx          React entry point and dev-only CSS Studio startup
    index.css         Global design system
server/               Static-template compatibility server
shared/               Shared constants/types placeholder
```

## Local Development

### Requirements

- Node.js 22 or later
- pnpm 10 or npm

### Install and run

```bash
pnpm install
pnpm dev
```

Open the local Vite URL shown in the terminal.

### Type check and build

```bash
pnpm check
pnpm build
```

CSS Studio is started only when Vite is running in development mode. It is not intended to ship to production users.

## Data, Privacy, and Limitations

This repository contains synthetic demonstration records only. It does not include live MPLADS, MoSPI, eSAKSHI, CAG, district-authority, or other government data. There are no production API credentials in the repository.

The current MVP has no production authentication, backend database, persistent audit log, role-based access control, or live government-data connector. The lineage history is local UI state intended to demonstrate the audit concept.

Risk scores are triage signals, not findings of wrongdoing. Any production deployment would require policy-owner review, data-quality controls, security review, accessibility testing, audit requirements, and clear escalation governance.

## Suggested Production Roadmap

1. Add a secure backend with PostgreSQL and object storage for source snapshots.
2. Persist immutable import lineage and validation reports.
3. Connect approved MPLADS data sources through a documented ingestion pipeline.
4. Add role-based access for MPs, district authorities, auditors, and implementing agencies.
5. Add evidence attachments, map-based duplicate checks, and exportable review briefs.
6. Establish model/rule governance, false-positive review, and audit trails before operational use.

## Team Naming

The working team name suggested for this project is **CivicLens**.

> **CivicLens — Turning public data into public accountability.**

## License

This project is released under the MIT License. See [LICENSE](LICENSE).
