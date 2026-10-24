import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.aylanma-soligi-kalkulyatori",
  h1: "Aylanmadan olinadigan soliq kalkulyatori 2026",
  title: "Aylanma soligʻi 2026: {{uz.aylanma-soligi[umumiy]}} va {{uz.aylanma-soligi[ytt]}} stavkada hisoblash",
  description:
    "Aylanmadan olinadigan soliqni hisoblang: umumiy stavka {{uz.aylanma-soligi[umumiy]}}, chakana savdoda stavka joyga qarab, yakka tartibdagi tadbirkor va oʻzini oʻzi band qilganlar {{uz.aylanma-soligi[ytt]}}.",
  intro: [
    "Aylanmadan olinadigan soliq kichik biznes uchun soddalashtirilgan soliq. Uni yillik daromadi chegaradan ({{uz.aylanma-chegarasi}}) oshmagan yuridik shaxslar, yakka tartibdagi tadbirkorlar va oʻzini oʻzi band qilgan shaxslar toʻlaydi.",
    "Soliq kodeksining 2026-yil 1-yanvardan amal qiladigan tahririda yakka tartibdagi tadbirkorlar va oʻzini oʻzi band qilganlar uchun alohida stavka bor: {{uz.aylanma-soligi[ytt]}}.",
  ],
  comoSeCalcula: [
    "Soliq: davr uchun tushum × faoliyatingiz stavkasi.",
    "Umumiy stavka {{uz.aylanma-soligi[umumiy]}}. Chakana savdoda: aholisi 100 ming va undan koʻp shaharlarda {{uz.aylanma-soligi[chakana-shahar]}}, boshqa aholi punktlarida {{uz.aylanma-soligi[chakana-boshqa]}}, borish qiyin va togʻli tumanlarda {{uz.aylanma-soligi[chakana-togli]}}.",
    "Tamaki mahsulotlari savdosiga joyidan qatʼi nazar {{uz.aylanma-soligi[tamaki]}}.",
  ],
  ejemplo: ["Oʻzini oʻzi band qilgan shaxs oyiga 30 000 000 soʻm tushum qilsa, soliq 300 000 soʻm. Toshkentdagi doʻkon 50 000 000 soʻmdan 2 000 000 soʻm toʻlaydi."],
  faq: [
    {
      pregunta: "Aylanma soligʻini kim toʻlaydi?",
      respuesta: "Soliq davrida jami daromadi {{uz.aylanma-chegarasi}} miqdoridan oshmagan yuridik shaxslar, shuningdek tovar va xizmat sotishdan daromadi shu chegaradan oshmagan yakka tartibdagi tadbirkorlar va oʻzini oʻzi band qilgan shaxslar.",
    },
    {
      pregunta: "Kimlar aylanma soligʻini qoʻllay olmaydi?",
      respuesta: "Masalan, import qiluvchilar, aksiz toʻlanadigan tovar ishlab chiqaruvchilar, yoqilgʻi sotuvchilar, bozorlar, auditorlik va soliq maslahatchisi tashkilotlari, dori va tibbiy buyumlar savdosi, zargarlik buyumlari faoliyati.",
    },
    {
      pregunta: "Yakka tartibdagi tadbirkor uchun stavka qancha?",
      respuesta: "{{uz.aylanma-soligi[ytt]}} (Soliq kodeksi, 467-modda, 2026-yil 1-yanvardan amaldagi tahrir). Bu stavka oʻzini oʻzi band qilgan shaxslarga ham qoʻllaniladi.",
    },
  ],
  glosario: [
    { termino: "Aylanma", definicion: "Tovar, ish va xizmatlarni sotishdan tushgan pul (tushum)." },
    { termino: "Oʻzini oʻzi band qilgan shaxs", definicion: "Roʻyxatdan oʻtib, mustaqil faoliyat yuritadigan jismoniy shaxs." },
  ],
});
