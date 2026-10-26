import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosBn: TextosUi<UiMetrosCuadrados> = {
  slug: "square-footage",
  ui: () => ({
    forma: (n) => `অংশ ${cifrasBn(n)}: আকার`,
    formaAyuda: "ঘর L আকারের বা অসমান হলে কয়েকটি অংশে ভাগ করে যোগ করুন।",
    ninguna: "ব্যবহার হচ্ছে না",
    rectangulo: "আয়তক্ষেত্র বা বর্গক্ষেত্র",
    triangulo: "ত্রিভুজ",
    circulo: "বৃত্ত",
    medidaA: (n, u) => `অংশ ${cifrasBn(n)}: দৈর্ঘ্য, ভূমি বা ব্যাস (${cifrasBn(u)})`,
    medidaAAyuda: "আয়তক্ষেত্র: দৈর্ঘ্য আর প্রস্থ। ত্রিভুজ: ভূমি আর উচ্চতা। বৃত্ত: শুধু ব্যাস।",
    medidaB: (n, u) => `অংশ ${cifrasBn(n)}: প্রস্থ বা উচ্চতা (${cifrasBn(u)})`,
    total: (u) => `মোট ক্ষেত্রফল (${cifrasBn(u)})`,
    equivale: (u) => `${cifrasBn(u)} এককে`,
    parcial: (n, u) => `অংশ ${cifrasBn(n)} (${cifrasBn(u)})`,
    errorMedida: "এই মাপটি দেওয়া হয়নি বা শূন্য।",
  }),
};
