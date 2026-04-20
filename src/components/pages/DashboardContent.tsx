"use client";

import {
  ScaleAlert,
  ScaleButton,
  ScaleCard,
  ScaleDivider,
  ScaleProgressBar,
  ScaleTag,
} from "@telekom/scale-components-react";

const stats = [
  { label: "Besucher heute", value: "1.247", change: "+12%", progress: 62 },
  { label: "Neue Kunden", value: "38", change: "+5%", progress: 38 },
  { label: "Umsatz", value: "€ 24.500", change: "+18%", progress: 75 },
  { label: "Tickets offen", value: "7", change: "-3", progress: 15 },
];

const recentActivity = [
  { action: "Neuer Kunde registriert", time: "vor 5 Min.", type: "success" },
  {
    action: "Bestellung #4521 abgeschlossen",
    time: "vor 12 Min.",
    type: "info",
  },
  { action: "Support-Ticket erstellt", time: "vor 25 Min.", type: "warning" },
  { action: "Zahlung eingegangen", time: "vor 1 Std.", type: "success" },
  { action: "Server-Wartung geplant", time: "vor 2 Std.", type: "info" },
];

export default function DashboardContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">
        Übersicht über Ihre wichtigsten Kennzahlen
      </p>

      <ScaleAlert variant="informational" opened className="mb-8">
        Willkommen zurück! Sie haben 3 neue Benachrichtigungen.
      </ScaleAlert>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <ScaleCard key={stat.label}>
            <div className="p-5">
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-end justify-between mb-3">
                <span className="text-2xl font-bold">{stat.value}</span>
                <ScaleTag size="small">{stat.change}</ScaleTag>
              </div>
              <ScaleProgressBar percentage={stat.progress} showStatus />
            </div>
          </ScaleCard>
        ))}
      </div>

      <ScaleDivider className="my-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Letzte Aktivitäten</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <ScaleCard key={i}>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-gray-400">{item.time}</p>
                  </div>
                  <ScaleTag
                    size="small"
                    color={
                      item.type === "success"
                        ? "green"
                        : item.type === "warning"
                          ? "yellow"
                          : "cyan"
                    }
                  >
                    {item.type}
                  </ScaleTag>
                </div>
              </ScaleCard>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Schnellaktionen</h2>
          <ScaleCard>
            <div className="p-6 space-y-4">
              <ScaleButton className="w-full">Neuen Kunden anlegen</ScaleButton>
              <ScaleButton variant="secondary" className="w-full">
                Bericht exportieren
              </ScaleButton>
              <ScaleButton variant="secondary" className="w-full">
                Einstellungen öffnen
              </ScaleButton>
            </div>
          </ScaleCard>
        </div>
      </div>
    </div>
  );
}
