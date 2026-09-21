"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { InquiryItem } from "@/lib/types";
import { ProjectDetails } from "@/lib/whatsapp";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  projectDetails: ProjectDetails;
}

export function EmailModal({ isOpen, onClose, items, projectDetails }: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-brand-stone border border-brand-border p-8 shadow-2xl text-brand-charcoal">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-brand-muted hover:text-brand-charcoal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-brand-brass font-medium">
            Trade & Retail Inquiry
          </span>
          <h3 className="text-2xl font-serif mt-1">Submit Inquiry via Email</h3>
          <p className="text-xs text-brand-muted mt-1">
            Our trade desk will compile custom spec sheets, trade pricing, and estimated lead times.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-lg font-medium">Inquiry Dispatched Successfully</h4>
            <p className="text-xs text-emerald-700">
              Thank you! Our concierge team will reach out to <strong className="underline">{email}</strong> within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-brand-canvas border border-brand-border text-xs text-brand-charcoalMuted">
              <strong>{items.length} Fixture Type(s) Selected</strong> — {projectDetails.projectName || "General Project"} ({projectDetails.location || "Location pending"})
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-brand-muted mb-1 font-medium">
                Professional Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@firm.com"
                className="w-full px-4 py-2.5 bg-brand-canvas border border-brand-border focus:border-brand-brass outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-brand-muted mb-1 font-medium">
                Contact Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 bg-brand-canvas border border-brand-border focus:border-brand-brass outline-none text-sm"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-brand-border text-xs uppercase tracking-widest hover:bg-brand-canvas"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-brand-charcoal text-brand-canvas text-xs uppercase tracking-widest hover:bg-brand-brass hover:text-white transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                {loading ? "Sending..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
