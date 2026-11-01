import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosSl: TextosUi<UiAumentoDeSueldo> = {
  slug: "kalkulator-povisice",
  ui: () => ({
    sueldo: "Sedanja mesečna plača",
    sueldoAyuda: "Bruto ali neto, kakor vam je lažje. Rezultat bo v enaki obliki.",
    aumentoPorcentaje: "Povišica (%)",
    aumentoMonto: "Povišica kot znesek (neobvezno)",
    aumentoMontoAyuda: "Če je povišica fiksen znesek, ga vnesite tukaj. Uporabi se namesto odstotka.",
    inflacion: "Inflacija v tem obdobju (%, neobvezno)",
    inflacionAyuda: "Inflacija od zadnje povišice, da vidite, ali s plačo kupite več ali manj kot prej.",
    sueldosAnio: "Število plač na leto",
    sueldosAnioAyuda: "12, če plačo prejemate mesečno. 13 ali 14, če vsako leto dobite tudi trinajsto ali štirinajsto plačo.",
    nuevo: "Nova mesečna plača",
    diferenciaMensual: "Razlika na mesec",
    diferenciaAnual: "Razlika na leto",
    porcentaje: "Povišica v odstotkih",
    real: "Realna povišica (po inflaciji)",
    realAyuda: "Koliko več kupite z novo plačo kot s prejšnjo.",
    errorSueldo: "Vnesite svojo sedanjo plačo.",
    errorSinAumento: "Vnesite povišico v odstotkih ali kot znesek.",
    observacionGana: (puntos) => `Vaša povišica je večja od inflacije: s plačo kupite ${puntos} % več kot prej.`,
    observacionPierde: (puntos) => `Vaša povišica ne pokrije inflacije: s plačo kupite ${puntos} % manj kot prej.`,
    observacionIgual: "Vaša povišica je enaka inflaciji: s plačo kupite enako kot prej.",
  }),
};
