"use client";

import React from "react";
import { USER_ROLES } from "@/lib/constants";
import { UserRole } from "@/types/mplad";
import { Shield, Check, X, Building, MapPin, UserCheck, Scale, FileText } from "lucide-react";

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export function RoleSwitcherModal({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
}: RoleSwitcherModalProps) {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Demo Role Selection
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">6 Authorized View Perspectives</span>
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              Select Operating Persona & Permissions
            </h2>
            <p className="mt-0.5 text-xs text-slate-600">
              Switch role context to inspect how Nigrani adapts information density, risk language, and decision permissions.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto p-1">
          {USER_ROLES.map((role) => {
            const isSelected = currentRole === role.id;
            return (
              <button
                type="button"
                key={role.id}
                onClick={() => {
                  onSelectRole(role.id);
                  onClose();
                }}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all text-xs relative ${
                  isSelected
                    ? "border-[#123B6D] bg-blue-50/40 shadow-xs ring-1 ring-[#123B6D]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 p-1 rounded-full bg-[#123B6D] text-white">
                    <Check className="w-3 h-3" />
                  </div>
                )}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded-lg bg-slate-100 border border-slate-200/60">
                    {getRoleIcon(role.id)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {role.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium">{role.badge}</span>
                  </div>
                </div>

                <div className="space-y-1 mt-1 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                  <div>
                    <span className="text-slate-400">Jurisdiction: </span>
                    <span className="font-medium text-slate-700">{role.jurisdiction}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Primary Focus: </span>
                    <span>{role.scope}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 pt-1 border-t border-slate-100/60">
                    <span className="text-[10px] font-semibold text-slate-700">Review Rights: </span>
                    {role.canReview ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        Operational Action Authorized
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                        Read-Only Analytics Roll-up
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>* District Authority is the primary operational reviewer persona for the SIH demo.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
