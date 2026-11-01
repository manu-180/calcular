import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosSk: TextosUi<UiAumentoDeSueldo> = {
  slug: "zvysenie-mzdy",
  ui: () => ({
    sueldo: "Súčasná mesačná mzda",
    sueldoAyuda: "Hrubá alebo čistá, ako vám to vyhovuje. Výsledok bude v rovnakom vyjadrení.",
    aumentoPorcentaje: "Zvýšenie (%)",
    aumentoMonto: "Zvýšenie ako suma (nepovinné)",
    aumentoMontoAyuda: "Ak je zvýšenie pevná suma, zadajte ju sem. Použije sa namiesto percenta.",
    inflacion: "Inflácia za dané obdobie (%, nepovinné)",
    inflacionAyuda: "Inflácia od posledného zvýšenia, aby ste videli, či si za mzdu kúpite viac, alebo menej ako predtým.",
    sueldosAnio: "Počet výplat za rok",
    sueldosAnioAyuda: "12 pri mesačnej výplate. 13 alebo 14, ak každý rok dostávate aj trinásty či štrnásty plat.",
    nuevo: "Nová mesačná mzda",
    diferenciaMensual: "Rozdiel za mesiac",
    diferenciaAnual: "Rozdiel za rok",
    porcentaje: "Zvýšenie v percentách",
    real: "Reálne zvýšenie (po zohľadnení inflácie)",
    realAyuda: "O koľko viac si za novú mzdu kúpite ako za tú predchádzajúcu.",
    errorSueldo: "Zadajte svoju súčasnú mzdu.",
    errorSinAumento: "Zadajte zvýšenie v percentách alebo ako sumu.",
    observacionGana: (puntos) => `Vaše zvýšenie predbieha infláciu: za mzdu si kúpite o ${puntos} % viac ako predtým.`,
    observacionPierde: (puntos) => `Vaše zvýšenie nepokrýva infláciu: za mzdu si kúpite o ${puntos} % menej ako predtým.`,
    observacionIgual: "Vaše zvýšenie zodpovedá inflácii: za mzdu si kúpite rovnako veľa ako predtým.",
  }),
};
