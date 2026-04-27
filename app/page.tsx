import { getPageByPath } from "@/lib/site-config";
import SiteNavbar from "@/components/site/SiteNavbar";
import SiteFooter from "@/components/site/SiteFooter";
import PageTemplate from "@/components/site/PageTemplate";

export default function Home() {
  const page = getPageByPath("/");

  if (!page) {
    return null;
  }

  return (
    <>
      <SiteNavbar />
      <PageTemplate page={page} />
      <SiteFooter />
    </>
  );
}
