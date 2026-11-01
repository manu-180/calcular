import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosSq: TextosUi<UiPorcentaje> = {
  slug: "kalkulator-perqindje",
  ui: () => ({
    modo: "Çfarë dëshironi të llogaritni?",
    modoParte: "Sa është X% e Y?",
    modoProporcion: "Sa përqind e Y është X?",
    modoAumento: "Y plus X%",
    modoRebaja: "Y minus X%",
    x: "Numri X",
    xAyuda: "Përqindja. Nëse zgjidhni “Sa përqind e Y është X?”, është pjesa.",
    y: "Numri Y",
    resultado: "Rezultati",
    porcentaje: "Përqindja",
    diferencia: "Shuma e shtuar ose e zbritur",
    errorYCero: "Y nuk mund të jetë 0: nuk ka përqindje nga zero.",
    fraseParte: (x, y, r) => `${x}% e ${y} është ${r}.`,
    fraseProporcion: (x, y, p) => `${x} është ${p}% e ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x}% është ${r}: shtohen ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} minus ${x}% është ${r}: zbriten ${d}.`,
  }),
};
