"use client";

import {
  ScaleButton,
  ScaleCard,
  ScaleTag,
} from "@telekom/scale-components-react";
import Link from "next/link";

const features = [
  {
    title: "Dashboard",
    description:
      "Übersicht über alle wichtigen Kennzahlen und Statistiken auf einen Blick.",
    href: "/dashboard",
    tag: "Analyse",
  },
  {
    title: "Formulare",
    description:
      "Beispielformulare mit Validierung und verschiedenen Eingabetypen.",
    href: "/formulare",
    tag: "Interaktiv",
  },
  {
    title: "Produkte",
    description: "Produktkatalog mit Karten, Filtern und Detailansichten.",
    href: "/produkte",
    tag: "Katalog",
  },
  {
    title: "Team",
    description: "Teamübersicht mit Mitgliederkarten und Kontaktinformationen.",
    href: "/team",
    tag: "Personen",
  },
  {
    title: "Einstellungen",
    description: "Konfigurationsoptionen mit Schaltern, Dropdowns und Slidern.",
    href: "/einstellungen",
    tag: "Konfiguration",
  },
];

export default function HomeContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Willkommen zur Scale Demo</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Eine Next.js-Anwendung mit Telekom Scale Components und Tailwind CSS.
          Entdecken Sie die verschiedenen Komponenten und Funktionen.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <ScaleButton>Zum Dashboard</ScaleButton>
          </Link>
          <Link href="/formulare">
            <ScaleButton variant="secondary">Formulare ansehen</ScaleButton>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-8 text-center">Seiten</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <ScaleCard key={feature.href} className="block">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <ScaleTag size="small">{feature.tag}</ScaleTag>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link href={feature.href}>
                  <ScaleButton size="small" variant="secondary">
                    Öffnen →
                  </ScaleButton>
                </Link>
              </div>
            </ScaleCard>
          ))}
        </div>
      </section>
    </div>
  );
}
