"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Optimized lightweight beam data for smooth 60fps GPU performance without CPU mask bottleneck
const BEAM_DATA = [
  // P
  { id: 1, x: 260, width: 6.0, y1: 40, y2: 680, baseOp: 0.22, duration: 16, delay: -2, anim: "beamSway1" },
  { id: 2, x: 340, width: 8.0, y1: 30, y2: 700, baseOp: 0.26, duration: 20, delay: -8, anim: "beamSway2" },
  // a
  { id: 3, x: 480, width: 6.5, y1: 50, y2: 670, baseOp: 0.20, duration: 18, delay: -4, anim: "beamSway3" },
  { id: 4, x: 570, width: 8.5, y1: 30, y2: 700, baseOp: 0.25, duration: 22, delay: -11, anim: "beamSway1" },
  // r
  { id: 5, x: 690, width: 7.0, y1: 40, y2: 685, baseOp: 0.22, duration: 17, delay: -6, anim: "beamSway2" },
  { id: 6, x: 760, width: 9.0, y1: 25, y2: 710, baseOp: 0.28, duration: 23, delay: -14, anim: "beamSway3" },
  // a
  { id: 7, x: 870, width: 7.5, y1: 35, y2: 690, baseOp: 0.23, duration: 19, delay: -9, anim: "beamSway1" },
  { id: 8, x: 950, width: 9.5, y1: 20, y2: 715, baseOp: 0.29, duration: 24, delay: -16, anim: "beamSway2" },
  // s
  { id: 9, x: 1060, width: 7.0, y1: 45, y2: 680, baseOp: 0.21, duration: 18, delay: -5, anim: "beamSway3" },
  { id: 10, x: 1140, width: 9.0, y1: 25, y2: 705, baseOp: 0.27, duration: 22, delay: -12, anim: "beamSway1" },
  // h
  { id: 11, x: 1250, width: 7.5, y1: 35, y2: 690, baseOp: 0.23, duration: 19, delay: -8, anim: "beamSway2" },
  { id: 12, x: 1330, width: 10.0, y1: 20, y2: 715, baseOp: 0.30, duration: 25, delay: -15, anim: "beamSway3" },
  // a
  { id: 13, x: 1440, width: 8.0, y1: 30, y2: 700, baseOp: 0.25, duration: 21, delay: -7, anim: "beamSway1" },
  { id: 14, x: 1520, width: 7.0, y1: 50, y2: 675, baseOp: 0.20, duration: 17, delay: -13, anim: "beamSway2" },
  // r
  { id: 15, x: 1630, width: 8.5, y1: 35, y2: 695, baseOp: 0.26, duration: 22, delay: -10, anim: "beamSway3" },
  { id: 16, x: 1710, width: 6.5, y1: 60, y2: 665, baseOp: 0.18, duration: 16, delay: -4, anim: "beamSway1" },
];

