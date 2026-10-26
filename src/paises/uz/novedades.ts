import type { Novedad } from "@/motor/tipos";

const PF115 = {
  organismo: "Lex.uz (Adliya vazirligi)",
  titulo: "Prezidentning 2026-yil 23-iyundagi PF-115-son Farmoni",
  url: "https://lex.uz/uz/docs/-8283656",
  tipo: "primaria",
  verificadoEl: "2026-10-24",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "uz.mhtekm-bhm-sentabr-2026",
    fecha: "2026-10-24",
    titulo: "Eng kam ish haqi 1 360 000 soʻm, BHM 440 000 soʻm",
    texto: "2026-yil 1-sentabrdan mehnatga haq toʻlashning eng kam miqdori oyiga 1 360 000 soʻm (oldin 1 271 000), bazaviy hisoblash miqdori 440 000 soʻm (oldin 412 000). Kalkulyatorlar yangi miqdorlar bilan hisoblaydi.",
    vigenteDesde: "2026-09-01",
    calculadoras: ["uz.eng-kam-ish-haqi", "uz.bhm-kalkulyatori", "uz.ish-haqi-kalkulyatori", "uz.kasallik-nafaqasi", "uz.dekret-puli-hisoblash"],
    fuente: PF115,
  },
  {
    id: "uz.kasallik-nafaqasi-iyul-2026",
    fecha: "2026-10-24",
    titulo: "Kasallik nafaqasi yangi tartibda hisoblanadi",
    texto: "2026-yil 1-iyuldan boshlangan kasallik varaqalari uchun nafaqa davlat ijtimoiy sugʻurtasi doirasida toʻlanadi: staj 96 oygacha boʻlsa 60 foiz, undan koʻp boʻlsa 80 foiz, yakshanba va bayram kunlarisiz.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["uz.kasallik-nafaqasi"],
    fuente: {
      organismo: "Lex.uz (Adliya vazirligi)",
      titulo: "Vazirlar Mahkamasining 2025-yil 17-dekabrdagi 796-son qarori, 4-ilova",
      url: "https://lex.uz/uz/docs/-7926684",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "uz.aylanma-soligi-2026",
    fecha: "2026-10-24",
    titulo: "Yakka tartibdagi tadbirkorlar uchun aylanma soligʻi 1 foiz",
    texto: "2026-yil 1-yanvardan Soliq kodeksining yangi tahririda yakka tartibdagi tadbirkorlar va oʻzini oʻzi band qilgan shaxslar uchun aylanmadan olinadigan soliq stavkasi 1 foiz. Umumiy stavka 4 foiz, chegara yiliga bir milliard soʻm.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["uz.aylanma-soligi-kalkulyatori"],
    fuente: {
      organismo: "Lex.uz (Adliya vazirligi)",
      titulo: "Soliq kodeksi, 461 va 467-moddalar (2025-yil 25-dekabrdagi OʻRQ-1108-son Qonun tahririda)",
      url: "https://lex.uz/uz/docs/-4674902",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "uz.ortiqcha-ish-noyabr-2025",
    fecha: "2026-10-24",
    titulo: "Ish vaqtidan tashqari ishning birinchi ikki soati 1,5 hissa",
    texto: "Mehnat kodeksining yangi tahririga koʻra ish vaqtidan tashqari ishning kundagi birinchi ikki soati kamida bir yarim hissa, qolgani kamida ikki hissa miqdorida toʻlanadi. Yillik 120 soatlik cheklov olib tashlandi.",
    vigenteDesde: "2025-11-12",
    calculadoras: ["uz.ortiqcha-ish-vaqti"],
    fuente: {
      organismo: "Lex.uz (Adliya vazirligi)",
      titulo: "Oʻzbekiston Respublikasining 2025-yil 11-noyabrdagi OʻRQ-1095-son Qonuni",
      url: "https://lex.uz/uz/docs/-7835258",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
