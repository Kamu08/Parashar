import Image from "next/image";
import Link from "next/link";
import { getStories } from "@/lib/api";
import { Hammer, Sparkles, Sliders, ArrowRight } from "lucide-react";

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="py-12 bg-brand-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-16 pb-8 border-b border-brand-border text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widestLuxury text-brand-brass font-medium block mb-2">
            Section 01 • Stories & Atelier Craftsmanship
          </span>
          <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-brand-charcoal">
            Artistry, Finishes & Custom Capabilities
          </h1>
          <p className="text-sm text-brand-charcoalMuted mt-4 leading-relaxed">
            Discover the Jaipur workshop heritage behind Parashar Lighting. From hand-burnished solid brass patinas to mouth-blown glass and 2200K-3000K warmth rating calibrations.
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-20">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`lg:col-span-6 relative h-[420px] bg-brand-stone border border-brand-border overflow-hidden ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-brand-charcoal text-brand-canvas font-mono text-[10px] uppercase tracking-wider">
                  {story.category}
                </div>
              </div>

              {/* Content */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-brand-brass font-mono">
                    Story 0{index + 1}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-brand-charcoal">
                    {story.title}
                  </h2>
                  <p className="text-sm font-medium text-brand-brass italic">
                    {story.subtitle}
                  </p>
                </div>

                <div className="space-y-3 text-xs text-brand-charcoalMuted leading-relaxed">
                  {story.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {story.quote && (
                  <blockquote className="p-4 bg-brand-stone border-l-2 border-brand-brass text-xs font-serif italic text-brand-charcoal">
                    &quot;{story.quote}&quot;
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Trade Inquiries Callout */}
        <div className="mt-24 p-10 bg-brand-stone border border-brand-border text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widestLuxury text-brand-brass font-mono">
            Custom Engineering Support
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-brand-charcoal">
            Require Custom Proportions or Lead Time Scheduling?
          </h3>
          <p className="text-xs text-brand-charcoalMuted max-w-xl mx-auto leading-relaxed">
            Our atelier engineers provide custom shop drawings, finish sample swatches, and direct trade assistance for architects and designers.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-charcoal hover:bg-brand-brass text-brand-canvas text-xs uppercase tracking-widest font-medium transition-all"
            >
              <span>Compile Inquiry Board</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
