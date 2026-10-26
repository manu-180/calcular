import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosCs: TextosUi<UiAumentoDeSueldo> = {
  slug: "zvyseni-mzdy",
  ui: () => ({
    sueldo: "Současná měsíční mzda",
    sueldoAyuda: "Hrubá nebo čistá, jak vám to vyhovuje. Výsledek bude ve stejném vyjádření.",
    aumentoPorcentaje: "Zvýšení (%)",
    aumentoMonto: "Zvýšení v korunách nebo jiné měně (nepovinné)",
    aumentoMontoAyuda: "Pokud je zvýšení pevná částka, zadejte ji sem. Použije se místo procenta.",
    inflacion: "Inflace za dané období (%, nepovinné)",
    inflacionAyuda: "Inflace od posledního zvýšení, abyste viděli, jestli si za mzdu koupíte víc, nebo méně než dřív.",
    sueldosAnio: "Počet výplat za rok",
    sueldosAnioAyuda: "12 při měsíční výplatě. 13 nebo 14, pokud každý rok dostáváte i třináctou či čtrnáctou mzdu.",
    nuevo: "Nová měsíční mzda",
    diferenciaMensual: "Rozdíl za měsíc",
    diferenciaAnual: "Rozdíl za rok",
    porcentaje: "Zvýšení v procentech",
    real: "Reálné zvýšení (po zohlednění inflace)",
    realAyuda: "O kolik víc si za novou mzdu koupíte než za tu předchozí.",
    errorSueldo: "Zadejte svou současnou mzdu.",
    errorSinAumento: "Zadejte zvýšení v procentech nebo jako částku.",
    observacionGana: (puntos) => `Vaše zvýšení předbíhá inflaci: za mzdu si koupíte o ${puntos} % víc než dřív.`,
    observacionPierde: (puntos) => `Vaše zvýšení nepokrývá inflaci: za mzdu si koupíte o ${puntos} % méně než dřív.`,
    observacionIgual: "Vaše zvýšení odpovídá inflaci: za mzdu si koupíte stejně jako dřív.",
  }),
};
