"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldAlert,
  Briefcase,
  MapPin,
  Building2,
  BarChart3,
  FileCheck2,
  History,
  Database,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { resetDemoData } from "@/lib/storage";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  reviewCount?: number;
}

export function Sidebar({ isOpen, onClose, reviewCount = 12 }: SidebarProps) {
  const pathname = usePathname();

  const navGroups = [
    {
      group: "Primary",
      items: [
        {
          label: "District Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      group: "Operational Review",
      items: [
        {
          label: "Review Queue",
          href: "/review-queue",
          icon: ShieldAlert,
          badge: reviewCount > 0 ? reviewCount : undefined,
          badgeColor: "bg-red-100 text-red-700 font-bold",
        },
        {
          label: "All Works Registry",
          href: "/works",
          icon: Briefcase,
        },
      ],
    },
    {
      group: "Spatial & Analytics",
      items: [
        {
          label: "GIS Map Intelligence",
          href: "/map",
          icon: MapPin,
        },
        {
          label: "Portfolio Analytics",
          href: "/analytics",
          icon: BarChart3,
        },
        {
          label: "Implementing Agencies",
          href: "/agencies",
          icon: Building2,
        },
      ],
    },
    {
      group: "Governance & Provenance",
      items: [
        {
          label: "Evidence Centre",
          href: "/evidence",
          icon: FileCheck2,
        },
        {
          label: "Audit Trail",
          href: "/audit-trail",
          icon: History,
        },
        {
          label: "Data & Provenance",
          href: "/data-sources",
          icon: Database,
        },
      ],
    },
    {
      group: "System Administration",
      items: [
        {
          label: "Admin Console",
          href: "/admin",
          icon: ShieldAlert,
          badge: "Secured",
          badgeColor: "bg-amber-100 text-amber-800 font-bold",
        },
      ],
    },
  ];

  const handleReset = () => {
    if (confirm("Reset all works, decisions, and audit log entries back to original seed data?")) {
      resetDemoData();
      alert("Demo data successfully restored to pristine initial state.");
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-64 glass-panel border-r border-slate-200/90 bg-white/95 backdrop-blur-xl flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs">
          {navGroups.map((group, gIdx) => (
            <div key={group.group || gIdx}>
              {group.group && (
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  {group.group}
                </span>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                        isActive
                          ? "bg-[#123B6D] text-white shadow-xs"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-slate-500"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isActive ? "bg-white/20 text-white" : item.badgeColor || "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-slate-200/80 bg-slate-50/50 space-y-2 text-xs">
          <button
            type="button"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo Data</span>
          </button>

          <div className="px-2 pt-1 text-[11px] text-slate-500 flex items-center justify-between">
            <span>MoSPI eSAKSHI Schema</span>
            <Link
              href="/data-sources"
              className="text-[#123B6D] hover:underline flex items-center gap-0.5"
            >
              <span>Lineage</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
