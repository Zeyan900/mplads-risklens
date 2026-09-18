"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkIsAdminAuthenticated, logoutAdmin } from "@/lib/admin-auth";
import {
  getEngineConfig,
  updateEngineConfig,
  resetEngineConfig,
  SystemEngineConfig,
} from "@/lib/admin-rules";
import { getStoredWorks, getStoredAuditLog, resetDemoData } from "@/lib/storage";
import { RecommendedWork, AuditLogEntry } from "@/types/mplad";
import { formatINR } from "@/lib/utils";
import {
  ShieldCheck,
  Sliders,
  Database,
  PlusCircle,
  History,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Layers,
  Sparkles,
  ArrowLeft,
  Settings,
  Save,
  RotateCcw,
} from "lucide-react";

export default function AdminConsolePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"rules" | "pipeline" | "add_work" | "logs">("rules");
  const [engineConfig, setEngineConfig] = useState<SystemEngineConfig>(getEngineConfig());
  const [works, setWorks] = useState<RecommendedWork[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const router = useRouter();

  // New Work Form State
  const [newWorkName, setNewWorkName] = useState("");
  const [newCategory, setNewCategory] = useState("Drinking Water Facilities");
  const [newDistrict, setNewDistrict] = useState("Indore");
  const [newSanctionAmount, setNewSanctionAmount] = useState(1500000);
  const [newPaidAmount, setNewPaidAmount] = useState(1200000);
  const [newProgress, setNewProgress] = useState(25);
  const [newImageStatus, setNewImageStatus] = useState<"Available" | "Not Available">("Not Available");

  useEffect(() => {
    if (!checkIsAdminAuthenticated()) {
      router.replace("/admin/login");
      return;
    }
    setIsAuthenticated(true);
    setEngineConfig(getEngineConfig());
    setWorks(getStoredWorks());
    setAuditLog(getStoredAuditLog());

    const handleAuthChange = () => {
      if (!checkIsAdminAuthenticated()) {
        router.replace("/admin/login");
      }
    };
    window.addEventListener("nigrani_admin_auth_change", handleAuthChange);
    return () => window.removeEventListener("nigrani_admin_auth_change", handleAuthChange);
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FA] text-xs text-slate-500">
        Verifying administrative authorization...
      </div>
    );
  }

  const handleLogout = () => {
    logoutAdmin();
    router.push("/");
  };

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    updateEngineConfig(engineConfig);
    setSaveSuccessMsg("Codified guideline thresholds and detector rules saved successfully.");
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  const handleToggleDetector = (detectorKey: keyof SystemEngineConfig["detectors"]) => {
    const updated = {
      ...engineConfig,
      detectors: {
        ...engineConfig.detectors,
        [detectorKey]: !engineConfig.detectors[detectorKey],
      },
    };
    setEngineConfig(updated);
    updateEngineConfig(updated);
  };

  const handleRunPipeline = () => {
    setPipelineRunning(true);
    setTimeout(() => {
      setPipelineRunning(false);
      updateEngineConfig({ last_pipeline_run: new Date().toLocaleTimeString("en-IN") });
      alert("Pipeline batch ingestion simulation completed! 100+ work records re-scored.");
    }, 1200);
  };

  const handleCreateTestWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkName.trim()) return;

    const worksList = getStoredWorks();
    const uniqueId = `MPLAD-2026-TEST-${1000 + worksList.length + 1}`;
    const paymentRatio = Math.round((newPaidAmount / newSanctionAmount) * 100);
    const gap = paymentRatio - newProgress;

    const riskScore = gap > 30 ? 82 : gap > 15 ? 65 : 24;

    const newWorkItem: RecommendedWork = {
      unique_work_number: uniqueId,
      data_as_on: "18-08-2026",
      state: newDistrict === "Indore" ? "Madhya Pradesh" : "Delhi",
      implementing_district_per_source: newDistrict,
      implementing_district_per_lgd: newDistrict,
      implementing_district_lgd_code: newDistrict === "Indore" ? 402 : 142,
      loksabha_constituency: newDistrict,
      house_name: "18th Lok Sabha",
      loksabha_MP_name: "Admin Simulated MP",
      work_category: newCategory,
      work_name: newWorkName,
      implementing_agency_name: "Admin Custom Testing Agency",
      work_description: `Custom test work record injected via Admin Panel to evaluate detector pipeline.`,
      date_of_recommendation: "10-04-2025",
      date_of_sanction: "15-05-2025",
      expected_completion_date: "15-11-2025",
      image_status: newImageStatus,
      recommended_amount: newSanctionAmount,
      sanctioned_amount: newSanctionAmount,
      expenditure_amount: newPaidAmount,
      physical_progress_percent: newProgress,
      units: "recommended_amount in indian rupees",
      status: newProgress === 100 ? "Completed" : "In Progress",
      review_status: "Pending Review",
      risk_score: riskScore,
      risk_priority: riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low",
      latitude: 22.7196,
      longitude: 75.8577,
      is_synthetic: true,
      last_progress_update_days_ago: 45,
      risk_signals: [
        {
          id: `SIG-${uniqueId}-1`,
          channel: "payment_progress",
          title: "Payment-Progress Milestone Mismatch",
          severity: gap > 30 ? "high" : "medium",
          score_contribution: gap > 30 ? 35 : 20,
          why_flagged: `Payment ratio (${paymentRatio}%) leads physical progress (${newProgress}%) by ${gap} percentage points.`,
          evidence_summary: "Simulated tranche voucher cleared without accompanying measurement certification.",
          benchmark_rule: "MPLADS Guidelines §7.4: Progress parity requirement.",
          suggested_action: "Inspect physical measurement records before authorizing next tranche.",
        },
      ],
      payments: [
        {
          payment_id: `PAY-TEST-${Date.now()}`,
          unique_work_number: uniqueId,
          vendor_name: "Admin Mock Infrastructure Ltd",
          implementing_agency_name: "Admin Custom Testing Agency",
          expenditure_date: "14-06-2025",
          payment_status: "Payment Success",
          expenditure_amount: newPaidAmount,
          invoice_ref: "INV-TEST-01",
          pfms_ref: `C0625${Date.now().toString().slice(-6)}`,
        },
      ],
      evidence_items: [],
    };

    worksList.unshift(newWorkItem);
    localStorage.setItem("nigrani_mplad_works_v1", JSON.stringify(worksList));
    window.dispatchEvent(new Event("nigrani_data_update"));
    setWorks(worksList);

    setNewWorkName("");
    alert(`Test work ${uniqueId} created successfully! Available in Review Queue and Work Details.`);
  };

  const handleExportAuditCSV = () => {
    const headers = ["Timestamp", "Work_ID", "Work_Name", "Actor_Role", "Actor_Name", "Action", "Previous_State", "New_State", "Details"];
    const rows = auditLog.map((l) => [
      `"${l.timestamp}"`,
      `"${l.work_id}"`,
      `"${l.work_name.replace(/"/g, '""')}"`,
      `"${l.actor_role}"`,
      `"${l.actor_name}"`,
      `"${l.action}"`,
      `"${l.previous_state}"`,
      `"${l.new_state}"`,
      `"${(l.details || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nigrani_audit_log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col text-slate-900">
      {/* Top Admin Navigation */}
      <header className="sticky top-0 z-30 bg-[#0B2340] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E77A24] flex items-center justify-center text-white font-bold text-sm shadow-xs">
              <span>नि</span>
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                Nigrani MPLAD Console
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.2 rounded">
                  SYSADMIN
                </span>
              </span>
              <span className="text-[10px] text-slate-300 block">System Engineering &amp; Detector Configuration</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Admin: <strong>Prototype20</strong></span>
          </div>

          <Link
            href="/dashboard"
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Portal</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-red-300 hover:text-white hover:bg-red-500/20 transition-colors"
            title="Log Out Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("rules")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === "rules"
                ? "bg-[#123B6D] text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Detector Rules &amp; Thresholds</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === "pipeline"
                ? "bg-[#123B6D] text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Ingestion Pipeline &amp; Batch Run</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("add_work")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === "add_work"
                ? "bg-[#123B6D] text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Inject Test Work Record</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === "logs"
                ? "bg-[#123B6D] text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <History className="w-4 h-4" />
            <span>System Audit &amp; Event Logs ({auditLog.length})</span>
          </button>
        </div>

        {/* Tab 1: Rules & Thresholds */}
        {activeTab === "rules" && (
          <div className="space-y-6">
            {saveSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Threshold Parameters Form */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Codified Guideline Thresholds
                    </h2>
                    <p className="text-xs text-slate-500">
                      Update numerical thresholds without code redeployment (FR-2.3 compliance)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      resetEngineConfig();
                      setEngineConfig(getEngineConfig());
                      alert("Default guideline thresholds restored.");
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>

                <form onSubmit={handleSaveRules} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                      Trust &amp; Society Work Ceiling (INR)
                    </label>
                    <input
                      type="number"
                      value={engineConfig.trust_society_cap}
                      onChange={(e) =>
                        setEngineConfig({ ...engineConfig, trust_society_cap: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800"
                    />
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      Official Guideline Limit: ₹75,00,000 (Current value: {formatINR(engineConfig.trust_society_cap)})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                        Sanction Turnaround Limit
                      </label>
                      <input
                        type="number"
                        value={engineConfig.sanction_turnaround_days}
                        onChange={(e) =>
                          setEngineConfig({
                            ...engineConfig,
                            sanction_turnaround_days: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800"
                      />
                      <span className="text-[11px] text-slate-400 mt-0.5 block">Days from recommendation</span>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                        Payment-Progress Gap Trigger
                      </label>
                      <input
                        type="number"
                        value={engineConfig.payment_progress_gap_threshold}
                        onChange={(e) =>
                          setEngineConfig({
                            ...engineConfig,
                            payment_progress_gap_threshold: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800"
                      />
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        Percentage points lead
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                        Vendor Concentration Cap
                      </label>
                      <input
                        type="number"
                        value={engineConfig.vendor_concentration_threshold}
                        onChange={(e) =>
                          setEngineConfig({
                            ...engineConfig,
                            vendor_concentration_threshold: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800"
                      />
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        % total sanctions in agency
                      </span>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                        Cost Outlier Threshold (Z-Score)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={engineConfig.cost_outlier_zscore_threshold}
                        onChange={(e) =>
                          setEngineConfig({
                            ...engineConfig,
                            cost_outlier_zscore_threshold: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800"
                      />
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        Standard deviations from peer median
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B6D] text-white font-semibold text-xs hover:bg-[#0B2340] transition-colors shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Engine Rules</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Detector Channel Toggle Matrix */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">
                    Detection Channels Matrix
                  </h2>
                  <p className="text-xs text-slate-500">
                    Toggle individual detection channels active status
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { key: "compliance", label: "Compliance Rule Engine", desc: "Statutory ceilings and guideline rules" },
                    { key: "payment_progress", label: "Payment-Progress Delta", desc: "Disbursement leading milestone progress" },
                    { key: "cost_outlier", label: "Statistical Outlier Detector", desc: "Z-score peer distribution benchmarking" },
                    { key: "duplicate_split", label: "Spatial Duplicate & Split", desc: "Proximity & description text cosine similarity" },
                    { key: "vendor_network", label: "Vendor Repeat Share", desc: "Centrality and repeat award clusters" },
                    { key: "photo_evidence", label: "Photo / Image Forensics", desc: "Payments without milestone photo status" },
                    { key: "delay", label: "Sanction Turnaround Tracking", desc: "75-day administrative approval limit" },
                  ].map((item) => {
                    const isEnabled = engineConfig.detectors[item.key as keyof SystemEngineConfig["detectors"]];
                    return (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-slate-50/40"
                      >
                        <div>
                          <span className="font-bold text-slate-800 block">{item.label}</span>
                          <span className="text-[10px] text-slate-500">{item.desc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleDetector(item.key as any)}
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                            isEnabled ? "bg-[#123B6D]" : "bg-slate-300"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                              isEnabled ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ingestion Pipeline & Batch Run */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Batch Ingestion &amp; Re-Scoring Pipeline
                  </h2>
                  <p className="text-xs text-slate-500">
                    Simulate periodic ingestion synchronization from official open data repositories
                  </p>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Last Ingestion: <strong>{engineConfig.last_pipeline_run}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">18th LS Works Catalog</span>
                  <span className="font-mono text-xl font-bold text-slate-900 mt-1 block">175,298 rows</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Dataset #22567 Verified</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Vendor Payment Ledger</span>
                  <span className="font-mono text-xl font-bold text-slate-900 mt-1 block">143,257 rows</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Dataset #22565 Verified</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Local Prototype Store</span>
                  <span className="font-mono text-xl font-bold text-[#123B6D] mt-1 block">{works.length} Active Records</span>
                  <span className="text-[10px] text-blue-700 font-medium">In-Memory / Storage Synced</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleRunPipeline}
                  disabled={pipelineRunning}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B6D] text-white font-semibold text-xs hover:bg-[#0B2340] transition-colors shadow-xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${pipelineRunning ? "animate-spin" : ""}`} />
                  <span>{pipelineRunning ? "Processing Batch Ingestion..." : "Trigger Full Ingestion & Re-Scoring"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Inject Test Work Record */}
        {activeTab === "add_work" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 max-w-2xl">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Inject Custom Work Record
              </h2>
              <p className="text-xs text-slate-500">
                Add an experimental work into the database to test detector behavior in real time
              </p>
            </div>

            <form onSubmit={handleCreateTestWork} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  Work Title
                </label>
                <input
                  type="text"
                  value={newWorkName}
                  onChange={(e) => setNewWorkName(e.target.value)}
                  placeholder="e.g. Construction of Community Rainwater Catchment Unit"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
                  >
                    <option value="Drinking Water Facilities">Drinking Water Facilities</option>
                    <option value="Roads, Pathways and Bridges">Roads, Pathways and Bridges</option>
                    <option value="Sanitation and Drainage">Sanitation and Drainage</option>
                    <option value="Education and Schools">Education and Schools</option>
                    <option value="Trust and Society">Trust and Society</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                    District
                  </label>
                  <select
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
                  >
                    <option value="Indore">Indore (LGD: 402)</option>
                    <option value="South Andamans">South Andamans (LGD: 602)</option>
                    <option value="South Delhi">South Delhi (LGD: 142)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                    Sanction (₹)
                  </label>
                  <input
                    type="number"
                    value={newSanctionAmount}
                    onChange={(e) => setNewSanctionAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                    Disbursed (₹)
                  </label>
                  <input
                    type="number"
                    value={newPaidAmount}
                    onChange={(e) => setNewPaidAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                    Physical Progress (%)
                  </label>
                  <input
                    type="number"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    min={0}
                    max={100}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  Milestone Photo Evidence Status
                </label>
                <select
                  value={newImageStatus}
                  onChange={(e) => setNewImageStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
                >
                  <option value="Not Available">Not Available (Flag Triggers if paid)</option>
                  <option value="Available">Available (Geo-tagged Photo Uploaded)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B6D] text-white font-semibold text-xs hover:bg-[#0B2340] transition-colors shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Inject &amp; Run Risk Detectors</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 4: System Audit & Log Export */}
        {activeTab === "logs" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  System Audit Logs &amp; Determinations ({auditLog.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Complete event log of detector triggers and officer review determinations
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportAuditCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs self-start"
              >
                <FileDown className="w-4 h-4 text-[#123B6D]" />
                <span>Export Audit CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Work ID</th>
                    <th className="py-2.5 px-3">Actor &amp; Role</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3">State Transition</th>
                    <th className="py-2.5 px-3">Rationale / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {auditLog.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                      <td className="py-2 px-3 font-bold text-[#123B6D]">{log.work_id}</td>
                      <td className="py-2 px-3 font-sans text-slate-700">
                        {log.actor_name} <span className="text-slate-400">({log.actor_role})</span>
                      </td>
                      <td className="py-2 px-3 font-sans font-semibold text-slate-900">{log.action}</td>
                      <td className="py-2 px-3 text-slate-600">
                        {log.previous_state} → <strong className="text-slate-900">{log.new_state}</strong>
                      </td>
                      <td className="py-2 px-3 font-sans text-slate-600 max-w-xs truncate">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
