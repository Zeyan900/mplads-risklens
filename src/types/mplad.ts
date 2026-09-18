export type UserRole =
  | "district_authority"
  | "state_authority"
  | "ministry_analyst"
  | "mp_office"
  | "implementing_agency"
  | "auditor";

export interface RoleConfig {
  id: UserRole;
  title: string;
  department: string;
  scope: string;
  jurisdiction: string;
  badge: string;
  canReview: boolean;
}

export type WorkStatus = "Recommended" | "Sanctioned" | "In Progress" | "Completed";

export type ReviewStatus =
  | "Pending Review"
  | "Verified"
  | "Dismissed"
  | "Documentation Requested"
  | "Inspection Assigned"
  | "Escalated";

export type RiskPriority = "High" | "Medium" | "Low" | "Neutral";

export type RiskChannel =
  | "compliance"
  | "payment_progress"
  | "cost_outlier"
  | "duplicate_split"
  | "vendor_network"
  | "photo_evidence"
  | "delay";

export interface RiskSignal {
  id: string;
  channel: RiskChannel;
  title: string;
  severity: "high" | "medium" | "low";
  score_contribution: number;
  why_flagged: string;
  evidence_summary: string;
  benchmark_rule: string;
  suggested_action: string;
}

export interface VendorPayment {
  payment_id: string;
  unique_work_number: string;
  vendor_name: string;
  implementing_agency_name: string;
  expenditure_date: string;
  payment_status: "Payment Success" | "Pending" | "Failed";
  expenditure_amount: number;
  invoice_ref: string;
  work_category?: string;
  pfms_ref?: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: "payment_voucher" | "sanction_order" | "inspection_report" | "site_photo" | "measurement_book" | "guideline_rule";
  date: string;
  ref_number: string;
  source: "eSAKSHI Portal" | "PFMS Gateway" | "District Work Register" | "Site Geo-Inspection" | "MPLADS Guidelines 2023";
  provenance: "Public Source" | "Authorised Data" | "Derived Metric" | "Synthetic Demo";
  status: string;
  description: string;
  file_size?: string;
  verified: boolean;
  meta?: Record<string, string | number>;
}

export interface RecommendedWork {
  unique_work_number: string; // WS/MP18275/2025-2026/183102
  data_as_on: string;
  state: string;
  implementing_district_per_source: string;
  implementing_district_per_lgd: string;
  implementing_district_lgd_code: number;
  loksabha_constituency: string;
  house_name: string;
  loksabha_MP_name: string;
  work_category: string;
  work_name: string;
  implementing_agency_name: string;
  work_description: string;
  date_of_recommendation: string;
  date_of_sanction?: string;
  expected_completion_date?: string;
  image_status: "Available" | "Not Available";
  recommended_amount: number;
  sanctioned_amount: number;
  expenditure_amount: number;
  physical_progress_percent: number;
  units: string;
  status: WorkStatus;
  review_status: ReviewStatus;
  risk_score: number; // 0 - 100
  risk_priority: RiskPriority;
  risk_signals: RiskSignal[];
  evidence_items: EvidenceItem[];
  payments: VendorPayment[];
  latitude: number;
  longitude: number;
  is_synthetic: boolean;
  duplicate_work_candidate_id?: string;
  duplicate_distance_meters?: number;
  duplicate_similarity?: number;
  last_progress_update_days_ago?: number;
  turnaround_days?: number;
  officer_notes?: string;
  review_date?: string;
  reviewed_by?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  work_id: string;
  work_name: string;
  actor_role: string;
  actor_name: string;
  action: string;
  previous_state: string;
  new_state: string;
  reason?: string;
  details?: string;
}

export interface AgencyProfile {
  id: string;
  name: string;
  normalized_name: string;
  district: string;
  lgd_code: number;
  total_works: number;
  completed_works: number;
  ongoing_works: number;
  overdue_works: number;
  evidence_gaps: number;
  payment_mismatches: number;
  unresolved_reviews: number;
  median_progress_percent: number;
  total_sanctioned: number;
  total_expended: number;
  key_vendors: { vendor_name: string; count: number; total_amount: number }[];
  delivery_pattern_flag: boolean;
  delivery_pattern_summary?: string;
}
