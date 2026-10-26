import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.kasallik-nafaqasi",
  h1: "Kasallik nafaqasini hisoblash (bolnichniy)",
  title: "Kasallik nafaqasi 2026: bolnichniy pulini hisoblang",
  description:
    "Vaqtincha mehnatga layoqatsizlik nafaqasini yangi tartib boʻyicha hisoblang: oʻrtacha ish haqi, sugʻurta staji ({{uz.kasallik-staj-koeffitsiyenti[6-96-oy]}} yoki {{uz.kasallik-staj-koeffitsiyenti[97-oy-va-ortiq]}}) va kunlar.",
  intro: [
    "2026-yil 1-iyuldan boshlangan kasallik varaqalari uchun nafaqa davlat ijtimoiy sugʻurtasi doirasida yangi tartibda hisoblanadi.",
    "Nafaqa miqdori oʻrtacha ish haqingizga, sugʻurta stajingizga va varaqadagi ish kunlariga bogʻliq. Yakshanba va bayram kunlari hisobga olinmaydi.",
  ],
  comoSeCalcula: [
    "Nafaqa = oʻrtacha oylik ish haqi ÷ {{uz.ish-kunlari-ortacha}} × staj koeffitsiyenti × haq toʻlanadigan kunlar.",
    "Staj koeffitsiyenti: sugʻurta staji 6 oydan 96 oygacha boʻlsa {{uz.kasallik-staj-koeffitsiyenti[6-96-oy]}}, 97 oy va undan koʻp boʻlsa {{uz.kasallik-staj-koeffitsiyenti[97-oy-va-ortiq]}}.",
    "I yoki II guruh nogironligi boʻlganlar, 18 yoshgacha toʻrt va undan ortiq farzandi yoki nogironligi boʻlgan farzandi borlar uchun koeffitsiyentga yana {{uz.kasallik-imtiyoz}} qoʻshiladi.",
    "Hisobda oʻrtacha ish haqining eng kam ish haqi oʻn baravarigacha boʻlgan qismi olinadi.",
    "Yil davomida 77 kalendar kundan oshgan kunlar uchun koeffitsiyentdan {{uz.kasallik-kamaytirish}} ayriladi. Yiliga 182 kundan ortigʻiga nafaqa toʻlanmaydi.",
  ],
  ejemplo: [
    "Oʻrtacha ish haqi 6 000 000 soʻm, staj 10 yil, varaqa 2-noyabrdan 10 kun. Bitta yakshanba chiqariladi, 9 kun qoladi: 6 000 000 ÷ 25,3 × 80% × 9 = 1 707 510 soʻm. Soliqdan keyin 1 502 609 soʻm.",
  ],
  faq: [
    {
      pregunta: "Kasallik nafaqasini kim toʻlaydi?",
      respuesta: "Varaqaning beshinchi kunigacha boʻlgan qismini ish beruvchi, oltinchi kundan boshlab Davlat ijtimoiy sugʻurta jamgʻarmasi toʻlaydi. Ariza yozish shart emas: nafaqa proaktiv tayinlanadi.",
    },
    {
      pregunta: "Nafaqa olish uchun qancha staj kerak?",
      respuesta: "Kamida olti oy sugʻurta staji. Oylik ish haqi eng kam ish haqidan past boʻlgan oy yarim oy staj sifatida hisoblanadi.",
    },
    {
      pregunta: "Kasallik nafaqasidan soliq ushlanadimi?",
      respuesta: "Ha. Vaqtincha mehnatga layoqatsizlik nafaqasi jami daromadga kiradi va undan {{uz.jshds[rezident-mehnat]}} daromad soligʻi ushlanadi.",
    },
    {
      pregunta: "2026-yil iyulgacha boshlangan varaqa uchun ham shundaymi?",
      respuesta: "Yoʻq. Bu tartib 2026-yil 1-iyuldan yuzaga kelgan hodisalarga qoʻllaniladi. Oldingi varaqalar avvalgi qoidalar boʻyicha toʻlanadi.",
    },
  ],
  glosario: [
    { termino: "Sugʻurta staji", definicion: "Sizning nomingizdan sugʻurta badali yoki ijtimoiy soliq toʻlangan oylar." },
    { termino: "Staj koeffitsiyenti", definicion: "Oʻrtacha ish haqining nafaqaga toʻlanadigan foizi." },
  ],
});
