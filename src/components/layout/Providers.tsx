"use client";

import { SessionProvider } from "next-auth/react";
import { CaseProvider } from "@/engine/context/CaseContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CaseProvider>
        {children}
      </CaseProvider>
    </SessionProvider>
  );
}
