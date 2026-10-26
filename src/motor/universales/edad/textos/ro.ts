import { pluralRo } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionRo } from "../../dias-entre-fechas/textos/ro";
import type { UiEdad } from "../definicion";

export const textosRo: TextosUi<UiEdad> = {
  slug: "calculator-varsta",
  ui: () => ({
    nacimiento: "Data nașterii",
    referencia: "Vârsta la data de",
    referenciaAyuda: "Implicit este ziua de azi. Schimbați-o ca să vedeți vârsta la altă dată.",
    edad: "Vârsta",
    anios: "Ani împliniți",
    totalMeses: "În luni",
    totalSemanas: "În săptămâni",
    totalDias: "În zile",
    proximo: "Următoarea zi de naștere",
    faltan: "Zile rămase",
    cumplira: "Va împlini",
    duracion: duracionRo,
    errorFutura: "Data nașterii nu poate fi după data pentru care calculați vârsta.",
    cumpleHoy: (anios) => `Azi este ziua de naștere: ${pluralRo(anios, "an împlinit", "ani împliniți")}.`,
    nota29: "Pentru cei născuți pe 29 februarie, în anii care nu sunt bisecți ziua de naștere se socotește pe 28 februarie.",
  }),
};
