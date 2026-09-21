import { getFeaturedProducts, getProjects } from "@/lib/api";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { BrowseFixtures } from "@/components/home/BrowseFixtures";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { MasterCatalogCTA } from "@/components/home/MasterCatalogCTA";
import { ProductCard } from "@/components/products/ProductCard";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const featuredProjects = await getProjects("All Projects");

  return (
    <div className="space-y-0">
      {/* 1. HERO SHOWCASE */}
      <HeroSlider />

      {/* 2. CLIENT LOGO CAROUSEL */}
      <ClientMarquee />

      {/* 3. BROWSE BY FIXTURE TYPE */}
      <BrowseFixtures />

      {/* FEATURED PRODUCT SHOWCASE GRID */}
      <section className="py-20 bg-brand-canvas border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widestLuxury text-brand-brass font-medium block mb-1">
                Atelier Catalog Selection
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-brand-charcoal">
                Signature Luminaire Collection
              </h2>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-brand-charcoal hover:text-brand-brass transition-colors inline-flex items-center gap-1.5 font-medium"
            >
              <span>Explore All Fixtures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS GRID */}
      <FeaturedProjects projects={featuredProjects.slice(0, 3)} />

      {/* 5. MASTER CATALOG DOWNLOAD CTA */}
      <MasterCatalogCTA />
    </div>
  );
}
