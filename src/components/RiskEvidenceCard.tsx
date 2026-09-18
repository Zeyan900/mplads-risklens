import React from "react";
import Link from "next/link";
import { RecommendedWork } from "@/types/mplad";
import { RiskBadge } from "./RiskBadge";
import { formatINR } from "@/lib/utils";
import { ArrowRight, Clock, FileText, CheckCircle, MapPin, Building2 } from "lucide-react";

interface RiskEvidenceCardProps {
  work: RecommendedWork;
  onOpenEvidence?: (work: RecommendedWork) => void;
  onQuickReview?: (work: RecommendedWork) => void;
}

export function RiskEvidenceCard({ work, onOpenEvidence, onQuickReview }: RiskEvidenceCardProps) {
  const topSignal = work.risk_signals[0];
  const paymentRatio = work.sanctioned_amount > 0 
    ? Math.round((work.expenditure_amount / work.sanctioned_amount) * 100) 
    : 0;
  const progressRatio = work.physical_progress_percent || 0;
  const progressGap = paymentRatio - progressRatio;

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-slate-300">
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {topSignal ? topSignal.title : "Risk Signal For Review"}
          </span>
        </div>
        <RiskBadge priority={work.risk_priority} score={work.risk_score} size="sm" />
      </div>

      {/* Work Title & Identifiers */}
      <div className="mt-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="font-semibold text-[#123B6D]">{work.unique_work_number}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            {work.implementing_district_per_lgd} (LGD: {work.implementing_district_lgd_code})
          </span>
        </div>
        <h3 className="mt-1 text-base font-semibold text-slate-900 leading-snug">
          {work.work_name}
        </h3>
        <p className="mt-0.5 text-xs text-slate-600 flex items-center gap-1.5">
          <Building2 className="w-3 h-3 text-slate-400" />
          {work.implementing_agency_name}
        </p>
      </div>

      {/* Dual Progress Meter (Payment vs Physical Progress) */}
      <div className="mt-4 rounded-lg bg-slate-50 border border-slate-100 p-3.5">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex justify-between font-medium text-slate-700 mb-1">
              <span>Disbursed Payment</span>
              <span className="font-mono font-bold text-slate-900">{paymentRatio}% ({formatINR(work.expenditure_amount)})</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#123B6D] h-2 rounded-full transition-all"
                style={{ width: `${Math.min(100, paymentRatio)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between font-medium text-slate-700 mb-1">
              <span>Certified Physical Progress</span>
              <span className="font-mono font-bold text-slate-900">{progressRatio}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all ${
                  progressGap > 25 ? "bg-amber-500" : "bg-emerald-600"
                }`}
                style={{ width: `${Math.min(100, progressRatio)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
          <span>
            {progressGap > 0 ? (
              <span className="text-red-700 font-semibold">
                Difference: {progressGap} percentage points gap
              </span>
            ) : (
              <span className="text-emerald-700 font-medium">Disbursement aligned with progress</span>
            )}
          </span>
          {work.last_progress_update_days_ago !== undefined && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Last progress record: {work.last_progress_update_days_ago} days ago
            </span>
          )}
        </div>
      </div>

      {/* Why Flagged Section */}
      {topSignal && (
        <div className="mt-3.5 text-xs text-slate-700">
          <span className="font-semibold text-slate-900 uppercase text-[10px] tracking-wider block mb-0.5">
            Why Flagged:
          </span>
          <p className="text-slate-600 leading-relaxed bg-amber-50/40 p-2.5 rounded-md border border-amber-100/80">
            {topSignal.why_flagged}
          </p>
        </div>
      )}

      {/* Evidence Summary & Suggested Check */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/70 p-3 rounded-lg border border-slate-100">
        <div>
          <span className="font-semibold text-slate-800 text-[11px] block mb-0.5 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            Evidence Items ({work.evidence_items.length} records)
          </span>
          <p className="text-slate-600 text-[11px] line-clamp-2">
            {topSignal ? topSignal.evidence_summary : "Sanction & Payment audit trail available"}
          </p>
        </div>
        <div>
          <span className="font-semibold text-slate-800 text-[11px] block mb-0.5 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
            Suggested Next Check
          </span>
          <p className="text-slate-600 text-[11px] line-clamp-2">
            {topSignal ? topSignal.suggested_action : "Verify latest milestone certificate"}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onOpenEvidence && onOpenEvidence(work)}
          className="text-xs font-medium text-slate-600 hover:text-[#123B6D] transition-colors flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-slate-100"
        >
          <FileText className="w-3.5 h-3.5" />
          Inspect Evidence
        </button>

        <Link
          href={`/works/${encodeURIComponent(work.unique_work_number)}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#123B6D] text-white hover:bg-[#0B2340] px-3.5 py-2 rounded-lg transition-colors shadow-xs"
        >
          <span>Open Work Detail</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
