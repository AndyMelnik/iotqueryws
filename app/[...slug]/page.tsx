import { notFound } from "next/navigation";
import { getAllPaths, getPageByPath } from "@/lib/site-config";
import SiteNavbar from "@/components/site/SiteNavbar";
import SiteFooter from "@/components/site/SiteFooter";
import PageTemplate from "@/components/site/PageTemplate";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getAllPaths()
    .filter((path) => path !== "/")
    .map((path) => ({ slug: path.replace(/^\//, "").split("/") }));
}

export default async function SitePage({ params }: Props) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const page = getPageByPath(path);

  if (!page) {
    notFound();
  }

  return (
    <>
      <SiteNavbar />
      <PageTemplate page={page} />
      <SiteFooter />
    </>
  );
}
