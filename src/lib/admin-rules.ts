"use client";

export interface SystemEngineConfig {
  trust_society_cap: number;
  sanction_turnaround_days: number;
  payment_progress_gap_threshold: number;
  vendor_concentration_threshold: number;
  cost_outlier_zscore_threshold: number;
  detectors: {
    compliance: boolean;
    payment_progress: boolean;
    cost_outlier: boolean;
    duplicate_split: boolean;
    vendor_network: boolean;
    photo_evidence: boolean;
    delay: boolean;
  };
  auto_scoring_enabled: boolean;
  last_pipeline_run: string;
}

const DEFAULT_CONFIG: SystemEngineConfig = {
  trust_society_cap: 7500000, // ₹75 Lakh
  sanction_turnaround_days: 75,
  payment_progress_gap_threshold: 25, // 25 percentage points
  vendor_concentration_threshold: 40, // 40% share in agency
  cost_outlier_zscore_threshold: 2.5,
  detectors: {
    compliance: true,
    payment_progress: true,
    cost_outlier: true,
    duplicate_split: true,
    vendor_network: true,
    photo_evidence: true,
    delay: true,
  },
  auto_scoring_enabled: true,
  last_pipeline_run: "18-09-2026, 08:00 IST",
};

const RULES_KEY = "nigrani_system_engine_config";

export function getEngineConfig(): SystemEngineConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(RULES_KEY);
    if (!raw) {
      localStorage.setItem(RULES_KEY, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function updateEngineConfig(updates: Partial<SystemEngineConfig>): SystemEngineConfig {
  const current = getEngineConfig();
  const updated = { ...current, ...updates };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(RULES_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("nigrani_engine_config_change"));
    } catch (err) {
      console.error("Failed to update engine config", err);
    }
  }
  return updated;
}

export function resetEngineConfig(): SystemEngineConfig {
  if (typeof window !== "undefined") {
    localStorage.setItem(RULES_KEY, JSON.stringify(DEFAULT_CONFIG));
    window.dispatchEvent(new Event("nigrani_engine_config_change"));
  }
  return DEFAULT_CONFIG;
}
