import React from "react";
import { RiskPriority, ReviewStatus } from "@/types/mplad";
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Clock, Send, FileSearch, Shield } from "lucide-react";

interface RiskBadgeProps {
  priority: RiskPriority;
  score?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function RiskBadge({ priority, score, className = "", size = "md" }: RiskBadgeProps) {
  let bg = "bg-slate-100 text-slate-700 border-slate-200";
  let icon = <Info className="w-3.5 h-3.5 mr-1 text-slate-500" />;
  let label = "LOW · ROUTINE";

  if (priority === "High") {
    bg = "bg-red-50 text-red-800 border-red-200 font-semibold";
    icon = <AlertTriangle className="w-3.5 h-3.5 mr-1 text-red-600" />;
    label = "HIGH · NEEDS REVIEW";
  } else if (priority === "Medium") {
    bg = "bg-amber-50 text-amber-800 border-amber-200 font-medium";
    icon = <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-600" />;
    label = "MEDIUM · ATTENTION";
  } else if (priority === "Low") {
    bg = "bg-blue-50 text-blue-800 border-blue-200";
    icon = <Info className="w-3.5 h-3.5 mr-1 text-blue-600" />;
    label = "LOW · ROUTINE";
  }

  const sizeClass =
    size === "sm"
      ? "text-[11px] px-2 py-0.5"
      : size === "lg"
      ? "text-sm px-3 py-1 font-semibold"
      : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center rounded-md border tracking-wide uppercase ${sizeClass} ${bg} ${className}`}
    >
      {icon}
      <span>{label}</span>
      {score !== undefined && (
        <span className="ml-1.5 pl-1.5 border-l border-current/30 font-mono font-bold">
          {score}/100
        </span>
      )}
    </span>
  );
}

interface StatusBadgeProps {
  status: ReviewStatus | string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  let bg = "bg-slate-100 text-slate-700 border-slate-200";
  let icon = <Info className="w-3 h-3 mr-1" />;

  switch (status) {
    case "Pending Review":
      bg = "bg-amber-50 text-amber-800 border-amber-200";
      icon = <Clock className="w-3 h-3 mr-1 text-amber-600" />;
      break;
    case "Verified":
      bg = "bg-emerald-50 text-emerald-800 border-emerald-200";
      icon = <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />;
      break;
    case "Dismissed":
      bg = "bg-slate-100 text-slate-600 border-slate-200";
      icon = <Shield className="w-3 h-3 mr-1 text-slate-500" />;
      break;
    case "Documentation Requested":
      bg = "bg-blue-50 text-blue-800 border-blue-200";
      icon = <FileSearch className="w-3 h-3 mr-1 text-blue-600" />;
      break;
    case "Inspection Assigned":
      bg = "bg-purple-50 text-purple-800 border-purple-200";
      icon = <Clock className="w-3 h-3 mr-1 text-purple-600" />;
      break;
    case "Escalated":
      bg = "bg-rose-50 text-rose-800 border-rose-200";
      icon = <Send className="w-3 h-3 mr-1 text-rose-600" />;
      break;
    case "In Progress":
      bg = "bg-blue-50 text-blue-800 border-blue-200";
      icon = <Clock className="w-3 h-3 mr-1 text-blue-600" />;
      break;
    case "Completed":
      bg = "bg-green-50 text-green-800 border-green-200";
      icon = <CheckCircle2 className="w-3 h-3 mr-1 text-green-600" />;
      break;
    default:
      break;
  }

  return (
    <span
      className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full border font-medium ${bg} ${className}`}
    >
      {icon}
      <span>{status}</span>
    </span>
  );
}
