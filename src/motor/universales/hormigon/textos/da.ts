import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosDa: TextosUi<UiHormigon> = {
  slug: "betonberegner",
  ui: () => ({
    largo: (u) => `Længde (${u})`,
    ancho: (u) => `Bredde (${u})`,
    espesor: (u) => `Tykkelse (${u})`,
    espesorAyuda: "Et fundament til en terrasse eller sti er ofte 10 cm (4 in). En indkørsel 12 til 15 cm.",
    margen: "Ekstra tillæg (%)",
    margenAyuda: "Til ujævnt underlag og spild. 5 til 10 % er det normale.",
    bolsa: (u) => `Cementsækkens vægt (${u})`,
    volumen: (u) => `Præcis mængde (${u})`,
    volumenTotal: (u) => `Beton, du skal bruge (${u})`,
    volumenPies: "Beton, du skal bruge (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Sække cement",
    arena: (u) => `Sand (${u})`,
    piedra: (u) => `Sten eller skærver (${u})`,
    agua: (u) => (u === "L" ? "Vand (liter)" : "Vand (gallon)"),
    errorMedida: "Målet skal være større end 0.",
    aviso: "Mængderne er vejledende for en almindelig blanding 1:2:3 (cirka 350 kg cement pr. m³). De ændrer sig med opskrift, type arbejde og de materialer, du kan få. Tjek dem med den, der står for arbejdet.",
  }),
};
