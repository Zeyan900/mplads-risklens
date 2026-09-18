"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { WorkTable } from "@/components/WorkTable";
import { EvidenceDrawer } from "@/components/EvidenceDrawer";
import { getStoredWorks } from "@/lib/storage";
import { RecommendedWork } from "@/types/mplad";
import { ShieldAlert, AlertTriangle, Clock, CheckCircle2, FileSearch } from "lucide-react";

export default function ReviewQueuePage() {
  const [works, setWorks] = useState<RecommendedWork[]>([]);
  const [activeEvidenceWork, setActiveEvidenceWork] = useState<RecommendedWork | null>(null);
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState(false);

  useEffect(() => {
    setWorks(getStoredWorks());

    const handleUpdate = () => {
      setWorks(getStoredWorks());
    };

    window.addEventListener("nigrani_data_update", handleUpdate);
    return () => window.removeEventListener("nigrani_data_update", handleUpdate);
  }, []);

  const highCount = works.filter((w) => w.risk_priority === "High").length;
  const medCount = works.filter((w) => w.risk_priority === "Medium").length;
  const pendingCount = works.filter((w) => w.review_status === "Pending Review").length;
  const verifiedCount = works.filter((w) => w.review_status === "Verified").length;

  const handleOpenEvidence = (work: RecommendedWork) => {
    setActiveEvidenceWork(work);
    setIsEvidenceDrawerOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                Operational Review
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">Prioritized Human-in-the-Loop Queue</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Risk Review Queue
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Ranked by composite explainable risk score (0–100). Every flag includes the underlying data evidence and recommended next check.
            </p>
          </div>

          {/* Mini Status Counters */}
          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-800 font-medium">
              <strong>{highCount}</strong> High Priority
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-medium">
              <strong>{medCount}</strong> Medium Attention
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium">
              <strong>{pendingCount}</strong> Pending Decision
            </div>
          </div>
        </div>

        {/* Main Work Table */}
        <WorkTable
          works={works}
          onOpenEvidence={handleOpenEvidence}
          title="Active Review Queue"
          subTitle="Works sorted by risk priority with non-empty, human-readable evidence strings"
          defaultFilterSeverity="All"
        />
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
