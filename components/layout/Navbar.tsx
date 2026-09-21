"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Download, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { CatalogModal } from "../catalog/CatalogModal";
import { useInquiry } from "@/context/InquiryContext";

export function Navbar() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { openDrawer, totalCount } = useInquiry();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced hover handlers to prevent glitching/flickering
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 180);
  };

  const isCatalogActive = pathname.startsWith("/product");
  const isProjectsActive = pathname.startsWith("/project");
  const isStoriesActive = pathname.startsWith("/stories");

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-brand-canvas/98 backdrop-blur-md border-b border-brand-border transition-all"
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Announcement Bar */}
        <div className="bg-brand-charcoal text-brand-canvas text-[11px] uppercase tracking-widest py-1.5 px-4 text-center border-b border-brand-charcoalMuted/30 flex items-center justify-center gap-3">
          <span>Architectural Lighting Atelier</span>
          <span className="text-brand-brass">•</span>
          <span>Bespoke Lead Times: 2 to 5 Weeks</span>
          <span className="text-brand-brass hidden md:inline">•</span>
          <span className="hidden md:inline">Worldwide Trade Shipping</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <div className="relative h-10 w-28 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Parashar Lighting Logo"
                fill
                priority
                className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col border-l border-brand-border pl-3">
              <span className="font-serif text-lg tracking-[0.2em] font-semibold text-brand-charcoal group-hover:text-brand-brass transition-colors uppercase leading-none">
                PARASHAR
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-brand-muted font-mono font-medium mt-1">
                Lighting Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium text-brand-charcoal h-full">
            {/* Catalog Dropdown Hover Zone */}
            <div
              className="h-full flex items-center relative"
              onMouseEnter={handleMouseEnter}
            >
              <Link
                href="/products"
                className={`flex items-center gap-1.5 py-2 transition-colors relative ${
                  isCatalogActive || isMegaMenuOpen
                    ? "text-brand-brass font-semibold"
                    : "hover:text-brand-brass"
                }`}
              >
                <span>Catalog</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180 text-brand-brass" : ""
                  }`}
                />
              </Link>

              {/* Active Indicator Underline */}
              {isCatalogActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-brass" />
              )}
            </div>

            {/* Projects Link */}
            <div className="h-full flex items-center relative">
              <Link
                href="/projects"
                className={`py-2 transition-colors ${
                  isProjectsActive ? "text-brand-brass font-semibold" : "hover:text-brand-brass"
                }`}
              >
                Projects
              </Link>
              {isProjectsActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-brass" />
              )}
            </div>

            {/* Stories Link */}
            <div className="h-full flex items-center relative">
              <Link
                href="/stories"
                className={`py-2 transition-colors ${
                  isStoriesActive ? "text-brand-brass font-semibold" : "hover:text-brand-brass"
                }`}
              >
                Stories
              </Link>
              {isStoriesActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-brass" />
              )}
            </div>

            {/* Download Catalog Trigger */}
            <button
              onClick={() => setIsCatalogModalOpen(true)}
              className="flex items-center gap-1.5 py-2 text-brand-brass hover:text-brand-charcoal transition-colors font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Spec Book</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 shrink-0">
            <button
              onClick={openDrawer}
              className="relative px-3.5 py-2 bg-brand-stone border border-brand-border hover:border-brand-brass transition-all flex items-center gap-2.5 group shadow-xs"
              title="Open Trade Inquiry Board"
            >
              <ShoppingBag className="w-4 h-4 text-brand-charcoal group-hover:text-brand-brass transition-colors" />
              <span className="text-xs uppercase tracking-wider font-medium text-brand-charcoal hidden sm:inline">
                Inquiry Board
              </span>
              {totalCount > 0 && (
                <span className="w-5 h-5 bg-brand-brass text-white font-mono text-[10px] flex items-center justify-center rounded-full font-bold">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-brand-charcoal hover:text-brand-brass"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Overlay with unbroken hover zone */}
        {isMegaMenuOpen && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute top-full left-0 w-full"
          >
            <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-brand-stone border-b border-brand-border px-6 py-6 space-y-4 animate-fadeIn">
          <Link
            href="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-serif text-brand-charcoal py-2.5 border-b border-brand-border/60"
          >
            Catalog Directory
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-serif text-brand-charcoal py-2.5 border-b border-brand-border/60"
          >
            Projects Case Studies (`/projects`)
          </Link>
          <Link
            href="/stories"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-widest font-serif text-brand-charcoal py-2.5 border-b border-brand-border/60"
          >
            Craftsmanship Stories (`/stories`)
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCatalogModalOpen(true);
            }}
            className="w-full text-left text-sm uppercase tracking-widest font-serif text-brand-brass py-2.5 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Master Spec Book</span>
          </button>
        </div>
      )}

      {/* Catalog Modal */}
      <CatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
      />
    </>
  );
}
