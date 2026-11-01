import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosBs: TextosUi<UiAumentoDeSueldo> = {
  slug: "kalkulator-povisice",
  ui: () => ({
    sueldo: "Sadašnja mjesečna plata",
    sueldoAyuda: "Bruto ili neto, kako vam je lakše. Rezultat će biti u istom obliku.",
    aumentoPorcentaje: "Povišica (%)",
    aumentoMonto: "Povišica kao iznos (nije obavezno)",
    aumentoMontoAyuda: "Ako je povišica fiksan iznos, unesite ga ovdje. Koristi se umjesto procenta.",
    inflacion: "Inflacija za taj period (%, nije obavezno)",
    inflacionAyuda: "Inflacija od posljednje povišice, da vidite kupujete li za platu više ili manje nego prije.",
    sueldosAnio: "Broj plata godišnje",
    sueldosAnioAyuda: "12 ako platu primate mjesečno. 13 ili 14 ako svake godine dobijate i trinaestu ili četrnaestu platu.",
    nuevo: "Nova mjesečna plata",
    diferenciaMensual: "Razlika mjesečno",
    diferenciaAnual: "Razlika godišnje",
    porcentaje: "Povišica u procentima",
    real: "Realna povišica (nakon inflacije)",
    realAyuda: "Koliko više kupujete za novu platu nego za prethodnu.",
    errorSueldo: "Unesite svoju sadašnju platu.",
    errorSinAumento: "Unesite povišicu u procentima ili kao iznos.",
    observacionGana: (puntos) => `Vaša je povišica veća od inflacije: za platu kupujete ${puntos} % više nego prije.`,
    observacionPierde: (puntos) => `Vaša povišica ne pokriva inflaciju: za platu kupujete ${puntos} % manje nego prije.`,
    observacionIgual: "Vaša je povišica jednaka inflaciji: za platu kupujete isto kao prije.",
  }),
};
