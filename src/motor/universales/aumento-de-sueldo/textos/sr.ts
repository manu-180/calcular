import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosSr: TextosUi<UiAumentoDeSueldo> = {
  slug: "kalkulator-povisice",
  ui: () => ({
    sueldo: "Sadašnja mesečna plata",
    sueldoAyuda: "Bruto ili neto, kako vam je lakše. Rezultat će biti u istom obliku.",
    aumentoPorcentaje: "Povišica (%)",
    aumentoMonto: "Povišica kao iznos (nije obavezno)",
    aumentoMontoAyuda: "Ako je povišica fiksni iznos, unesite ga ovde. Koristi se umesto procenta.",
    inflacion: "Inflacija za taj period (%, nije obavezno)",
    inflacionAyuda: "Inflacija od poslednje povišice, da vidite da li za platu kupujete više ili manje nego ranije.",
    sueldosAnio: "Broj plata godišnje",
    sueldosAnioAyuda: "12 ako platu primate mesečno. 13 ili 14 ako svake godine dobijate i trinaestu ili četrnaestu platu.",
    nuevo: "Nova mesečna plata",
    diferenciaMensual: "Razlika mesečno",
    diferenciaAnual: "Razlika godišnje",
    porcentaje: "Povišica u procentima",
    real: "Realna povišica (posle inflacije)",
    realAyuda: "Koliko više kupujete za novu platu nego za prethodnu.",
    errorSueldo: "Unesite svoju sadašnju platu.",
    errorSinAumento: "Unesite povišicu u procentima ili kao iznos.",
    observacionGana: (puntos) => `Vaša povišica je veća od inflacije: za platu kupujete ${puntos}% više nego ranije.`,
    observacionPierde: (puntos) => `Vaša povišica ne pokriva inflaciju: za platu kupujete ${puntos}% manje nego ranije.`,
    observacionIgual: "Vaša povišica je jednaka inflaciji: za platu kupujete isto kao ranije.",
  }),
};
