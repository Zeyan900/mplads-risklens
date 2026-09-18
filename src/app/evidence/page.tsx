"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { EvidenceDrawer } from "@/components/EvidenceDrawer";
import { getStoredWorks } from "@/lib/storage";
import { RecommendedWork, EvidenceItem } from "@/types/mplad";
import { FileCheck2, Search, FileText, CheckCircle2, ShieldAlert, Download, ExternalLink } from "lucide-react";

export default function EvidenceCentrePage() {
  const [works, setWorks] = useState<RecommendedWork[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeWork, setActiveWork] = useState<RecommendedWork | null>(null);
  const [activeEvidence, setActiveEvidence] = useState<EvidenceItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setWorks(getStoredWorks());
  }, []);

  // Flatten all evidence items with work context
  const allEvidence: { work: RecommendedWork; item: EvidenceItem }[] = [];
  works.forEach((w) => {
    w.evidence_items.forEach((item) => {
      allEvidence.push({ work: w, item });
    });
  });

  const filteredEvidence = allEvidence.filter(({ work, item }) => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchRef = item.ref_number.toLowerCase().includes(q);
      const matchWork = work.work_name.toLowerCase().includes(q);
      const matchId = work.unique_work_number.toLowerCase().includes(q);
      if (!matchTitle && !matchRef && !matchWork && !matchId) return false;
    }
    if (selectedType !== "All" && item.type !== selectedType) return false;
    return true;
  });

  const handleInspect = (work: RecommendedWork, item: EvidenceItem) => {
    setActiveWork(work);
    setActiveEvidence(item);
    setIsDrawerOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Auditable Record Store
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">Authentic Multi-Source Repository</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Evidence Centre
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Centralized index of administrative sanctions, PFMS disbursement records, and site inspection certificates.
            </p>
          </div>

          <div className="text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            Total Indexed Documents: <strong>{allEvidence.length}</strong>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-xs">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, voucher ref, work ID..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#123B6D]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Document Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="sanction_order">Sanction Orders</option>
              <option value="payment_voucher">Payment Vouchers</option>
              <option value="measurement_book">Measurement Books</option>
              <option value="site_photo">Site Photos</option>
              <option value="guideline_rule">Guideline Citations</option>
            </select>
          </div>
        </div>

        {/* Evidence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvidence.map(({ work, item }) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {item.provenance}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{item.date}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px]">
                <div className="flex justify-between text-slate-500">
                  <span>Ref: <strong className="font-mono text-slate-700">{item.ref_number}</strong></span>
                  <span>{item.source}</span>
                </div>
                <div className="text-slate-500 truncate">
                  Work: <span className="font-medium text-slate-800">{work.work_name}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {item.verified ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      Cryptographically Verified
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-700 font-semibold">Under Audit Verification</span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleInspect(work, item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#123B6D] hover:underline"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        work={activeWork || undefined}
        selectedEvidence={activeEvidence}
      />
    </AppShell>
  );
}
