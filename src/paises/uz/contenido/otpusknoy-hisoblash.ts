import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.otpusknoy-hisoblash",
  h1: "Otpusknoy hisoblash: mehnat taʼtili puli kalkulyatori",
  title: "Otpusknoy hisoblash 2026: taʼtil puli kalkulyatori",
  description:
    "Mehnat taʼtili uchun toʻlanadigan summani (otpusknoy) oʻrtacha ish haqi, {{uz.ish-kunlari-ortacha}} ish kuni va yakshanbalarsiz kunlar boʻyicha Mehnat kodeksiga muvofiq hisoblang.",
  intro: [
    "Har yilgi mehnat taʼtili vaqtida xodimga oʻrtacha ish haqi saqlanadi. Xalq tilida bu summa «otpusknoy» deyiladi.",
    "Asosiy taʼtil kamida {{uz.tatil-kunlari}} kalendar kun. Taʼtilga toʻgʻri kelgan bayram kunlari taʼtilni uzaytiradi, yakshanba uchun esa haq toʻlanmaydi.",
  ],
  comoSeCalcula: [
    "Oʻrtacha oylik ish haqi: taʼtildan oldingi 12 oyda hisoblangan ish haqi ÷ 12. Kamroq ishlagan boʻlsangiz, ishlagan oylaringiz soniga boʻlinadi.",
    "Oʻrtacha kunlik ish haqi: oʻrtacha oylik ÷ {{uz.ish-kunlari-ortacha}} (ish kunlarining oʻrtacha oylik soni).",
    "Haq toʻlanadigan kunlar: taʼtil kunlari minus shu davrdagi yakshanbalar.",
    "Taʼtil puli: oʻrtacha kunlik ish haqi × haq toʻlanadigan kunlar. Undan {{uz.jshds[rezident-mehnat]}} daromad soligʻi ushlanadi.",
  ],
  ejemplo: [
    "Maosh 6 000 000 soʻm, taʼtil 2-noyabrdan 21 kun. Davrda uchta yakshanba bor, haq 18 kun uchun toʻlanadi: 6 000 000 ÷ 25,3 × 18 = 4 268 775 soʻm. Soliqdan keyin qoʻlga 3 756 522 soʻm tegadi.",
  ],
  faq: [
    {
      pregunta: "Otpusknoy qachon toʻlanadi?",
      respuesta: "Mehnat kodeksining 233-moddasiga koʻra taʼtil puli taʼtil boshlanishidan oldingi oxirgi ish kunidan kechiktirmay toʻlanadi.",
    },
    {
      pregunta: "Nega {{uz.ish-kunlari-ortacha}} ga boʻlinadi?",
      respuesta: "Mehnat kodeksining 257-moddasida oʻrtacha kunlik ish haqi oʻrtacha oylik ish haqini ish kunlarining oʻrtacha oylik soniga ({{uz.ish-kunlari-ortacha}}) boʻlib topilishi belgilangan.",
    },
    {
      pregunta: "Yakshanba va bayram kunlari uchun haq toʻlanadimi?",
      respuesta: "Yakshanba uchun haq toʻlanmaydi. Bayram kunlari esa taʼtil kunlariga kirmaydi: taʼtil shuncha kunga uzayadi.",
    },
    {
      pregunta: "Taʼtilni qismlarga boʻlish mumkinmi?",
      respuesta: "Ha, xodim va ish beruvchi kelishsa. Bunda taʼtilning bir qismi kamida 14 kalendar kun boʻlishi kerak (231-modda).",
    },
  ],
  glosario: [
    { termino: "Otpusknoy", definicion: "Har yilgi mehnat taʼtili vaqti uchun toʻlanadigan oʻrtacha ish haqi." },
    { termino: "Oʻrtacha ish haqi", definicion: "Oxirgi 12 oyda hisoblangan barcha mehnat daromadlarining oʻn ikkidan bir qismi." },
  ],
});
