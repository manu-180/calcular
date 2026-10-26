import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.inflyatsiya-kalkulyatori",
  h1: "Inflyatsiya kalkulyatori: soʻmning xarid quvvati",
  title: "Inflyatsiya kalkulyatori: pul qadri qancha tushdi",
  description:
    "Oldingi yillardagi summa bugungi narxlarda qancha boʻlishini rasmiy isteʼmol narxlari indeksi boʻyicha hisoblang. Oxirgi maʼlumot: {{uz.cpi#desde}}.",
  intro: [
    "Narxlar oshgani sari soʻmning xarid quvvati kamayadi. Kalkulyator ikki oy orasidagi isteʼmol narxlari indeksini solishtirib, summani qayta hisoblaydi.",
    "Maʼlumotlar Statistika agentligi har oy eʼlon qiladigan isteʼmol narxlari indeksidan (MIIT-2018 boʻyicha) olingan, 2020-yil dekabridan boshlab.",
  ],
  comoSeCalcula: [
    "Har bir oyning indeksi oldingi oyga nisbatan eʼlon qilinadi. Ular 2020-yil dekabr = 100 qilib zanjir usulida koʻpaytirilgan.",
    "Yangi summa: summa × (oxirgi oy indeksi ÷ boshlangʻich oy indeksi).",
    "Oxirgi oy uchun maʼlumot hali chiqmagan boʻlsa, hisob eʼlon qilingan oxirgi oygacha qilinadi.",
  ],
  ejemplo: ["2021-yil yanvardagi 1 000 000 soʻm 2026-yil sentabr narxlarida taxminan 1 631 239 soʻmga teng: narxlar shu davrda 63 foizga oshgan."],
  faq: [
    {
      pregunta: "Inflyatsiya maʼlumoti qayerdan olinadi?",
      respuesta: "Oʻzbekiston Respublikasi Prezidenti huzuridagi Statistika agentligining ochiq maʼlumotlaridan: isteʼmol narxlari indeksining oylik dinamikasi.",
    },
    {
      pregunta: "Natija aniq narxlarni koʻrsatadimi?",
      respuesta: "Yoʻq. Indeks oʻrtacha isteʼmol savatining narxini koʻrsatadi. Ayrim tovarlar, masalan, oziq-ovqat yoki ijara, boshqacha oshgan boʻlishi mumkin.",
    },
    {
      pregunta: "Yangi oy maʼlumoti qachon qoʻshiladi?",
      respuesta: "Statistika agentligi indeksni har oy eʼlon qiladi. Sayt yangi oyni avtomatik tekshiradi va qoʻshadi.",
    },
  ],
  glosario: [
    { termino: "Isteʼmol narxlari indeksi", definicion: "Aholi sotib oladigan tovar va xizmatlar narxining oʻzgarishini koʻrsatadigan koʻrsatkich." },
    { termino: "Xarid quvvati", definicion: "Maʼlum summaga qancha tovar va xizmat sotib olish mumkinligi." },
  ],
});
