import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosBn: TextosUi<UiRendimientoInversion> = {
  slug: "roi",
  ui: () => ({
    inicial: "বিনিয়োগের পরিমাণ",
    final: "বর্তমান বা শেষ মূল্য",
    finalAyuda: "বিনিয়োগটির আজকের মূল্য, অথবা বিক্রি করে যা পেয়েছেন।",
    cobrado: "মাঝপথে পাওয়া আয় (ঐচ্ছিক)",
    cobradoAyuda: "লভ্যাংশ, সুদ বা ভাড়া, যা তুলে নিয়েছেন এবং আবার বিনিয়োগ করেননি।",
    anios: "কত বছর ধরে রেখেছেন",
    aniosAyuda: "বছরের অংশও লেখা যায়, যেমন দেড় বছরের জন্য ১.৫।",
    ganancia: "মুনাফা",
    roi: "মোট রিটার্ন (ROI)",
    cagr: "বার্ষিক রিটার্ন (CAGR)",
    cagrAyuda: "যে বার্ষিক হার বছরের পর বছর চক্রবৃদ্ধি হলে একই ফল দেয়।",
    errorInicial: "শুরুতে কত বিনিয়োগ করেছিলেন, লিখুন।",
    observacionCorto: "এক বছরের কম সময়ের ক্ষেত্রে বার্ষিক রিটার্ন অল্প সময়ের ফলকে সারা বছর ধরে টেনে দেখায়। সাবধানে বিচার করুন।",
    observacionInflacion: "ক্রয়ক্ষমতা আসলে বেড়েছে কি না দেখতে একই সময়ের মূল্যস্ফীতির সঙ্গে বার্ষিক রিটার্ন মিলিয়ে নিন।",
  }),
};
