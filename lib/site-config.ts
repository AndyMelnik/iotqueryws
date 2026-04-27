import siteConfig from "@/content/site-config.json";

export type SiteCard = {
  title: string;
  text?: string;
  href?: string;
  examples?: string[];
  interfacePreview?: string[];
};

export type SiteSection = {
  title: string;
  description?: string;
  columns?: 2 | 3 | 4;
  bullets?: string[];
  cards?: SiteCard[];
  metrics?: { value: string; label: string }[];
  kpiStrip?: string[];
  relatedLinks?: { label: string; href: string; text?: string }[];
  outcomeRows?: {
    title: string;
    subtitle: string;
    stats: { value: string; label: string }[];
    context: string[];
  }[];
};

export type SitePage = {
  slug: string;
  title: string;
  subtitle?: string;
  heroHeadline: string;
  heroIntroLine?: string;
  heroRotatingPhrases?: string[];
  ctas?: { label: string; href: string }[];
  proof?: string[];
  metricCards?: { value: string; label: string }[];
  sections?: SiteSection[];
};

export type SiteNavItem = {
  label: string;
  href: string;
  children?: SiteNavItem[];
};

type SiteConfig = {
  navigation: SiteNavItem[];
  pages: SitePage[];
};

const config = siteConfig as SiteConfig;

export const siteNavigation = config.navigation;
export const sitePages = config.pages;

export function getPageByPath(path: string): SitePage | undefined {
  return sitePages.find((page) => page.slug === path);
}

export function getAllPaths(): string[] {
  return sitePages.map((page) => page.slug);
}
