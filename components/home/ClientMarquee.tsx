"use client";

import React from "react";
import Image from "next/image";
import { MOCK_CLIENT_LOGOS } from "@/lib/mock-data";

export function ClientMarquee() {
  return (
    <section className="bg-texture-sandstone border-b border-[#E8E4DC] py-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#A68038] font-medium">
          Trusted Trade Partners & Architectural Collaborators
        </span>
      </div>

      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap items-center space-x-8 md:space-x-12">
          {MOCK_CLIENT_LOGOS.concat(MOCK_CLIENT_LOGOS).map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="inline-flex items-center gap-4 px-6 py-3.5 card-tactile border border-[#E8E4DC] hover:border-[#C9A86B] transition-all shrink-0 cursor-default shadow-xs group/item hover:shadow-md"
            >
              {/* Partner Brand Logo SVG/PNG Image */}
              <div className="relative h-12 w-48 shrink-0 flex items-center justify-center">
                <Image
                  src={client.logoUrl}
                  alt={client.name}
                  fill
                  sizes="192px"
                  className="object-contain transition-transform duration-300 group-hover/item:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
