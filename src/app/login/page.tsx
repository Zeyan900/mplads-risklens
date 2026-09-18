"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { USER_ROLES } from "@/lib/constants";
import { UserRole } from "@/types/mplad";
import { setStoredRole, getStoredRole } from "@/lib/storage";
import { Building, MapPin, Shield, UserCheck, FileText, Scale, Check, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("district_authority");
  const router = useRouter();

  useEffect(() => {
    setSelectedRole(getStoredRole());
  }, []);

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setStoredRole(role);
  };

  const handleProceed = () => {
    setStoredRole(selectedRole);
    router.push("/dashboard");
  };

  const getRoleIcon = (roleId: UserRole) => {
    switch (roleId) {
      case "district_authority":
        return <Building className="w-5 h-5 text-[#123B6D]" />;
      case "state_authority":
        return <MapPin className="w-5 h-5 text-[#1D5FA7]" />;
      case "ministry_analyst":
        return <Shield className="w-5 h-5 text-[#E77A24]" />;
      case "mp_office":
        return <UserCheck className="w-5 h-5 text-[#2D7D4F]" />;
      case "implementing_agency":
        return <FileText className="w-5 h-5 text-indigo-600" />;
      case "auditor":
        return <Scale className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col justify-between p-4 sm:p-6 md:p-10">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#123B6D] flex items-center justify-center text-white font-bold text-sm shadow-xs">
            <span className="font-serif">नि</span>
          </div>
          <div>
            <span className="text-base font-bold text-[#123B6D]">Nigrani MPLAD</span>
            <span className="text-[10px] text-slate-400 block font-medium">Smart India Hackathon 2026 Prototype</span>
          </div>
        </Link>

        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
          Controlled Demo Login
        </span>
      </div>

      {/* Main Card */}
      <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 my-8 space-y-6">
        <div className="text-center max-w-lg mx-auto space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B6D] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Authorized Personnel Gateway
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Select Your Role &amp; Perspective
          </h1>
          <p className="text-xs text-slate-600">
            For demonstration and judging purposes, select from 6 authorized operational roles to view custom dashboards and permission tiers.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {USER_ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <button
                type="button"
                key={role.id}
                onClick={() => handleSelectRole(role.id)}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all text-xs relative ${
                  isSelected
                    ? "border-[#123B6D] bg-blue-50/50 shadow-md ring-2 ring-[#123B6D]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3.5 right-3.5 p-1 rounded-full bg-[#123B6D] text-white">
                    <Check className="w-3 h-3" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200/60">
                    {getRoleIcon(role.id)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{role.title}</h3>
                    <span className="text-[10px] text-slate-500 font-medium">{role.badge}</span>
                  </div>
                </div>

                <div className="space-y-1 mt-1 text-[11px] text-slate-600 border-t border-slate-100 pt-2.5">
                  <div>
                    <span className="text-slate-400">Jurisdiction: </span>
                    <strong className="text-slate-700">{role.jurisdiction}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Scope: </span>
                    <span>{role.scope}</span>
                  </div>
                  <div className="pt-1.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-slate-700">Review Rights:</span>
                    {role.canReview ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        Operational Decisions Authorized
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                        Read-Only Analytics Roll-Up
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Proceed Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500">
            Primary SIH demo role: <strong>District Authority</strong>
          </span>

          <button
            type="button"
            onClick={handleProceed}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#123B6D] text-white text-sm font-semibold hover:bg-[#0B2340] transition-colors shadow-xs"
          >
            <span>Proceed to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400">
        Nigrani MPLAD • Smart India Hackathon 2026 Prototype by Hacksmiths
      </div>
    </div>
  );
}
