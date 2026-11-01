import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosLt: TextosUi<UiRendimientoInversion> = {
  slug: "investicijos-graza",
  ui: () => ({
    inicial: "Investuota suma",
    final: "Galutinė vertė",
    finalAyuda: "Investicijos vertė šiandien arba suma, gauta ją pardavus.",
    cobrado: "Per laikotarpį išmokėtos pajamos (neprivaloma)",
    cobradoAyuda: "Dividendai, palūkanos ar nuomos pajamos, kurias gavote ir vėl neinvestavote.",
    anios: "Investavimo trukmė metais",
    aniosAyuda: "Galite įvesti ir dešimtainį skaičių, pavyzdžiui, 1,5, kai trukmė yra pusantrų metų.",
    ganancia: "Pelnas",
    roi: "Bendra grąža (ROI)",
    cagr: "Metinė grąža (CAGR)",
    cagrAyuda: "Metinė grąža, kuri, taikant sudėtines palūkanas, kasmet duotų tą patį rezultatą.",
    errorInicial: "Įveskite, kiek iš pradžių investavote.",
    observacionCorto: "Kai laikotarpis trumpesnis nei metai, metinė grąža ištempia trumpą rezultatą, lyg jis kartotųsi visus metus. Vertinkite ją atsargiai.",
    observacionInflacion: "Ar padidėjo jūsų perkamoji galia, sužinosite palyginus metinę grąžą su to paties laikotarpio infliacija.",
  }),
};
