import { RoleConfig, RiskChannel } from "@/types/mplad";

export const USER_ROLES: RoleConfig[] = [
  {
    id: "district_authority",
    title: "District Authority",
    department: "District Planning & Collectorate",
    scope: "Operational Review & Sanctions",
    jurisdiction: "Indore (LGD: 402) / South Andamans (LGD: 602)",
    badge: "Operational Reviewer",
    canReview: true,
  },
  {
    id: "state_authority",
    title: "State Nodal Authority (SNA)",
    department: "Planning & Development Department",
    scope: "Statewide Multi-District Monitoring",
    jurisdiction: "Madhya Pradesh / Andaman & Nicobar",
    badge: "State Oversight",
    canReview: false,
  },
  {
    id: "ministry_analyst",
    title: "MoSPI Central Analyst",
    department: "Ministry of Statistics & Programme Implementation",
    scope: "National Risk Intelligence & Scheme Oversight",
    jurisdiction: "All States & UTs (Pan-India)",
    badge: "Central Analyst",
    canReview: false,
  },
  {
    id: "mp_office",
    title: "Member of Parliament (MP Office)",
    department: "18th Lok Sabha MP Secretariat",
    scope: "Constituency Development Transparency",
    jurisdiction: "Indore / Andaman & Nicobar Constituency",
    badge: "Constituency Transparency",
    canReview: false,
  },
  {
    id: "implementing_agency",
    title: "Implementing Agency Officer",
    department: "Rural Engineering / Public Works Division",
    scope: "Work Execution & Progress Certification",
    jurisdiction: "Executive Agency Zone",
    badge: "Agency Execution",
    canReview: false,
  },
  {
    id: "auditor",
    title: "Comptroller & Auditor / PAC",
    department: "Audit & Public Accounts Committee",
    scope: "Independent Post-Facto & Forensic Audit",
    jurisdiction: "Auditor Access",
    badge: "Independent Audit",
    canReview: false,
  },
];

export const RISK_CHANNELS_META: Record<
  RiskChannel,
  { label: string; description: string; color: string; bgLight: string; border: string; icon: string }
> = {
  payment_progress: {
    label: "Payment-Progress Mismatch",
    description: "Cumulative payments released materially exceed certified physical progress.",
    color: "#C53030",
    bgLight: "#FEF2F2",
    border: "#FECACA",
    icon: "Coins",
  },
  compliance: {
    label: "Compliance Rule Engine",
    description: "Breach of codified MPLADS Guidelines (April 2023) statutory thresholds.",
    color: "#D97706",
    bgLight: "#FFFBEB",
    border: "#FDE68A",
    icon: "ShieldAlert",
  },
  cost_outlier: {
    label: "Statistical Cost Outlier",
    description: "Unit or total cost sits significantly outside district peer-group distribution.",
    color: "#2563EB",
    bgLight: "#EFF6FF",
    border: "#BFDBFE",
    icon: "TrendingUp",
  },
  duplicate_split: {
    label: "Potential Duplicate / Split",
    description: "High description similarity, close geo-proximity, and staggered sanctions.",
    color: "#7C3AED",
    bgLight: "#F5F3FF",
    border: "#DDD6FE",
    icon: "CopyCheck",
  },
  vendor_network: {
    label: "Vendor Concentration",
    description: "High repeat-award frequency or anomalous vendor dominance within agency.",
    color: "#0D9488",
    bgLight: "#F0FDFA",
    border: "#99F6E4",
    icon: "Network",
  },
  photo_evidence: {
    label: "Documentation / Image Gap",
    description: "Substantial funds released or work marked completed without mandatory photo evidence.",
    color: "#E11D48",
    bgLight: "#FFF1F2",
    border: "#FECDD3",
    icon: "ImageOff",
  },
  delay: {
    label: "Sanction / Execution Delay",
    description: "Work exceeds guideline turnaround window (e.g. 75-day sanction limit).",
    color: "#EA580C",
    bgLight: "#FFF7ED",
    border: "#FFEDD5",
    icon: "ClockAlert",
  },
};

export const GUIDELINE_THRESHOLDS = {
  annual_entitlement_cr: 5.0,
  sc_mandate_min_pct: 15.0,
  st_mandate_min_pct: 7.5,
  trust_society_cap_inr: 7500000, // ₹75 Lakh per project
  sanction_turnaround_days: 75,
  first_installment_govt_max_pct: 75,
  first_installment_ngo_max_pct: 60,
  min_work_cost_inr: 100000,
};

export const DATA_PROVENANCE_INFO = {
  version: "SIH-2026-v1.0",
  last_refresh: "18 Sep 2026, 08:00 IST",
  recommended_works_dataset: "18th Lok Sabha MPLADS Recommended Works (Dataful/MoSPI #22567, 175,298 rows)",
  vendor_expenditure_dataset: "18th Lok Sabha MPLADS Vendor Payments (Dataful/MoSPI #22565, 143,257 rows)",
  guidelines_ref: "Official MPLADS Guidelines, MoSPI, April 2023",
  lgd_ref: "Local Government Directory (LGD), Ministry of Panchayati Raj",
};
