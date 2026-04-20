"use client";

import {
  ScaleBadge,
  ScaleButton,
  ScaleCard,
  ScaleDivider,
  ScaleRatingStars,
  ScaleTag,
} from "@telekom/scale-components-react";

const products = [
  {
    name: "MagentaZuhause M",
    description: "Internet-Flatrate mit bis zu 50 Mbit/s im Download.",
    price: "34,95 €/Monat",
    tag: "Beliebt",
    rating: 4,
  },
  {
    name: "MagentaZuhause L",
    description: "Internet-Flatrate mit bis zu 100 Mbit/s im Download.",
    price: "39,95 €/Monat",
    tag: "Empfohlen",
    rating: 5,
  },
  {
    name: "MagentaZuhause XL",
    description: "Internet-Flatrate mit bis zu 250 Mbit/s im Download.",
    price: "44,95 €/Monat",
    tag: "Premium",
    rating: 5,
  },
  {
    name: "MagentaMobil S",
    description: "Mobilfunktarif mit 6 GB Datenvolumen und Allnet-Flat.",
    price: "29,95 €/Monat",
    tag: "Mobil",
    rating: 3,
  },
  {
    name: "MagentaMobil M",
    description: "Mobilfunktarif mit 12 GB Datenvolumen und Allnet-Flat.",
    price: "39,95 €/Monat",
    tag: "Mobil",
    rating: 4,
  },
  {
    name: "MagentaTV Smart",
    description: "Über 50 HD-Sender, Megathek und Streaming-Dienste inklusive.",
    price: "10,00 €/Monat",
    tag: "Entertainment",
    rating: 4,
  },
];

export default function ProdukteContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Produkte</h1>
      <p className="text-gray-500 mb-8">Unsere aktuellen Tarife und Angebote</p>

      <div className="flex flex-wrap gap-3 mb-8">
        <ScaleButton size="small">Alle</ScaleButton>
        <ScaleButton size="small" variant="secondary">
          Internet
        </ScaleButton>
        <ScaleButton size="small" variant="secondary">
          Mobil
        </ScaleButton>
        <ScaleButton size="small" variant="secondary">
          TV
        </ScaleButton>
      </div>

      <ScaleDivider className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ScaleCard key={product.name}>
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <ScaleTag size="small">{product.tag}</ScaleTag>
              </div>
              <p className="text-gray-600 text-sm mb-4 flex-1">
                {product.description}
              </p>
              <ScaleRatingStars starSize="small" rating={product.rating} />
              <ScaleDivider className="my-4" />
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{product.price}</span>
                <ScaleButton size="small">Auswählen</ScaleButton>
              </div>
            </div>
          </ScaleCard>
        ))}
      </div>

      <div className="mt-12 text-center">
        <ScaleBadge className="inline-block">
          <span className="px-4 py-2">6 Produkte verfügbar</span>
        </ScaleBadge>
      </div>
    </div>
  );
}
