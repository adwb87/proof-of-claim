"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CaseCard } from "@/components/cases/CaseCard";

interface CaseData {
  id: string;
  status: string;
  category: string;
  entityName: string;
  referenceNumber?: string | null;
  recommendedDocument: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    documents: number;
    responses: number;
  };
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-surface p-6">
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded-full bg-border/60" />
        <div className="h-5 w-28 rounded-full bg-border/60" />
      </div>
      <div className="mt-4 h-6 w-3/4 rounded bg-border/60" />
      <div className="mt-3 h-4 w-1/2 rounded bg-border/40" />
      <div className="mt-4 flex gap-4">
        <div className="h-4 w-24 rounded bg-border/40" />
        <div className="h-4 w-20 rounded bg-border/40" />
      </div>
      <div className="mt-3 h-3 w-28 rounded bg-border/30" />
    </div>
  );
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch("/api/cases");
        if (res.status === 401) {
          setAuthenticated(false);
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch");
        setAuthenticated(true);
        const data = await res.json();
        setCases(data.cases ?? data);
      } catch {
        setAuthenticated(true);
        setCases([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCases();
  }, []);

  // Not authenticated
  if (authenticated === false) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/5">
          <svg
            className="h-10 w-10 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <h1 className="mb-3 text-2xl font-bold text-primary">
          Sign in to view your cases
        </h1>
        <p className="mb-8 text-text-secondary">
          Track your disputes, log responses, and manage your documents all in
          one place. Sign in to get started.
        </p>
        <Link href="/auth/signin">
          <Button variant="primary" size="lg">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">
            My Cases
          </h1>
          <p className="mt-1 text-text-secondary">
            Track and manage your active disputes
          </p>
        </div>
        <Link href="/start">
          <Button variant="primary" size="md">
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Start New Case
            </span>
          </Button>
        </Link>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Empty state */}
      {!loading && cases.length === 0 && (
        <div className="animate-fade-in py-20 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-accent-teal/5">
            <svg
              className="h-12 w-12 text-accent-teal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-primary">
            You haven&apos;t started any cases yet
          </h2>
          <p className="mx-auto mb-8 max-w-md text-text-secondary">
            When you&apos;re ready to challenge an unproven demand, start a new
            case and we&apos;ll guide you through the process step by step.
          </p>
          <Link href="/start">
            <Button variant="primary" size="lg">
              Start Your First Case
            </Button>
          </Link>
        </div>
      )}

      {/* Cases grid */}
      {!loading && cases.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.id} case={c} />
          ))}
        </div>
      )}
    </div>
  );
}
