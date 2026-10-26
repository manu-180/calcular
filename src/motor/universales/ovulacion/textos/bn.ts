import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosBn: TextosUi<UiOvulacion> = {
  slug: "ovulation",
  ui: () => ({
    fum: "শেষ মাসিকের প্রথম দিন",
    fumAyuda: "রক্তপাত শুরুর প্রথম দিন, শেষ দিন নয়।",
    ciclo: "মাসিক চক্রের দৈর্ঘ্য (দিন)",
    cicloAyuda: "এক মাসিকের প্রথম দিন থেকে পরের মাসিকের আগের দিন পর্যন্ত। প্রতি মাসে বদলালে গড়টি দিন।",
    ovulacion: "ডিম্বস্ফোটনের আনুমানিক দিন",
    fertilDesde: "উর্বর দিন শুরু",
    fertilHasta: "উর্বর দিন শেষ",
    proxima: "পরের মাসিক",
    tabla: "পরের কয়েকটি চক্র",
    colRegla: "মাসিক",
    colDesde: "উর্বর দিন শুরু",
    colHasta: "উর্বর দিন শেষ",
    colOvulacion: "ডিম্বস্ফোটন",
    errorCiclo: "মাসিক চক্রের দৈর্ঘ্য ২১ থেকে ৪৫ দিনের মধ্যে হতে হবে।",
    aviso: "এটি নিয়মিত চক্রের জন্য একটি আনুমানিক হিসাব। এটি জন্মনিয়ন্ত্রণের পদ্ধতি নয়, আর চিকিৎসকের পরামর্শের বিকল্পও নয়।",
  }),
};
