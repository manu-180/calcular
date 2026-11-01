import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosKa: TextosUi<UiPorcentaje> = {
  slug: "protsentis-kalkulatori",
  ui: () => ({
    modo: "რისი გამოთვლა გსურთ?",
    modoParte: "რამდენია Y რიცხვის X პროცენტი?",
    modoProporcion: "Y რიცხვის რამდენი პროცენტია X?",
    modoAumento: "Y პლუს X პროცენტი",
    modoRebaja: "Y მინუს X პროცენტი",
    x: "რიცხვი X",
    xAyuda: "პროცენტის მნიშვნელობა. თუ აირჩევთ „Y რიცხვის რამდენი პროცენტია X?“, მაშინ X ნაწილია.",
    y: "რიცხვი Y",
    resultado: "შედეგი",
    porcentaje: "პროცენტი",
    diferencia: "დამატებული ან გამოკლებული თანხა",
    errorYCero: "Y ნული ვერ იქნება: ნულს პროცენტი არ აქვს.",
    fraseParte: (x, y, r) => `საბაზო რიცხვი: ${y}. მისი ${x} პროცენტი არის ${r}.`,
    fraseProporcion: (x, y, p) => `საბაზო რიცხვი: ${y}. რიცხვი ${x} მისი ${p} პროცენტია.`,
    fraseAumento: (x, y, r, d) => `${y} პლუს ${x} პროცენტი: ${r}. ნამატი: ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} მინუს ${x} პროცენტი: ${r}. გამოკლებული ნაწილი: ${d}.`,
  }),
};
