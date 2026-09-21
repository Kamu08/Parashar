"use client";

import React, { useState } from "react";
import { Download, ArrowRight, ShieldCheck } from "lucide-react";
import { CatalogModal } from "../catalog/CatalogModal";

export function MasterCatalogCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="w-full py-12 sm:py-16 md:py-20 bg-brand-canvas">
        <div className="max-w-7xl mx-auto px-6">
          {/* Standalone Luxury Box Above Footer */}
          <div className="relative rounded-2xl md:rounded-3xl bg-[#141412] text-white p-8 sm:p-12 md:p-16 border border-white/[0.08] shadow-2xl overflow-hidden">
            {/* Ambient Warm Brass Backlight */}
            <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-brand-brass/[0.1] blur-[120px] pointer-events-none rounded-full" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
              {/* Left Column: Clean, Concise Text */}
              <div className="max-w-2xl space-y-3">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-brass font-mono font-medium block">
                  Direct Architect & Trade Resource
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif tracking-wide text-white leading-tight">
                  Download the 2026 Master Spec Book
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  Complete product dimensioning, photometric IES files, material patinas, and warmth rating tables compiled into an instant 124-page PDF spec book.
                </p>
              </div>

              {/* Right Column: Direct CTA */}
              <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-8 py-4 bg-brand-brass hover:bg-brand-brassHover text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-xl flex items-center gap-2.5 cursor-pointer group"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Spec Book (PDF)</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spec Book Download Modal */}
      <CatalogModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
