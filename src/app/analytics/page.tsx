"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { PaymentProgressScatterChart } from "@/components/Charts/PaymentProgressScatterChart";
import { LifecycleFunnelChart } from "@/components/Charts/LifecycleFunnelChart";
import { RiskDistributionChart } from "@/components/Charts/RiskDistributionChart";
import { CategorySpendChart } from "@/components/Charts/CategorySpendChart";
import { getStoredWorks } from "@/lib/storage";
import { RecommendedWork } from "@/types/mplad";
import { BarChart3, ScatterChart, Layers, Info } from "lucide-react";

export default function AnalyticsPage() {
  const [works, setWorks] = useState<RecommendedWork[]>([]);

  useEffect(() => {
    setWorks(getStoredWorks());
  }, []);

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Macro Intelligence
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">Empirical Analytics &amp; Anomaly Clustering</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Portfolio Risk &amp; Expenditure Analytics
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Statistical comparisons, payment-progress correlation divergence, and scheme lifecycle velocity.
          </p>
        </div>

        {/* Scatter Plot Section */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Payment vs Physical Progress Scatter Plot (Disbursement Divergence)
              </h2>
              <p className="text-xs text-slate-500">
                Works plotted by certified physical progress (X-axis) against cumulative disbursed payment (Y-axis).
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D5FA7]" />
                <span>Balanced Milestone</span>
              </span>
              <span className="flex items-center gap-1.5 text-red-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C53030]" />
                <span>&gt;25% Payment Lead Gap</span>
              </span>
            </div>
          </div>

          <PaymentProgressScatterChart />

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-[#123B6D] shrink-0 mt-0.5" />
            <span>
              <strong>Analytical Insight:</strong> Works residing in the upper-left quadrant represent projects where monetary release has significantly outpaced certified engineering milestones (e.g. Community Water Tank <code className="font-mono text-[#123B6D]">MPLAD-2026-DL-0142</code> at 78% payment vs 30% progress).
            </span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Risk Signal Intensity by Channel
            </h3>
            <p className="text-xs text-slate-500 mb-2">
              Pan-India distribution of flags generated across 7 detection channels
            </p>
            <RiskDistributionChart />
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Work Lifecycle Funnel
            </h3>
            <p className="text-xs text-slate-500 mb-2">
              Progression volume across recommendation, sanction, execution and completion
            </p>
            <LifecycleFunnelChart />
          </div>
        </div>

        {/* Category Spend */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Category Sanctions vs Actual Disbursements
          </h3>
          <p className="text-xs text-slate-500 mb-2">
            Utilization comparison across core development infrastructure categories
          </p>
          <CategorySpendChart />
        </div>
      </div>
    </AppShell>
  );
}
