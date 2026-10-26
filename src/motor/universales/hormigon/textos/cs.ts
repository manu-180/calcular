import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosCs: TextosUi<UiHormigon> = {
  slug: "kalkulacka-betonu",
  ui: () => ({
    largo: (u) => `Délka (${u})`,
    ancho: (u) => `Šířka (${u})`,
    espesor: (u) => `Tloušťka (${u})`,
    espesorAyuda: "Na terasu nebo chodník se obvykle dělá 10 cm (4 in), na příjezd pro auto 12 až 15 cm.",
    margen: "Rezerva (%)",
    margenAyuda: "Na nerovný podklad a ztráty betonu. Obvykle 5 až 10 %.",
    bolsa: (u) => `Hmotnost pytle cementu (${u})`,
    volumen: (u) => `Přesný objem (${u})`,
    volumenTotal: (u) => `Potřeba betonu (${u})`,
    volumenPies: "Potřeba betonu (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Pytlů cementu (ks)",
    arena: (u) => `Písek (${u})`,
    piedra: (u) => `Štěrk (${u})`,
    agua: (u) => (u === "L" ? "Voda (litry)" : "Voda (galony)"),
    errorMedida: "Tento rozměr musí být větší než nula.",
    aviso: "Množství materiálu je orientační pro běžnou směs 1 : 2 : 3 (asi 350 kg cementu na 1 m³). Závisí na poměru směsi, druhu práce a místních materiálech: ověřte si ho u stavbyvedoucího nebo statika.",
  }),
};
