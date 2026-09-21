"use client";

import React, { useState } from "react";
import { X, Download, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CatalogModal({ isOpen, onClose }: CatalogModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = (catalogType: string) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-brand-stone border border-brand-border rounded-none shadow-2xl p-8 md:p-10 text-brand-charcoal">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-brand-muted hover:text-brand-charcoal transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <span className="inline-block text-xs uppercase tracking-widestLuxury text-brand-brass font-medium mb-2">
            Master Architectural Specification
          </span>
          <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-brand-charcoal">
            Download Master Spec Books
          </h2>
          <p className="mt-2 text-sm text-brand-charcoalMuted">
            Instant digital download compiled specifically for architects, interior designers, and project managers.
          </p>
        </div>

        {downloaded && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Master Spec Book PDF compiled successfully! Download started.</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="p-5 bg-brand-canvas border border-brand-border flex items-center justify-between group hover:border-brand-brass transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-brass/10 border border-brand-brass/20 flex items-center justify-center text-brand-brass">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-brand-charcoal">2026 Master Architectural Catalog</h4>
                <p className="text-xs text-brand-muted">Full 124-page PDF with IES Photometrics & Finishes</p>
              </div>
            </div>
            <button
              onClick={() => handleDownload("Master")}
              disabled={downloading}
              className="px-4 py-2 bg-brand-charcoal text-brand-canvas text-xs uppercase tracking-widest hover:bg-brand-brass hover:text-white transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              {downloading ? "Compiling..." : "Download PDF"}
            </button>
          </div>

          <div className="p-5 bg-brand-canvas border border-brand-border flex items-center justify-between group hover:border-brand-brass transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-brass/10 border border-brand-brass/20 flex items-center justify-center text-brand-brass">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base text-brand-charcoal">Brass & Glass Finishes Lookbook</h4>
                <p className="text-xs text-brand-muted">Material swatches, patinas, and warmth rating sheet</p>
              </div>
            </div>
            <button
              onClick={() => handleDownload("Finishes")}
              disabled={downloading}
              className="px-4 py-2 bg-brand-stone hover:bg-brand-charcoal hover:text-brand-canvas border border-brand-border text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-brass" />
            <span>High-res vector CAD & 3D BIM models available upon request.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
