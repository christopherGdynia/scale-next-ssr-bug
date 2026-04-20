"use client";

import {
  ScaleTelekomFooter,
  ScaleTelekomFooterContent,
  ScaleTelekomHeader,
  ScaleTelekomNavItem,
} from "@telekom/scale-components-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Startseite" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/formulare", label: "Formulare" },
  { href: "/produkte", label: "Produkte" },
  { href: "/team", label: "Team" },
  { href: "/einstellungen", label: "Einstellungen" },
];

export default function ScaleShellInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("@telekom/scale-components/loader").then((mod) => {
      mod.defineCustomElements(window);
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return (
    <>
      <ScaleTelekomHeader appName="Scale Demo" appNameLink="/">
        <nav slot="main-nav">
          {navItems.map((item) => (
            <ScaleTelekomNavItem
              key={item.href}
              active={pathname === item.href}
            >
              <Link href={item.href}>{item.label}</Link>
            </ScaleTelekomNavItem>
          ))}
        </nav>
      </ScaleTelekomHeader>
      <main className="flex-1">{children}</main>
      <ScaleTelekomFooter>
        <ScaleTelekomFooterContent>
          <span slot="notice">
            © Deutsche Telekom AG {new Date().getFullYear()}
          </span>
          <ul slot="navigation">
            <li>
              <a href="#">Impressum</a>
            </li>
            <li>
              <a href="#">Datenschutz</a>
            </li>
            <li>
              <a href="#">Kontakt</a>
            </li>
          </ul>
        </ScaleTelekomFooterContent>
      </ScaleTelekomFooter>
    </>
  );
}
