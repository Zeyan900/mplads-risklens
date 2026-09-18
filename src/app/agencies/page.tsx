"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { getStoredAgencies } from "@/lib/storage";
import { AgencyProfile } from "@/types/mplad";
import { formatINR } from "@/lib/utils";
import { Building2, AlertTriangle, CheckCircle2, TrendingUp, Users, ExternalLink } from "lucide-react";

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<AgencyProfile[]>([]);

  useEffect(() => {
    setAgencies(getStoredAgencies());
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Agency Operations
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">Delivery Profiles &amp; Procurement Distribution</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Implementing Agency Profiles
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Operational delivery patterns and vendor repeat concentrations evaluated against portfolio size.
          </p>
        </div>

        {/* Agency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agencies.map((agency) => (
            <div
              key={agency.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#123B6D]/10 text-[#123B6D]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {agency.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {agency.district} • LGD: {agency.lgd_code}
                    </p>
                  </div>
                </div>

                {agency.delivery_pattern_flag ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                    Pattern Review
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    Normal Baseline
                  </span>
                )}
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">Total Works</span>
                  <span className="font-mono font-bold text-slate-900 text-base">{agency.total_works}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Completed</span>
                  <span className="font-mono font-bold text-emerald-700 text-base">{agency.completed_works}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Overdue</span>
                  <span className="font-mono font-bold text-amber-700 text-base">{agency.overdue_works}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Alerts</span>
                  <span className="font-mono font-bold text-red-700 text-base">{agency.unresolved_reviews}</span>
                </div>
              </div>

              {/* Pattern Summary */}
              {agency.delivery_pattern_summary && (
                <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200 text-xs text-amber-950">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-amber-900 block mb-0.5">
                    Operational Pattern Evaluation:
                  </span>
                  <p className="text-slate-700 leading-relaxed">{agency.delivery_pattern_summary}</p>
                </div>
              )}

              {/* Key Vendors List */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Top Associated Contractors / Vendors
                </span>
                <div className="space-y-1 text-xs">
                  {agency.key_vendors.map((v) => (
                    <div
                      key={v.vendor_name}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 text-slate-700"
                    >
                      <span className="font-medium">{v.vendor_name}</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {v.count} awards ({formatINR(v.total_amount)})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Totals */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>Sanctioned: <strong>{formatINR(agency.total_sanctioned)}</strong></span>
                <span>Expended: <strong>{formatINR(agency.total_expended)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
