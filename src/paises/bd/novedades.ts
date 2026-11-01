import type { Novedad } from "@/motor/tipos";

const PORIPOTHRO = { url: "https://nbr.gov.bd/uploads/news-scroller/Aykor_Poripothro_2026-2027_BG_Press_Modify_Copy.pdf" } as const;
const SHROM_2026 = { url: "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-mole/2026/3/db5604f4-8cc4-40e0-aef3-88e50cdf4b51.pdf" } as const;

export const novedades: readonly Novedad[] = [
  {
    id: "bd.income-tax-2026-27",
    fecha: "2026-10-24",
    titulo: "করমুক্ত সীমা এখন ৪ লাখ টাকা",
    texto:
      "অর্থ আইন, ২০২৬ অনুযায়ী করবর্ষ ২০২৬-২৭ ও ২০২৭-২৮ এ সাধারণ করদাতার করমুক্ত সীমা ৪,০০,০০০ টাকা, নারী ও ৬৫ বছরের বেশি বয়সীদের ৪,৫০,০০০ টাকা। এরপরের ধাপগুলোর হার ১০% থেকে ৩০%। আয়কর ও বেতনের কর ক্যালকুলেটর নতুন হারেই হিসাব করে।",
    vigenteDesde: "2026-07-01",
    calculadoras: ["bd.income-tax-calculator", "bd.salary-tax-calculator", "bd.tax-rebate-calculator"],
    fuente: {
      organismo: "জাতীয় রাজস্ব বোর্ড",
      titulo: "আয়কর পরিপত্র ২০২৬-২০২৭, অনুচ্ছেদ ১.১",
      url: PORIPOTHRO.url,
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "bd.withholding-rules-2026",
    fecha: "2026-10-24",
    titulo: "উৎসে কর বিধিমালা, ২০২৬ কার্যকর",
    texto: "১ জুলাই ২০২৬ থেকে সেবার বিপরীতে পরিশোধে উৎসে করের নতুন হার চালু হয়েছে। পরামর্শক ও পেশাদার সেবায় স্বাভাবিক ব্যক্তির ক্ষেত্রে হার ১৫%। উৎসে কর ক্যালকুলেটর নতুন সারণী ব্যবহার করে।",
    vigenteDesde: "2026-07-01",
    calculadoras: ["bd.tds-calculator"],
    fuente: {
      organismo: "জাতীয় রাজস্ব বোর্ড",
      titulo: "আয়কর পরিপত্র ২০২৬-২০২৭, পরিশিষ্ট-১ (উৎসে কর বিধিমালা, ২০২৬)",
      url: PORIPOTHRO.url,
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "bd.labour-amendment-2026",
    fecha: "2026-10-24",
    titulo: "শ্রম আইনে ইস্তফার ক্ষতিপূরণ ও ছুটির পরিবর্তন",
    texto:
      "বাংলাদেশ শ্রম (সংশোধন) আইন, ২০২৬ অনুযায়ী ইস্তফা দিলে ৩ বছর পর্যন্ত চাকরিতেও প্রতি বছরের জন্য ৭ দিনের মজুরি মেলে। উৎসব ছুটি ১৩ দিন, আর প্রসূতি কল্যাণ ছুটি ১২০ দিন। সার্ভিস বেনিফিট, ছুটি আর প্রসূতি কল্যাণের ক্যালকুলেটর নতুন বিধান মেনে চলে।",
    vigenteDesde: "2026-04-10",
    calculadoras: ["bd.service-benefit-calculator", "bd.leave-calculator", "bd.maternity-benefit-calculator"],
    fuente: {
      organismo: "শ্রম ও কর্মসংস্থান মন্ত্রণালয়",
      titulo: "বাংলাদেশ শ্রম (সংশোধন) আইন, ২০২৬",
      url: SHROM_2026.url,
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
