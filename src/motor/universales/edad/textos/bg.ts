import type { TextosUi } from "../../tipos";
import { duracionBg } from "../../dias-entre-fechas/textos/bg";
import type { UiEdad } from "../definicion";

export const textosBg: TextosUi<UiEdad> = {
  slug: "kalkulator-za-vazrast",
  ui: () => ({
    nacimiento: "Дата на раждане",
    referencia: "Възраст към дата",
    referenciaAyuda: "По подразбиране е днешната дата. Променете я, за да видите възрастта към друга дата.",
    edad: "Възраст",
    anios: "Навършени години",
    totalMeses: "В месеци",
    totalSemanas: "В седмици",
    totalDias: "В дни",
    proximo: "Следващ рожден ден",
    faltan: "Оставащи дни",
    cumplira: "Ще навърши",
    duracion: duracionBg,
    errorFutura: "Датата на раждане не може да е след датата, към която проверявате възрастта.",
    cumpleHoy: (anios) => `Днес е рожденият ден. Навършени години: ${anios}.`,
    nota29: "При родените на 29 февруари рожденият ден в невисокосните години се брои на 28 февруари.",
  }),
};
