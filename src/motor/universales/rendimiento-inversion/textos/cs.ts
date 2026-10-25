import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosCs: TextosUi<UiRendimientoInversion> = {
  slug: "navratnost-investice",
  ui: () => ({
    inicial: "Investovaná částka",
    final: "Konečná hodnota",
    finalAyuda: "Kolik má investice dnes, nebo kolik jste dostali při prodeji.",
    cobrado: "Výnosy vyplacené v průběhu (nepovinné)",
    cobradoAyuda: "Dividendy, úroky nebo nájemné, které jste inkasovali a znovu neinvestovali.",
    anios: "Doba držení v letech",
    aniosAyuda: "Můžete zadat i desetinné číslo, třeba 1,5 pro rok a půl.",
    ganancia: "Zisk",
    roi: "Celková návratnost (ROI)",
    cagr: "Roční výnos (CAGR)",
    cagrAyuda: "Roční výnos, který při složeném úročení rok co rok dává stejný výsledek.",
    errorInicial: "Zadejte, kolik jste na začátku investovali.",
    observacionCorto: "U doby kratší než rok roční výnos natahuje krátký výsledek, jako by se opakoval celý rok. Berte ho s rezervou.",
    observacionInflacion: "Jestli jste získali na kupní síle, zjistíte porovnáním ročního výnosu s inflací za stejné období.",
  }),
};
