import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import { duracionDe } from "../../dias-entre-fechas/textos/de";
import type { UiEdad } from "../definicion";

const textos: TextosUi<UiEdad> = {
  slug: "altersrechner",
  ui: () => ({
    nacimiento: "Geburtsdatum",
    referencia: "Alter am",
    referenciaAyuda: "Voreingestellt ist heute. Ändern Sie das Datum, um das Alter an einem anderen Tag zu sehen.",
    edad: "Alter",
    anios: "Alter in Jahren",
    totalMeses: "In Monaten",
    totalSemanas: "In Wochen",
    totalDias: "In Tagen",
    proximo: "Nächster Geburtstag",
    faltan: "Tage bis zum Geburtstag",
    cumplira: "Alter am nächsten Geburtstag",
    duracion: duracionDe,
    errorFutura: "Das Geburtsdatum darf nicht nach dem gewählten Datum liegen.",
    cumpleHoy: (anios) => `Heute ist der ${anios}. Geburtstag.`,
    nota29: "Wer am 29. Februar geboren ist, hat in Jahren ohne Schalttag hier am 28. Februar Geburtstag.",
  }),
};

export const textosDe = textosConSuiza(textos);
