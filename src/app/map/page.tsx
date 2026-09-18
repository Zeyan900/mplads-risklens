"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { GISMapComponent } from "@/components/GISMapComponent";
import { getStoredWorks } from "@/lib/storage";
import { RecommendedWork } from "@/types/mplad";
import { MapPin, Layers, Info, AlertTriangle } from "lucide-react";

export default function MapPage() {
  const [works, setWorks] = useState<RecommendedWork[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<"Indore" | "South Andamans" | "Delhi" | "All">("Indore");

  useEffect(() => {
    setWorks(getStoredWorks());
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Spatial Intelligence
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">GIS Multi-Resolution Vector Map</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              GIS Map &amp; Proximity Intelligence
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Visualize spatial distribution of sanctioned works, proximity clusters, and automated duplicate/split-work linkages.
            </p>
          </div>

          {/* Region Switcher */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-2xs">
            {(["Indore", "South Andamans", "Delhi", "All"] as const).map((reg) => (
              <button
                type="button"
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedRegion === reg
                    ? "bg-[#123B6D] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Note on Duplicate Detection */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold">Automated Spatial Duplicate Detection Active:</h4>
            <p className="text-slate-700 leading-relaxed">
              In Indore Ward 18, sister works <span className="font-mono font-semibold">MPLAD-2026-MP-0401</span> and <span className="font-mono font-semibold">MPLAD-2026-MP-0402</span> are plotted 42 meters apart with a 0.91 lexical description similarity, sanctioned 18 days apart just under the ₹25 Lakh tender threshold.
            </p>
          </div>
        </div>

        {/* GIS Map Component */}
        <GISMapComponent works={works} focusRegion={selectedRegion} />
      </div>
    </AppShell>
  );
}
