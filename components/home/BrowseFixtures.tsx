"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FixtureType } from "@/lib/types";

const FIXTURE_CARDS: {
  type: FixtureType;
  title: string;
  image: string;
  count: string;
}[] = [
  {
    type: "Pendants",
    title: "Pendants & Linear Rings",
    image: "/images/prod-h2001.png",
    count: "08 Models",
  },
  {
    type: "Chandeliers",
    title: "Statement Chandeliers",
    image: "/images/prod-ch1001.png",
    count: "05 Models",
  },
  {
    type: "Sconces",
    title: "Wall Sconces & Backlight",
    image: "/images/prod-vintage-2.jpg",
    count: "06 Models",
  },
  {
    type: "Surface/Flush",
    title: "Surface & Flush Mount Discs",
    image: "/images/prod-vintage-4.jpg",
    count: "04 Models",
  },
  {
    type: "Table & Floor",
    title: "Table & Floor Lamps",
    image: "/images/prod-tl3001.png",
    count: "03 Models",
  },
];

export function BrowseFixtures() {
  return (
    <section className="py-20 bg-brand-canvas border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widestLuxury text-brand-brass font-medium block mb-1">
              Taxonomy & Categorization
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-brand-charcoal">
              Browse by Fixture Type
            </h2>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-brand-charcoal hover:text-brand-brass transition-colors inline-flex items-center gap-1.5 font-medium"
          >
            <span>View Full Product Directory</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FIXTURE_CARDS.map((card, index) => (
            <Link
              key={card.type}
              href={`/products?fixtureType=${encodeURIComponent(card.type)}`}
              className={`group relative h-80 bg-brand-stone border border-brand-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-brand-brass ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
                <span className="font-mono text-xs text-brand-brass tracking-widest">
                  {card.count}
                </span>

                <div>
                  <h3 className="font-serif text-2xl tracking-wide group-hover:translate-x-1 transition-transform">
                    {card.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-stone-300 group-hover:text-brand-brass font-mono uppercase tracking-wider">
                    <span>Explore Fixtures</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
