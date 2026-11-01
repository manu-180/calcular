import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.ortiqcha-ish-vaqti",
  h1: "Ish vaqtidan tashqari ish, dam olish kuni va tungi ish uchun haq",
  title: "Ortiqcha ish vaqti uchun haq: {{uz.ortiqcha-ish[dastlabki-2-soat]}} va {{uz.ortiqcha-ish[keyingi-soatlar]}} hissa",
  description:
    "Ish vaqtidan tashqari ish (birinchi ikki soat kamida {{uz.ortiqcha-ish[dastlabki-2-soat]}} hissa, keyin {{uz.ortiqcha-ish[keyingi-soatlar]}} hissa), dam olish kuni va tungi ish uchun qoʻshimcha toʻlovni hisoblang.",
  intro: [
    "2025-yil noyabridan ish vaqtidan tashqari ishning kundagi birinchi ikki soati kamida bir yarim hissa, qolgani kamida ikki hissa miqdorida toʻlanadi. Noqulay sharoitda har bir soat ikki hissa.",
    "Dam olish va bayram kunlaridagi ish, tungi ish uchun ham oshirilgan haq toʻlanadi. Jamoa yoki mehnat shartnomasida koʻproq miqdor belgilanishi mumkin.",
  ],
  comoSeCalcula: [
    "Bir soatlik stavka: oylik maosh ÷ shu oydagi ish soatlari normasi. Soatbay ishlasangiz, tarif stavkangiz olinadi.",
    "Ish vaqtidan tashqari: har bir kunning birinchi ikki soati × {{uz.ortiqcha-ish[dastlabki-2-soat]}}, qolgan soatlar × {{uz.ortiqcha-ish[keyingi-soatlar]}}.",
    "Dam olish yoki bayram kuni: maosh oluvchilarga maoshdan tashqari har soat uchun kamida bir hissa, soatbay ishlovchilarga kamida {{uz.ortiqcha-ish[dam-olish]}} hissa.",
    "Tungi ish (22:00 dan 06:00 gacha): soat kamida {{uz.ortiqcha-ish[tungi]}} koeffitsiyent bilan toʻlanadi. Kalkulyator oddiy soatdan ortiq qismini koʻrsatadi.",
  ],
  ejemplo: [
    "Maosh 6 000 000 soʻm, norma 168 soat, demak bir soat 35 714 soʻm. Toʻrt kun har kuni 3 soatdan ortiqcha ishlansa: (2 × 1,5 + 1 × 2) × 4 = 20 hissa, yaʼni 714 286 soʻm.",
  ],
  faq: [
    {
      pregunta: "Ortiqcha ish qancha boʻlishi mumkin?",
      respuesta: "Mehnat kodeksining 190-moddasiga koʻra ketma-ket ikki kun davomida toʻrt soatdan, noqulay sharoitda bir kunda ikki soatdan oshmasligi kerak.",
    },
    {
      pregunta: "Pul oʻrniga dam olish kuni olsa boʻladimi?",
      respuesta: "Ha, xodimning xohishiga koʻra. Bunda ortiqcha ish bir hissa miqdorida toʻlanadi, qoʻshimcha dam olish vaqti uchun esa haq toʻlanmaydi.",
    },
    {
      pregunta: "Ish vaqtidan tashqari ishga roziligimsiz jalb qilishlari mumkinmi?",
      respuesta: "Faqat favqulodda hollarda: halokat yoki avariya oqibatlarini bartaraf etish, kommunal tizimlardagi uzilishlar, smenachi kelmay qolganda. Boshqa hollarda yozma roziligingiz kerak.",
    },
  ],
  glosario: [
    { termino: "Hissa", definicion: "Oddiy soatlik stavkaga koʻpaytiriladigan son: bir yarim hissa 1,5 baravar degani." },
    { termino: "Ish soatlari normasi", definicion: "Shu oyda ish jadvali boʻyicha ishlanishi kerak boʻlgan soatlar. Haftalik norma 40 soatdan oshmaydi." },
  ],
});
