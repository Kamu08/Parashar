"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, MessageSquare, Mail, Plus, Minus, Building2, MapPin, Sparkles } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { generateWhatsAppUrl, ProjectDetails } from "@/lib/whatsapp";
import { EmailModal } from "./EmailModal";

export function InquiryDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, clearBoard, totalCount } = useInquiry();
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    projectName: "",
    location: "",
    notes: "",
  });
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppExport = () => {
    const url = generateWhatsAppUrl(items, projectDetails);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={closeDrawer}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-brand-stone border-l border-brand-border shadow-2xl flex flex-col justify-between text-brand-charcoal animate-slideLeft">
            {/* Drawer Header */}
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-canvas">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-brass font-medium">
                  Trade Inquiry Board
                </span>
                <h2 className="text-xl font-serif tracking-wide text-brand-charcoal flex items-center gap-2 mt-0.5">
                  <span>Saved Items</span>
                  <span className="text-xs font-sans px-2 py-0.5 bg-brand-stone border border-brand-border rounded-full text-brand-muted">
                    {totalCount}
                  </span>
                </h2>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 text-brand-muted hover:text-brand-charcoal transition-colors"
                aria-label="Close Inquiry Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-brand-canvas border border-brand-border rounded-full flex items-center justify-center text-brand-muted">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg text-brand-charcoal">Your inquiry board is empty</h3>
                  <p className="text-xs text-brand-muted max-w-xs mx-auto">
                    Browse our catalog or project case studies and click &quot;Add to Inquiry Board&quot; to compile items for a quote.
                  </p>
                  <Link
                    href="/products"
                    onClick={closeDrawer}
                    className="inline-block mt-4 px-5 py-2 bg-brand-charcoal text-brand-canvas text-xs uppercase tracking-widest hover:bg-brand-brass hover:text-white transition-colors"
                  >
                    Browse Catalog
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div
                        key={`${item.product.id}-${item.selectedFinish}-${item.selectedWarmth}`}
                        className="p-4 bg-brand-canvas border border-brand-border flex gap-4 relative group"
                      >
                        <div className="relative w-20 h-20 bg-brand-stone border border-brand-border shrink-0 overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 pr-6">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeDrawer}
                            className="font-serif text-sm font-medium text-brand-charcoal hover:text-brand-brass truncate block"
                          >
                            {item.product.title}
                          </Link>

                          <div className="mt-1 space-y-0.5 text-xs text-brand-muted">
                            <p>
                              <strong className="text-brand-charcoal font-normal">Finish:</strong> {item.selectedFinish}
                            </p>
                            <p>
                              <strong className="text-brand-charcoal font-normal">Warmth:</strong> {item.selectedWarmth}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center border border-brand-border bg-brand-stone">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.selectedFinish,
                                    item.selectedWarmth,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 hover:bg-brand-border transition-colors text-brand-charcoal"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs font-mono text-brand-charcoal">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.selectedFinish,
                                    item.selectedWarmth,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 hover:bg-brand-border transition-colors text-brand-charcoal"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.selectedFinish, item.selectedWarmth)
                          }
                          className="absolute top-3 right-3 text-brand-muted hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Project Context Form */}
                  <div className="p-4 bg-brand-canvas border border-brand-border space-y-3">
                    <h4 className="text-xs uppercase tracking-widest text-brand-brass font-medium flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Project Context (Optional)</span>
                    </h4>

                    <div>
                      <input
                        type="text"
                        placeholder="Project Name (e.g. Jaipur Residence)"
                        value={projectDetails.projectName}
                        onChange={(e) =>
                          setProjectDetails({ ...projectDetails, projectName: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs bg-brand-stone border border-brand-border focus:border-brand-brass outline-none"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Location (e.g. Jaipur / Mumbai)"
                        value={projectDetails.location}
                        onChange={(e) =>
                          setProjectDetails({ ...projectDetails, location: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs bg-brand-stone border border-brand-border focus:border-brand-brass outline-none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer Actions */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-border bg-brand-canvas space-y-3">
                <button
                  onClick={handleWhatsAppExport}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp Trade Desk</span>
                </button>

                <button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="w-full py-3 bg-brand-charcoal hover:bg-brand-brass text-brand-canvas text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email Inquiry</span>
                </button>

                <button
                  onClick={clearBoard}
                  className="w-full text-center text-xs text-brand-muted hover:text-rose-600 transition-colors pt-1"
                >
                  Clear Inquiry Board
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        items={items}
        projectDetails={projectDetails}
      />
    </>
  );
}
