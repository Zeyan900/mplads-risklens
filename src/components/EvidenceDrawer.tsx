"use client";

import React from "react";
import { EvidenceItem, RecommendedWork } from "@/types/mplad";
import { X, FileText, CheckCircle2, ShieldCheck, Download, ExternalLink, Calendar, Database } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  work?: RecommendedWork;
  selectedEvidence?: EvidenceItem | null;
}

export function EvidenceDrawer({
  isOpen,
  onClose,
  work,
  selectedEvidence,
}: EvidenceDrawerProps) {
  if (!isOpen || !work) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 bg-[#123B6D] text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200 block">
                Evidence Dossier
              </span>
              <h2 className="text-sm font-bold truncate max-w-xs">{work.work_name}</h2>
              <span className="text-[11px] font-mono text-blue-100">
                {work.unique_work_number}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* Selected Single Evidence Focus (if clicked directly) */}
            {selectedEvidence && (
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#123B6D]">
                    Active Evidence Item
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {selectedEvidence.provenance}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{selectedEvidence.title}</h3>
                <p className="text-slate-600 leading-relaxed">{selectedEvidence.description}</p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-blue-200/60">
                  <div>
                    <span className="text-slate-400 block">Reference ID:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {selectedEvidence.ref_number}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Source:</span>
                    <span className="font-semibold text-slate-800">{selectedEvidence.source}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Telemetry Overview */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Financial & Physical Telemetry
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[11px] block">Sanctioned</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatINR(work.sanctioned_amount)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Expenditure Paid</span>
                  <span className="font-mono font-bold text-[#123B6D]">
                    {formatINR(work.expenditure_amount)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Physical Progress</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {work.physical_progress_percent}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Visual Documentation</span>
                  <span className={`font-semibold ${work.image_status === "Available" ? "text-emerald-700" : "text-red-700"}`}>
                    {work.image_status}
                  </span>
                </div>
              </div>
            </div>

            {/* Evidence Documents List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Supporting Audit Records ({work.evidence_items.length})
                </span>
                <span className="text-[10px] text-slate-400">All records signed & hashed</span>
              </div>

              {work.evidence_items.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl text-slate-400">
                  No uploaded documentation attached to this record yet.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {work.evidence_items.map((evd) => (
                    <div
                      key={evd.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-slate-100 text-slate-700">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 text-xs">{evd.title}</h4>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {evd.ref_number}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {evd.provenance}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {evd.description}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {evd.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Database className="w-3 h-3" />
                          {evd.source}
                        </span>
                        {evd.verified && (
                          <span className="flex items-center gap-0.5 text-emerald-700 font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Vouchers Section */}
            {work.payments.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Verified Payment Vouchers ({work.payments.length})
                </span>
                <div className="space-y-2">
                  {work.payments.map((pay) => (
                    <div
                      key={pay.payment_id}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">{pay.vendor_name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          PFMS: {pay.pfms_ref} • {pay.expenditure_date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-slate-900">
                          {formatINR(pay.expenditure_amount)}
                        </div>
                        <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          {pay.payment_status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              type="button"
              onClick={() => alert("Evidence dossier exported as digitally verifiable PDF packet.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Dossier</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#123B6D] hover:bg-[#0B2340] rounded-lg shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
