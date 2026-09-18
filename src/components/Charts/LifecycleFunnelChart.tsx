"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface LifecycleFunnelChartProps {
  data?: { stage: string; count: number; amount_cr: number; color?: string }[];
}

const DEFAULT_DATA = [
  { stage: "Recommended", count: 101, amount_cr: 23.4, color: "#94A3B8" },
  { stage: "Sanctioned", count: 88, amount_cr: 20.8, color: "#1D5FA7" },
  { stage: "In Progress", count: 68, amount_cr: 15.6, color: "#E77A24" },
  { stage: "Completed", count: 20, amount_cr: 4.8, color: "#2D7D4F" },
];

export function LifecycleFunnelChart({ data = DEFAULT_DATA }: LifecycleFunnelChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <XAxis
            dataKey="stage"
            tick={{ fontSize: 11, fill: "#5E6B78" }}
            axisLine={{ stroke: "#E2E8F0" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#5E6B78" }}
            axisLine={{ stroke: "#E2E8F0" }}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="rounded-lg bg-slate-900 text-white p-2.5 text-xs shadow-xl border border-slate-700">
                    <span className="font-bold block text-sm">{d.stage}</span>
                    <span className="text-slate-300 block">
                      Works: <strong className="text-white">{d.count}</strong>
                    </span>
                    <span className="text-slate-300 block">
                      Volume: <strong className="text-amber-400">₹{d.amount_cr} Cr</strong>
                    </span>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
