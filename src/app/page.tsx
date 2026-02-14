import { HeroSection } from "@/components/landing/HeroSection";
import { TheyDontTellYou } from "@/components/landing/TheyDontTellYou";
import { IsThisLegal } from "@/components/landing/IsThisLegal";
import { LegalVsLawful } from "@/components/landing/LegalVsLawful";
import { EverythingDocumented } from "@/components/landing/EverythingDocumented";
import { HowItWorksDetailed } from "@/components/landing/HowItWorksDetailed";
import { OneRule } from "@/components/landing/OneRule";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TheyDontTellYou />
      <IsThisLegal />
      <LegalVsLawful />
      <EverythingDocumented />
      <HowItWorksDetailed />
      <OneRule />
    </>
  );
}
