import type { Metadata } from "next";
import "./globals.css";
import "@telekom/scale-components/dist/scale-components/scale-components.css";

export const metadata: Metadata = {
  title: "Telekom Scale Demo",
  description: "Next.js App mit Telekom Scale Components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full flex flex-col bg-white">
        {children}
      </body>
    </html>
  );
}
