"use client";

import {
  ScaleAlert,
  ScaleButton,
  ScaleCard,
  ScaleCheckbox,
  ScaleDatePicker,
  ScaleDivider,
  ScaleDropdownSelect,
  ScaleDropdownSelectItem,
  ScaleRadioButton,
  ScaleRadioButtonGroup,
  ScaleSwitch,
  ScaleTextField,
  ScaleTextarea,
} from "@telekom/scale-components-react";
import { useState } from "react";

export default function FormulareContent() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Formulare</h1>
      <p className="text-gray-500 mb-8">
        Beispielformulare mit verschiedenen Scale-Eingabekomponenten
      </p>

      {submitted && (
        <ScaleAlert variant="success" opened className="mb-6">
          Formular erfolgreich abgesendet!
        </ScaleAlert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kontaktformular */}
        <ScaleCard>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Kontaktformular</h2>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <ScaleTextField
                label="Vorname"
                onScaleBlur={() => {
                  console.log("test");
                }}
                required
              />
              <ScaleTextField label="Nachname" required />
              <ScaleTextField label="E-Mail" type="email" required />
              <ScaleTextField label="Telefon" type="tel" />
              <ScaleTextarea label="Nachricht" rows={4} required />
              <ScaleCheckbox label="Ich stimme den Datenschutzbestimmungen zu" />
              <ScaleButton type="submit">Absenden</ScaleButton>
            </form>
          </div>
        </ScaleCard>

        {/* Registrierung */}
        <ScaleCard>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Registrierung</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <ScaleTextField label="Benutzername" required />
              <ScaleTextField label="Passwort" type="password" required />
              <ScaleTextField
                label="Passwort bestätigen"
                type="password"
                required
              />

              <ScaleDatePicker label="Geburtsdatum" />

              <ScaleDropdownSelect label="Land">
                <ScaleDropdownSelectItem value="de">
                  Deutschland
                </ScaleDropdownSelectItem>
                <ScaleDropdownSelectItem value="at">
                  Österreich
                </ScaleDropdownSelectItem>
                <ScaleDropdownSelectItem value="ch">
                  Schweiz
                </ScaleDropdownSelectItem>
              </ScaleDropdownSelect>

              <ScaleRadioButtonGroup label="Geschlecht">
                <ScaleRadioButton label="Männlich" value="m" />
                <ScaleRadioButton label="Weiblich" value="w" />
                <ScaleRadioButton label="Divers" value="d" />
              </ScaleRadioButtonGroup>

              <ScaleSwitch label="Newsletter abonnieren" />

              <ScaleDivider />

              <div className="flex gap-3">
                <ScaleButton>Registrieren</ScaleButton>
                <ScaleButton variant="secondary">Abbrechen</ScaleButton>
              </div>
            </form>
          </div>
        </ScaleCard>
      </div>
    </div>
  );
}
