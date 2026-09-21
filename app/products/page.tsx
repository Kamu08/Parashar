import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { FixtureType, SpatialArea, StyleTheme } from "@/lib/types";

interface ProductListingPageProps {
  searchParams: Promise<{
    fixtureType?: string;
    spatialArea?: string;
    styleTheme?: string;
    search?: string;
  }>;
}

export default async function ProductListingPage({ searchParams }: ProductListingPageProps) {
  const params = await searchParams;

  const products = await getProducts({
    fixtureType: params.fixtureType as FixtureType,
    spatialArea: params.spatialArea as SpatialArea,
    styleTheme: params.styleTheme as StyleTheme,
    search: params.search,
  });

  return (
    <div className="py-12 bg-brand-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-brand-border">
          <span className="text-xs uppercase tracking-widestLuxury text-brand-brass font-medium block mb-2">
            Detailed Architectural Directory
          </span>
          <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-brand-charcoal">
            Product & Luminaire Catalog
          </h1>
          <p className="text-sm text-brand-charcoalMuted mt-3 max-w-2xl leading-relaxed">
            Filter our complete directory of hand-burnished solid brass pendants, mouth-blown glass chandeliers, wall sconces, and surface mounts. Select finish options and warmth ratings to add to your Inquiry Board.
          </p>
        </div>

        {/* Filter Controls */}
        <Suspense fallback={<div className="h-32 bg-brand-stone animate-pulse" />}>
          <ProductFilters />
        </Suspense>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center bg-brand-stone border border-brand-border">
            <h3 className="font-serif text-xl text-brand-charcoal">No luminaires match your filter criteria</h3>
            <p className="text-xs text-brand-muted mt-2">
              Try adjusting your fixture type, spatial area, or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
