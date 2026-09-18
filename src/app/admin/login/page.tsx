"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdmin, checkIsAdminAuthenticated } from "@/lib/admin-auth";
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (checkIsAdminAuthenticated()) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const result = loginAdmin(adminId, password, remember);
    setIsLoading(false);

    if (result.success) {
      router.push("/admin");
    } else {
      setErrorMsg(result.error || "Authentication failed.");
    }
  };

  const handleFillDemoCredentials = () => {
    setAdminId("Prototype20");
    setPassword("Admintest@1234");
    setErrorMsg("");
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
            <span className="text-[10px] text-slate-400 block font-medium">System Administration Console</span>
          </div>
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#123B6D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Dashboard</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#123B6D]/10 text-[#123B6D] flex items-center justify-center mx-auto border border-[#123B6D]/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Internal Systems Control
          </span>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Administrator Gateway
          </h1>
          <p className="text-xs text-slate-500">
            Access pipeline triggers, ingestion lineage, and risk detector algorithm configuration.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Admin Identifier
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Prototype20"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#123B6D]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Access Secret
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#123B6D]"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded text-[#123B6D] focus:ring-0"
              />
              <span>Keep session active</span>
            </label>

            <button
              type="button"
              onClick={handleFillDemoCredentials}
              className="text-[#123B6D] font-semibold hover:underline flex items-center gap-1"
            >
              <KeyRound className="w-3 h-3" />
              <span>Fill Demo Credentials</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#123B6D] text-white text-xs font-semibold hover:bg-[#0B2340] transition-colors shadow-xs disabled:opacity-50"
          >
            <span>{isLoading ? "Verifying..." : "Authenticate Admin Console"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Credentials reminder */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
          <div className="font-semibold text-slate-700">Configured Prototype Access:</div>
          <div className="flex justify-between font-mono">
            <span>Admin ID:</span>
            <strong className="text-slate-900">Prototype20</strong>
          </div>
          <div className="flex justify-between font-mono">
            <span>Password:</span>
            <strong className="text-slate-900">Admintest@1234</strong>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400">
        Nigrani MPLAD • System Administration Subsystem (SIH 2026)
      </div>
    </div>
  );
}
