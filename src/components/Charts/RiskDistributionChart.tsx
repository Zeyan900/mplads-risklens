"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface RiskDistributionChartProps {
  data?: { channel: string; count: number; color: string }[];
}

const DEFAULT_CHANNELS = [
  { channel: "Payment-Progress", count: 7, color: "#C53030" },
  { channel: "Photo/Image Gap", count: 6, color: "#E11D48" },
  { channel: "Cost Outlier", count: 5, color: "#2563EB" },
  { channel: "Duplicate / Split", count: 4, color: "#7C3AED" },
  { channel: "Compliance Cap", count: 4, color: "#D97706" },
  { channel: "Vendor Network", count: 3, color: "#0D9488" },
  { channel: "Sanction Delay", count: 8, color: "#EA580C" },
];

export function RiskDistributionChart({ data = DEFAULT_CHANNELS }: RiskDistributionChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 35, bottom: 5 }}
        >
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#5E6B78" }}
            axisLine={{ stroke: "#E2E8F0" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="channel"
            tick={{ fontSize: 11, fill: "#1E293B" }}
            axisLine={{ stroke: "#E2E8F0" }}
            tickLine={false}
            width={100}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="rounded-lg bg-slate-900 text-white p-2.5 text-xs shadow-xl border border-slate-700">
                    <span className="font-bold block text-xs">{d.channel}</span>
                    <span className="text-slate-300 block">
                      Active Flags: <strong className="text-amber-400">{d.count}</strong>
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Review priority assigned by algorithm
                    </span>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
