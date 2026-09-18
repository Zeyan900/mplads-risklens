"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { getStoredAuditLog } from "@/lib/storage";
import { AuditLogEntry } from "@/types/mplad";
import { History, ShieldCheck, Clock, User, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function AuditTrailPage() {
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    setAuditLog(getStoredAuditLog());

    const handleUpdate = () => {
      setAuditLog(getStoredAuditLog());
    };

    window.addEventListener("nigrani_data_update", handleUpdate);
    return () => window.removeEventListener("nigrani_data_update", handleUpdate);
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Governance &amp; Accountability
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">Immutable Decision Ledger</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Audit Trail &amp; Decision Lineage
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Every automated signal generation, officer evidence inspection, and administrative determination is logged chronologically with verifiable actor provenance.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
          <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8">
            {auditLog.map((entry, index) => {
              const isOfficer = !entry.actor_role.toLowerCase().includes("system");

              return (
                <div key={entry.id} className="relative group">
                  {/* Circle Indicator on the Line */}
                  <div
                    className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                      isOfficer
                        ? "border-[#123B6D] ring-4 ring-blue-50"
                        : "border-slate-400 ring-2 ring-slate-100"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isOfficer ? "bg-[#123B6D]" : "bg-slate-400"
                      }`}
                    />
                  </div>

                  {/* Entry Card */}
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 hover:bg-slate-50 hover:border-slate-300 transition-all space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{entry.action}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            isOfficer
                              ? "bg-blue-50 text-[#123B6D] border-blue-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {entry.actor_role}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{entry.timestamp}</span>
                      </div>
                    </div>

                    {/* Work Reference & Actor */}
                    <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {entry.actor_name}
                      </span>
                      <span>•</span>
                      <Link
                        href={`/works/${encodeURIComponent(entry.work_id)}`}
                        className="font-mono font-bold text-[#123B6D] hover:underline"
                      >
                        {entry.work_id}
                      </Link>
                      <span className="text-slate-400 line-clamp-1">({entry.work_name})</span>
                    </div>

                    {/* Transition Badge */}
                    <div className="flex items-center gap-2 text-[11px] bg-white p-2 rounded-lg border border-slate-200/60 max-w-fit">
                      <span className="text-slate-500 font-medium">{entry.previous_state}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="font-bold text-slate-900">{entry.new_state}</span>
                    </div>

                    {/* Details / Notes */}
                    {entry.details && (
                      <p className="text-xs text-slate-700 bg-amber-50/50 p-2.5 rounded-md border border-amber-200/60 leading-relaxed">
                        {entry.details}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
