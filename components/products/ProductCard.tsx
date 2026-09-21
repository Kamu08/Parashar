"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Eye } from "lucide-react";
import { Product, FinishOption, WarmthOption } from "@/lib/types";
import { useInquiry } from "@/context/InquiryContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useInquiry();
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(product.finishes[0]);
  const [selectedWarmth, setSelectedWarmth] = useState<WarmthOption>(product.warmthOptions[0]);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedFinish, selectedWarmth, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-brand-canvas border border-brand-border group hover:border-brand-brass transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Thumbnail */}
        <Link href={`/product/${product.slug}`} className="block relative h-72 w-full bg-brand-stone overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-brand-charcoal/90 text-white font-mono text-[10px] uppercase tracking-wider">
            {product.fixtureType}
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-brand-brass/90 text-white font-mono text-[10px] uppercase tracking-wider">
            {product.styleTheme}
          </div>
        </Link>

        {/* Info & Options */}
        <div className="p-6 space-y-4">
          <div>
            <Link
              href={`/product/${product.slug}`}
              className="font-serif text-xl font-medium text-brand-charcoal group-hover:text-brand-brass transition-colors block"
            >
              {product.title}
            </Link>
            <p className="text-xs text-brand-muted mt-1 leading-relaxed line-clamp-2">
              {product.tagline}
            </p>
          </div>

          {/* Quick Selectors */}
          <div className="space-y-2 pt-2 border-t border-brand-border/60 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block mb-1">
                Finish Option:
              </span>
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value as FinishOption)}
                className="w-full px-2.5 py-1.5 bg-brand-stone border border-brand-border text-xs text-brand-charcoal focus:border-brand-brass outline-none"
              >
                {product.finishes.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-brand-muted font-mono block mb-1">
                Warmth Rating:
              </span>
              <select
                value={selectedWarmth}
                onChange={(e) => setSelectedWarmth(e.target.value as WarmthOption)}
                className="w-full px-2.5 py-1.5 bg-brand-stone border border-brand-border text-xs text-brand-charcoal focus:border-brand-brass outline-none"
              >
                {product.warmthOptions.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-6 pt-0 space-y-2">
        <button
          onClick={handleQuickAdd}
          className={`w-full py-2.5 text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 ${
            added
              ? "bg-emerald-700 text-white"
              : "bg-brand-charcoal hover:bg-brand-brass text-brand-canvas"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Board</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to Inquiry Board</span>
            </>
          )}
        </button>

        <Link
          href={`/product/${product.slug}`}
          className="w-full py-2 text-center text-xs uppercase tracking-widest text-brand-muted hover:text-brand-charcoal transition-colors flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Technical Details</span>
        </Link>
      </div>
    </div>
  );
}
