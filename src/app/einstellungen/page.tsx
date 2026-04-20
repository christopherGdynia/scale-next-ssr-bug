"use client";

import dynamic from "next/dynamic";

const EinstellungenContent = dynamic(() => import("@/components/pages/EinstellungenContent"), {
  ssr: false,
});

export default function EinstellungenPage() {
  return <EinstellungenContent />;
}
