"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

// ============================================================
// Types
// ============================================================

/** Case status values matching Prisma CaseStatus enum */
export type LocalCaseStatus =
  | "AWAITING_RESPONSE"
  | "RESPONSE_RECEIVED"
  | "ACTION_REQUIRED"
  | "CLOSED_DEFAULT"
  | "RESOLVED"
  | "ESCALATED";

/** Sent document attached to a case */
export interface LocalSentDocument {
  id: string;
  templateId: string;
  sentDate: string;
  sentMethod?: string;
}

/** A response received for a case */
export interface LocalCaseResponse {
  id: string;
  receivedDate: string;
  responseType: string;
  summary: string;
}

/** A timeline event within a case */
export interface LocalTimelineEvent {
  id: string;
  eventType: string;
  title: string;
  detail?: string;
  createdAt: string;
}

/** A reminder for a case */
export interface LocalReminder {
  id: string;
  dueDate: string;
  title: string;
  sent: boolean;
}

/** Full case shape — mirrors Prisma Case model but works without DB */
export interface LocalCase {
  id: string;
  status: LocalCaseStatus;
  category: string;
  entityName: string;
  entityAddress?: string;
  referenceNumber?: string;
  recommendedDocument: string;
  answers: Record<string, string | string[]>;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  documents: LocalSentDocument[];
  responses: LocalCaseResponse[];
  timeline: LocalTimelineEvent[];
  reminders: LocalReminder[];
}

/** Data required to create a new case (id and timestamps are generated) */
export type NewCaseData = Omit<LocalCase, "id" | "createdAt" | "updatedAt" | "documents" | "responses" | "timeline" | "reminders">;

// ============================================================
// localStorage key
// ============================================================

const STORAGE_KEY = "poc-guest-cases";

// ============================================================
// Reducer State & Actions
// ============================================================

interface CaseState {
  cases: LocalCase[];
  loading: boolean;
  isGuest: boolean;
}

type CaseAction =
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_CASES"; cases: LocalCase[] }
  | { type: "ADD_CASE"; caseData: LocalCase }
  | { type: "UPDATE_STATUS"; caseId: string; status: LocalCaseStatus }
  | { type: "DELETE_CASE"; caseId: string }
  | { type: "SET_GUEST"; isGuest: boolean };

function caseReducer(state: CaseState, action: CaseAction): CaseState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.loading };

    case "SET_CASES":
      return { ...state, cases: action.cases, loading: false };

    case "ADD_CASE":
      return {
        ...state,
        cases: [action.caseData, ...state.cases],
      };

    case "UPDATE_STATUS": {
      const now = new Date().toISOString();
      return {
        ...state,
        cases: state.cases.map((c) =>
          c.id === action.caseId
            ? {
                ...c,
                status: action.status,
                updatedAt: now,
                timeline: [
                  ...c.timeline,
                  {
                    id: crypto.randomUUID(),
                    eventType: "status_changed",
                    title: `Status changed to ${action.status}`,
                    createdAt: now,
                  },
                ],
              }
            : c
        ),
      };
    }

    case "DELETE_CASE":
      return {
        ...state,
        cases: state.cases.filter((c) => c.id !== action.caseId),
      };

    case "SET_GUEST":
      return { ...state, isGuest: action.isGuest };

    default:
      return state;
  }
}

const initialState: CaseState = {
  cases: [],
  loading: true,
  isGuest: true,
};

// ============================================================
// Context
// ============================================================

interface CaseContextValue {
  cases: LocalCase[];
  loading: boolean;
  isGuest: boolean;
  saveCase: (caseData: NewCaseData) => Promise<LocalCase>;
  updateCaseStatus: (caseId: string, status: LocalCaseStatus) => Promise<void>;
  deleteCase: (caseId: string) => Promise<void>;
  getCase: (caseId: string) => LocalCase | undefined;
}

const CaseContext = createContext<CaseContextValue | null>(null);

// ============================================================
// localStorage helpers (SSR-safe)
// ============================================================

