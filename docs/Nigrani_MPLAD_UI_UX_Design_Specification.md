# Nigrani MPLAD — UI/UX Design Specification
## Smart India Hackathon 2026 | Hacksmiths

> **Design direction:** Indian Government digital-service credibility × Apple-level restraint, depth and motion.
>
> **Important:** Nigrani MPLAD is a hackathon prototype, not an official Government of India website. The visual language may take inspiration from government portals, but the prototype must not falsely imply official government ownership or authorization.

---

# 1. Design Objective

Nigrani MPLAD is not a generic AI SaaS dashboard.

It is a **government decision-support system for authorised officers** dealing with a large portfolio of public-development works.

The UI should therefore communicate:

- Institutional trust
- Administrative seriousness
- Evidence and traceability
- Information density without visual clutter
- Clear hierarchy
- Calm, controlled interactions
- Indian public-sector identity
- Modern technology without looking like a startup landing page

The central UX principle is:

> **See what needs attention → understand why → inspect evidence → take action → record the decision.**

The interface should never make an automated accusation. Use:

- Risk for Review
- Needs Evidence
- Unusual Pattern
- Payment-Progress Mismatch
- Delay Risk
- Potential Duplicate
- Verification Required

Avoid:

- Fraudster
- Fraud Probability
- Guilty
- Corrupt Vendor
- Fraudulent MP
- AI says this is fraud

---

# 2. Research Basis

## Indian Government Website Inspiration

The Government of India's GIGW 3.0 guidance emphasises usability, user-centricity, accessibility, consistency, ownership/authenticity, semantic structure and trustworthy presentation.

GIGW specifically recommends that Central Government websites prominently display the State Emblem, include ownership information, maintain clear heading structure, provide keyboard operation and sufficient contrast, and avoid using colour as the only means of conveying information.

Sources:

- GIGW — Guidelines for Indian Government Websites and Apps
  https://guidelines.india.gov.in/
- GIGW — Quick Tips
  https://guidelines.india.gov.in/quick-tips/
- GIGW — Guidelines
  https://guidelines.india.gov.in/guidelines/
- National Portal of India
  https://www.india.gov.in/

The design should therefore borrow the **institutional language and information architecture** of Indian government portals rather than copying their exact visual layouts.

## Apple Inspiration

Apple's current Human Interface Guidelines describe Liquid Glass as a functional material for navigation and controls that creates depth and hierarchy while allowing underlying content to remain visible.

Important principle:

> Use Liquid Glass selectively for navigation and important controls, not as a decorative effect across every card.

Apple source:

https://developer.apple.com/design/human-interface-guidelines/materials

Additional Apple Liquid Glass guidance:

https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass

## Emblem Note

The State Emblem of India is legally regulated. The State Emblem of India (Prohibition of Improper Use) Act, 2005 restricts use that creates an impression of official government association without permission.

For the hackathon prototype:

- Do not present Nigrani as an already-authorised Government of India service.
- Prefer a clearly labelled **“Hackathon Prototype”** treatment.
- If an official emblem asset is used in a presentation/mockup, treat it as a visual reference and ensure the prototype does not falsely represent itself as an official service.
- For a production deployment, use official identity assets only through the appropriate government authority/approval process.

Official references:
- India Code — State Emblem Act, 2005
  https://www.indiacode.nic.in/bitstream/123456789/2038/5/A2005-50.pdf
- Ministry of Home Affairs — National Flag, Emblem & Anthem
  https://www.mha.gov.in/en/documents/national-flag-emblem-anthem

---

# 3. Overall Visual Language

## The Concept

### “Digital Government, not Government-looking software from 2012.”

The UI should combine:

**Indian Government**
- Institutional header
- Strong horizontal rules
- restrained blue/white palette
- formal terminology
- clear ownership/provenance
- information-first layout
- official-document feel

with:

**Apple**
- generous whitespace
- extremely clean typography
- subtle translucency
- depth through layering
- smooth transitions
- soft shadows
- restrained motion
- content-first interaction
- fluid panels

The result should feel like a **next-generation Indian government intelligence platform**.

---

# 4. Colour System

Use a mostly neutral palette.

## Primary

- Government Navy: `#123B6D`
- Deep Navy: `#0B2340`
- Blue: `#1D5FA7`

## Neutral

- Background: `#F6F8FA`
- Surface: `#FFFFFF`
- Soft Surface: `#EEF3F7`
- Border: `#D9E0E7`
- Text: `#17212B`
- Secondary Text: `#5E6B78`

## Accent

Use Indian-inspired colours subtly:

- Saffron: `#E77A24`
- Green: `#2D7D4F`

