"use client";

import {
  ScaleAlert,
  ScaleButton,
  ScaleCard,
  ScaleCheckbox,
  ScaleCheckboxGroup,
  ScaleDivider,
  ScaleDropdownSelect,
  ScaleDropdownSelectItem,
  ScaleRadioButton,
  ScaleRadioButtonGroup,
  ScaleSlider,
  ScaleSwitch,
  ScaleTextField,
} from "@telekom/scale-components-react";
import { useState } from "react";

export default function EinstellungenContent() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Einstellungen</h1>
      <p className="text-gray-500 mb-8">
        Passen Sie die Anwendung nach Ihren Wünschen an
      </p>

      {saved && (
        <ScaleAlert
          variant="success"
          opened
          className="mb-6"
        >
          Einstellungen erfolgreich gespeichert!
        </ScaleAlert>
      )}

      <div className="space-y-8">
        {/* Profil */}
        <ScaleCard>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Profil</h2>
            <div className="space-y-5">
              <ScaleTextField label="Anzeigename" value="Max Mustermann" />
              <ScaleTextField
                label="E-Mail-Adresse"
                type="email"
                value="max.mustermann@telekom.de"
              />
              <ScaleDropdownSelect label="Sprache">
                <ScaleDropdownSelectItem value="de" selected>
                  Deutsch
                </ScaleDropdownSelectItem>
                <ScaleDropdownSelectItem value="en">
                  English
                </ScaleDropdownSelectItem>
                <ScaleDropdownSelectItem value="fr">
                  Français
                </ScaleDropdownSelectItem>
              </ScaleDropdownSelect>
              <ScaleDropdownSelect label="Zeitzone">
                <ScaleDropdownSelectItem value="cet" selected>
                  MEZ (UTC+1)
                </ScaleDropdownSelectItem>
                <ScaleDropdownSelectItem value="utc">
                  UTC
                </ScaleDropdownSelectItem>
              </ScaleDropdownSelect>
            </div>
          </div>
        </ScaleCard>

        {/* Benachrichtigungen */}
        <ScaleCard>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Benachrichtigungen</h2>
            <div className="space-y-4">
              <ScaleSwitch label="E-Mail-Benachrichtigungen" checked />
              <ScaleSwitch label="Push-Benachrichtigungen" />
              <ScaleSwitch label="SMS-Benachrichtigungen" />
              <ScaleDivider className="my-4" />
              <ScaleCheckboxGroup label="Benachrichtigungstypen">
                <ScaleCheckbox label="System-Updates" checked />
                <ScaleCheckbox label="Marketing" />
                <ScaleCheckbox label="Sicherheitswarnungen" checked />
                <ScaleCheckbox label="Newsletter" />
              </ScaleCheckboxGroup>
            </div>
          </div>
        </ScaleCard>

        {/* Darstellung */}
        <ScaleCard>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Darstellung</h2>
            <div className="space-y-5">
              <ScaleSlider
                label="Schriftgröße"
                min={12}
                max={24}
                value={16}
                showValue
              />
              <ScaleRadioButtonGroup label="Farbschema">
                <ScaleRadioButton label="Hell" value="light" checked />
                <ScaleRadioButton label="Dunkel" value="dark" />
                <ScaleRadioButton label="System" value="system" />
              </ScaleRadioButtonGroup>
              <ScaleSwitch label="Animationen aktivieren" checked />
              <ScaleSwitch label="Kompakte Ansicht" />
            </div>
          </div>
        </ScaleCard>

        {/* Datenschutz */}
        <ScaleCard>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Datenschutz</h2>
            <div className="space-y-4">
              <ScaleSwitch label="Nutzungsstatistiken teilen" />
              <ScaleSwitch label="Cookies erlauben" checked />
              <ScaleSwitch label="Personalisierte Werbung" />
            </div>
          </div>
        </ScaleCard>

        <ScaleDivider />

        <div className="flex gap-4 justify-end">
          <ScaleButton variant="secondary">Abbrechen</ScaleButton>
          <ScaleButton onClick={() => setSaved(true)}>Speichern</ScaleButton>
        </div>
      </div>
    </div>
  );
}