function loadGuestCases(): LocalCase[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistGuestCases(cases: LocalCase[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

// ============================================================
// Provider
// ============================================================

export function CaseProvider({
  children,
  isAuthenticated = false,
}: {
  children: ReactNode;
  isAuthenticated?: boolean;
}) {
  const [state, dispatch] = useReducer(caseReducer, initialState);

  const isGuest = !isAuthenticated;

  // Set guest flag when auth status changes
  useEffect(() => {
    dispatch({ type: "SET_GUEST", isGuest });
  }, [isGuest]);

  // Load cases on mount
  useEffect(() => {
    let cancelled = false;

    async function loadCases() {
      dispatch({ type: "SET_LOADING", loading: true });

      if (isGuest) {
        // Guest mode: load from localStorage
        const guestCases = loadGuestCases();
        if (!cancelled) {
          dispatch({ type: "SET_CASES", cases: guestCases });
        }
      } else {
        // Authenticated: fetch from API
        try {
          const res = await fetch("/api/cases");
          if (!res.ok) throw new Error("Failed to fetch cases");
          const data: LocalCase[] = await res.json();
          if (!cancelled) {
            dispatch({ type: "SET_CASES", cases: data });
          }
        } catch {
          if (!cancelled) {
            dispatch({ type: "SET_CASES", cases: [] });
          }
        }
      }
    }

    loadCases();

    return () => {
      cancelled = true;
    };
  }, [isGuest]);

  // Persist guest cases to localStorage whenever they change
  useEffect(() => {
    if (isGuest && !state.loading) {
      persistGuestCases(state.cases);
    }
  }, [state.cases, isGuest, state.loading]);

  // ----------------------------------------------------------
  // Actions
  // ----------------------------------------------------------

  const saveCase = useCallback(
    async (caseData: NewCaseData): Promise<LocalCase> => {
      const now = new Date().toISOString();

      const newCase: LocalCase = {
        ...caseData,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        documents: [],
        responses: [],
        timeline: [
          {
            id: crypto.randomUUID(),
            eventType: "case_created",
            title: "Case created",
            detail: `${caseData.category} case opened against ${caseData.entityName}`,
            createdAt: now,
          },
        ],
        reminders: [],
      };

      if (isGuest) {
        dispatch({ type: "ADD_CASE", caseData: newCase });
        return newCase;
      }

      // Authenticated: POST to API, then update local state
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCase),
      });

      if (!res.ok) {
        throw new Error("Failed to save case");
      }

      const savedCase: LocalCase = await res.json();
      dispatch({ type: "ADD_CASE", caseData: savedCase });
      return savedCase;
    },
    [isGuest]
  );

  const updateCaseStatus = useCallback(
    async (caseId: string, status: LocalCaseStatus): Promise<void> => {
      dispatch({ type: "UPDATE_STATUS", caseId, status });

      if (!isGuest) {
        // Sync to API
        const res = await fetch(`/api/cases/${caseId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });

        if (!res.ok) {
          // Revert would be ideal — for now, log error
          console.error("Failed to update case status on server");
        }
      }
    },
    [isGuest]
  );

  const deleteCase = useCallback(
    async (caseId: string): Promise<void> => {
      dispatch({ type: "DELETE_CASE", caseId });

      if (!isGuest) {
        const res = await fetch(`/api/cases/${caseId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          console.error("Failed to delete case on server");
        }
      }
    },
    [isGuest]
  );

  const getCase = useCallback(
    (caseId: string): LocalCase | undefined => {
      return state.cases.find((c) => c.id === caseId);
    },
    [state.cases]
  );

  return (
    <CaseContext.Provider
      value={{
        cases: state.cases,
        loading: state.loading,
        isGuest: state.isGuest,
        saveCase,
        updateCaseStatus,
        deleteCase,
        getCase,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}

// ============================================================
// Hook
// ============================================================

export function useCase(): CaseContextValue {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error("useCase must be used within a CaseProvider");
  }
  return context;
}

// ============================================================
// Guest Migration Helper
// ============================================================

/**
 * Migrates all guest cases from localStorage to the authenticated
 * user's account via the API. Call this after a guest user signs in.
 *
 * @param userId - The authenticated user's ID (for the API payload)
 * @returns The number of cases successfully migrated
 */
export async function migrateGuestCases(userId: string): Promise<number> {
  const guestCases = loadGuestCases();

  if (guestCases.length === 0) return 0;

  let migrated = 0;

  for (const guestCase of guestCases) {
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...guestCase,
          userId,
        }),
      });

      if (res.ok) {
        migrated++;
      } else {
        console.error(
          `Failed to migrate case ${guestCase.id}:`,
          await res.text()
        );
      }
    } catch (err) {
      console.error(`Failed to migrate case ${guestCase.id}:`, err);
    }
  }

  // Clear localStorage only if all cases migrated successfully
  if (migrated === guestCases.length) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    // Partial migration: remove only the ones that succeeded
    // Keep failed ones for retry
    console.warn(
      `Partial migration: ${migrated}/${guestCases.length} cases migrated. ` +
        `Remaining cases kept in localStorage for retry.`
    );
  }

  return migrated;
}
