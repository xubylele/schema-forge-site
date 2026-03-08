import { FeatureComparison } from "@/components/FeatureComparison";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InstallQuickstart } from "@/components/InstallQuickstart";
import { IntegrationShowcase } from "@/components/IntegrationShowcase";
import { ProductOverview } from "@/components/ProductOverview";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Hero />
      <HowItWorks />
      <FeatureComparison />
      <InstallQuickstart />
      <IntegrationShowcase />
      <ProductOverview />
    </main>
  );
}
