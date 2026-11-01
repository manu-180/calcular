import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosBn: TextosUi<UiMetaDeAhorro> = {
  slug: "savings-goal",
  ui: () => ({
    meta: "যত টাকা জমাতে চান",
    actual: "এখন পর্যন্ত জমানো টাকা (ঐচ্ছিক)",
    meses: "লক্ষ্যে পৌঁছাতে কত মাস",
    rendimiento: "সঞ্চয়ের বার্ষিক মুনাফা (%, ঐচ্ছিক)",
    rendimientoAyuda: "সুদ বা মুনাফা পাওয়া যায় এমন হিসাবে বা স্কিমে রাখলে লিখুন। মুনাফা না থাকলে খালি রাখুন।",
    aporteMensual: "প্রতি মাসে জমাতে হবে",
    aporteSemanal: "সপ্তাহে হিসাব করলে",
    totalAportado: "নিজের জমা মোট টাকা",
    intereses: "মোট মুনাফা",
    errorMeta: "যত টাকা জমাতে চান, তা লিখুন।",
    yaLlegas: "এখনকার সঞ্চয়েই এই সময়ের মধ্যে লক্ষ্যে পৌঁছে যাবেন। আর বাড়তি জমানোর দরকার নেই।",
  }),
};
