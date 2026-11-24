import type { TextosUi } from "../../tipos";
import { duracionMk } from "../../dias-entre-fechas/textos/mk";
import type { UiEdad } from "../definicion";

export const textosMk: TextosUi<UiEdad> = {
  slug: "kalkulator-za-vozrast",
  ui: () => ({
    nacimiento: "Датум на раѓање",
    referencia: "Возраст на датум",
    referenciaAyuda: "Стандардно е денешниот датум. Променете го за да ја видите возраста на друг датум.",
    edad: "Возраст",
    anios: "Наполнети години",
    totalMeses: "Во месеци",
    totalSemanas: "Во недели",
    totalDias: "Во денови",
    proximo: "Следен роденден",
    faltan: "Преостанати денови",
    cumplira: "Ќе наполни",
    duracion: duracionMk,
    errorFutura: "Датумот на раѓање не може да биде по датумот на кој ја проверувате возраста.",
    cumpleHoy: (anios) => `Денес е роденденот. Наполнети години: ${anios}.`,
    nota29: "За родените на 29 февруари, роденденот во непрестапните години се брои на 28 февруари.",
  }),
};
