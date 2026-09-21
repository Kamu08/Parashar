export type FixtureType =
  | "Pendants"
  | "Chandeliers"
  | "Sconces"
  | "Surface/Flush"
  | "Table & Floor";

export type SpatialArea =
  | "Living Room"
  | "Dining & Island"
  | "Bedside"
  | "Foyer"
  | "Outdoor/Hospitality";

export type StyleTheme =
  | "Warm Minimalist"
  | "Brutalist Brass"
  | "Sculptural Glass";

export type WarmthOption =
  | "2700K Warm White"
  | "3000K Soft Warm"
  | "2200K Candlelight Warm";

export type FinishOption =
  | "Brushed Solid Brass"
  | "Aged Antique Brass"
  | "Burnished Bronze"
  | "Hand-Blown Smoked Glass"
  | "Polished Chrome";

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  fixtureType: FixtureType;
  spatialArea: SpatialArea[];
  styleTheme: StyleTheme;
  warmthOptions: WarmthOption[];
  finishes: FinishOption[];
  images: string[];
  dimensions: string;
  leadTime: string;
  craftsmanshipNotes: string;
  specSheetUrl?: string;
  isFeatured?: boolean;
  heroHotspot?: { x: number; y: number }; // Percentage offsets for hotspot tags
}

export type ProjectCategory =
  | "All Projects"
  | "Private Residences"
  | "Hospitality & Dining"
  | "Commercial & Retail";

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Private Residences" | "Hospitality & Dining" | "Commercial & Retail";
  location: string;
  clientArchitect: string;
  coverImage: string;
  gallery: string[];
  description: string;
  taggedFixtureSlugs: string[];
  isFeatured?: boolean;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Craftsmanship" | "Finishes" | "Custom Capabilities";
  content: string[];
  image: string;
  quote?: string;
}

export interface InquiryItem {
  product: Product;
  selectedFinish: FinishOption;
  selectedWarmth: WarmthOption;
  quantity: number;
}
