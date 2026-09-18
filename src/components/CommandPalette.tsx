"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getStoredWorks, getStoredAgencies } from "@/lib/storage";
import { Search, X, FileText, Building2, MapPin, ArrowRight, ShieldAlert } from "lucide-react";
import { RecommendedWork, AgencyProfile } from "@/types/mplad";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [works, setWorks] = useState<RecommendedWork[]>([]);
  const [agencies, setAgencies] = useState<AgencyProfile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setWorks(getStoredWorks());
      setAgencies(getStoredAgencies());
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled externally or could toggle
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredWorks = cleanQuery
    ? works
        .filter(
          (w) =>
            w.unique_work_number.toLowerCase().includes(cleanQuery) ||
            w.work_name.toLowerCase().includes(cleanQuery) ||
            w.implementing_district_per_lgd.toLowerCase().includes(cleanQuery) ||
            w.work_category.toLowerCase().includes(cleanQuery)
        )
        .slice(0, 5)
    : works.slice(0, 4);

  const filteredAgencies = cleanQuery
    ? agencies
        .filter((a) => a.name.toLowerCase().includes(cleanQuery) || a.district.toLowerCase().includes(cleanQuery))
        .slice(0, 3)
    : agencies.slice(0, 2);

  const handleSelectWork = (workId: string) => {
    onClose();
    router.push(`/works/${encodeURIComponent(workId)}`);
  };

  const handleSelectAgency = (agencyId: string) => {
    onClose();
    router.push(`/agencies`);
  };

  const quickLinks = [
    { label: "Review Queue", path: "/review-queue", icon: ShieldAlert },
    { label: "GIS Map Intelligence", path: "/map", icon: MapPin },
    { label: "Portfolio Analytics", path: "/analytics", icon: FileText },
    { label: "Audit Trail", path: "/audit-trail", icon: Building2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-2.5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search works, agencies, IDs, or locations... (e.g. 0142, water, Indore)"
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded text-slate-400 hover:text-slate-600 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono font-medium text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Navigation Pages */}
          {!cleanQuery && (
            <div>
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {quickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.path}
                      onClick={() => {
                        onClose();
                        router.push(item.path);
                      }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium transition-colors text-left"
                    >
                      <Icon className="w-4 h-4 text-[#123B6D]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Works Section */}
          {filteredWorks.length > 0 && (
            <div>
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Works & Sanctions ({filteredWorks.length})
              </span>
              <div className="space-y-1">
                {filteredWorks.map((work) => (
                  <button
                    type="button"
                    key={work.unique_work_number}
                    onClick={() => handleSelectWork(work.unique_work_number)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50/50 hover:border-blue-200 border border-transparent transition-colors text-left group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#123B6D] text-[11px]">
                          {work.unique_work_number}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 text-[11px]">
                          {work.implementing_district_per_lgd}
                        </span>
                        {work.risk_priority === "High" && (
                          <span className="text-[9px] font-bold bg-red-100 text-red-700 px-1.5 py-0.2 rounded">
                            Score: {work.risk_score}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-800 font-medium truncate mt-0.5">
                        {work.work_name}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#123B6D] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Agencies Section */}
          {filteredAgencies.length > 0 && (
            <div>
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Implementing Agencies ({filteredAgencies.length})
              </span>
              <div className="space-y-1">
                {filteredAgencies.map((agency) => (
                  <button
                    type="button"
                    key={agency.id}
                    onClick={() => handleSelectAgency(agency.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 transition-colors text-left"
                  >
                    <div>
                      <p className="text-xs text-slate-800 font-semibold">{agency.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {agency.district} • {agency.total_works} works monitored
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredWorks.length === 0 && filteredAgencies.length === 0 && (
            <div className="text-center py-6 text-slate-500">
              <p>No matching works or agencies found for &quot;{query}&quot;</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Try searching for &quot;water&quot;, &quot;road&quot;, &quot;Indore&quot;, or &quot;0142&quot;
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tip: Use ↑ ↓ arrows and Enter to navigate</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
