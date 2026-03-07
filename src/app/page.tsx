import { Hero } from "@/components/Hero";
import { InstallQuickstart } from "@/components/InstallQuickstart";
import { ProductOverview } from "@/components/ProductOverview";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Hero />
      <InstallQuickstart />
      <ProductOverview />
    </main>
  );
}