Do NOT turn the interface into an orange-white-green theme.

The national colour references should be restrained accents rather than the entire design system.

## Risk States

Risk states should always have text/icon labels in addition to colour.

- High — red/brick accent
- Medium — amber
- Low — blue/green
- Neutral — gray

Example:

**HIGH · NEEDS REVIEW**

not merely a red circle.

---

# 5. Typography

Recommended:

### Primary UI

**Inter** or **Geist Sans**

Characteristics:

- compact
- highly readable
- professional
- excellent for tables and dashboards

### Government-style headings

Use the same sans-serif family but with stronger weight rather than decorative serif typography.

### Optional editorial layer

For research/reference pages only, a restrained serif such as Georgia can be used for large quotations or historical context.

Do not use decorative fonts.

---

# 6. Header Design

The header should be one of the strongest government-inspired elements.

## Desktop

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ [Identity] NIGRANI MPLAD                          [Prototype] [User ▾] │
│              Explainable Risk Intelligence                             │
├─────────────────────────────────────────────────────────────────────────┤
│ Overview  Review Queue  Works  Map  Analytics  Agencies  Audit Trail   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Identity

Use:

**Nigrani MPLAD**

Small subtitle:

**Explainable Risk Intelligence for MPLADS Works**

For the prototype, add:

**SIH 2026 · HACKATHON PROTOTYPE**

This makes the status explicit.

## Government identity inspiration

Use a small emblem-inspired visual treatment only where legally appropriate.

Do not create a fake government seal.

---

# 7. Navigation

## Recommended desktop navigation

A restrained top navigation or left navigation can be used.

Preferred for the officer dashboard:

### Left sidebar

```text
NIGRANI
MPLAD

Overview

Review
  Review Queue
  Alerts

Works
  All Works
  Work Lifecycle

Intelligence
  Map
  Analytics
  Agencies

Evidence
  Evidence Centre
  Audit Trail

────────────────
Data Sources
Settings
```

The sidebar should be visually quiet.

Do not use oversized colourful icons.

---

# 8. Liquid Glass Usage

Liquid Glass should be a **functional material**, not the entire website theme.

## Use it for:

- floating sidebar
- sticky top navigation
- command/search palette
- map controls
- floating filters
- selected work panel
- contextual action bar
- transient dialogs

## Do NOT use it for:

- every dashboard card
- every table row
- every button
- the entire page background
- important dense data tables

This follows Apple's own guidance that Liquid Glass works best as a distinct functional layer for controls/navigation and should be used sparingly.

## Visual treatment

Use:

- translucent white/blue surface
- backdrop blur
- thin border
- subtle shadow
- slight highlight
- controlled transparency

Example:

```text
background: rgba(255,255,255,0.72)
backdrop-filter: blur(20px)
border: 1px solid rgba(255,255,255,0.55)
box-shadow: 0 10px 35px rgba(15,35,60,0.08)
```

Keep content surfaces mostly solid for readability.

---

# 9. Homepage / Landing Page

This should NOT look like a generic startup landing page.

No:

- “Revolutionising Governance with AI”
- giant gradient orb
- floating AI brain
- excessive 3D graphics
- 15 feature cards
- “Trusted by 500+ organisations”
- fake statistics
- meaningless glowing animations

## Recommended landing page

### Hero

Small government-style label:

**SMART INDIA HACKATHON 2026 · HACKATHON PROTOTYPE**

Large heading:

**Nigrani MPLAD**

Subheading:

**Explainable risk intelligence for MPLADS works.**

Supporting text:

> Identify which works need review, understand why they were flagged, inspect supporting evidence, and record the review outcome.

Primary button:

**Open Demo Dashboard**

Secondary:

**View How It Works**

### Hero visual

Instead of a stock AI graphic:

Show a simplified live-looking dashboard composition:

```text
Works Monitored        Needs Review
100                    12

        ┌──────────────────────────────┐
        │ Payment-Progress Mismatch     │
        │ Review Risk       78 / 100    │
        │                               │
        │ Payment       78%             │
        │ Progress      30%             │
        │ Gap           48 pts           │
        └──────────────────────────────┘
```

Use subtle motion only.

---

# 10. Dashboard UX

The dashboard is the heart of the product.

## First viewport

```text
Good morning, District Authority

District: Indore
Data refreshed: 18 Sep 2026 · 08:00
Data status: Synthetic Demo

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 100      │ │ 12       │ │ 7        │ │ 5        │
│ Works    │ │ Review   │ │ Overdue  │ │ Evidence │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

Review Queue                              View all →

┌───────────────────────────────────────────────────────────────┐
│ Priority │ Work │ Signal │ Evidence │ Last Update │ Action   │
└───────────────────────────────────────────────────────────────┘

Risk Signals                    Portfolio Overview
[chart]                         [chart/map]
```

