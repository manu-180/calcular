import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosBn: TextosUi<UiFechaDeParto> = {
  slug: "due-date",
  ui: () => ({
    metodo: "কোন তারিখটি আপনি জানেন?",
    fum: "শেষ মাসিকের প্রথম দিন",
    concepcion: "গর্ভধারণের তারিখ",
    fecha: "তারিখ",
    fechaAyuda: "শেষ মাসিক বেছে নিলে রক্তপাত শুরুর প্রথম দিনটি দিন।",
    ciclo: "মাসিক চক্রের দৈর্ঘ্য (দিন)",
    cicloAyuda: "শুধু শেষ মাসিক দিয়ে হিসাবের সময় লাগে। না জানলে ২৮ রেখে দিন।",
    fpp: "প্রসবের সম্ভাব্য তারিখ",
    edadGestacional: "আজ গর্ভকাল কত",
    trimestre: "ত্রৈমাসিক",
    faltan: "আর কত দিন বাকি",
    fechaConcepcion: "গর্ভধারণের আনুমানিক তারিখ",
    semanasYDias: (s, d) => `${cifrasBn(s)} সপ্তাহ${d ? ` ${cifrasBn(d)} দিন` : ""}`,
    trimestres: ["প্রথম ত্রৈমাসিক", "দ্বিতীয় ত্রৈমাসিক", "তৃতীয় ত্রৈমাসিক"],
    errorFutura: "তারিখটি আজকের পরের হতে পারবে না।",
    errorCiclo: "মাসিক চক্রের দৈর্ঘ্য ২০ থেকে ৪৫ দিনের মধ্যে হতে হবে।",
    notaPasada: "ওই তারিখ থেকে ৪২ সপ্তাহের বেশি পার হয়ে গেছে, তাই গর্ভকাল দেখানো হচ্ছে না।",
    aviso:
      "এটি একটি আনুমানিক তারিখ: খুব কম শিশুই ঠিক এই দিনে জন্ম নেয়। আলট্রাসনোগ্রাম আর চিকিৎসকের নিয়মিত চেকআপে সবচেয়ে সঠিক তারিখ জানা যায়। এটি চিকিৎসকের পরামর্শের বিকল্প নয়।",
  }),
};
