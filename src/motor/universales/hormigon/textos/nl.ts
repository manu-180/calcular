import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosNl: TextosUi<UiHormigon> = {
  slug: "beton-berekenen",
  ui: () => ({
    largo: (u) => `Lengte (${u})`,
    ancho: (u) => `Breedte (${u})`,
    espesor: (u) => `Dikte (${u})`,
    espesorAyuda: "Een terras of tuinpad is meestal 10 cm dik. Een oprit 12 tot 15 cm.",
    margen: "Extra marge (%)",
    margenAyuda: "Voor een ongelijke ondergrond en wat je morst. Meestal 5% tot 10%.",
    bolsa: (u) => `Gewicht van een zak cement (${u})`,
    volumen: (u) => `Precieze hoeveelheid (${u})`,
    volumenTotal: (u) => `Benodigd beton (${u})`,
    volumenPies: "Benodigd beton (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Zakken cement",
    arena: (u) => `Zand (${u})`,
    piedra: (u) => `Grind (${u})`,
    agua: (u) => (u === "L" ? "Water (liter)" : "Water (gallon)"),
    errorMedida: "Deze maat moet groter zijn dan 0.",
    aviso: "De materialen zijn een richtlijn voor een gewone mengverhouding van 1:2:3 (ongeveer 350 kg cement per m³). Ze hangen af van het mengsel, het werk en de materialen die je gebruikt. Overleg ze met wie het werk uitvoert.",
  }),
};
