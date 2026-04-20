This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Warum `next/dynamic` mit `ssr: false`?

### Das Problem

Das Paket `@telekom/scale-components-react` basiert auf [Stencil](https://stenciljs.com/) Web Components. Beim **Import des Moduls** (nicht erst beim Rendern) greift der generierte Code direkt auf das globale `document`-Objekt zu — z.B. um Custom Elements zu registrieren oder DOM-APIs zu nutzen.

Next.js rendert Pages standardmäßig **serverseitig in Node.js** (SSR/Static Generation). In dieser Umgebung existiert kein `document`, was sofort zu folgendem Fehler führt:

```
ReferenceError: document is not defined
```

Dieser Fehler tritt bereits beim **Evaluieren des Moduls** auf — also noch bevor irgendeine Komponente gerendert wird. Ein einfaches `"use client"` reicht **nicht** aus, da Next.js auch Client Components zunächst auf dem Server pre-rendert.

### Die Lösung

Jede Page-Datei (`src/app/*/page.tsx`) importiert ihren eigentlichen Inhalt über `next/dynamic` mit `ssr: false`:

```tsx
import dynamic from "next/dynamic";

const DashboardContent = dynamic(
  () => import("@/components/pages/DashboardContent"),
  { ssr: false },
);
```

Das bewirkt:

- Das Modul wird **ausschließlich im Browser** geladen
- Beim SSR/Build wird die Komponente übersprungen
- Die Scale-Components funktionieren korrekt, da `document` im Browser verfügbar ist

### Was passiert, wenn man `ssr: false` entfernt?

Der **Build schlägt fehl** (`npm run build`):

```
Error: Failed to load external module @telekom/scale-components-react:
ReferenceError: document is not defined
    at instantiateModule (...)
    at getOrInstantiateModuleFromParent (...)

Export encountered an error on /dashboard/page: /dashboard, exiting the build.
```

Der gleiche Fehler tritt auch im Dev-Server beim ersten Laden einer Seite auf.

### Langfristige Lösung

Dieses Problem liegt im Upstream-Paket. Wenn `@telekom/scale-components-react` einen Guard wie `typeof document !== "undefined"` beim Modul-Import verwenden würde, wäre `next/dynamic` nicht nötig und die Komponenten könnten direkt importiert werden. Das ist ein bekanntes Problem bei Stencil-basierten Web-Component-Wrappern.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
