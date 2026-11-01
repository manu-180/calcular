import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosSk: TextosUi<UiRendimientoInversion> = {
  slug: "navratnost-investicie",
  ui: () => ({
    inicial: "Investovaná suma",
    final: "Konečná hodnota",
    finalAyuda: "Akú hodnotu má investícia dnes alebo koľko ste dostali pri predaji.",
    cobrado: "Výnosy vyplatené v priebehu investície (nepovinné)",
    cobradoAyuda: "Dividendy, úroky alebo nájomné, ktoré ste prijali a znova neinvestovali.",
    anios: "Doba držby v rokoch",
    aniosAyuda: "Môžete zadať aj desatinné číslo, napríklad 1,5 pre rok a pol.",
    ganancia: "Zisk",
    roi: "Celková návratnosť (ROI)",
    cagr: "Ročný výnos (CAGR)",
    cagrAyuda: "Ročný výnos, ktorý pri zloženom úročení rok čo rok dáva rovnaký výsledok.",
    errorInicial: "Zadajte, koľko ste na začiatku investovali.",
    observacionCorto: "Pri dobe kratšej ako rok ročný výnos naťahuje krátky výsledok, akoby sa opakoval celý rok. Berte ho s rezervou.",
    observacionInflacion: "Či ste získali na kúpnej sile, zistíte porovnaním ročného výnosu s infláciou za to isté obdobie.",
  }),
};
