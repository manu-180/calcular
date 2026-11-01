import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosHr: TextosUi<UiAumentoDeSueldo> = {
  slug: "kalkulator-povisice",
  ui: () => ({
    sueldo: "Sadašnja mjesečna plaća",
    sueldoAyuda: "Bruto ili neto, kako vam je lakše. Rezultat će biti u istom obliku.",
    aumentoPorcentaje: "Povišica (%)",
    aumentoMonto: "Povišica kao iznos (nije obvezno)",
    aumentoMontoAyuda: "Ako je povišica fiksan iznos, unesite ga ovdje. Koristi se umjesto postotka.",
    inflacion: "Inflacija za to razdoblje (%, nije obvezno)",
    inflacionAyuda: "Inflacija od posljednje povišice, da vidite kupujete li za plaću više ili manje nego prije.",
    sueldosAnio: "Broj plaća godišnje",
    sueldosAnioAyuda: "12 ako plaću primate mjesečno. 13 ili 14 ako svake godine dobivate i trinaestu ili četrnaestu plaću.",
    nuevo: "Nova mjesečna plaća",
    diferenciaMensual: "Razlika mjesečno",
    diferenciaAnual: "Razlika godišnje",
    porcentaje: "Povišica u postocima",
    real: "Realna povišica (nakon inflacije)",
    realAyuda: "Koliko više kupujete za novu plaću nego za prethodnu.",
    errorSueldo: "Unesite svoju sadašnju plaću.",
    errorSinAumento: "Unesite povišicu u postocima ili kao iznos.",
    observacionGana: (puntos) => `Vaša je povišica veća od inflacije: za plaću kupujete ${puntos} % više nego prije.`,
    observacionPierde: (puntos) => `Vaša povišica ne pokriva inflaciju: za plaću kupujete ${puntos} % manje nego prije.`,
    observacionIgual: "Vaša je povišica jednaka inflaciji: za plaću kupujete isto kao prije.",
  }),
};
