import type { Metadata } from "next";
import { FlowProvider } from "@/engine/context/FlowContext";
import { FlowEngine } from "@/components/flow/FlowEngine";

export const metadata: Metadata = {
  title: "Start Your Case — Proof of Claim",
  description:
    "Answer a few simple questions about the demand you received and we will generate the right legal document for your situation.",
};

export default function StartPage() {
  return (
    <FlowProvider>
      <FlowEngine />
    </FlowProvider>
  );
}
