import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosBn: TextosUi<UiAumentoDeSueldo> = {
  slug: "pay-raise",
  ui: () => ({
    sueldo: "বর্তমান মাসিক বেতন",
    sueldoAyuda: "মোট বা হাতে পাওয়া, যেটা আপনার সুবিধা। ফলাফলও একই ভিত্তিতে দেখানো হবে।",
    aumentoPorcentaje: "বেতন বৃদ্ধি (%)",
    aumentoMonto: "টাকার অঙ্কে বেতন বৃদ্ধি (ঐচ্ছিক)",
    aumentoMontoAyuda: "ইনক্রিমেন্ট নির্দিষ্ট অঙ্কের হলে এখানে লিখুন। তখন শতাংশের বদলে এটিই ধরা হবে।",
    inflacion: "এই সময়ের মূল্যস্ফীতি (%, ঐচ্ছিক)",
    inflacionAyuda: "শেষ ইনক্রিমেন্টের পর থেকে মূল্যস্ফীতি, যাতে দেখা যায় বেতনে আগের চেয়ে বেশি না কম কেনা যায়।",
    sueldosAnio: "বছরে কতবার বেতন",
    sueldosAnioAyuda: "মাসিক বেতনে ১২। বছরে বাড়তি এক বা দুই মাসের বেতন বা বোনাস পেলে ১৩ বা ১৪।",
    nuevo: "নতুন মাসিক বেতন",
    diferenciaMensual: "মাসে পার্থক্য",
    diferenciaAnual: "বছরে পার্থক্য",
    porcentaje: "শতাংশে বেতন বৃদ্ধি",
    real: "প্রকৃত বেতন বৃদ্ধি (মূল্যস্ফীতি বাদে)",
    realAyuda: "আগের বেতনের তুলনায় নতুন বেতনে কতটা বেশি কেনা যায়।",
    errorSueldo: "আপনার বর্তমান বেতন লিখুন।",
    errorSinAumento: "বেতন বৃদ্ধি শতাংশে বা টাকার অঙ্কে লিখুন।",
    observacionGana: (puntos) => `আপনার বেতন বৃদ্ধি মূল্যস্ফীতিকে ছাড়িয়ে গেছে: আগের চেয়ে ${cifrasBn(puntos)}% বেশি কেনা যাবে।`,
    observacionPierde: (puntos) => `আপনার বেতন বৃদ্ধি মূল্যস্ফীতির চেয়ে কম: আগের চেয়ে ${cifrasBn(puntos)}% কম কেনা যাবে।`,
    observacionIgual: "আপনার বেতন বৃদ্ধি মূল্যস্ফীতির সমান: আগের মতোই কেনা যাবে।",
  }),
};
