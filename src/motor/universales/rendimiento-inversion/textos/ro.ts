import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosRo: TextosUi<UiRendimientoInversion> = {
  slug: "randament-investitie",
  ui: () => ({
    inicial: "Suma investită",
    final: "Valoarea finală",
    finalAyuda: "Cât valorează astăzi investiția sau cât ați primit când ați vândut-o.",
    cobrado: "Venituri încasate pe parcurs (opțional)",
    cobradoAyuda: "Dividende, dobânzi sau chirii pe care le-ați încasat și nu le-ați reinvestit.",
    anios: "Ani de deținere",
    aniosAyuda: "Puteți folosi zecimale pentru perioade mai scurte, de exemplu 1,5 pentru un an și jumătate.",
    ganancia: "Câștig",
    roi: "Randament total (ROI)",
    cagr: "Randament anual (CAGR)",
    cagrAyuda: "Randamentul anual care, aplicat compus an de an, duce la același rezultat.",
    errorInicial: "Introduceți suma investită la început.",
    observacionCorto: "Pentru mai puțin de un an, randamentul anual extinde un rezultat de scurtă durată ca și cum s-ar repeta tot anul. Interpretați-l cu prudență.",
    observacionInflacion: "Ca să vedeți dacă ați câștigat putere de cumpărare, comparați randamentul anual cu inflația din aceeași perioadă.",
  }),
};