---

# 11. Dashboard Card Style

Cards should be subtle.

Avoid:

- thick borders
- giant gradients
- excessive rounded corners
- colourful icons in every card
- huge numbers with no context

Recommended:

```text
┌──────────────────────────────────┐
│ NEEDS REVIEW                    │
│                                  │
│ 12                               │
│ works require attention          │
│                                  │
│ +3 since last review             │
└──────────────────────────────────┘
```

Small top labels + strong number + contextual sentence.

---

# 12. Review Queue UX

This is the primary workflow.

## Table

Columns:

- Priority
- Work
- Category
- Signal
- Review Risk
- Evidence
- Last Update
- Status

Example:

| Priority | Work | Signal | Risk | Evidence |
|---|---|---|---:|---|
| High | Community Water Tank | Payment-Progress | 78 | 4/5 |
| Medium | School Toilet Block | Delay | 62 | 3/5 |
| Medium | LED Streetlights | Cost Outlier | 58 | 5/5 |

## Row interaction

Hover:

- subtle background change
- no bouncing
- no glow

Click:

- smooth transition into Work Intelligence

---

# 13. Work Intelligence Page

This is the most important UX screen.

## Top

```text
← Review Queue

Community Water Tank
MPLAD-2026-DL-0142

In Progress     Needs Review
```

Then:

```text
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Sanctioned   │ │ Paid         │ │ Progress     │
│ ₹12.0 L      │ │ ₹9.36 L      │ │ 30%          │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

# 14. Risk Explanation

Use a calm evidence-first panel.

### Payment-Progress Mismatch

**Review Risk · 78 / 100**

> Payment is materially ahead of certified physical progress.

Then:

```text
Payment ratio                     78%
Certified progress                30%
Difference                        48 pts
Last update                       52 days ago
```

### Why flagged?

1. Payment ratio exceeds physical progress
2. No recent progress update
3. Final/next-stage payment requires supporting evidence

### Suggested check

**Request measurement book / progress certificate before the next payment request.**

---

# 15. Evidence Drawer

Clicking an evidence item opens a smooth side drawer.

Example:

```text
┌─────────────────────────────────────────┐
│ Evidence                                │
│                                         │
│ Payment Request #PFMS-8312              │
│ 12 Aug 2026                             │
│ ₹4,50,000                               │
│                                         │
│ Source: Payment Record                  │
│ Status: Verified in demo dataset        │
│                                         │
│ [Open Record]                           │
└─────────────────────────────────────────┘
```

Evidence should always show:

- Source
- Date
- Record ID
- What the evidence supports
- Whether it is public, authorised or synthetic

---

# 16. GIS UX

The map should look like an administrative intelligence tool, not a travel app.

## Map style

- light neutral base
- muted roads
- clear district boundaries
- restrained marker colours
- no excessive map decoration

## Work markers

Use small circles with labels.

Example:

**78 · Review**

Click marker:

```text
Community Water Tank
Review Risk 78

Payment 78%
Progress 30%

[Open Work]
```

---

# 17. Duplicate Detection UX

When two works are near each other:

```text
Potential Duplicate / Split Work

Work A ───────────── 42 m ───────────── Work B

Description similarity      0.91
Sanction date difference    18 days
Same facility?              Unknown
```

Use a map line between the works.

Do not display:

**DUPLICATE FRAUD DETECTED**

---

# 18. Analytics Page

Analytics should support decisions, not impress judges with random charts.

## Recommended sections

### Portfolio health

- Work lifecycle
- completion trend
- overdue works

### Risk distribution

- payment-progress
- delay
- cost
- duplicate
- evidence
- compliance

### Comparative analytics

- district
- category
- agency
- time period

### Cost intelligence

Show:

**Selected work vs comparable local works**

not a national generic benchmark.

---

# 19. Agency Profile UX

Title:

**Implementing Agency — Delivery Profile**

Do not title:

**Agency Fraud Score**

Show:

```text
8 works monitored

5 overdue
4 evidence gaps
3 payment-progress alerts
2 unresolved reviews
```

Then explain:

> Operational pattern needs review based on 8 works in the selected period.

This preserves context and avoids unfair conclusions from tiny samples.

---

# 20. Reviewer Workflow

The interface should make the human decision explicit.

```text
AI / Rules
    ↓
Risk Signal
    ↓
Evidence Packet
    ↓
Officer Review
    ↓
Decision
    ↓
