"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, Check, Download, ShieldCheck, ArrowLeft, Clock, Ruler, Sparkles } from "lucide-react";
import { getProductBySlug } from "@/lib/api";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { FinishOption, WarmthOption, Product } from "@/lib/types";
import { useInquiry } from "@/context/InquiryContext";
import { CatalogModal } from "@/components/catalog/CatalogModal";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const product = MOCK_PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useInquiry();

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(product.finishes[0]);
  const [selectedWarmth, setSelectedWarmth] = useState<WarmthOption>(product.warmthOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  const handleAdd = () => {
    addItem(product, selectedFinish, selectedWarmth, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="py-12 bg-brand-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb Back Link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-muted hover:text-brand-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Product Directory</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-[480px] md:h-[600px] w-full bg-brand-stone border border-brand-border overflow-hidden">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-brand-charcoal/90 text-white font-mono text-[11px] uppercase tracking-wider">
                {product.fixtureType}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-24 bg-brand-stone border overflow-hidden transition-all ${
                    selectedImage === img ? "border-brand-brass ring-1 ring-brand-brass" : "border-brand-border hover:border-brand-brass/60"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Specifications & Inquiry Form */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widestLuxury text-brand-brass font-mono block mb-2">
                {product.styleTheme} • {product.fixtureType}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-brand-charcoal">
                {product.title}
              </h1>
              <p className="text-sm text-brand-charcoalMuted mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Finish Selection */}
            <div className="space-y-3 pt-6 border-t border-brand-border">
              <label className="block text-xs uppercase tracking-widest text-brand-charcoal font-medium">
                1. Select Brass / Material Finish *
              </label>
              <div className="space-y-2">
                {product.finishes.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`w-full p-3 text-left border text-xs flex items-center justify-between transition-all ${
                      selectedFinish === finish
                        ? "bg-brand-stone border-brand-brass text-brand-charcoal font-medium"
                        : "bg-brand-canvas border-brand-border text-brand-muted hover:border-brand-borderDark"
                    }`}
                  >
                    <span>{finish}</span>
                    {selectedFinish === finish && <Check className="w-4 h-4 text-brand-brass" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Warmth Selection */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-widest text-brand-charcoal font-medium">
                2. Select Light Warmth Rating *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.warmthOptions.map((warmth) => (
                  <button
                    key={warmth}
                    onClick={() => setSelectedWarmth(warmth)}
                    className={`p-3 text-center border text-xs transition-all ${
                      selectedWarmth === warmth
                        ? "bg-brand-stone border-brand-brass text-brand-charcoal font-medium"
                        : "bg-brand-canvas border-brand-border text-brand-muted hover:border-brand-borderDark"
                    }`}
                  >
                    {warmth}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Board */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-brand-border bg-brand-stone h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 text-brand-charcoal hover:bg-brand-border transition-colors h-full flex items-center justify-center text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 font-mono text-sm text-brand-charcoal font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 text-brand-charcoal hover:bg-brand-border transition-colors h-full flex items-center justify-center text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 h-12 text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 shadow-md ${
                    added
                      ? "bg-emerald-700 text-white"
                      : "bg-brand-charcoal hover:bg-brand-brass text-brand-canvas"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Inquiry Board</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Inquiry Board</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setIsCatalogModalOpen(true)}
                className="w-full py-3 border border-brand-border hover:bg-brand-stone text-brand-charcoal text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-brand-brass" />
                <span>Download Spec Sheet PDF</span>
              </button>
            </div>

            {/* Technical Metadata Box */}
            <div className="p-6 bg-brand-stone border border-brand-border space-y-3 text-xs">
              <h4 className="font-serif text-base text-brand-charcoal font-semibold border-b border-brand-border pb-2">
                Technical Specifications
              </h4>
              <div className="flex items-start gap-2 text-brand-charcoalMuted">
                <Ruler className="w-4 h-4 text-brand-brass shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-charcoal font-medium">Dimensions:</strong> {product.dimensions}
                </div>
              </div>
              <div className="flex items-start gap-2 text-brand-charcoalMuted">
                <Clock className="w-4 h-4 text-brand-brass shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-charcoal font-medium">Lead Time:</strong> {product.leadTime}
                </div>
              </div>
              <div className="flex items-start gap-2 text-brand-charcoalMuted">
                <Sparkles className="w-4 h-4 text-brand-brass shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-charcoal font-medium">Craftsmanship:</strong> {product.craftsmanshipNotes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CatalogModal isOpen={isCatalogModalOpen} onClose={() => setIsCatalogModalOpen(false)} />
    </div>
  );
}