export function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full bg-[#000000] text-white rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[56px] border-t border-white/[0.1] overflow-hidden select-none cursor-default flex flex-col justify-between will-change-transform"
    >
      {/* 1. TOP ARCHITECTURAL DIRECTORY & ATELIER INFO */}
      <div className="w-full relative z-30 pt-16 sm:pt-20 pb-12 px-6 sm:px-[6%] lg:px-[8%] pointer-events-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/[0.08]">
          
          {/* Column 1: Brand Atelier Statement & Logo (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative h-10 w-28 shrink-0 brightness-110 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.png"
                  alt="Parashar Lighting Logo"
                  fill
                  sizes="112px"
                  className="object-contain object-left"
                />
              </div>
              <div className="flex flex-col border-l border-white/[0.15] pl-3">
                <span className="font-serif text-lg tracking-[0.2em] font-semibold text-white group-hover:text-brand-brass transition-colors uppercase leading-none">
                  PARASHAR
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-brand-brass font-mono font-medium mt-1">
                  Jaipur Atelier
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              Crafting monumental spatial luminaires, hand-burnished solid brass patinas, and bespoke lighting installations for landmark architecture worldwide.
            </p>
            <div className="pt-1 text-xs font-mono text-stone-400">
              <span className="text-stone-500">Inquiries: </span>
              <a
                href="mailto:inquire@parasharlighting.com"
                className="text-stone-300 hover:text-brand-brass transition-colors underline underline-offset-4"
              >
                inquire@parasharlighting.com
              </a>
            </div>
          </div>

          {/* Column 2: Luminaire Directory (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-brass block mb-1">
              Luminaires
            </span>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <Link href="/products?category=Chandeliers" className="hover:text-white transition-colors">
                  Chandeliers & Mobiles
                </Link>
              </li>
              <li>
                <Link href="/products?category=Sconces" className="hover:text-white transition-colors">
                  Wall Sconces & Brackets
                </Link>
              </li>
              <li>
                <Link href="/products?category=Pendants" className="hover:text-white transition-colors">
                  Linear Pendants & Drops
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Flush Mount Luminaires
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Bespoke Commissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Architecture & Trade Practice (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-brass block mb-1">
              Architecture & Trade
            </span>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Project Case Studies
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Photometric IES Archive
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-white transition-colors">
                  Solid Brass Patina Guide
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-white transition-colors">
                  Mouth-Blown Glass Craft
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  3D CAD & BIM Specifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Atelier Studio Info & Social (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-brass block mb-1">
              Studio
            </span>
            <div className="text-xs text-stone-400 font-light space-y-1">
              <p className="text-stone-300">Jaipur, Rajasthan</p>
              <p>India • 302001</p>
              <p className="text-[11px] font-mono text-stone-500 pt-1">09:00 – 18:00 IST</p>
            </div>

            <div className="pt-3 space-y-1.5 text-xs text-stone-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-stone-500" />
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Terms Sub-bar */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-stone-500 font-mono">
          <p>© {new Date().getFullYear()} Parashar Lighting Atelier. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-500">
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Terms of Specification</span>
            <span>•</span>
            <span>Worldwide Trade Shipping</span>
          </div>
        </div>
      </div>

      {/* 2. CINEMATIC HARDWARE-ACCELERATED SVG WORDMARK (HIGH-PERFORMANCE) */}
      <div className="relative w-full flex-1 flex items-end justify-center pointer-events-none pb-0 overflow-hidden min-h-[440px] sm:min-h-[520px] md:min-h-[580px] lg:h-[640px]">
        <svg
          viewBox="0 0 1920 720"
          className="w-full h-full max-w-[1920px] overflow-hidden"
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Binary Slit-Scan Mask Pattern */}
            <pattern
              id="slitMaskPattern"
              x="0"
              y="0"
              width="15"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="9.2" height="20" fill="#FFFFFF" />
              <rect x="9.2" y="0" width="5.8" height="20" fill="#000000" />
            </pattern>

            {/* Global Vertical Slit Grid Mask */}
            <mask id="slitGridMask">
              <rect x="0" y="0" width="1920" height="720" fill="url(#slitMaskPattern)" />
            </mask>

            {/* Vertical Bottom Fade Gradient */}
            <linearGradient id="verticalBottomFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="68%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="98%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Soft Beam Vertical Gradient with Inherent Feathering (No GPU Blur Filter Needed) */}
            <linearGradient id="beamVerticalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Primary Text Mask */}
            <mask id="parasharTextMask">
              <text
                x="960"
                y="685"
                textAnchor="middle"
                fontFamily="var(--font-sans), 'Inter', 'Helvetica Neue', Arial, sans-serif"
                fontSize="375"
                fontWeight="900"
                fontStyle="italic"
                letterSpacing="0.035em"
                fill="#FFFFFF"
                transform="scale(0.86, 1.44) skewX(-6)"
                style={{ transformOrigin: "960px 685px" }}
              >
                Parashar
              </text>
            </mask>

            {/* Combined Mask */}
            <mask id="fadedParasharMask">
              <g mask="url(#parasharTextMask)">
                <rect x="0" y="0" width="1920" height="720" fill="url(#verticalBottomFade)" />
              </g>
            </mask>

            {/* Slit Mask */}
            <mask id="slitParasharMask">
              <g mask="url(#slitGridMask)">
                <rect x="0" y="0" width="1920" height="720" fill="#FFFFFF" mask="url(#fadedParasharMask)" />
              </g>
            </mask>
          </defs>

          {/* LAYER A: Ambient Background Slit Lines */}
          <g mask="url(#slitGridMask)" className="opacity-80">
            {BEAM_DATA.map((beam) => (
              <rect
                key={`bg-beam-${beam.id}`}
                x={beam.x}
                y={beam.y1}
                width={beam.width * 2}
                height={beam.y2 - beam.y1}
                fill="url(#beamVerticalGrad)"
                opacity={isHovered ? Math.min(0.4, beam.baseOp * 1.5) : beam.baseOp}
                className={beam.anim}
                style={{
                  animationDuration: `${beam.duration}s`,
                  animationDelay: `${beam.delay}s`,
                  transition: "opacity 0.5s ease",
                }}
              />
            ))}
          </g>

          {/* LAYER B: Monumental Slit Base Glyphs */}
          <rect
            x="0"
            y="0"
            width="1920"
            height="720"
            fill="#444444"
            mask="url(#slitParasharMask)"
            opacity={isHovered ? 1 : 0.88}
            style={{ transition: "opacity 0.5s ease" }}
          />

          {/* LAYER C: Foreground Beam Illuminations */}
          <g mask="url(#slitParasharMask)">
            {BEAM_DATA.map((beam) => (
              <rect
                key={`fg-beam-${beam.id}`}
                x={beam.x}
                y={beam.y1}
                width={beam.width * 2.4}
                height={beam.y2 - beam.y1}
                fill="url(#beamVerticalGrad)"
                opacity={isHovered ? Math.min(0.95, beam.baseOp * 3.2) : beam.baseOp * 2.2}
                className={beam.anim}
                style={{
                  animationDuration: `${beam.duration}s`,
                  animationDelay: `${beam.delay}s`,
                  mixBlendMode: "screen",
                  transition: "opacity 0.5s ease",
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* 3. BOTTOM CINEMATIC BASELINE */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none z-30" />
    </footer>
  );
}
