import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CapabilitiesGrid from "@/components/landing/CapabilitiesGrid";
import AnalyticsHub from "@/components/landing/AnalyticsHub";
import CTAFunnel from "@/components/landing/CTAFunnel";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <CapabilitiesGrid />
      <AnalyticsHub />
      <CTAFunnel />
      <Footer />
    </main>
  );
}
