"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowRight,
  Database,
  CheckCircle2,
  FileSearch,
  Scale,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import { getStoredWorks } from "@/lib/storage";
import { RecommendedWork } from "@/types/mplad";
import { AppShell } from "@/components/AppShell";

export default function LandingPage() {
  const [works, setWorks] = useState<RecommendedWork[]>([]);

  useEffect(() => {
    setWorks(getStoredWorks());
  }, []);

  const totalWorks = works.length || 101;
  const highRiskWorks = works.filter((w) => w.risk_priority === "High").length || 12;
  const sampleAnchor = works.find((w) => w.unique_work_number === "MPLAD-2026-DL-0142") || works[0];

  return (
    <AppShell>
      <div className="space-y-12 py-2 sm:py-6">
        {/* Institutional Hero Section */}
        <section className="relative rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xs overflow-hidden">
          {/* Subtle National Accent Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E77A24] via-slate-200 to-[#2D7D4F]" />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs text-[#123B6D] font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SMART INDIA HACKATHON 2026 · PS 26102</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-normal">Ministry of Statistics & Programme Implementation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Explainable Risk Intelligence for <span className="text-[#123B6D]">MPLADS Works</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              An evidence-first decision support system that continuously screens public development works, connects expenditure to certified physical milestones, and provides auditable, non-accusatory flags for district and state authorities.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#123B6D] text-white text-sm font-semibold hover:bg-[#0B2340] transition-colors shadow-xs"
              >
                <span>Launch District Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/review-queue"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-800 text-sm font-semibold hover:bg-slate-200 transition-colors border border-slate-200"
              >
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Open Review Queue ({highRiskWorks} Critical)</span>
              </Link>

              <Link
                href="/map"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 text-sm font-medium hover:text-[#123B6D] transition-colors"
              >
                <Layers className="w-4 h-4" />
                <span>Explore GIS Intelligence</span>
              </Link>
            </div>
          </div>

          {/* Prototype Attribution Note */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>Prototype developed by <strong>Hacksmiths</strong> for SIH 2026</span>
            <span className="text-slate-400">Demonstration system • Strictly non-accusatory framing</span>
          </div>
        </section>

        {/* Live Interactive Preview Card & 6-Step Decision Cycle */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: The Nigrani 6-Step Decision Model */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#123B6D]">
                Core Operational Philosophy
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                &ldquo;Less Dashboard. More Decision Support.&rdquo;
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Rather than displaying raw charts, Nigrani moves the authorized officer through a rigorous, auditable review pipeline.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { step: "1", title: "Automated Risk Signal", desc: "Multi-channel screening catches payment-progress gaps, cap breaches, or near-duplicates." },
                { step: "2", title: "Why Flagged Rationale", desc: "Plain-language synthesis with mathematical z-scores and codified guideline citations." },
                { step: "3", title: "Underlying Data Evidence", desc: "Linked PFMS payment vouchers, eSAKSHI sanction orders, and measurement book entries." },
                { step: "4", title: "Statutory Guideline Benchmark", desc: "Clear comparison against official MPLADS Rules (April 2023) or peer-group medians." },
                { step: "5", title: "Human Review Determination", desc: "District officer verifies, seeks documentation, assigns inspection, or dismisses." },
                { step: "6", title: "Immutable Audit Log", desc: "Every officer decision is cryptographically timestamped for post-facto accountability." },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#123B6D] font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Interactive Telemetry Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live Evidence Card Preview
              </span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Active Telemetry Node
              </span>
            </div>

            {/* Signature Card Highlight */}
            {sampleAnchor && (
              <div className="rounded-2xl border-2 border-slate-300/80 bg-white p-6 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-700 uppercase tracking-wide bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                      Payment-Progress Mismatch · High Review
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-600">
                    Review Score: 78/100
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-mono text-slate-400">
                    {sampleAnchor.unique_work_number} • {sampleAnchor.implementing_district_per_lgd}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {sampleAnchor.work_name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Agency: {sampleAnchor.implementing_agency_name}
                  </p>
                </div>

                {/* Progress Visualizer */}
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="flex justify-between font-medium text-slate-700 mb-1">
                        <span>Disbursed Payment</span>
                        <span className="font-mono font-bold text-slate-900">78% (₹9.36 L)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-[#123B6D] h-2 rounded-full w-[78%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-medium text-slate-700 mb-1">
                        <span>Certified Physical Progress</span>
                        <span className="font-mono font-bold text-slate-900">30%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full w-[30%]" />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-red-700 font-semibold pt-1 border-t border-slate-200 flex justify-between">
                    <span>Disbursement leads certified progress by 48 percentage points</span>
                    <span className="text-slate-500 font-normal">Last report: 52 days ago</span>
                  </div>
                </div>

                {/* Why Flagged */}
                <div className="mt-4 p-3 rounded-lg bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950">
                  <span className="font-bold block mb-1">WHY FLAGGED:</span>
                  Disbursement is materially ahead of certified progress. The system recommends inspecting the physical measurement book before authorizing the next tranche.
                </div>

                {/* Action Strip */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/works/${encodeURIComponent(sampleAnchor.unique_work_number)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123B6D] hover:underline"
                  >
                    <span>Inspect Full Evidence Packet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/works/${encodeURIComponent(sampleAnchor.unique_work_number)}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#123B6D] text-white text-xs font-semibold hover:bg-[#0B2340] transition-colors"
                  >
                    Take Administrative Action
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Real Data Provenance Banner */}
        <section className="rounded-2xl border border-slate-200 bg-slate-100/60 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Data Provenance Grounding
              </span>
              <h4 className="font-bold text-slate-900 text-sm">18th Lok Sabha Open Datasets</h4>
              <p className="text-slate-600 mt-1">
                Mapped against 175,298 recommended works & 143,257 vendor expenditure records from MoSPI.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Statutory Guidelines
              </span>
              <h4 className="font-bold text-slate-900 text-sm">MoSPI Guidelines April 2023</h4>
              <p className="text-slate-600 mt-1">
                Codified rules for ₹75L Trust limits, 75-day turnaround, and 15% SC / 7.5% ST mandates.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Spatial Canonical Key
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Local Government Directory (LGD)</h4>
              <p className="text-slate-600 mt-1">
                All districts, constituencies, and boundaries keyed on persistent LGD codes (e.g. 402, 602).
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Demonstration Scale
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{totalWorks} Monitored Works</h4>
              <p className="text-slate-600 mt-1">
                Includes real anchor cases from South Andamans & Indore alongside rich synthetic controls.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
