import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosHu: TextosUi<UiHormigon> = {
  slug: "beton-kalkulator",
  ui: () => ({
    largo: (u) => `Hossz (${u})`,
    ancho: (u) => `Szélesség (${u})`,
    espesor: (u) => `Vastagság (${u})`,
    espesorAyuda: "Egy terasz vagy járda általában 10 cm (4 in) vastag, egy kocsibeálló 12 és 15 cm között.",
    margen: "Ráhagyás (%)",
    margenAyuda: "Az egyenetlen talajra és a kiömlő betonra. Általában 5% és 10% között.",
    bolsa: (u) => `Egy zsák cement tömege (${u})`,
    volumen: (u) => `Pontos térfogat (${u})`,
    volumenTotal: (u) => `Szükséges beton (${u})`,
    volumenPies: "Szükséges beton (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Zsák cement",
    arena: (u) => `Homok (${u})`,
    piedra: (u) => `Kavics (${u})`,
    agua: (u) => (u === "L" ? "Víz (liter)" : "Víz (gallon)"),
    errorMedida: "Ennek a méretnek nullánál nagyobbnak kell lennie.",
    aviso: "Az anyagmennyiség általános célú, 1:2:3 arányú keverékre szóló tájékoztató érték (köbméterenként nagyjából 350 kg cement). A keverési aránytól, a munkától és a helyi anyagoktól függően változik: egyeztesd azzal, aki a munkát vezeti.",
  }),
};
