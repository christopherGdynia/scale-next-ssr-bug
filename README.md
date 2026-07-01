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

## ~~Warum `next/dynamic` mit `ssr: false`?~~ (Gelöst ab beta.160)

> **Update:** Ab `@telekom/scale-components-react@3.0.0-beta.160` ist `next/dynamic` mit `ssr: false` **nicht mehr nötig**. Das Paket liefert jetzt eine `react-server` Export-Condition, die Next.js automatisch beim SSR nutzt. Alle Pages können Scale-Komponenten direkt importieren.
>
> **TypeScript-Typen (gelöst ab beta.161):** beta.160 hatte einen **Bug in den TypeScript-Definitionen** — der `Props`-Generic wurde nicht an `StencilReactComponent` durchgereicht, sodass alle Component-Props als `Partial<{}>` aufgelöst wurden. Ab `3.0.0-beta.161` ist dies behoben (die generierten Wrapper reichen jetzt `Components.*` als dritten Generic durch). Der Workaround `typescript.ignoreBuildErrors: true` in `next.config.ts` wurde entfernt.

### Hintergrund (vor beta.160)

Das Paket `@telekom/scale-components-react` basiert auf [Stencil](https://stenciljs.com/) Web Components. Vor beta.160 griff der generierte Code beim **Import des Moduls** direkt auf das globale `document`-Objekt zu — z.B. um Custom Elements zu registrieren.

Next.js rendert Pages standardmäßig **serverseitig in Node.js** (SSR/Static Generation). In dieser Umgebung existiert kein `document`, was zu folgendem Fehler führte:

```
ReferenceError: document is not defined
```

Die damalige Lösung war `next/dynamic` mit `ssr: false` in jeder Page-Datei. Ab beta.160 ist das überflüssig.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