Audit Trail
```

Decision buttons:

**Valid Explanation**

**Documentation Requested**

**Inspection Assigned**

**Escalated Under Procedure**

The system must never make these decisions automatically.

---

# 21. Animation System

Animation should communicate **state and hierarchy**, not decoration.

## Page transitions

- 180–250ms
- ease-out
- subtle horizontal/opacity transition

## Cards

On hover:

- 1–2px elevation
- border becomes slightly stronger

No large scale effects.

## Dashboard loading

Use skeleton loaders rather than spinning AI animations.

## Work detail

When opening a work:

- table row fades into detail header
- evidence cards appear sequentially
- chart values animate once

## Risk score

Animate from 0 → final score only on initial display.

Do not repeatedly animate risk scores because it can make the interface feel alarmist.

---

# 22. Apple-Style Motion Principles

Use:

- spring-like easing where appropriate
- opacity + translation
- smooth sheet/drawer transitions
- layered depth
- scroll-linked subtle effects

Avoid:

- parallax everywhere
- bouncing buttons
- rotating icons
- excessive blur
- continuous floating objects
- animated gradients
- glowing AI effects

Motion should make the system feel **calm and precise**.

---

# 23. Search / Command Interface

Use a clean command/search field.

Placeholder:

**Search works, agencies, IDs or locations…**

Keyboard shortcut:

`⌘ K` / `Ctrl K`

Search results:

```text
WORKS
MPLAD-2026-DL-0142
Community Water Tank

AGENCIES
Rural Engineering Division 12

LOCATIONS
District X · Ward 18
```

This is a good place to use Liquid Glass.

---

# 24. Empty States

Government software should explain what the user can do.

Bad:

> Nothing here :(

Good:

> No works currently require review.
>
> The review queue will populate when configured risk rules or anomaly detectors identify a work requiring attention.

---

# 25. Loading States

Never show:

> AI is thinking…

Use:

> Loading work records…

or:

> Calculating portfolio risk signals…

For long operations:

```text
Analysing 100 works

Validating records        ✓
Calculating risk signals  ✓
Checking locations        ✓
Preparing review queue    …
```

---

# 26. Error States

Example:

> **Unable to load payment records**
>
> The payment data source did not respond.
>
> No payment-progress conclusion has been generated for affected works.
>
> [Retry]

This is important for an evidence-first government system.

---

# 27. Data Provenance

Every important dataset should have a provenance label.

### Public

**PUBLIC SOURCE**

Example:
MPLADS guidelines

### Authorised

**AUTHORISED DATA**

Example:
eSAKSHI export

### Derived

**DERIVED**

Example:
Payment ratio

### Demo

**SYNTHETIC DEMO**

Example:
Hackathon work records

Use small badges near the data, not giant warnings.

---

# 28. Accessibility Requirements

The design should target GIGW/WCAG-style accessibility.

Minimum:

- Keyboard navigation
- Visible focus state
- Semantic HTML
- One clear H1 per page
- Correct heading hierarchy
- Alt text for meaningful images
- Accessible form labels
- Text + icon, not colour alone
- Minimum 4.5:1 normal text contrast
- Text scaling without breaking layout
- Skip-to-content link
- Responsive layout
- Reduced-motion preference

GIGW specifically highlights semantic markup, keyboard operation, colour independence, contrast and responsive behaviour.

---

# 29. Mobile UX

The primary target is desktop because officers will likely use larger screens, but the interface must remain responsive.

## Mobile priority

1. Review queue
2. Work details
3. Evidence
4. Suggested action
5. Map
6. Analytics

On mobile:

- tables become cards
- sidebar becomes drawer
- evidence becomes accordion
- action buttons remain sticky at bottom

---

# 30. Homepage Footer

Government-inspired footer structure:

```text
────────────────────────────────────────────────────────

Nigrani MPLAD
Explainable Risk Intelligence for MPLADS Works

Hackathon Prototype · Smart India Hackathon 2026

About | Accessibility | Data Sources | Privacy | Contact

Prototype developed by Hacksmiths
This interface is a demonstration system and does not represent
an official Government of India service.

