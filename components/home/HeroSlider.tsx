"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { CatalogModal } from "../catalog/CatalogModal";

const HERO_SLIDES = [
  {
    id: 1,
    title: "Astra Halo & Imperial Grand Luminaires",
    subtitle: "Hand-Burnished Brass & Sculptural Mouth-Blown Glass",
    description: "Architectural spatial lighting engineered for luxury residences, boutique hotels, and grand double-height atriums.",
    image: "/images/hero-1.jpg",
    primaryCta: "Explore Product Catalog",
    primaryLink: "/products",
    secondaryCta: "View Installation Projects",
    secondaryLink: "/projects",
  },
  {
    id: 2,
    title: "Private Villa Spatial Lighting",
    subtitle: "Jaipur Heritage Architecture Showcase",
    description: "Bespeak scale luminaires paired with 2700K warm white LED engines and custom dropped suspension rods.",
    image: "/images/hero-2.jpg",
    primaryCta: "View Case Study Blueprint",
    primaryLink: "/projects/private-villa-jaipur",
    secondaryCta: "Craftsmanship & Stories",
    secondaryLink: "/stories",
  },
  {
    id: 3,
    title: "Brutalist Brass Wall Sconces",
    subtitle: "Hammered Patinas & Low-Glare Backlighting",
    description: "Mid-century architectural brutalism translated into hand-hammered heavy brass fixtures.",
    image: "/images/hero-3.jpg",
    primaryCta: "Browse Wall Sconces",
    primaryLink: "/products?fixtureType=Sconces",
    secondaryCta: "Download Spec Sheet",
    secondaryLink: "#download-spec",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <>
      <section className="relative w-full h-[85vh] min-h-[580px] max-h-[800px] bg-brand-charcoal overflow-hidden flex items-center">
        {/* Background Image Carousel */}
        {HERO_SLIDES.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={index === 0}
              quality={90}
              sizes="100vw"
              className="object-cover object-center brightness-[0.55]"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
        ))}

        {/* Hero Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-brass/20 border border-brand-brass/40 text-brand-brass text-xs uppercase tracking-widest font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.subtitle}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif tracking-wide leading-[1.15] text-white">
              {slide.title}
            </h1>

            <p className="text-sm md:text-base text-stone-300 font-sans font-light leading-relaxed max-w-xl">
              {slide.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={slide.primaryLink}
                className="px-8 py-3.5 bg-brand-brass hover:bg-brand-brassHover text-white text-xs uppercase tracking-widest font-medium transition-all flex items-center gap-2 shadow-lg"
              >
                <span>{slide.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {slide.secondaryLink === "#download-spec" ? (
                <button
                  onClick={() => setIsCatalogModalOpen(true)}
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs uppercase tracking-widest font-medium backdrop-blur-sm transition-all"
                >
                  {slide.secondaryCta}
                </button>
              ) : (
                <Link
                  href={slide.secondaryLink}
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs uppercase tracking-widest font-medium backdrop-blur-sm transition-all"
                >
                  {slide.secondaryCta}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
            }
            className="p-3 bg-black/40 hover:bg-brand-brass text-white border border-white/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs text-white/80 tracking-widest px-2">
            0{currentSlide + 1} / 0{HERO_SLIDES.length}
          </span>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="p-3 bg-black/40 hover:bg-brand-brass text-white border border-white/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <CatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
      />
    </>
  );
}
