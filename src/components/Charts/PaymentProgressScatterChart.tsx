"use client";

import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { formatINR } from "@/lib/utils";

interface ScatterPoint {
  workId: string;
  name: string;
  progress: number;
  payment: number;
  amount: number;
  gap: number;
  isOutlier: boolean;
}

interface PaymentProgressScatterChartProps {
  data?: ScatterPoint[];
  onSelectWork?: (workId: string) => void;
}

const SAMPLE_POINTS: ScatterPoint[] = [
  { workId: "MPLAD-2026-DL-0142", name: "Community Water Tank", progress: 30, payment: 78, amount: 1200000, gap: 48, isOutlier: true },
  { workId: "WS/MP18275/2025-2026/183102", name: "Sri Guruji Community Centre", progress: 45, payment: 59, amount: 8450000, gap: 14, isOutlier: false },
  { workId: "MPLAD-2026-MP-0401", name: "CC Road Sector 4B", progress: 85, payment: 80, amount: 2450000, gap: -5, isOutlier: false },
  { workId: "MPLAD-2026-MP-0205", name: "Bicholi Mardana Drain", progress: 50, payment: 50, amount: 2910000, gap: 0, isOutlier: false },
  { workId: "MPLAD-2026-WK-1002", name: "Drinking Water Pipeline", progress: 40, payment: 38, amount: 1500000, gap: -2, isOutlier: false },
  { workId: "MPLAD-2026-WK-1015", name: "School Science Building", progress: 20, payment: 65, amount: 3200000, gap: 45, isOutlier: true },
  { workId: "MPLAD-2026-WK-1033", name: "Primary Health Centre Upgrade", progress: 60, payment: 58, amount: 2200000, gap: -2, isOutlier: false },
  { workId: "MPLAD-2026-WK-1048", name: "Rural Link Pathway", progress: 15, payment: 55, amount: 1800000, gap: 40, isOutlier: true },
  { workId: "MPLAD-2026-WK-1072", name: "Solar Streetlight Grid", progress: 90, payment: 88, amount: 1100000, gap: -2, isOutlier: false },
  { workId: "MPLAD-2026-WK-1089", name: "Anganwadi Renovation", progress: 75, payment: 70, amount: 950000, gap: -5, isOutlier: false },
];

export function PaymentProgressScatterChart({
  data = SAMPLE_POINTS,
  onSelectWork,
}: PaymentProgressScatterChartProps) {
  const normalPoints = data.filter((d) => !d.isOutlier);
  const outlierPoints = data.filter((d) => d.isOutlier);

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 15, right: 15, bottom: 20, left: -10 }}>
          <XAxis
            type="number"
            dataKey="progress"
            name="Physical Progress"
            unit="%"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#5E6B78" }}
            axisLine={{ stroke: "#CBD5E1" }}
            label={{ value: "Certified Physical Progress (%)", position: "insideBottom", offset: -12, fontSize: 11, fill: "#64748B" }}
          />
          <YAxis
            type="number"
            dataKey="payment"
            name="Disbursed Payment"
            unit="%"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#5E6B78" }}
            axisLine={{ stroke: "#CBD5E1" }}
            label={{ value: "Disbursed Payment (%)", angle: -90, position: "insideLeft", offset: 18, fontSize: 11, fill: "#64748B" }}
          />
          <ZAxis type="number" dataKey="amount" range={[60, 200]} name="Sanction Amount" />
          
          {/* Parity Line (Ideal 1:1 progression) */}
          <ReferenceLine
            segment={[{ x: 0, y: 0 }, { x: 100, y: 100 }]}
            stroke="#94A3B8"
            strokeDasharray="3 3"
            label={{ value: "1:1 Parity Line", position: "top", fontSize: 10, fill: "#94A3B8" }}
          />

          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload as ScatterPoint;
                return (
                  <div className="rounded-lg bg-slate-900 text-white p-3 text-xs shadow-xl border border-slate-700 max-w-xs">
                    <span className="font-mono text-[10px] text-blue-300 block">{d.workId}</span>
                    <strong className="block text-sm mb-1">{d.name}</strong>
                    <div className="space-y-1 text-slate-300 text-[11px] pt-1 border-t border-slate-700">
                      <div className="flex justify-between">
                        <span>Disbursed:</span>
                        <strong className="text-white font-mono">{d.payment}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Physical Progress:</span>
                        <strong className="text-white font-mono">{d.progress}%</strong>
                      </div>
                      {d.gap > 0 && (
                        <div className="flex justify-between text-red-400 font-semibold">
                          <span>Disbursement Lead Gap:</span>
                          <span>+{d.gap} pts</span>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-400">
                        <span>Sanction Value:</span>
                        <span>{formatINR(d.amount)}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          {/* Normal Works (Blue/Slate) */}
          <Scatter
            name="Aligned Works"
            data={normalPoints}
            fill="#1D5FA7"
            fillOpacity={0.7}
            onClick={(node: any) => onSelectWork && onSelectWork(node.payload?.workId || node.workId)}
            className="cursor-pointer"
          />

          {/* Outliers with substantial gaps (High Review Priority - Crimson) */}
          <Scatter
            name="Payment-Progress Gap (>25% Gap)"
            data={outlierPoints}
            fill="#C53030"
            fillOpacity={0.9}
            onClick={(node: any) => onSelectWork && onSelectWork(node.payload?.workId || node.workId)}
            className="cursor-pointer"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
