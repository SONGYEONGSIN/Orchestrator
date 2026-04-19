import TopNav from "@/components/auth/TopNav";
import Hero from "@/components/auth/Hero";
import FeatureCards from "@/components/auth/FeatureCards";
import Footer from "@/components/auth/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--color-text)]">
      <TopNav />
      <main className="relative pt-28 overflow-hidden">
        <div className="absolute top-[-8%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)] opacity-[0.035] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-warning)] opacity-[0.025] blur-[160px] rounded-full pointer-events-none" />

        <Hero />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  );
}
