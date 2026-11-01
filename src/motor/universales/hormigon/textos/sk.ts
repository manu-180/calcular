import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosSk: TextosUi<UiHormigon> = {
  slug: "kalkulacka-betonu",
  ui: () => ({
    largo: (u) => `Dĺžka (${u})`,
    ancho: (u) => `Šírka (${u})`,
    espesor: (u) => `Hrúbka (${u})`,
    espesorAyuda: "Na terasu alebo chodník sa zvyčajne robí 10 cm (4 in), na príjazd pre auto 12 až 15 cm.",
    margen: "Rezerva (%)",
    margenAyuda: "Na nerovný podklad a straty betónu. Zvyčajne 5 až 10 %.",
    bolsa: (u) => `Hmotnosť vreca cementu (${u})`,
    volumen: (u) => `Presný objem (${u})`,
    volumenTotal: (u) => `Potreba betónu (${u})`,
    volumenPies: "Potreba betónu (ft³)",
    cemento: (u) => `Cement (${u})`,
    bolsas: "Vriec cementu (ks)",
    arena: (u) => `Piesok (${u})`,
    piedra: (u) => `Štrk (${u})`,
    agua: (u) => (u === "L" ? "Voda (litre)" : "Voda (galóny)"),
    errorMedida: "Tento rozmer musí byť väčší ako nula.",
    aviso: "Množstvo materiálu je orientačné pre bežnú zmes 1 : 2 : 3 (asi 350 kg cementu na 1 m³). Závisí od pomeru zmesi, druhu práce a miestnych materiálov: overte si ho u stavbyvedúceho alebo statika.",
  }),
};
