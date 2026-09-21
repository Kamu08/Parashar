"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Building2, ArrowUpRight } from "lucide-react";
import { MOCK_PROJECTS } from "@/lib/mock-data";

const CATEGORIES = [
  "All 17 Landmarks",
  "Palaces & Royal Heritage",
  "Luxury Hospitality",
  "Corporate & Private Estates",
];

// Category mapping helper
function getCategoryGroup(projCategory: string, title: string): string {
  if (
    title.includes("Palace") ||
    title.includes("Haveli") ||
    title.includes("Suryagarh") ||
    title.includes("Nahargarh") ||
    title.includes("City Palace")
  ) {
    return "Palaces & Royal Heritage";
  }
  if (title.includes("Reliance Jio")) {
    return "Corporate & Private Estates";
  }
  return "Luxury Hospitality";
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All 17 Landmarks");

  const enrichedProjects = MOCK_PROJECTS.map((p, idx) => ({
    ...p,
    indexStr: String(idx + 1).padStart(2, "0"),
    groupCategory: getCategoryGroup(p.category, p.title),
  }));

  const filteredProjects =
    activeCategory === "All 17 Landmarks"
      ? enrichedProjects
      : enrichedProjects.filter((p) => p.groupCategory === activeCategory);

  return (
    <div className="py-16 sm:py-24 bg-texture-luxury min-h-screen relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#C9A86B]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C9A86B]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-14 relative z-10">
        
        {/* ============================================================ */}
        {/* 1. EDITORIAL HEADER SECTION                                  */}
        {/* ============================================================ */}
        <div className="space-y-6 border-b border-[#E8E4DC] pb-12">
          <div className="flex items-center gap-3 text-[#C9A86B] font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em]">
            <span className="w-8 h-[1px] bg-[#C9A86B] inline-block" />
            <span>HOSPITALITY & ARCHITECTURAL PROVENANCE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1A1A18] font-normal tracking-tight leading-[1.12]">
                Trusted by India&apos;s{" "}
                <span className="italic font-serif text-[#C9A86B] font-normal">
                  Finest Properties
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#5A5852] mt-4 font-light leading-relaxed">
                Our bespoke fixtures and monumental chandeliers have travelled into the suites, ballrooms, and courtyards of the world&apos;s most discerning landmark properties — turning rooms into lasting architectural statements.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E8E4DC] lg:pl-8 text-xs font-mono text-[#8C887B] shrink-0">
              <div>
                <span className="block text-2xl font-serif font-bold text-[#1A1A18]">17</span>
                <span>Landmarks Tagged</span>
              </div>
              <div className="w-px h-8 bg-[#E8E4DC]" />
              <div>
                <span className="block text-2xl font-serif font-bold text-[#1A1A18]">100%</span>
                <span>Artisan Cast Brass</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. INSTANT ZERO-LATENCY CATEGORY FILTER TABS (0ms RESPONSE) */}
        {/* ============================================================ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E4DC]">
          <div className="flex items-center space-x-6 sm:space-x-8 text-xs uppercase tracking-widest font-medium overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "All 17 Landmarks"
                  ? enrichedProjects.length
                  : enrichedProjects.filter((p) => p.groupCategory === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-4 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "border-b-2 border-[#C9A86B] text-[#1A1A18] font-semibold"
                      : "text-[#8C887B] hover:text-[#1A1A18]"
                  }`}
                >
                  <span className="font-mono text-xs">{cat}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full border transition-colors ${
                      isActive
                        ? "bg-[#1A1A18] text-white border-[#1A1A18]"
                        : "bg-[#F3EFE6] border-[#E8E4DC] text-[#7A7870]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-[#8C887B] hidden md:inline">
            Showing {filteredProjects.length} Architectural Landmark(s)
          </span>
        </div>

        {/* ============================================================ */}
        {/* 3. REFINED 2-COLUMN ARCHITECTURAL CARDS (ALL 17 PROJECTS)    */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              prefetch={true}
              className="group relative block aspect-[16/11] sm:aspect-[16/10.5] overflow-hidden rounded-xl bg-[#EFECE6] border border-[#E8E4DC] hover:border-[#C9A86B] transition-colors duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(201,168,107,0.2)]"
            >
              {/* Static Architectural Image (No Zoom) */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  priority={idx < 4}
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
                  {project.indexStr} / 17
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
                    <span>FEATURED INSTALLATION • BESPOKE LUMINAIRES</span>
                  </div>

                  {/* Property Name & Explore Arrow in One Line */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-[32px] font-normal text-[#1A1A18] group-hover:text-[#8F6D38] transition-colors leading-tight">
                      {project.title}
                    </h2>
                    <div className="w-8 h-8 rounded-full bg-white/90 border border-[#E8E4DC] group-hover:border-[#C9A86B] group-hover:bg-[#C9A86B] flex items-center justify-center transition-all duration-300 shadow-2xs shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 text-[#1A1A18] group-hover:text-black transition-colors" />
                    </div>
                  </div>

                  {/* Subtitle / Location in Italic Serif */}
                  <p className="text-xs sm:text-sm text-[#5A5852] font-serif italic font-light">
                    {project.subtitle} • {project.location}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ============================================================ */}
        {/* 4. ARCHITECTURAL TRADE DESK BANNER                           */}
        {/* ============================================================ */}
        <div className="p-10 md:p-14 bg-[#1A1A18] text-white border border-[#C9A86B]/30 flex flex-col md:flex-row md:items-center justify-between gap-8 mt-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A86B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-2xl relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A86B] font-mono font-medium block">
              Direct Trade Desk & Architect Support
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-normal">
              Planning a Bespoke Spatial Installation?
            </h3>
            <p className="text-xs sm:text-sm text-[#B5B0A2] leading-relaxed font-light mt-2">
              We provide custom shop drawings, AutoCAD/3D BIM files, photometrics, and custom drop length calibrations for architects and interior designers across India and internationally.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20Parashar%20Lighting%20Team%2C%20I%20would%20like%20to%20discuss%20a%20custom%20architectural%20lighting%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 bg-[#C9A86B] hover:bg-[#D9B97C] text-[#1A1A18] text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl relative z-10"
          >
            <span>Consult Trade Desk</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
