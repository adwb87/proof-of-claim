import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-primary px-6">
      {/* Grain texture overlay for grassroots feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle radial glow behind the text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 sm:h-[800px] sm:w-[800px]"
        style={{
          background:
            "radial-gradient(circle, rgba(196,154,42,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Small eyebrow text */}
        <p className="animate-fade-in mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/50 opacity-0 [animation-fill-mode:forwards]">
          For the people of Britain
        </p>

        {/* Heading — massive, bold, impactful */}
        <h1 className="animate-fade-in-up text-[2.5rem] font-black leading-[1.05] tracking-tight text-white opacity-0 sm:text-6xl lg:text-7xl [animation-fill-mode:forwards]">
          You Work. You Pay.
          <br />
          You Get Nothing&nbsp;Back.
          <br />
          <span className="text-accent">It Ends&nbsp;Here.</span>
        </h1>

        {/* Accent bar */}
        <div className="animate-fade-in delay-200 mx-auto mt-8 h-1 w-20 rounded-full bg-accent opacity-0 [animation-fill-mode:forwards]" />

        {/* Subheading — warm, conversational */}
        <p className="animate-fade-in-up delay-200 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70 opacity-0 sm:text-xl [animation-fill-mode:forwards]">
          Energy bills that double while companies post record profits. Council
          tax that rises while potholes multiply. Demands from companies you
          never chose. They send letters. They add fees. They threaten.
        </p>

        {/* The punchline — standalone, bold */}
        <p className="animate-fade-in-up delay-300 mt-6 text-2xl font-bold text-white opacity-0 sm:text-3xl [animation-fill-mode:forwards]">
          They rely on you not knowing you can say:{" "}
          <span className="text-accent">&ldquo;Prove&nbsp;it.&rdquo;</span>
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-400 mt-12 flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row [animation-fill-mode:forwards]">
          <Link href="/start">
            <Button variant="accent" size="lg">
              Require Proof &mdash; Start Here
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10">
              See How This Works
            </Button>
          </Link>
        </div>

        {/* Trust line */}
        <p className="animate-fade-in delay-500 mt-10 text-sm text-white/40 opacity-0 [animation-fill-mode:forwards]">
          Free. No signup. Your data stays on your device.
        </p>
      </div>
    </section>
  );
}
