"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { RiskBadge, StatusBadge } from "@/components/RiskBadge";
import { EvidenceDrawer } from "@/components/EvidenceDrawer";
import { OfficerDecisionModal } from "@/components/OfficerDecisionModal";
import { getStoredWorks, getStoredRole } from "@/lib/storage";
import { RecommendedWork, UserRole } from "@/types/mplad";
import { formatINR, formatINRFull, formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Coins,
  Camera,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  FileSearch,
} from "lucide-react";

interface PageProps {
  params: Promise<{ workId: string }>;
}

export default function WorkIntelligencePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const workId = decodeURIComponent(resolvedParams.workId);

  const [work, setWork] = useState<RecommendedWork | null>(null);
  const [role, setRole] = useState<UserRole>("district_authority");
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const allWorks = getStoredWorks();
    const found = allWorks.find(
      (w) =>
        w.unique_work_number.toLowerCase() === workId.toLowerCase() ||
        encodeURIComponent(w.unique_work_number) === encodeURIComponent(workId)
    );
    if (found) {
      setWork(found);
    }
    setRole(getStoredRole());

    const handleUpdate = () => {
      const refreshedWorks = getStoredWorks();
      const refound = refreshedWorks.find(
        (w) =>
          w.unique_work_number.toLowerCase() === workId.toLowerCase() ||
          encodeURIComponent(w.unique_work_number) === encodeURIComponent(workId)
      );
      if (refound) setWork(refound);
      setRole(getStoredRole());
    };

    window.addEventListener("nigrani_data_update", handleUpdate);
    window.addEventListener("nigrani_role_change", handleUpdate);
    return () => {
      window.removeEventListener("nigrani_data_update", handleUpdate);
      window.removeEventListener("nigrani_role_change", handleUpdate);
    };
  }, [workId]);

  if (!work) {
    return (
      <AppShell>
        <div className="py-16 text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Work Record Not Found</h2>
          <p className="text-xs text-slate-500">
            No work found for identifier: <code className="font-mono">{workId}</code>
          </p>
          <Link
            href="/review-queue"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#123B6D] text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Review Queue</span>
          </Link>
        </div>
      </AppShell>
    );
  }

  const paymentRatio = work.sanctioned_amount > 0 
    ? Math.round((work.expenditure_amount / work.sanctioned_amount) * 100) 
    : 0;
  const progressRatio = work.physical_progress_percent || 0;
  const progressGap = paymentRatio - progressRatio;
  const topSignal = work.risk_signals[0];

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/review-queue"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#123B6D] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Review Queue</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">Work Dossier:</span>
            <span className="font-mono text-xs font-bold text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {work.unique_work_number}
            </span>
          </div>
        </div>

        {/* Master Work Header Card */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <RiskBadge priority={work.risk_priority} score={work.risk_score} size="md" />
                <StatusBadge status={work.review_status} />
                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                  {work.work_category}
                </span>
                {work.is_synthetic && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                    Synthetic Demo Control
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {work.work_name}
              </h1>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {work.work_description}
              </p>
            </div>

            {/* Quick Action Button */}
            <button
              type="button"
              onClick={() => setIsDecisionModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#123B6D] text-white text-xs font-semibold hover:bg-[#0B2340] transition-colors shadow-xs shrink-0 self-start"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Record Officer Determination</span>
            </button>
          </div>

          {/* Institutional Identifiers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 block">Recommended By MP</span>
              <span className="font-semibold text-slate-800">{work.loksabha_MP_name}</span>
              <span className="text-[10px] text-slate-500 block">{work.house_name}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Implementing Agency</span>
              <span className="font-semibold text-slate-800 truncate block">
                {work.implementing_agency_name}
              </span>
              <span className="text-[10px] text-slate-500 block">Zone Executive Div</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">District &amp; LGD Code</span>
              <span className="font-semibold text-slate-800">{work.implementing_district_per_lgd}</span>
              <span className="text-[10px] font-mono text-slate-500 block">
                LGD Code: {work.implementing_district_lgd_code}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Recommendation Date</span>
              <span className="font-semibold text-slate-800">{formatDate(work.date_of_recommendation)}</span>
              <span className="text-[10px] text-slate-500 block">
                Sanctioned: {work.date_of_sanction ? formatDate(work.date_of_sanction) : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Top Financial & Physical Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Sanctioned Cost
            </span>
            <div className="mt-1 text-xl font-bold font-mono text-slate-900">
              {formatINR(work.sanctioned_amount)}
            </div>
            <span className="text-[10px] text-slate-500">
              Rec: {formatINR(work.recommended_amount)}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Expenditure Paid
            </span>
            <div className="mt-1 text-xl font-bold font-mono text-[#123B6D]">
              {formatINR(work.expenditure_amount)}
            </div>
            <span className="text-[10px] font-semibold text-slate-700">
              {paymentRatio}% of sanction
            </span>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Physical Progress
            </span>
            <div className="mt-1 text-xl font-bold font-mono text-emerald-700">
              {progressRatio}%
            </div>
            <span className="text-[10px] text-slate-500">
              MB certified stage
            </span>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Disbursement Lead Gap
            </span>
            <div
              className={`mt-1 text-xl font-bold font-mono ${
                progressGap > 25 ? "text-red-700" : "text-emerald-700"
              }`}
            >
              {progressGap > 0 ? `+${progressGap} pts` : "Balanced"}
            </div>
            <span className="text-[10px] text-slate-500">
              Payment vs physical progress
            </span>
          </div>
        </div>

        {/* Explainable Risk Attribution Card */}
        <div className="rounded-2xl border-2 border-slate-200/90 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">
                Explainable Risk Engine Output
              </span>
              <h2 className="text-base font-bold text-slate-900">
                {topSignal ? topSignal.title : "Risk Signal Evaluation"}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Composite Risk Score</span>
              <div className="text-2xl font-black font-mono text-red-700">
                {work.risk_score}<span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
            </div>
          </div>

          {/* Dual Progress Bars Visualizer */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Disbursed Payment Ratio</span>
                  <span className="font-mono font-bold text-slate-900">{paymentRatio}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#123B6D] h-2.5 rounded-full" style={{ width: `${Math.min(100, paymentRatio)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Certified Physical Progress</span>
                  <span className="font-mono font-bold text-slate-900">{progressRatio}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full ${progressGap > 25 ? "bg-amber-500" : "bg-emerald-600"}`}
                    style={{ width: `${Math.min(100, progressRatio)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/60">
              <span>
                {progressGap > 0 ? (
                  <strong className="text-red-700">
                    Payment is materially ahead of physical progress by {progressGap} percentage points.
                  </strong>
                ) : (
                  <strong className="text-emerald-700">Disbursement is aligned with physical progress.</strong>
                )}
              </span>
              {work.last_progress_update_days_ago !== undefined && (
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  Last physical update recorded {work.last_progress_update_days_ago} days ago
                </span>
              )}
            </div>
          </div>

          {/* Plain-Language Why Flagged */}
          {topSignal && (
            <div className="rounded-xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-1.5">
              <span className="font-bold text-[11px] uppercase tracking-wider text-amber-900 block">
                Plain-Language Determination Rationale
              </span>
              <p className="leading-relaxed text-slate-800">{topSignal.why_flagged}</p>
              <div className="pt-2 border-t border-amber-200/60 text-[11px] text-amber-900">
                <strong>Statutory Benchmark:</strong> {topSignal.benchmark_rule}
              </div>
            </div>
          )}

          {/* Contributing Score Signals Breakdown */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Contributing Risk Channels Breakdown (Score Attribution)
            </span>
            <div className="space-y-2">
              {work.risk_signals.map((sig) => (
                <div
                  key={sig.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        sig.severity === "high"
                          ? "bg-red-500"
                          : sig.severity === "medium"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <span className="font-bold text-slate-800">{sig.title}</span>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{sig.evidence_summary}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 shrink-0">
                    +{sig.score_contribution} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channel Evidence & Payment Records */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Linked Payment Records */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Vendor Expenditure Vouchers ({work.payments.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Directly traced from 18th Lok Sabha payment ledger
                </p>
              </div>
              <Coins className="w-4 h-4 text-slate-400" />
            </div>

            {work.payments.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No payment vouchers cleared for this work yet.
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {work.payments.map((pay) => (
                  <div
                    key={pay.payment_id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{pay.vendor_name}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        PFMS: {pay.pfms_ref} • {formatDate(pay.expenditure_date)}
                      </div>
                      <span className="text-[10px] text-slate-400">Inv: {pay.invoice_ref}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-900 text-sm">
                        {formatINR(pay.expenditure_amount)}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {pay.payment_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Evidence Dossier */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Supporting Audit Evidence ({work.evidence_items.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Uploaded documentation, orders &amp; inspection records
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEvidenceOpen(true)}
                className="text-xs font-semibold text-[#123B6D] hover:underline"
              >
                Inspect All
              </button>
            </div>

            {work.evidence_items.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No uploaded audit documents attached yet.
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {work.evidence_items.map((evd) => (
                  <div
                    key={evd.id}
                    onClick={() => setIsEvidenceOpen(true)}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#123B6D] shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">{evd.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {evd.ref_number} • {evd.source}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                      {evd.provenance}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-100/60 border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-600">Visual Evidence Status:</span>
              <span
                className={`font-bold uppercase text-[11px] ${
                  work.image_status === "Available" ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {work.image_status === "Available" ? "Uploaded (Geo-tagged)" : "Not Available in eSAKSHI"}
              </span>
            </div>
          </div>
        </div>

        {/* Suggested Next Action & Decision Bar */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#123B6D]">
                Recommended Procedural Next Step
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                {topSignal ? topSignal.suggested_action : "Request routine milestone inspection."}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                The platform recommends this action based on statutory guidelines. The human officer maintains final authority.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDecisionModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B6D] text-white text-xs font-semibold hover:bg-[#0B2340] transition-colors shadow-xs shrink-0"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Record Officer Determination</span>
            </button>
          </div>

          {work.officer_notes && (
            <div className="p-3 rounded-xl bg-white border border-blue-200 text-xs text-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Last Officer Determination ({work.review_date} by {work.reviewed_by})
              </span>
              <p className="italic text-slate-700">&ldquo;{work.officer_notes}&rdquo;</p>
            </div>
          )}
        </div>
      </div>

      {/* Slide-over Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        work={work}
      />

      {/* Officer Decision Modal */}
      <OfficerDecisionModal
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
        work={work}
        onDecisionSaved={(updated) => setWork(updated)}
      />
    </AppShell>
  );
}
