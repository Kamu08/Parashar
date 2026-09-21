"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Compass, ShieldAlert } from "lucide-react";
import { FixtureType, SpatialArea, StyleTheme } from "@/lib/types";

interface MegaMenuProps {
  onClose: () => void;
}

const FIXTURE_TYPES: { name: FixtureType; desc: string }[] = [
  { name: "Pendants", desc: "Halo rings, linear bars & sculptural drops" },
  { name: "Chandeliers", desc: "Multi-tiered statement luminaires" },
  { name: "Sconces", desc: "Wall accents & indirect ambient backlight" },
  { name: "Surface/Flush", desc: "Low-profile spun brass disc ceiling mounts" },
  { name: "Table & Floor", desc: "Counterweighted globe lamps & task pillars" },
];

const SPATIAL_AREAS: SpatialArea[] = [
  "Living Room",
  "Dining & Island",
  "Bedside",
  "Foyer",
  "Outdoor/Hospitality",
];

const STYLE_THEMES: { name: StyleTheme; tag: string }[] = [
  { name: "Warm Minimalist", tag: "Clean spun brass & frosted opal diffusers" },
  { name: "Brutalist Brass", tag: "Heavy hand-hammered patinas & raw textures" },
  { name: "Sculptural Glass", tag: "Mouth-blown smoked flutes & hand-cut glass" },
];

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div
      className="w-full bg-brand-stone border-b border-brand-border shadow-2xl z-40 animate-fadeIn transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Column 1: By Fixture Type */}
        <div className="md:col-span-5 border-r border-brand-border/60 pr-6">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-4 h-4 text-brand-brass" />
            <h3 className="text-xs uppercase tracking-widestLuxury text-brand-muted font-medium">
              By Fixture Type
            </h3>
          </div>
          <div className="space-y-3">
            {FIXTURE_TYPES.map((type) => (
              <Link
                key={type.name}
                href={`/products?fixtureType=${encodeURIComponent(type.name)}`}
                onClick={onClose}
                className="group block p-2 hover:bg-brand-canvas transition-colors border-l-2 border-transparent hover:border-brand-brass"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base text-brand-charcoal group-hover:text-brand-brass transition-colors">
                    {type.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-brass" />
                </div>
                <p className="text-xs text-brand-muted mt-0.5">{type.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: By Spatial Area */}
        <div className="md:col-span-3 border-r border-brand-border/60 pr-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-brand-brass" />
            <h3 className="text-xs uppercase tracking-widestLuxury text-brand-muted font-medium">
              By Spatial Area
            </h3>
          </div>
          <div className="space-y-2">
            {SPATIAL_AREAS.map((area) => (
              <Link
                key={area}
                href={`/products?spatialArea=${encodeURIComponent(area)}`}
                onClick={onClose}
                className="block py-2 text-sm text-brand-charcoalMuted hover:text-brand-brass hover:translate-x-1 transition-all"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: By Theme & Custom Capabilities */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-4 h-4 text-brand-brass" />
              <h3 className="text-xs uppercase tracking-widestLuxury text-brand-muted font-medium">
                Design Aesthetics
              </h3>
            </div>
            <div className="space-y-3">
              {STYLE_THEMES.map((theme) => (
                <Link
                  key={theme.name}
                  href={`/products?styleTheme=${encodeURIComponent(theme.name)}`}
                  onClick={onClose}
                  className="block p-3 bg-brand-canvas border border-brand-border hover:border-brand-brass transition-all"
                >
                  <span className="text-sm font-serif text-brand-charcoal block">
                    {theme.name}
                  </span>
                  <span className="text-xs text-brand-muted block mt-0.5">
                    {theme.tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-border/60">
            <Link
              href="/products"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-brass font-medium hover:text-brand-charcoal transition-colors"
            >
              <span>Explore Entire Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
