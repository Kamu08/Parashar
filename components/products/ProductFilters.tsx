"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, RotateCcw, Filter } from "lucide-react";
import { FixtureType, SpatialArea, StyleTheme } from "@/lib/types";

const FIXTURE_OPTIONS: FixtureType[] = [
  "Pendants",
  "Chandeliers",
  "Sconces",
  "Surface/Flush",
  "Table & Floor",
];

const SPATIAL_OPTIONS: SpatialArea[] = [
  "Living Room",
  "Dining & Island",
  "Bedside",
  "Foyer",
  "Outdoor/Hospitality",
];

const THEME_OPTIONS: StyleTheme[] = [
  "Warm Minimalist",
  "Brutalist Brass",
  "Sculptural Glass",
];

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFixture = searchParams.get("fixtureType") || "All";
  const currentSpatial = searchParams.get("spatialArea") || "All";
  const currentTheme = searchParams.get("styleTheme") || "All";
  const currentSearch = searchParams.get("search") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/products");
  };

  return (
    <div className="bg-brand-stone border border-brand-border p-6 mb-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border/60">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-brass" />
          <h3 className="text-xs uppercase tracking-widestLuxury text-brand-charcoal font-medium">
            Filter Catalog Directory
          </h3>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search fixtures, brass, glass..."
            value={currentSearch}
            onChange={(e) => updateParam("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-brand-canvas border border-brand-border text-xs text-brand-charcoal focus:border-brand-brass outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Filter 1: Fixture Type */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-mono mb-2">
            Fixture Type
          </label>
          <select
            value={currentFixture}
            onChange={(e) => updateParam("fixtureType", e.target.value)}
            className="w-full px-3 py-2.5 bg-brand-canvas border border-brand-border text-xs text-brand-charcoal focus:border-brand-brass outline-none"
          >
            <option value="All">All Fixture Types</option>
            {FIXTURE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 2: Spatial Area */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-mono mb-2">
            Spatial Placement
          </label>
          <select
            value={currentSpatial}
            onChange={(e) => updateParam("spatialArea", e.target.value)}
            className="w-full px-3 py-2.5 bg-brand-canvas border border-brand-border text-xs text-brand-charcoal focus:border-brand-brass outline-none"
          >
            <option value="All">All Spatial Areas</option>
            {SPATIAL_OPTIONS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 3: Style Theme */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-mono mb-2">
            Design Aesthetic
          </label>
          <select
            value={currentTheme}
            onChange={(e) => updateParam("styleTheme", e.target.value)}
            className="w-full px-3 py-2.5 bg-brand-canvas border border-brand-border text-xs text-brand-charcoal focus:border-brand-brass outline-none"
          >
            <option value="All">All Aesthetics</option>
            {THEME_OPTIONS.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(currentFixture !== "All" || currentSpatial !== "All" || currentTheme !== "All" || currentSearch) && (
        <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[10px] uppercase tracking-widest text-brand-muted font-mono">
              Active:
            </span>
            {currentFixture !== "All" && (
              <span className="px-2.5 py-1 bg-brand-canvas border border-brand-border font-mono text-[11px] text-brand-charcoal">
                Fixture: {currentFixture}
              </span>
            )}
            {currentSpatial !== "All" && (
              <span className="px-2.5 py-1 bg-brand-canvas border border-brand-border font-mono text-[11px] text-brand-charcoal">
                Spatial: {currentSpatial}
              </span>
            )}
            {currentTheme !== "All" && (
              <span className="px-2.5 py-1 bg-brand-canvas border border-brand-border font-mono text-[11px] text-brand-charcoal">
                Theme: {currentTheme}
              </span>
            )}
            {currentSearch && (
              <span className="px-2.5 py-1 bg-brand-canvas border border-brand-border font-mono text-[11px] text-brand-charcoal">
                Search: &quot;{currentSearch}&quot;
              </span>
            )}
          </div>

          <button
            onClick={handleReset}
            className="text-xs uppercase tracking-widest text-brand-brass hover:text-brand-charcoal flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
