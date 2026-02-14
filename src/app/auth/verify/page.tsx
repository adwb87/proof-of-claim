"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function VerifyPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card padding="lg">
          {/* Email icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-teal/10">
              <svg
                className="h-10 w-10 text-accent-teal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.039a2.25 2.25 0 012.134 0l7.5 4.039a2.25 2.25 0 011.183 1.98V19.5z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-3 text-center text-2xl font-bold text-primary">
            Check your email
          </h1>
          <p className="mb-8 text-center text-text-secondary">
            We&apos;ve sent a magic link to your email address. Click it to
            sign in.
          </p>

          {/* Info */}
          <div className="mb-6 rounded-xl bg-background px-4 py-3 text-center text-sm text-text-secondary">
            <p>
              Didn&apos;t receive it? Check your spam folder, or{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-primary hover:underline"
              >
                try again
              </Link>
              .
            </p>
          </div>

          {/* Back to home */}
          <Link href="/" className="block">
            <Button variant="outline" size="md" fullWidth>
              Back to home
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
