"use client";

import { RecommendedWork, AgencyProfile, AuditLogEntry, ReviewStatus, UserRole } from "@/types/mplad";
import { ALL_SEED_WORKS, INITIAL_AGENCIES, INITIAL_AUDIT_LOG } from "./seed-data";

const WORKS_KEY = "nigrani_mplad_works_v1";
const AUDIT_KEY = "nigrani_mplad_audit_v1";
const ROLE_KEY = "nigrani_mplad_role_v1";

export function getStoredWorks(): RecommendedWork[] {
  if (typeof window === "undefined") return ALL_SEED_WORKS;
  try {
    const raw = localStorage.getItem(WORKS_KEY);
    if (!raw) {
      localStorage.setItem(WORKS_KEY, JSON.stringify(ALL_SEED_WORKS));
      return ALL_SEED_WORKS;
    }
    return JSON.parse(raw);
  } catch {
    return ALL_SEED_WORKS;
  }
}

export function getWorkById(workId: string): RecommendedWork | undefined {
  const works = getStoredWorks();
  return works.find(
    (w) =>
      w.unique_work_number.toLowerCase() === workId.toLowerCase() ||
      encodeURIComponent(w.unique_work_number) === encodeURIComponent(workId)
  );
}

export function getStoredAuditLog(): AuditLogEntry[] {
  if (typeof window === "undefined") return INITIAL_AUDIT_LOG;
  try {
    const raw = localStorage.getItem(AUDIT_KEY);
    if (!raw) {
      localStorage.setItem(AUDIT_KEY, JSON.stringify(INITIAL_AUDIT_LOG));
      return INITIAL_AUDIT_LOG;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_AUDIT_LOG;
  }
}

export function getStoredAgencies(): AgencyProfile[] {
  return INITIAL_AGENCIES;
}

export function getStoredRole(): UserRole {
  if (typeof window === "undefined") return "district_authority";
  try {
    const r = localStorage.getItem(ROLE_KEY);
    if (r) return r as UserRole;
    return "district_authority";
  } catch {
    return "district_authority";
  }
}

export function setStoredRole(role: UserRole): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ROLE_KEY, role);
    window.dispatchEvent(new Event("nigrani_role_change"));
  } catch {
    // Ignore storage errors
  }
}

export function recordReviewDecision(
  workId: string,
  newReviewStatus: ReviewStatus,
  officerNotes: string,
  actorRole: string,
  actorName: string,
  actionTitle: string
): { success: boolean; updatedWork?: RecommendedWork } {
  if (typeof window === "undefined") return { success: false };

  const works = getStoredWorks();
  const workIndex = works.findIndex((w) => w.unique_work_number === workId);
  if (workIndex === -1) return { success: false };

  const prevStatus = works[workIndex].review_status;
  const now = new Date();
  const formattedTime = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const updatedWork: RecommendedWork = {
    ...works[workIndex],
    review_status: newReviewStatus,
    officer_notes: officerNotes,
    review_date: formattedTime,
    reviewed_by: `${actorName} (${actorRole})`,
  };

  works[workIndex] = updatedWork;

  try {
    localStorage.setItem(WORKS_KEY, JSON.stringify(works));

    // Append to audit log
    const auditLog = getStoredAuditLog();
    const newAuditEntry: AuditLogEntry = {
      id: `AUD-${Date.now()}`,
      timestamp: formattedTime,
      work_id: updatedWork.unique_work_number,
      work_name: updatedWork.work_name,
      actor_role: actorRole,
      actor_name: actorName,
      action: actionTitle,
      previous_state: prevStatus,
      new_state: newReviewStatus,
      details: officerNotes,
    };

    auditLog.unshift(newAuditEntry);
    localStorage.setItem(AUDIT_KEY, JSON.stringify(auditLog));

    window.dispatchEvent(new Event("nigrani_data_update"));
    return { success: true, updatedWork };
  } catch (err) {
    console.error("Failed to save review decision", err);
    return { success: false };
  }
}

export function resetDemoData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(WORKS_KEY);
    localStorage.removeItem(AUDIT_KEY);
    localStorage.setItem(WORKS_KEY, JSON.stringify(ALL_SEED_WORKS));
    localStorage.setItem(AUDIT_KEY, JSON.stringify(INITIAL_AUDIT_LOG));
    window.dispatchEvent(new Event("nigrani_data_update"));
  } catch {
    // Ignore
  }
}
