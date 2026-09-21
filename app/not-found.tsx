import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF9F5] px-6 py-24">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-[#C9A86B]/10 border border-[#C9A86B]/30 flex items-center justify-center mx-auto text-[#C9A86B]">
          <Compass className="w-6 h-6" />
        </div>
        
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C9A86B]">
            404 • Spatial Blueprint Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A18]">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5852] font-light leading-relaxed">
            The architectural blueprint or luminaire specification you are looking for has been relocated or archived.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A1A18] hover:bg-[#C9A86B] text-white hover:text-[#1A1A18] text-xs font-mono uppercase tracking-widest font-semibold transition-colors"
        >
          <span>Return to Atelier Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
