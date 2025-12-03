import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Business } from "@/components/home/Business";
import { Billing } from "@/components/home/Billing";
import { CardDeal } from "@/components/home/CardDeal";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Testimonials } from "@/components/home/Testimonials";
import { Clients } from "@/components/home/Clients";
import { CTA } from "@/components/home/CTA";
import { TrustBadges } from "@/components/TrustBadges";
import { MoneyBackGuarantee } from "@/components/MoneyBackGuarantee";
import { Pricing } from "@/components/Pricing";
import { Newsletter } from "@/components/Newsletter";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata;

export default function Home() {

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustBadges />
      <Services />
      <Business />
      <Billing />
      <CardDeal />
      <HowItWorks />
      <Pricing />
      <FeaturedWork />
      <Testimonials />
      <Clients />
      <MoneyBackGuarantee />
      <CTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
