"use client";

import React from "react";
import Link from "next/link";
import { UserRole } from "@/types/mplad";
import { USER_ROLES } from "@/lib/constants";
import { Search, ChevronDown, RefreshCw, Menu } from "lucide-react";

interface HeaderProps {
  currentRole: UserRole;
  onOpenRoleSwitcher: () => void;
  onOpenCommandPalette: () => void;
  onToggleSidebar?: () => void;
  selectedDistrict?: string;
  onSelectDistrict?: (dist: string) => void;
}

export function Header({
  currentRole,
  onOpenRoleSwitcher,
  onOpenCommandPalette,
  onToggleSidebar,
  selectedDistrict = "All Districts",
  onSelectDistrict,
}: HeaderProps) {
  const roleConfig = USER_ROLES.find((r) => r.id === currentRole) || USER_ROLES[0];

  return (
    <header className="sticky top-0 z-30 w-full glass-nav border-b border-slate-200/90 shadow-xs">
      {/* Subtle National Tricolor Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E77A24] via-[#FFFFFF] via-50% to-[#2D7D4F]" />

      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Mobile Menu + Identity */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Emblem-inspired institutional icon */}
            <div className="w-8 h-8 rounded-lg bg-[#123B6D] flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:bg-[#0B2340] transition-colors">
              <span className="font-serif">नि</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-[#123B6D]">
                  Nigrani MPLAD
                </span>
                <span className="hidden md:inline-flex text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  SIH 2026 · Prototype
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Explainable Risk Intelligence for MPLADS Works
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Command Palette Trigger */}
        <div className="hidden md:flex items-center max-w-sm w-full mx-2">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-100/90 hover:bg-slate-100 border border-slate-200/80 text-xs text-slate-500 transition-all shadow-2xs hover:border-slate-300"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search works, agencies, IDs...</span>
            </div>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: District Filter + Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* District Selector (Controlled) */}
          {onSelectDistrict && (
            <div className="hidden lg:flex items-center text-xs">
              <select
                value={selectedDistrict}
                onChange={(e) => onSelectDistrict(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:ring-1 focus:ring-[#123B6D] focus:outline-none"
              >
                <option value="All Districts">All Districts (Pan-India)</option>
                <option value="Indore">Indore (LGD: 402)</option>
                <option value="South Andamans">South Andamans (LGD: 602)</option>
                <option value="South Delhi">South Delhi (LGD: 142)</option>
                <option value="Pune">Pune (LGD: 521)</option>
                <option value="Varanasi">Varanasi (LGD: 198)</option>
              </select>
            </div>
          )}

          {/* Role Persona Switcher Button */}
          <button
            type="button"
            onClick={onOpenRoleSwitcher}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 shadow-2xs transition-all text-left"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-900 leading-tight">
                {roleConfig.title}
              </span>
              <span className="text-[9px] text-slate-500 leading-none">
                {roleConfig.badge}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {/* Admin Console Shortcut */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all hover:text-[#123B6D]"
            title="Open System Admin Console (ID: Prototype20)"
          >
            <span className="text-[11px]">Admin</span>
          </Link>

          {/* Data Freshness Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 text-[10px] text-slate-500 border-l border-slate-200 pl-3">
            <RefreshCw className="w-3 h-3 text-slate-400" />
            <span>As on 18-Aug-2026</span>
          </div>
        </div>
      </div>
    </header>
  );
}
