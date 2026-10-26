import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosBn: TextosUi<UiImc> = {
  slug: "bmi",
  ui: () => ({
    peso: (u) => `ওজন (${cifrasBn(u)})`,
    altura: (u) => `উচ্চতা (${cifrasBn(u)})`,
    pies: "উচ্চতা: ফুট (ft)",
    pulgadas: "উচ্চতা: ইঞ্চি (in)",
    imc: "বডি মাস ইনডেক্স (বিএমআই)",
    categoria: "শ্রেণি (বিশ্ব স্বাস্থ্য সংস্থা)",
    pesoMin: (u) => `স্বাস্থ্যকর ওজন সর্বনিম্ন (${cifrasBn(u)})`,
    pesoMax: (u) => `স্বাস্থ্যকর ওজন সর্বোচ্চ (${cifrasBn(u)})`,
    rangoAyuda: "এই উচ্চতায় যে ওজনের মধ্যে থাকলে বিএমআই স্বাস্থ্যকর থাকে।",
    bajo: "কম ওজন",
    normal: "স্বাস্থ্যকর ওজন",
    sobrepeso: "অতিরিক্ত ওজন",
    obesidad1: "স্থূলতা, প্রথম ধাপ",
    obesidad2: "স্থূলতা, দ্বিতীয় ধাপ",
    obesidad3: "স্থূলতা, তৃতীয় ধাপ",
    errorPeso: "ওজন শূন্যের বেশি হতে হবে।",
    errorAltura: "উচ্চতা শূন্যের বেশি হতে হবে।",
    aviso:
      "বিএমআই প্রাপ্তবয়স্কদের জন্য একটি সাধারণ নির্দেশক। এটি পেশি আর চর্বির পার্থক্য বোঝে না, আর গর্ভাবস্থায় বা শিশুদের ক্ষেত্রে একইভাবে খাটে না। এটি চিকিৎসকের পরামর্শের বিকল্প নয়।",
  }),
};
