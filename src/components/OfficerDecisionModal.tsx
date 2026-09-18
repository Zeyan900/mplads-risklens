"use client";

import React, { useState } from "react";
import { RecommendedWork, ReviewStatus } from "@/types/mplad";
import { recordReviewDecision } from "@/lib/storage";
import { X, CheckCircle2, ShieldAlert, FileText, Send, Clock, AlertCircle } from "lucide-react";

interface OfficerDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  work?: RecommendedWork;
  onDecisionSaved?: (updatedWork: RecommendedWork) => void;
  currentRoleTitle?: string;
}

export function OfficerDecisionModal({
  isOpen,
  onClose,
  work,
  onDecisionSaved,
  currentRoleTitle = "District Authority",
}: OfficerDecisionModalProps) {
  const [selectedAction, setSelectedAction] = useState<
    "verify" | "dismiss" | "request_docs" | "assign_inspection" | "escalate"
  >("assign_inspection");
  const [officerNotes, setOfficerNotes] = useState("");
  const [officerName, setOfficerName] = useState("Rajesh Verma, IAS (Collector & DM)");
  const [dueDate, setDueDate] = useState("2026-10-05");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !work) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerNotes.trim()) {
      setErrorMsg("Administrative notes and rationale are mandatory for compliance auditability.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    let newReviewStatus: ReviewStatus = "Pending Review";
    let actionTitle = "Officer Review Action";

    switch (selectedAction) {
      case "verify":
        newReviewStatus = "Verified";
        actionTitle = "Flag Verified (Action Required)";
        break;
      case "dismiss":
        newReviewStatus = "Dismissed";
        actionTitle = "Flag Dismissed (Valid Explanation Recorded)";
        break;
      case "request_docs":
        newReviewStatus = "Documentation Requested";
        actionTitle = "Official Clarification & Documentation Requested";
        break;
      case "assign_inspection":
        newReviewStatus = "Inspection Assigned";
        actionTitle = "Physical Site Inspection Assigned";
        break;
      case "escalate":
        newReviewStatus = "Escalated";
        actionTitle = "Escalated to State Nodal Authority (SNA)";
        break;
    }

    const res = recordReviewDecision(
      work.unique_work_number,
      newReviewStatus,
      officerNotes,
      currentRoleTitle,
      officerName,
      actionTitle
    );

    setIsSubmitting(false);

    if (res.success && res.updatedWork) {
      if (onDecisionSaved) onDecisionSaved(res.updatedWork);
      onClose();
    } else {
      setErrorMsg("Failed to persist review action. Please try again.");
    }
  };

  const actionOptions = [
    {
      id: "assign_inspection",
      title: "Assign Field Inspection",
      desc: "Dispatch sub-divisional junior engineer for physical measurement & geotagged photo capture.",
      icon: Clock,
      badge: "Recommended",
      color: "border-purple-200 bg-purple-50/30 text-purple-900",
    },
    {
      id: "request_docs",
      title: "Request Documentation",
      desc: "Seek physical Measurement Book (MB), revised milestone timeline, or itemized BoQ from Implementing Agency.",
      icon: FileText,
      badge: "Clarification",
      color: "border-blue-200 bg-blue-50/30 text-blue-900",
    },
    {
      id: "dismiss",
      title: "Valid Explanation (Dismiss)",
      desc: "Confirm documented statutory exemption, revised sanction approval, or false-positive indicator.",
      icon: CheckCircle2,
      badge: "No Action",
      color: "border-slate-200 bg-slate-50 text-slate-800",
    },
    {
      id: "escalate",
      title: "Escalate to SNA / Ministry",
      desc: "Refer anomalous pattern or unresolved policy ambiguity to State Nodal Authority for directive.",
      icon: Send,
      badge: "Escalation",
      color: "border-rose-200 bg-rose-50/30 text-rose-900",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Administrative Decision Support
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-mono text-slate-600">{work.unique_work_number}</span>
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              Record Officer Review Determination
            </h2>
            <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{work.work_name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Choice Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Select Determination Action
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {actionOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedAction === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setSelectedAction(opt.id as any)}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "border-[#123B6D] bg-blue-50/50 shadow-xs ring-1 ring-[#123B6D]"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#123B6D]" />
                        <span className="font-semibold text-slate-900 text-xs">{opt.title}</span>
                      </div>
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Officer Details & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Reviewing Officer Name & Designation
              </label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B6D]"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Action Compliance Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B6D]"
              />
            </div>
          </div>

          {/* Rationale / Notes */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-slate-700">
                Officer Findings & Decision Rationale <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400">Logged permanently in Audit Trail</span>
            </div>
            <textarea
              rows={3}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              placeholder="State the factual basis for this determination (e.g. 'Dispatched junior engineer Sh. K. Sharma to inspect physical water tank progress and verify MB page 44 prior to releasing subsequent tranche')..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B6D]"
              required
            />
          </div>

          {/* Audit Trail Immutable Guarantee */}
          <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
            <span>
              <strong>GIGW & Audit Compliance:</strong> This determination will update the work&apos;s review status and create an immutable record in the audit trail with timestamp, actor name, and rationale.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#123B6D] hover:bg-[#0B2340] rounded-lg transition-colors shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? "Recording..." : "Record & Log Determination"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
