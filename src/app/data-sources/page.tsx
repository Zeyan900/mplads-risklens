"use client";

import React from "react";
import { AppShell } from "@/components/AppShell";
import { DATA_PROVENANCE_INFO } from "@/lib/constants";
import { Database, ShieldAlert, FileText, CheckCircle2, ExternalLink, Scale } from "lucide-react";

export default function DataSourcesPage() {
  const sources = [
    {
      title: "18th Lok Sabha MPLADS: Recommended Works",
      catalogId: "Dataful / MoSPI #22567",
      records: "175,298 rows · 18 columns",
      coverage: "2024–2026 Work-Level Sanctions",
      provenance: "Public Source",
      description: "Official published open dataset containing state, Lok Sabha constituency, MP name, unique work code, description, and image availability status.",
    },
    {
      title: "18th Lok Sabha MPLADS: Vendor-Level Expenditure",
      catalogId: "Dataful / MoSPI #22565",
      records: "143,257 rows · 15 columns",
      coverage: "2024–2026 Vendor Disbursements",
      provenance: "Public Source",
      description: "Entity-level expenditure records with vendor names, PFMS payment success status, voucher dates, and implementing agency references.",
    },
    {
      title: "Official MPLADS Scheme Guidelines (April 2023)",
      catalogId: "MoSPI Policy Notification",
      records: "Statutory Directive",
      coverage: "Codified Thresholds & Regulations",
      provenance: "Public Source",
      description: "Codified business rules including ₹5 Cr entitlement, ₹75L Trust limit, 75-day turnaround, and 15% SC / 7.5% ST mandates.",
    },
    {
      title: "Local Government Directory (LGD) Standards",
      catalogId: "Ministry of Panchayati Raj",
      records: "700+ District Codes",
      coverage: "National Spatial Reference",
      provenance: "Public Source",
      description: "Canonical machine-readable identifiers (e.g. South Andamans: 602, Indore: 402) used for multi-dataset entity resolution.",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Data Lineage &amp; Provenance
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">Full Scientific Traceability</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Data Sources &amp; Governance Transparency
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Every number and risk signal presented on this website traces directly to official public catalogs or verified synthetic benchmarks.
          </p>
        </div>

        {/* Ethical / Synthetic Transparency Callout */}
        <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#123B6D] text-sm">
            <Scale className="w-5 h-5" />
            <span>Honesty in Demonstration Standards (NFR-7 Compliance)</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Nigrani MPLAD combines <strong>real, present-day open datasets</strong> from MoSPI (such as the actual 18th Lok Sabha Trust-and-Society case row #183102 and Haneefa Construction vendor disbursement rows) with <strong>labeled synthetic control works</strong> to simulate full-scale stress testing. Synthetic records are visibly badged in the UI and are never falsely presented as official determinations of wrongdoing.
          </p>
        </div>

        {/* Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((src) => (
            <div
              key={src.title}
              className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {src.provenance}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{src.catalogId}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{src.title}</h3>
                <span className="text-xs font-mono text-[#123B6D] font-medium block mt-0.5">
                  {src.records}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                {src.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