────────────────────────────────────────────────────────
```

For any future authorised government deployment, replace the prototype ownership language with the legally approved department/organisation identity.

---

# 31. What NOT To Do

## Absolutely avoid generic AI-SaaS patterns

❌ Purple/blue gradient background

❌ Giant glowing AI orb

❌ “Powered by AI” everywhere

❌ 3D robot illustration

❌ Glassmorphism on every component

❌ 20 rounded cards

❌ Huge “95% accuracy” claim

❌ Fake government statistics

❌ Fake official seals

❌ “Fraud probability: 94%”

❌ Excessive animations

❌ Dark-mode-first hacker aesthetic

❌ Crypto-style dashboards

❌ Neon colours

❌ Fake testimonials

❌ “Trusted by Government of India” unless actually authorised

---

# 32. What To Do Instead

### Government identity

Use:

- formal header
- restrained navy
- institutional typography
- provenance
- ownership/status information
- evidence references
- structured navigation

### Apple influence

Use:

- whitespace
- hierarchy
- smooth transitions
- subtle translucency
- layered panels
- restrained shadows
- precise typography
- functional motion

### Nigrani identity

Use:

- evidence packets
- risk signals
- maps
- work lifecycle
- reviewer actions
- audit trail
- data provenance

---

# 33. Signature Nigrani UI Pattern

The most recognisable design component should be the:

## “Risk Evidence Card”

```text
┌──────────────────────────────────────────────────────┐
│ PAYMENT-PROGRESS MISMATCH             HIGH · REVIEW │
│                                                      │
│ Community Water Tank                                 │
│ MPLAD-2026-DL-0142                                  │
│                                                      │
│ Payment                         Physical Progress    │
│ 78%                             30%                  │
│ ████████████████                ██████               │
│                                                      │
│ Difference: 48 percentage points                    │
│ Last progress update: 52 days ago                  │
│                                                      │
│ WHY FLAGGED                                           │
│ Payment is materially ahead of certified progress. │
│                                                      │
│ EVIDENCE  4/5        SUGGESTED CHECK                │
│ Payment IDs         Request measurement/progress    │
│ Progress record     certificate before next payment│
│                                                      │
│ [Open Evidence]                    [Review Work →]   │
└──────────────────────────────────────────────────────┘
```

This component can become the visual signature of the product.

---

# 34. Recommended Page Hierarchy

```text
LANDING
  ↓
ROLE / LOGIN
  ↓
DISTRICT DASHBOARD
  ├── Review Queue
  │      ↓
  │   Work Intelligence
  │      ├── Risk Explanation
  │      ├── Evidence
  │      ├── Suggested Action
  │      └── Reviewer Decision
  │
  ├── Map Intelligence
  │
  ├── Analytics
  │
  ├── Agency Profiles
  │
  └── Audit Trail
```

---

# 35. Prototype Demo Journey

The SIH judge should understand the system within 60–90 seconds.

### Step 1

Open:

**District Dashboard**

> 100 works · 12 need review

### Step 2

Click:

**Payment-Progress Mismatch**

### Step 3

Open:

**Community Water Tank**

### Step 4

Show:

> Payment 78% · Progress 30% · Gap 48 pts

### Step 5

Open:

**Evidence Packet**

Show payment record + progress record + last update.

### Step 6

Show:

**Suggested Action**

> Request measurement/progress certificate.

### Step 7

Switch to:

**Map**

Show nearby potential duplicate.

### Step 8

Record:

**Inspection Assigned**

### Step 9

Open:

**Audit Trail**

Show the complete review history.

This demonstrates the entire Nigrani concept without requiring a long explanation.

---

# 36. Final Design Statement

## Nigrani MPLAD should feel like:

**An Indian government officer's digital workspace redesigned for the next decade.**

Not:

**Another AI startup dashboard.**

The visual formula is:

```text
Indian Government
    +
Institutional Trust
    +
Apple-level Simplicity
    +
Subtle Liquid Glass
    +
Evidence-first Data UX
    +
Calm Motion
    =
NIGRANI MPLAD
```

### Final tagline

**Evidence first. Review smarter. Monitor better.**

---

# 37. Reference Links

### Indian Government / GIGW

- GIGW 3.0: https://guidelines.india.gov.in/
- GIGW Quick Tips: https://guidelines.india.gov.in/quick-tips/
- GIGW Guidelines: https://guidelines.india.gov.in/guidelines/
- National Portal of India: https://www.india.gov.in/
- Ministry of Home Affairs — National Flag, Emblem & Anthem: https://www.mha.gov.in/en/documents/national-flag-emblem-anthem
- State Emblem Act, 2005: https://www.indiacode.nic.in/bitstream/123456789/2038/5/A2005-50.pdf

### Apple

- Apple Human Interface Guidelines — Materials: https://developer.apple.com/design/human-interface-guidelines/materials
- Apple Liquid Glass: https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass

### Nigrani MPLAD Project Basis

The UI/UX should follow the product blueprint's core workflow:

**Portfolio → Risk Signal → Evidence → Human Review → Action → Audit Trail**

The underlying solution specifically calls for an explainable work-level risk system, a review queue, evidence packets, GIS intelligence, reviewer decisions and an audit trail.
