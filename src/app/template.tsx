"use client";

import dynamic from "next/dynamic";

const ScaleShellInner = dynamic(() => import("@/components/ScaleShellInner"), {
  ssr: false,
});

export default function Template({ children }: { children: React.ReactNode }) {
  return <ScaleShellInner>{children}</ScaleShellInner>;
}
