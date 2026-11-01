import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosSv: TextosUi<UiHormigon> = {
  slug: "betongkalkylator",
  ui: () => ({
    largo: (u) => `Längd (${u})`,
    ancho: (u) => `Bredd (${u})`,
    espesor: (u) => `Tjocklek (${u})`,
    espesorAyuda: "En platta för uteplats eller gång är ofta 10 cm (4 in). En uppfart 12 till 15 cm.",
    margen: "Extra marginal (%)",
    margenAyuda: "För ojämn mark och spill. 5 till 10 % är det vanliga.",
    bolsa: (u) => `Cementsäckens vikt (${u})`,
    volumen: (u) => `Exakt volym (${u})`,
    volumenTotal: (u) => `Betong som behövs (${u})`,
    volumenPies: "Betong som behövs (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Säckar cement",
    arena: (u) => `Sand (${u})`,
    piedra: (u) => `Sten eller makadam (${u})`,
    agua: (u) => (u === "L" ? "Vatten (liter)" : "Vatten (gallon)"),
    errorMedida: "Måttet måste vara större än 0.",
    aviso: "Materialmängderna är en vägledning för en allmän blandning 1:2:3 (ungefär 350 kg cement per m³). De ändras med recept, typ av arbete och material på orten. Stäm av dem med den som leder arbetet.",
  }),
};
