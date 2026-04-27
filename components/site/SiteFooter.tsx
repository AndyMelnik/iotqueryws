import Link from "next/link";
import { siteNavigation } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="relative pt-14 pb-10 px-4">
      <div className="neon-divider mb-10" />
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-sm" style={{ color: "rgba(224,234,255,0.6)" }}>
            IoT Query decision intelligence for fleets, assets and connected operations.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {siteNavigation.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm" style={{ color: "rgba(224,234,255,0.75)" }}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
