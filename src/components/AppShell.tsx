"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RoleSwitcherModal } from "./RoleSwitcherModal";
import { CommandPalette } from "./CommandPalette";
import { getStoredRole, setStoredRole, getStoredWorks } from "@/lib/storage";
import { UserRole } from "@/types/mplad";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [role, setRole] = useState<UserRole>("district_authority");
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [reviewCount, setReviewCount] = useState(12);

  useEffect(() => {
    // Sync active role from storage
    setRole(getStoredRole());

    const updateCounts = () => {
      const works = getStoredWorks();
      const highOrPending = works.filter(
        (w) => w.risk_priority === "High" && w.review_status === "Pending Review"
      ).length;
      setReviewCount(highOrPending);
    };

    updateCounts();

    const handleRoleChange = () => {
      setRole(getStoredRole());
    };

    const handleDataUpdate = () => {
      updateCounts();
    };

    window.addEventListener("nigrani_role_change", handleRoleChange);
    window.addEventListener("nigrani_data_update", handleDataUpdate);

    // Global keyboard shortcut for Command Palette
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("nigrani_role_change", handleRoleChange);
      window.removeEventListener("nigrani_data_update", handleDataUpdate);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectRole = (newRole: UserRole) => {
    setRole(newRole);
    setStoredRole(newRole);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FA] text-slate-900">
      {/* Top Header */}
      <Header
        currentRole={role}
        onOpenRoleSwitcher={() => setIsRoleModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={setSelectedDistrict}
      />

      <div className="flex-1 flex">
        {/* Navigation Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          reviewCount={reviewCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </div>

          {/* Institutional Footer */}
          <footer className="border-t border-slate-200/80 bg-white px-6 py-4 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <p className="font-semibold text-slate-700">
                  Nigrani MPLAD — Explainable Risk Intelligence
                </p>
                <p className="text-[11px] text-slate-400">
                  Smart India Hackathon 2026 Prototype by Hacksmiths • Demonstration System
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
                <span>MoSPI eSAKSHI Compatible</span>
                <span>•</span>
                <span>GIGW 3.0 Accessible</span>
                <span>•</span>
                <span>LGD Standardized</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Role Selection Modal */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={role}
        onSelectRole={handleSelectRole}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}
