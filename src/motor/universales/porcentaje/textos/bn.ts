import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosBn: TextosUi<UiPorcentaje> = {
  slug: "percentage",
  ui: () => ({
    modo: "কী হিসাব করতে চান",
    modoParte: "Y-এর X% কত?",
    modoProporcion: "X হলো Y-এর কত শতাংশ?",
    modoAumento: "Y-এর সাথে X% যোগ করুন",
    modoRebaja: "Y থেকে X% বাদ দিন",
    x: "সংখ্যা X",
    xAyuda: "এটি শতাংশের মান। ‘X হলো Y-এর কত শতাংশ?’ বেছে নিলে এখানে অংশের সংখ্যাটি লিখুন।",
    y: "সংখ্যা Y",
    resultado: "উত্তর",
    porcentaje: "শতাংশ",
    diferencia: "কতটা বাড়ল বা কমল",
    errorYCero: "Y-এর ঘরে শূন্য দেওয়া যাবে না, কারণ শূন্যের শতাংশ হিসাব করা যায় না।",
    fraseParte: (x, y, r) => `${cifrasBn(y)}-এর ${cifrasBn(x)}% হলো ${cifrasBn(r)}।`,
    fraseProporcion: (x, y, p) => `${cifrasBn(x)} হলো ${cifrasBn(y)}-এর ${cifrasBn(p)}%।`,
    fraseAumento: (x, y, r, d) => `${cifrasBn(y)}-এর সাথে ${cifrasBn(x)}% যোগ করলে হয় ${cifrasBn(r)} (বাড়ে ${cifrasBn(d)})।`,
    fraseRebaja: (x, y, r, d) => `${cifrasBn(y)} থেকে ${cifrasBn(x)}% বাদ দিলে থাকে ${cifrasBn(r)} (কমে ${cifrasBn(d)})।`,
  }),
};
