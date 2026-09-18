"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { WorkTable } from "@/components/WorkTable";
import { EvidenceDrawer } from "@/components/EvidenceDrawer";
import { getStoredWorks } from "@/lib/storage";
import { RecommendedWork } from "@/types/mplad";
import { Briefcase, Layers } from "lucide-react";

export default function WorksRegistryPage() {
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

  const handleOpenEvidence = (work: RecommendedWork) => {
    setActiveEvidenceWork(work);
    setIsEvidenceDrawerOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Master Work Repository
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">18th Lok Sabha Work Sanctions</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            All Works Registry
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Full inventory of sanctioned and recommended works across all constituencies and implementing agencies.
          </p>
        </div>

        <WorkTable
          works={works}
          onOpenEvidence={handleOpenEvidence}
          title="All Indexed Works (100+ Works)"
          subTitle="Standardized against LGD district codes with live expenditure and milestone tracking"
        />
      </div>

      <EvidenceDrawer
        isOpen={isEvidenceDrawerOpen}
        onClose={() => setIsEvidenceDrawerOpen(false)}
        work={activeEvidenceWork || undefined}
      />
    </AppShell>
  );
}
