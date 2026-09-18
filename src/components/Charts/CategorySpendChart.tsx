"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const CATEGORY_DATA = [
  { category: "Roads & Bridges", sanctioned_lakh: 840, expended_lakh: 690 },
  { category: "Drinking Water", sanctioned_lakh: 620, expended_lakh: 480 },
  { category: "Sanitation & Drains", sanctioned_lakh: 490, expended_lakh: 370 },
  { category: "Education / Schools", sanctioned_lakh: 430, expended_lakh: 340 },
  { category: "Community Halls", sanctioned_lakh: 380, expended_lakh: 260 },
  { category: "Health & Clinics", sanctioned_lakh: 310, expended_lakh: 220 },
  { category: "Solar / Energy", sanctioned_lakh: 190, expended_lakh: 110 },
];

export function CategorySpendChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={CATEGORY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
          <XAxis
            dataKey="category"
            tick={{ fontSize: 10, fill: "#5E6B78" }}
            axisLine={{ stroke: "#E2E8F0" }}
            tickLine={false}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#5E6B78" }}
            axisLine={{ stroke: "#E2E8F0" }}
            tickLine={false}
            unit="L"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="rounded-lg bg-slate-900 text-white p-2.5 text-xs shadow-xl border border-slate-700">
                    <strong className="block mb-1">{d.category}</strong>
                    <div className="text-slate-300 space-y-0.5 text-[11px]">
                      <div>Sanctioned: ₹{(d.sanctioned_lakh / 100).toFixed(2)} Cr</div>
                      <div>Disbursed: ₹{(d.expended_lakh / 100).toFixed(2)} Cr</div>
                      <div className="text-emerald-400 font-semibold">
                        Utilization: {Math.round((d.expended_lakh / d.sanctioned_lakh) * 100)}%
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
          <Bar dataKey="sanctioned_lakh" name="Sanctioned (₹ Lakh)" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expended_lakh" name="Expended (₹ Lakh)" fill="#123B6D" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
