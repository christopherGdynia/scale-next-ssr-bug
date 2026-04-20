"use client";

import dynamic from "next/dynamic";

const FormulareContent = dynamic(() => import("@/components/pages/FormulareContent"), {
  ssr: false,
});

export default function FormularePage() {
  return <FormulareContent />;
}
