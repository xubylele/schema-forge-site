import { FeatureComparison } from "@/components/FeatureComparison";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InstallQuickstart } from "@/components/InstallQuickstart";
import { ProductOverview } from "@/components/ProductOverview";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Hero />
      <HowItWorks />
      <FeatureComparison />
      <InstallQuickstart />
      <ProductOverview />
    </main>
  );
}
