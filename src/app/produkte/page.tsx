"use client";

import dynamic from "next/dynamic";

const ProdukteContent = dynamic(
  () => import("@/components/pages/ProdukteContent"),
  {
    ssr: false,
  },
);

export default function ProduktePage() {
  return <ProdukteContent />;
}
