"use client";

import dynamic from "next/dynamic";

const ScaleShellInner = dynamic(() => import("./ScaleShellInner"), {
  ssr: false,
});

export default function ScaleShell({ children }: { children: React.ReactNode }) {
  return <ScaleShellInner>{children}</ScaleShellInner>;
}
