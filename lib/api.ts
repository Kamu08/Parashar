export { MOCK_PRODUCTS, MOCK_PROJECTS, MOCK_STORIES, MOCK_CLIENT_LOGOS } from "./mock-data";
import { MOCK_PRODUCTS, MOCK_PROJECTS, MOCK_STORIES, MOCK_CLIENT_LOGOS } from "./mock-data";
import { Product, ProjectCaseStudy, Story, FixtureType, SpatialArea, StyleTheme, ProjectCategory } from "./types";

/**
 * WPGraphQL Abstraction API
 * Currently powered by strongly-typed mock data layer.
 * To connect Headless WordPress in Phase 2:
 * 1. Set NEXT_PUBLIC_WORDPRESS_API_URL in .env.local
 * 2. Replace mock return promises with fetch GraphQL queries.
 */

export async function getProducts(filters?: {
  fixtureType?: FixtureType | "All";
  spatialArea?: SpatialArea | "All";
  styleTheme?: StyleTheme | "All";
  search?: string;
}): Promise<Product[]> {
  let products = [...MOCK_PRODUCTS];

  if (!filters) return products;

  if (filters.fixtureType && filters.fixtureType !== "All") {
    products = products.filter((p) => p.fixtureType === filters.fixtureType);
  }

  if (filters.spatialArea && filters.spatialArea !== "All") {
    products = products.filter((p) => p.spatialArea.includes(filters.spatialArea as SpatialArea));
  }

  if (filters.styleTheme && filters.styleTheme !== "All") {
    products = products.filter((p) => p.styleTheme === filters.styleTheme);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS.filter((p) => p.isFeatured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getProjects(category?: ProjectCategory): Promise<ProjectCaseStudy[]> {
  if (!category || category === "All Projects") {
    return MOCK_PROJECTS;
  }
  return MOCK_PROJECTS.filter((proj) => proj.category === category);
}

export async function getProjectBySlug(slug: string): Promise<ProjectCaseStudy | null> {
  const proj = MOCK_PROJECTS.find((p) => p.slug === slug);
  return proj || null;
}

export async function getTaggedProductsForProject(taggedSlugs: string[]): Promise<Product[]> {
  return MOCK_PRODUCTS.filter((p) => taggedSlugs.includes(p.slug));
}

export async function getStories(): Promise<Story[]> {
  return MOCK_STORIES;
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  return MOCK_STORIES.find((s) => s.slug === slug) || null;
}

export async function getClientLogos() {
  return MOCK_CLIENT_LOGOS;
}
