import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext: string;
  contextSentence?: string;
  icon?: LucideIcon;
  variant?: "default" | "warning" | "danger" | "success" | "info";
  badge?: string;
}

export function MetricCard({
  label,
  value,
  subtext,
  contextSentence,
  icon: Icon,
  variant = "default",
  badge,
}: MetricCardProps) {
  let borderClass = "border-slate-200/80";
  let bgClass = "bg-white";
  let valueColor = "text-[#123B6D]";
  let iconBg = "bg-slate-100 text-slate-700";

  if (variant === "danger") {
    borderClass = "border-red-200/90";
    bgClass = "bg-gradient-to-b from-white to-red-50/20";
    valueColor = "text-red-700";
    iconBg = "bg-red-100/70 text-red-700";
  } else if (variant === "warning") {
    borderClass = "border-amber-200/90";
    bgClass = "bg-gradient-to-b from-white to-amber-50/20";
    valueColor = "text-amber-700";
    iconBg = "bg-amber-100/70 text-amber-700";
  } else if (variant === "success") {
    borderClass = "border-emerald-200/90";
    bgClass = "bg-gradient-to-b from-white to-emerald-50/20";
    valueColor = "text-emerald-700";
    iconBg = "bg-emerald-100/70 text-emerald-700";
  } else if (variant === "info") {
    borderClass = "border-blue-200/90";
    bgClass = "bg-gradient-to-b from-white to-blue-50/20";
    valueColor = "text-blue-700";
    iconBg = "bg-blue-100/70 text-blue-700";
  }

  return (
    <div
      className={`relative rounded-xl border p-4 sm:p-5 shadow-xs transition-all hover:shadow-md ${borderClass} ${bgClass}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {badge && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {badge}
            </span>
          )}
          {Icon && (
            <div className={`p-1.5 rounded-lg ${iconBg}`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className={`text-2xl sm:text-3xl font-bold tracking-tight font-mono ${valueColor}`}>
          {value}
        </span>
        <span className="text-xs text-slate-500 font-normal">{subtext}</span>
      </div>

      {contextSentence && (
        <p className="mt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
          {contextSentence}
        </p>
      )}
    </div>
  );
}
