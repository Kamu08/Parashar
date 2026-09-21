"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, ArrowUpRight } from "lucide-react";
import { ProjectCaseStudy } from "@/lib/types";

interface FeaturedProjectsProps {
  projects: ProjectCaseStudy[];
}

// 6 Top Premier Landmark Showcases for the Main Page (3 rows x 2 columns)
const MAIN_PAGE_6_LANDMARKS = [
  {
    name: "Suryagarh",
    subtitle: "The Grand Courtyards & Sandstone Suites",
    location: "Jaisalmer, Rajasthan",
    tag: "FEATURED INSTALLATION • BESPOKE LUMINAIRES",
    slug: "suryagarh-jaisalmer",
    image: "/images/hero-1.jpg",
    number: "01",
  },
  {
    name: "Fairmont Jaipur",
    subtitle: "Grand Ballroom & Royal Corridor Installations",
    location: "Jaipur, Rajasthan",
    tag: "LIGHTING • MONUMENTAL CHANDELIERS",
    slug: "fairmont-jaipur",
    image: "/images/proj-1.jpg",
    number: "02",
  },
  {
    name: "Raffles Udaipur",
    subtitle: "Private Island Palace & Waterfront Atrium",
    location: "Udaipur, Rajasthan",
    tag: "BESPOKE PROJECT • SCULPTURAL GLASS",
    slug: "raffles-udaipur",
    image: "/images/hero-2.jpg",
    number: "03",
  },
  {
    name: "Villa Palladio",
    subtitle: "Romantic Italianate Verandahs & Dining Pavilions",
    location: "Jaipur, Rajasthan",
    tag: "FEATURED INSTALLATION • ARTISANAL BRASS",
    slug: "villa-palladio-jaipur",
    image: "/images/hero-3.jpg",
    number: "04",
  },
  {
    name: "Umaid Bhawan Palace",
    subtitle: "Presidential Suites & Art Deco Heritage Restorations",
    location: "Jodhpur, Rajasthan",
    tag: "HERITAGE RESTORATION • ROYAL PALACE",
    slug: "umaid-bhawan-palace",
    image: "/images/proj-3.jpg",
    number: "05",
  },
  {
    name: "City Palace",
    subtitle: "Historic Royal Galleries & Colonnade Atriums",
    location: "Jaipur, Rajasthan",
    tag: "MUSEUM & PALACE PROVENANCE",
    slug: "city-palace-jaipur",
    image: "/images/proj-2.jpg",
    number: "06",
  },
];

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-24 sm:py-32 bg-texture-luxury border-b border-[#E8E4DC] relative overflow-hidden">
      {/* Ambient background architectural lighting flares */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#C9A86B]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C9A86B]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ============================================================ */}
        {/* 1. EDITORIAL HEADER                                          */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-3">
            {/* Eyebrow with gold hairline */}
            <div className="flex items-center gap-3 text-[#C9A86B] font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em]">
              <span className="w-8 h-[1px] bg-[#C9A86B] inline-block" />
              <span>HOSPITALITY PORTFOLIO</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-normal text-[#1A1A18] leading-[1.12] tracking-tight">
              Trusted by India&apos;s{" "}
              <span className="italic font-serif text-[#C9A86B] font-normal">
                Finest Properties
              </span>
            </h2>
          </div>

          {/* Right Subtitle Narrative */}
          <div className="lg:col-span-5 pb-1">
            <p className="text-xs sm:text-sm md:text-[15px] text-[#5A5852] font-light leading-relaxed">
              Our pieces have travelled into the suites, ballrooms and lobbies of the world&apos;s most discerning hotels — turning rooms into architectural statements.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. REFINED ARCHITECTURAL CARDS (6 ON MAIN PAGE)              */}
        {/* NO image zoom. Animated light sheen, gallery corner frames,   */}
        {/* and elevated frosted glass editorial typography.             */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {MAIN_PAGE_6_LANDMARKS.map((item, idx) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className="group relative block aspect-[16/11] sm:aspect-[16/10.5] overflow-hidden rounded-xl bg-[#EFECE6] border border-[#E8E4DC] hover:border-[#C9A86B] transition-colors duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(201,168,107,0.2)]"
            >
              {/* Static Architectural Image (No Zoom) */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  priority={idx < 2}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-all duration-700 brightness-[0.98] group-hover:brightness-[1.03] group-hover:contrast-[1.02]"
                />
              </div>

              {/* Innovative Animation 1: Ambient Golden Spotlight Halo on Hover */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C9A86B]/0 group-hover:bg-[#C9A86B]/25 rounded-full blur-3xl transition-all duration-700 pointer-events-none" />

              {/* Innovative Animation 2: Architectural Light Beam Sweep */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-[#FFF4D9]/25 to-transparent -skew-x-20 transform -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Innovative Animation 3: Gallery Corner Miter Accents */}
              <div className="absolute inset-3 pointer-events-none z-20">
                {/* Top Left */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C9A86B]/0 group-hover:border-[#C9A86B] transition-all duration-500 transform group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-1 -translate-y-1" />
                {/* Top Right */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C9A86B]/0 group-hover:border-[#C9A86B] transition-all duration-500 transform group-hover:translate-x-0 group-hover:translate-y-0 translate-x-1 -translate-y-1" />
                {/* Bottom Left */}
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#C9A86B]/0 group-hover:border-[#C9A86B] transition-all duration-500 transform group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-1 translate-y-1" />
                {/* Bottom Right */}
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C9A86B]/0 group-hover:border-[#C9A86B] transition-all duration-500 transform group-hover:translate-x-0 group-hover:translate-y-0 translate-x-1 translate-y-1" />
              </div>

              {/* Top Floating Badges */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
                {/* Minimalist Index Tag */}
                <span className="font-mono text-[10px] tracking-widest text-[#1A1A18] bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 shadow-2xs font-medium">
                  {item.number} / 17
                </span>

                {/* Direct Action Link Pill */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A18] text-white font-mono text-[10px] uppercase font-medium tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                  <span>Explore Blueprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A86B]" />
                </div>
              </div>

              {/* Bottom Frosted Glass Editorial Typography */}
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-7 z-20 bg-gradient-to-t from-white/95 via-white/80 to-transparent">
                <div className="space-y-1.5">
                  {/* Gold Micro Eyebrow with Amber Beacon */}
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#A68038] font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C9A86B] shrink-0" />
                    <span>{item.tag}</span>
                  </div>

                  {/* Property Name & Explore Arrow in One Line */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-[32px] font-normal text-[#1A1A18] group-hover:text-[#8F6D38] transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/90 border border-[#E8E4DC] group-hover:border-[#C9A86B] group-hover:bg-[#C9A86B] flex items-center justify-center transition-all duration-300 shadow-2xs shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 text-[#1A1A18] group-hover:text-black transition-colors" />
                    </div>
                  </div>

                  {/* Subtitle / Location in Italic Serif */}
                  <p className="text-xs sm:text-sm text-[#5A5852] font-serif italic font-light">
                    {item.subtitle} • {item.location}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ============================================================ */}
        {/* 3. LUXURY "VIEW ALL 17 LANDMARK PROJECTS" CTA BUTTON         */}
        {/* ============================================================ */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center justify-center space-y-4">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3.5 px-10 py-4 bg-[#1A1A18] hover:bg-[#C9A86B] text-white hover:text-[#1A1A18] font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-500 shadow-xl shadow-black/10 border border-[#C9A86B]/30 hover:border-[#C9A86B]"
          >
            {/* Ambient Gold Aura */}
            <span className="absolute -inset-0.5 bg-[#C9A86B] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 pointer-events-none" />

            <span className="relative z-10">View All 17 Landmark Properties</span>
            <span className="relative z-10 px-2.5 py-0.5 text-[10px] bg-[#C9A86B] text-[#1A1A18] group-hover:bg-[#1A1A18] group-hover:text-[#FAF9F5] font-mono font-bold transition-colors">
              +11 More
            </span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>

          <p className="text-xs font-mono text-[#8C887B] tracking-wider text-center max-w-md">
            Discover full spatial photography, luminaire schedules & custom CAD drawings across all 17 palatial installations.
          </p>
        </div>

      </div>
    </section>
  );
}
