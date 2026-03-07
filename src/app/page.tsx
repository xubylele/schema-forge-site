import { Hero } from "@/components/Hero";
import { ProductOverview } from "@/components/ProductOverview";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Hero />
      <ProductOverview />
    </main>
  );
}