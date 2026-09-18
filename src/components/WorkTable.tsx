"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RecommendedWork, RiskPriority, ReviewStatus } from "@/types/mplad";
import { RiskBadge, StatusBadge } from "./RiskBadge";
import { formatINR } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  ExternalLink,
  FileText,
  AlertCircle,
  Building2,
} from "lucide-react";

interface WorkTableProps {
  works: RecommendedWork[];
  onOpenEvidence?: (work: RecommendedWork) => void;
  title?: string;
  subTitle?: string;
  defaultFilterSeverity?: string;
}

export function WorkTable({
  works,
  onOpenEvidence,
  title = "Operational Work Registry",
  subTitle = "Sort and filter portfolio works across compliance rules, expenditure, and anomaly detectors",
  defaultFilterSeverity = "All",
}: WorkTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState(defaultFilterSeverity);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortField, setSortField] = useState<"risk_score" | "sanctioned_amount" | "last_update">("risk_score");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Get distinct categories
  const categories = ["All", ...Array.from(new Set(works.map((w) => w.work_category)))];

  // Filtering
  const filteredWorks = works.filter((w) => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchId = w.unique_work_number.toLowerCase().includes(q);
      const matchName = w.work_name.toLowerCase().includes(q);
      const matchDist = w.implementing_district_per_lgd.toLowerCase().includes(q);
      const matchAgency = w.implementing_agency_name.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchDist && !matchAgency) return false;
    }

    if (selectedCategory !== "All" && w.work_category !== selectedCategory) {
      return false;
    }

    if (selectedSeverity !== "All" && w.risk_priority !== selectedSeverity) {
      return false;
    }

    if (selectedStatus !== "All" && w.review_status !== selectedStatus) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedWorks = [...filteredWorks].sort((a, b) => {
    let comp = 0;
    if (sortField === "risk_score") {
      comp = a.risk_score - b.risk_score;
    } else if (sortField === "sanctioned_amount") {
      comp = a.sanctioned_amount - b.sanctioned_amount;
    } else if (sortField === "last_update") {
      comp = (a.last_progress_update_days_ago || 0) - (b.last_progress_update_days_ago || 0);
    }
    return sortDirection === "desc" ? -comp : comp;
  });

  const toggleSort = (field: "risk_score" | "sanctioned_amount" | "last_update") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/40">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">{title}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{subTitle}</p>
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by ID, work name, agency..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B6D]"
            />
          </div>
        </div>

        {/* Filter Dropdowns Strip */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-200/60 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Severity */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-2.5 py-1 rounded-md border border-slate-200 bg-white text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#123B6D]"
          >
            <option value="All">All Risk Priorities</option>
            <option value="High">High Review Risk</option>
            <option value="Medium">Medium Attention</option>
            <option value="Low">Low / Routine</option>
          </select>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1 rounded-md border border-slate-200 bg-white text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#123B6D] max-w-xs truncate"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Review Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1 rounded-md border border-slate-200 bg-white text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#123B6D]"
          >
            <option value="All">All Review Statuses</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Verified">Verified Issue</option>
            <option value="Documentation Requested">Documentation Requested</option>
            <option value="Inspection Assigned">Inspection Assigned</option>
            <option value="Dismissed">Dismissed (Valid Reason)</option>
          </select>

          {/* Results Counter */}
          <span className="ml-auto text-[11px] text-slate-500 font-medium">
            Showing <strong>{sortedWorks.length}</strong> of {works.length} records
          </span>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-4">Priority & ID</th>
              <th className="py-3 px-4">Work Name & Category</th>
              <th className="py-3 px-4">District & Agency</th>
              <th className="py-3 px-4">Primary Anomaly Signal</th>
              <th
                className="py-3 px-4 cursor-pointer select-none hover:text-[#123B6D]"
                onClick={() => toggleSort("risk_score")}
              >
                <div className="flex items-center gap-1">
                  <span>Risk Score</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="py-3 px-4 cursor-pointer select-none hover:text-[#123B6D]"
                onClick={() => toggleSort("sanctioned_amount")}
              >
                <div className="flex items-center gap-1">
                  <span>Sanction (₹)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4">Review Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedWorks.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-slate-500 text-xs">
                  No works found matching the active filter criteria.
                </td>
              </tr>
            ) : (
              sortedWorks.map((work) => {
                const topSignal = work.risk_signals[0];
                const paymentRatio = work.sanctioned_amount > 0 
                  ? Math.round((work.expenditure_amount / work.sanctioned_amount) * 100) 
                  : 0;

                return (
                  <tr
                    key={work.unique_work_number}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    {/* Priority & Work Number */}
                    <td className="py-3 px-4 align-top">
                      <div className="space-y-1">
                        <RiskBadge priority={work.risk_priority} size="sm" />
                        <div className="font-mono text-[11px] font-bold text-[#123B6D]">
                          {work.unique_work_number}
                        </div>
                      </div>
                    </td>

                    {/* Work Title */}
                    <td className="py-3 px-4 align-top max-w-xs">
                      <Link
                        href={`/works/${encodeURIComponent(work.unique_work_number)}`}
                        className="font-semibold text-slate-900 hover:text-[#123B6D] hover:underline line-clamp-2"
                      >
                        {work.work_name}
                      </Link>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {work.work_category}
                      </span>
                    </td>

                    {/* District & Agency */}
                    <td className="py-3 px-4 align-top text-slate-600 max-w-[180px]">
                      <div className="font-medium text-slate-900">
                        {work.implementing_district_per_lgd}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{work.implementing_agency_name}</span>
                      </div>
                    </td>

                    {/* Primary Signal */}
                    <td className="py-3 px-4 align-top max-w-xs">
                      {topSignal ? (
                        <div className="space-y-0.5">
                          <span className="font-medium text-slate-800 line-clamp-1">
                            {topSignal.title}
                          </span>
                          <span className="text-[10px] text-slate-500 line-clamp-1">
                            {topSignal.why_flagged}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Within standard parameters</span>
                      )}
                    </td>

                    {/* Risk Score */}
                    <td className="py-3 px-4 align-top">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-mono font-bold text-sm ${
                            work.risk_score >= 70
                              ? "text-red-700"
                              : work.risk_score >= 40
                              ? "text-amber-700"
                              : "text-slate-700"
                          }`}
                        >
                          {work.risk_score}
                        </span>
                        <span className="text-[10px] text-slate-400">/100</span>
                      </div>
                    </td>

                    {/* Financial Figures */}
                    <td className="py-3 px-4 align-top font-mono">
                      <div className="font-semibold text-slate-900">
                        {formatINR(work.sanctioned_amount)}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Paid: {formatINR(work.expenditure_amount)} ({paymentRatio}%)
                      </div>
                    </td>

                    {/* Physical Progress */}
                    <td className="py-3 px-4 align-top">
                      <div className="w-20">
                        <div className="flex justify-between text-[10px] text-slate-600 mb-0.5">
                          <span>Progress</span>
                          <span className="font-bold">{work.physical_progress_percent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-1.5 rounded-full"
                            style={{ width: `${work.physical_progress_percent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Review Status */}
                    <td className="py-3 px-4 align-top">
                      <StatusBadge status={work.review_status} />
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {onOpenEvidence && (
                          <button
                            type="button"
                            onClick={() => onOpenEvidence(work)}
                            title="Inspect Evidence"
                            className="p-1.5 text-slate-500 hover:text-[#123B6D] hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        )}
                        <Link
                          href={`/works/${encodeURIComponent(work.unique_work_number)}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-[#123B6D] hover:text-white font-semibold text-slate-700 transition-colors shadow-2xs"
                        >
                          <span>Review</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
