"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RecommendedWork } from "@/types/mplad";
import { formatINR } from "@/lib/utils";
import { MapPin, AlertTriangle, ArrowRight, Layers, Eye } from "lucide-react";

interface GISMapComponentProps {
  works: RecommendedWork[];
  onSelectWork?: (workId: string) => void;
  selectedWorkId?: string;
  focusRegion?: "All" | "Indore" | "South Andamans" | "Delhi";
}

export function GISMapComponent({
  works,
  onSelectWork,
  selectedWorkId,
  focusRegion = "Indore",
}: GISMapComponentProps) {
  const [selectedWork, setSelectedWork] = useState<RecommendedWork | null>(null);
  const [showDuplicateLinks, setShowDuplicateLinks] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"All" | "High" | "Medium">("All");

  // Center coordinates for regions
  const REGION_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
    All: { lat: 22.0, lng: 78.9629, zoom: 5 },
    Indore: { lat: 22.7196, lng: 75.8577, zoom: 14 },
    "South Andamans": { lat: 11.6670, lng: 92.7300, zoom: 12 },
    Delhi: { lat: 28.5355, lng: 77.2100, zoom: 12 },
  };

  const currentCenter = REGION_CENTERS[focusRegion] || REGION_CENTERS.Indore;

  useEffect(() => {
    if (selectedWorkId) {
      const found = works.find((w) => w.unique_work_number === selectedWorkId);
      if (found) setSelectedWork(found);
    } else if (works.length > 0) {
      setSelectedWork(works[0]);
    }
  }, [selectedWorkId, works]);

  const filteredWorks = works.filter((w) => {
    if (activeFilter === "High") return w.risk_priority === "High";
    if (activeFilter === "Medium") return w.risk_priority === "Medium";
    return true;
  });

  // Identify duplicate pairs for visualization
  const duplicatePairs = works.filter(
    (w) => w.duplicate_work_candidate_id && w.duplicate_distance_meters
  );

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900 flex flex-col h-[640px]">
      {/* Top Floating Map Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Region & Priority Chips */}
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#123B6D]" />
            Cluster Focus:
          </span>
          <span className="font-bold text-[#123B6D]">{focusRegion}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">Showing {filteredWorks.length} Plotted Works</span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
          <button
            type="button"
            onClick={() => setActiveFilter("All")}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
              activeFilter === "All" ? "bg-[#123B6D] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Works
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("High")}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
              activeFilter === "High" ? "bg-red-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            High Risk Flags
          </button>
          <span className="text-slate-300">•</span>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={showDuplicateLinks}
              onChange={(e) => setShowDuplicateLinks(e.target.checked)}
              className="rounded text-[#123B6D] focus:ring-0"
            />
            <span>Show Proximity Link Lines</span>
          </label>
        </div>
      </div>

      {/* Interactive Map Visual Simulation Layer (SVG Spatial Engine) */}
      <div className="relative flex-1 w-full h-full bg-[#1E293B] overflow-hidden select-none">
        {/* Vector Grid & Regional Map Tiles Base */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.6" />
            </pattern>
            <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#475569" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#0F172A" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dotGrid)" />

          {/* District Outline Simulation */}
          <path
            d="M 120 180 Q 280 120 480 200 T 780 260 T 920 460 T 700 580 T 360 520 Z"
            fill="rgba(18, 59, 109, 0.12)"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Road Network Vectors */}
          <path d="M 80 320 C 300 300 450 350 700 320 S 950 360 1100 340" fill="none" stroke="#475569" strokeWidth="2.5" opacity="0.7" />
          <path d="M 420 100 C 450 250 440 400 480 580" fill="none" stroke="#475569" strokeWidth="2" opacity="0.7" />
          <path d="M 520 280 C 600 380 680 440 850 500" fill="none" stroke="#334155" strokeWidth="1.5" opacity="0.5" />

          {/* Duplicate Works Connecting Line (Indore Ward 18 Pair) */}
          {showDuplicateLinks && (
            <g>
              <line
                x1="460"
                y1="310"
                x2="520"
                y2="330"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeDasharray="5 4"
              />
              <circle cx="490" cy="320" r="14" fill="#F59E0B" fillOpacity="0.2" />
              <text x="495" y="315" fill="#FCD34D" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                42m · 0.91 Cosine Sim
              </text>
            </g>
          )}

          {/* Spatial Works Marker Pins */}
          {filteredWorks.slice(0, 35).map((w, idx) => {
            // Coordinate projection onto SVG viewBox
            const x = 200 + ((idx * 73) % 760);
            const y = 140 + ((idx * 59) % 400);

            const isSelected = selectedWork?.unique_work_number === w.unique_work_number;
            const isHigh = w.risk_priority === "High";
            const isMed = w.risk_priority === "Medium";
            const pinColor = isHigh ? "#EF4444" : isMed ? "#F59E0B" : "#3B82F6";

            return (
              <g
                key={w.unique_work_number}
                className="cursor-pointer transition-transform duration-150 hover:scale-125"
                onClick={() => {
                  setSelectedWork(w);
                  if (onSelectWork) onSelectWork(w.unique_work_number);
                }}
              >
                {/* Ping Pulse for Selected / High Risk */}
                {isHigh && (
                  <circle cx={x} cy={y} r="16" fill="#EF4444" fillOpacity="0.2" className="animate-ping" />
                )}
                {isSelected && (
                  <circle cx={x} cy={y} r="18" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 2" />
                )}

                {/* Marker Body */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 10 : 8}
                  fill={pinColor}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                />

                {/* Score Pill / Label */}
                {isHigh && (
                  <g>
                    <rect
                      x={x - 14}
                      y={y - 20}
                      width="28"
                      height="12"
                      rx="3"
                      fill="#991B1B"
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                    />
                    <text
                      x={x}
                      y={y - 11}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="8"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {w.risk_score}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Selected Work Map Popover Card */}
        {selectedWork && (
          <div className="absolute bottom-4 left-4 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-xl p-4 text-xs animate-fade-in z-20">
            <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
              <div>
                <span className="font-mono text-[10px] font-bold text-[#123B6D] block">
                  {selectedWork.unique_work_number}
                </span>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1 mt-0.5">
                  {selectedWork.work_name}
                </h4>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedWork.risk_priority === "High"
                    ? "bg-red-100 text-red-800"
                    : selectedWork.risk_priority === "Medium"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                Risk: {selectedWork.risk_score}/100
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2.5 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div>
                <span className="text-slate-400 block">Sanctioned:</span>
                <span className="font-semibold text-slate-800">{formatINR(selectedWork.sanctioned_amount)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Disbursed:</span>
                <span className="font-semibold text-[#123B6D]">{formatINR(selectedWork.expenditure_amount)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Physical Progress:</span>
                <span className="font-bold text-emerald-700">{selectedWork.physical_progress_percent}%</span>
              </div>
              <div>
                <span className="text-slate-400 block">Geo Coordinates:</span>
                <span className="font-mono text-slate-700">{selectedWork.latitude.toFixed(4)}, {selectedWork.longitude.toFixed(4)}</span>
              </div>
            </div>

            {selectedWork.duplicate_distance_meters && (
              <div className="mt-2.5 p-2 rounded-md bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Potential Proximity Duplicate:</strong> Located {selectedWork.duplicate_distance_meters}m from sister work {selectedWork.duplicate_work_candidate_id}.
                </div>
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">{selectedWork.implementing_district_per_lgd}</span>
              <Link
                href={`/works/${encodeURIComponent(selectedWork.unique_work_number)}`}
                className="inline-flex items-center gap-1 font-semibold text-xs text-[#123B6D] hover:underline"
              >
                <span>Inspect Work Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Legend Box */}
        <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-2.5 rounded-lg text-white text-[10px] space-y-1 z-20">
          <div className="font-bold text-slate-300 uppercase tracking-wider mb-1">Risk Legend</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>High Priority Review (&gt;70)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Medium Attention (40–70)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Routine / Compliant (&lt;40)</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-slate-700">
            <span className="w-3 h-0.5 bg-amber-400 border-dashed" />
            <span>42m Near-Duplicate Pair</span>
          </div>
        </div>
      </div>
    </div>
  );
}
