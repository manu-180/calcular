import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

const textos: TextosUi<UiHormigon> = {
  slug: "betonrechner",
  ui: () => ({
    largo: (u) => `Länge (${u})`,
    ancho: (u) => `Breite (${u})`,
    espesor: (u) => `Dicke (${u})`,
    espesorAyuda: "Für eine Terrasse oder einen Gehweg reichen meist 10 cm. Für eine Einfahrt eher 12 bis 15 cm.",
    margen: "Zuschlag (%)",
    margenAyuda: "Für Unebenheiten und Verluste beim Einbringen. Üblich sind 5 bis 10 %.",
    bolsa: (u) => `Gewicht eines Zementsacks (${u})`,
    volumen: (u) => `Genaues Volumen (${u})`,
    volumenTotal: (u) => `Benötigter Beton (${u})`,
    volumenPies: "Benötigter Beton (ft³)",
    cemento: (u) => `Zement (${u})`,
    bolsas: "Säcke Zement",
    arena: (u) => `Sand (${u})`,
    piedra: (u) => `Kies (${u})`,
    agua: (u) => (u === "L" ? "Wasser (Liter)" : "Wasser (Gallonen)"),
    errorMedida: "Dieser Wert muss über 0 liegen.",
    aviso: "Die Materialmengen sind ein Richtwert für eine Standardmischung 1:2:3 (etwa 350 kg Zement pro m³). Sie hängen von Rezeptur, Bauteil und den Baustoffen vor Ort ab. Stimmen Sie sie mit der Bauleitung oder dem Fachbetrieb ab.",
  }),
};

export const textosDe = textosConSuiza(textos);
