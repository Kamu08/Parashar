import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Building, Sparkles, Compass, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { getProjectBySlug, MOCK_PROJECTS } from "@/lib/api";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Calculate project index & navigation
  const currentIndex = MOCK_PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? MOCK_PROJECTS[currentIndex - 1] : MOCK_PROJECTS[MOCK_PROJECTS.length - 1];
  const nextProject = currentIndex < MOCK_PROJECTS.length - 1 ? MOCK_PROJECTS[currentIndex + 1] : MOCK_PROJECTS[0];
  const indexStr = String(currentIndex + 1).padStart(2, "0");

  return (
    <div className="py-12 sm:py-20 bg-texture-luxury min-h-screen text-[#1A1A18] relative overflow-hidden selection:bg-[#C9A86B] selection:text-white">
      {/* Ambient Lighting Accents */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-[#C9A86B]/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] bg-[#C9A86B]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-16 sm:space-y-24 relative z-10">
        
        {/* ============================================================ */}
        {/* 1. MONOGRAPH EDITORIAL HEADER & PROVENANCE LEDGER            */}
        {/* ============================================================ */}
        <div className="space-y-8 border-b border-[#E8E4DC] pb-10">
          
          {/* Top Bar Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC]/80 pb-5">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7A7870] hover:text-[#1A1A18] transition-colors font-mono font-medium group"
            >
              <ArrowLeft className="w-4 h-4 text-[#C9A86B] group-hover:-translate-x-1 transition-transform" />
              <span>Atelier Landmark Archive</span>
            </Link>

            <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C887B]">
              <span className="text-[#C9A86B] font-bold">DOSSIER REF. {indexStr} / 17</span>
              <span>•</span>
              <span>JAIPUR COMMISSION</span>
            </div>
          </div>

          {/* Title & Spatial Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2.5 text-[#A68038] font-mono text-[11px] uppercase tracking-[0.3em]">
                <span className="w-6 h-[1px] bg-[#C9A86B] inline-block" />
                <span>SPATIAL INSTALLATION BLUEPRINT</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-[#1A1A18] leading-[1.1]">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-[#5A5852] font-serif italic font-light pt-1">
                {project.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3 font-mono text-xs text-[#8C887B]">
              <div className="px-4 py-2 rounded-full card-tactile border border-[#E8E4DC] shadow-2xs flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A86B]" />
                <span className="text-[#1A1A18] font-medium">{project.location}</span>
              </div>
              <div className="px-4 py-2 rounded-full card-tactile border border-[#E8E4DC] shadow-2xs">
                {project.category}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. MONUMENTAL ARCHITECTURAL STAGE (TEXTURED DOUBLE FRAME)   */}
        {/* ============================================================ */}
        <div className="p-2 sm:p-3 rounded-2xl card-tactile border border-[#C9A86B]/30 shadow-xl relative">
          <div className="relative h-[480px] sm:h-[620px] w-full rounded-xl overflow-hidden bg-[#141412]">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.96] contrast-[1.02]"
            />

            {/* Dark Atmospheric Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Top Floating Provenance Tag */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest">
                Atelier Provenance Ref: PL-{indexStr}
              </span>
            </div>

            {/* Bottom Floating Spatial Ledger */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#E5C98B] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C9A86B]" />
                  <span>Bespoke Hand-Cast Solid Brass Schedule</span>
                </span>
                <p className="font-serif text-2xl sm:text-3xl text-white">
                  {project.title}
                </p>
                <p className="text-xs text-stone-300 font-light">
                  {project.location} • Client Studio: {project.clientArchitect}
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Parashar%20Lighting%20Team%2C%20I%20would%20like%20to%20inquire%20about%20the%20bespoke%20lighting%20installation%20for%20${encodeURIComponent(project.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A86B] hover:bg-[#D9B97C] text-[#1A1A18] font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-lg hover:shadow-[#C9A86B]/30"
                >
                  <span>Inquire Commission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. ARCHITECTURAL SPECIFICATION DOSSIER & MATERIAL LEDGER     */}
        {/* ============================================================ */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-[#C9A86B] font-mono text-xs uppercase tracking-[0.25em]">
            <Compass className="w-4 h-4" />
            <span>COMMISSION SPECIFICATION DOSSIER</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Box 1 */}
            <div className="p-6 rounded-xl card-tactile border border-[#E8E4DC] space-y-2">
              <span className="font-mono text-[10px] text-[#8C887B] uppercase tracking-wider block">
                01. Client & Architecture
              </span>
              <p className="font-serif text-lg text-[#1A1A18] font-medium leading-snug">
                {project.clientArchitect}
              </p>
              <p className="text-xs text-[#7A7870] font-light">
                {project.location}
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-xl card-tactile border border-[#E8E4DC] space-y-2">
              <span className="font-mono text-[10px] text-[#8C887B] uppercase tracking-wider block">
                02. Metal Alloy & Finish
              </span>
              <p className="font-serif text-lg text-[#1A1A18] font-medium leading-snug">
                Solid Cast Brass
              </p>
              <p className="text-xs text-[#7A7870] font-light">
                Hand-Burnished Natural Beeswax Sealer
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-xl card-tactile border border-[#E8E4DC] space-y-2">
              <span className="font-mono text-[10px] text-[#8C887B] uppercase tracking-wider block">
                03. Optical Calibration
              </span>
              <p className="font-serif text-lg text-[#1A1A18] font-medium leading-snug">
                2700K Warm White
              </p>
              <p className="text-xs text-[#7A7870] font-light">
                High CRI 95+ • Dimmable 0-10V / DALI
              </p>
            </div>

            {/* Box 4 */}
            <div className="p-6 rounded-xl card-tactile border border-[#E8E4DC] space-y-2">
              <span className="font-mono text-[10px] text-[#8C887B] uppercase tracking-wider block">
                04. Atelier Provenance
              </span>
              <p className="font-serif text-lg text-[#1A1A18] font-medium leading-snug">
                Jaipur Workshop
              </p>
              <p className="text-xs text-[#7A7870] font-light">
                Custom Drop Calibrations & Shop CADs
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. EDITORIAL SPATIAL NARRATIVE & CONCIERGE BLOCK             */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-6 border-t border-[#E8E4DC]">
          
          {/* Left: Narrative Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A68038] font-medium block">
              Spatial Concept & Architectural Intent
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A18] font-normal leading-snug">
              Balancing Monumental Scale with Intimate Ambient Golden Warmth
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#5A5852] font-light leading-relaxed">
              <p>
                {project.description}
              </p>
              <p>
                Engineered specifically to harmonize with the architectural textures and grand proportions of {project.title}. Every luminaire body is manually lathed and assembled by master metalworkers in our Jaipur atelier, ensuring zero synthetic degradation over decades of continuous hospitality service.
              </p>
            </div>
          </div>

          {/* Right: Textured Dark Concierge Box */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-texture-dark text-white border border-[#C9A86B]/35 space-y-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C9A86B] font-semibold">
                Direct Trade Desk
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Request Specifications for {project.title}
              </h3>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Connect directly with our senior lighting engineering team for full AutoCAD DWG blueprints, photometric IES files, and custom drop length schedules.
              </p>
            </div>

            <div className="space-y-3 pt-2 relative z-10">
              <a
                href={`https://wa.me/919876543210?text=Hello%20Parashar%20Lighting%20Team%2C%20I%20would%20like%20to%20request%20specifications%20for%20${encodeURIComponent(project.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#C9A86B] hover:bg-[#D9B97C] text-[#1A1A18] text-xs font-mono uppercase tracking-widest font-semibold transition-all rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <span>Consult Senior Engineer</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/projects"
                className="w-full py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-widest font-medium transition-all rounded-xl flex items-center justify-center gap-2 border border-white/20"
              >
                <span>Explore All 17 Landmarks</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. MULTI-PERSPECTIVE SPATIAL GALLERY FRAMES                  */}
        {/* ============================================================ */}
        <div className="space-y-8 pt-8 border-t border-[#E8E4DC]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C9A86B] font-medium block mb-1">
                Visual Proof & Spatial Context
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A18] font-normal">
                Installation Perspectives & Luminaire Detailing
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8C887B]">
              {project.gallery.length} High-Resolution Capture(s)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {project.gallery.map((img, idx) => (
              <div
                key={idx}
                className="group relative h-80 sm:h-96 rounded-xl overflow-hidden card-tactile border border-[#E8E4DC] hover:border-[#C9A86B] transition-colors duration-500 shadow-sm"
              >
                <Image
                  src={img}
                  alt={`${project.title} spatial frame ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center brightness-[0.97] transition-all duration-700"
                />

                {/* Subtle Light Beam Sweep on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                  <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-[#FFF4D9]/20 to-transparent -skew-x-20 transform -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                </div>

                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white font-mono text-[10px] tracking-wider">
                  Plate {indexStr}.0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. PREVIOUS / NEXT MONOGRAPH NAVIGATOR (NO BOTTOM CARDS)     */}
        {/* ============================================================ */}
        <div className="pt-12 border-t border-[#E8E4DC] pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Previous Project Link */}
            <Link
              href={`/projects/${prevProject.slug}`}
              prefetch={true}
              className="group p-6 rounded-2xl card-tactile border border-[#E8E4DC] hover:border-[#C9A86B] transition-all duration-300 flex items-center justify-between shadow-2xs hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] group-hover:bg-[#C9A86B] flex items-center justify-center transition-colors shrink-0">
                  <ChevronLeft className="w-5 h-5 text-[#1A1A18] group-hover:text-black transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8C887B] uppercase tracking-wider block">
                    ← Previous Landmark
                  </span>
                  <p className="font-serif text-lg text-[#1A1A18] group-hover:text-[#8F6D38] transition-colors font-medium">
                    {prevProject.title}
                  </p>
                  <p className="text-xs text-[#7A7870] font-light">
                    {prevProject.location}
                  </p>
                </div>
              </div>
            </Link>

            {/* Next Project Link */}
            <Link
              href={`/projects/${nextProject.slug}`}
              prefetch={true}
              className="group p-6 rounded-2xl card-tactile border border-[#E8E4DC] hover:border-[#C9A86B] transition-all duration-300 flex items-center justify-between shadow-2xs hover:shadow-md text-right sm:text-left"
            >
              <div className="flex items-center justify-between sm:justify-start gap-4 w-full">
                <div className="order-2 sm:order-1 sm:ml-auto">
                  <span className="text-[10px] font-mono text-[#8C887B] uppercase tracking-wider block">
                    Next Landmark →
                  </span>
                  <p className="font-serif text-lg text-[#1A1A18] group-hover:text-[#8F6D38] transition-colors font-medium">
                    {nextProject.title}
                  </p>
                  <p className="text-xs text-[#7A7870] font-light">
                    {nextProject.location}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] group-hover:bg-[#C9A86B] flex items-center justify-center transition-colors shrink-0 order-1 sm:order-2">
                  <ChevronRight className="w-5 h-5 text-[#1A1A18] group-hover:text-black transition-colors" />
                </div>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}
