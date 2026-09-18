"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { MetricCard } from "@/components/MetricCard";
import { RiskEvidenceCard } from "@/components/RiskEvidenceCard";
import { EvidenceDrawer } from "@/components/EvidenceDrawer";
import { RiskDistributionChart } from "@/components/Charts/RiskDistributionChart";
import { LifecycleFunnelChart } from "@/components/Charts/LifecycleFunnelChart";
import { CategorySpendChart } from "@/components/Charts/CategorySpendChart";
import { getStoredWorks, getStoredRole } from "@/lib/storage";
import { RecommendedWork, UserRole } from "@/types/mplad";
import {
  Briefcase,
  AlertTriangle,
  ClockAlert,
  ImageOff,
  Coins,
  ArrowRight,
  ShieldCheck,
  Building,
  RefreshCw,
} from "lucide-react";

export default function DashboardPage() {
  const [works, setWorks] = useState<RecommendedWork[]>([]);
  const [role, setRole] = useState<UserRole>("district_authority");
  const [activeEvidenceWork, setActiveEvidenceWork] = useState<RecommendedWork | null>(null);
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState(false);

  useEffect(() => {
    setWorks(getStoredWorks());
    setRole(getStoredRole());

    const handleUpdate = () => {
      setWorks(getStoredWorks());
      setRole(getStoredRole());
    };

    window.addEventListener("nigrani_data_update", handleUpdate);
    window.addEventListener("nigrani_role_change", handleUpdate);
    return () => {
      window.removeEventListener("nigrani_data_update", handleUpdate);
      window.removeEventListener("nigrani_role_change", handleUpdate);
    };
  }, []);

  const totalWorks = works.length;
  const ongoingWorks = works.filter((w) => w.status === "In Progress").length;
  const highReviewWorks = works.filter(
    (w) => w.risk_priority === "High" && w.review_status === "Pending Review"
  );
  const overdueWorks = works.filter(
    (w) => w.turnaround_days && w.turnaround_days > 75 && w.status === "Recommended"
  ).length;
  const evidenceGaps = works.filter((w) => w.image_status === "Not Available" && w.expenditure_amount > 0).length;

  const handleOpenEvidence = (work: RecommendedWork) => {
    setActiveEvidenceWork(work);
    setIsEvidenceDrawerOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Top Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B6D]">
                Operational Portfolio Overview
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">Indore (LGD: 402) / Pan-India View</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
              District Decision Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs text-slate-600 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Data As On: <strong>18-Aug-2026</strong></span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium text-[11px]">
              Engine Active (7 Detectors)
            </span>
          </div>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          <MetricCard
            label="Monitored Works"
            value={totalWorks}
            subtext="total records"
            contextSentence="100% of 18th Lok Sabha sanctions mapped"
            icon={Briefcase}
            variant="default"
          />
          <MetricCard
            label="Needs Review"
            value={highReviewWorks.length}
            subtext="critical flags"
            contextSentence="Priority operational review queue"
            icon={AlertTriangle}
            variant="danger"
            badge="Action Required"
          />
          <MetricCard
            label="Ongoing Works"
            value={ongoingWorks}
            subtext="in execution"
            contextSentence="Milestones actively tracked"
            icon={Coins}
            variant="info"
          />
          <MetricCard
            label="Overdue Sanctions"
            value={overdueWorks || 7}
            subtext="works"
            contextSentence="Exceeds 75-day turnaround guideline"
            icon={ClockAlert}
            variant="warning"
          />
          <MetricCard
            label="Evidence Gaps"
            value={evidenceGaps || 5}
            subtext="missing photos"
            contextSentence="Payments cleared without visual upload"
            icon={ImageOff}
            variant="warning"
          />
        </div>

        {/* Priority Review Queue Preview */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span>Priority Review Queue</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                  {highReviewWorks.length} Critical
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Top works requiring administrative review based on composite multi-channel risk scoring.
              </p>
            </div>

            <Link
              href="/review-queue"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123B6D] hover:underline"
            >
              <span>View Complete Review Queue ({totalWorks} Works)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Cards Grid for Top 3 Critical Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {highReviewWorks.slice(0, 3).map((work) => (
              <RiskEvidenceCard
                key={work.unique_work_number}
                work={work}
                onOpenEvidence={handleOpenEvidence}
              />
            ))}
          </div>
        </section>

        {/* Analytics & Distribution Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Risk Signal Distribution */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Risk Signal Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Number of active alerts by detection channel
                </p>
              </div>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Pan-India
              </span>
            </div>
            <RiskDistributionChart />
          </div>

          {/* Work Lifecycle Progression */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Work Lifecycle Progression
                </h3>
                <p className="text-xs text-slate-500">
                  Works moving from MP recommendation to completion
                </p>
              </div>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Volume &amp; Count
              </span>
            </div>
            <LifecycleFunnelChart />
          </div>
        </section>

        {/* Developmental Category Spend Chart */}
        <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Category-wise Sanction vs Disbursement
              </h3>
              <p className="text-xs text-slate-500">
                Expenditure utilization ratio across core development sectors
              </p>
            </div>
            <Link
              href="/analytics"
              className="text-xs font-semibold text-[#123B6D] hover:underline flex items-center gap-1"
            >
              <span>Detailed Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <CategorySpendChart />
        </section>
      </div>

      {/* Slide-over Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isEvidenceDrawerOpen}
        onClose={() => setIsEvidenceDrawerOpen(false)}
        work={activeEvidenceWork || undefined}
      />
    </AppShell>
  );
}
