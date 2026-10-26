import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.dekret-puli-hisoblash",
  h1: "Dekret puli hisoblash: homiladorlik va tugʻish nafaqasi",
  title: "Dekret puli hisoblash 2026: tugʻish nafaqasi",
  description:
    "Homiladorlik va tugʻish nafaqasini oʻrtacha ish haqi, sugʻurta staji (koeffitsiyent {{uz.homiladorlik-staj-koeffitsiyenti[10-24-oy]}}, {{uz.homiladorlik-staj-koeffitsiyenti[25-60-oy]}} yoki {{uz.homiladorlik-staj-koeffitsiyenti[61-oy-va-ortiq]}}) va taʼtil kunlari boʻyicha hisoblang.",
  intro: [
    "Homiladorlik va tugʻish taʼtili tugʻruqqacha 70 va tugʻruqdan keyin 56 kalendar kun davom etadi. Tugʻish qiyin kechsa yoki ikki va undan ortiq bola tugʻilsa, tugʻruqdan keyingi qismi 70 kun.",
    "Xalq tilida bu nafaqa «dekret puli» deyiladi. 2026-yildan u davlat ijtimoiy sugʻurtasi doirasida toʻlanadi.",
  ],
  comoSeCalcula: [
    "Nafaqa = oʻrtacha oylik ish haqi ÷ {{uz.ish-kunlari-ortacha}} × staj koeffitsiyenti × haq toʻlanadigan kunlar.",
    "Staj koeffitsiyenti: 10 oydan 24 oygacha {{uz.homiladorlik-staj-koeffitsiyenti[10-24-oy]}}, 25 oydan 60 oygacha {{uz.homiladorlik-staj-koeffitsiyenti[25-60-oy]}}, 61 oy va undan ortiq {{uz.homiladorlik-staj-koeffitsiyenti[61-oy-va-ortiq]}}.",
    "Taʼtil davridagi yakshanba va bayram kunlari haq toʻlanadigan kunlarga kirmaydi.",
    "Oʻrtacha ish haqining eng kam ish haqi oʻn baravarigacha boʻlgan qismi olinadi.",
  ],
  ejemplo: [
    "Oʻrtacha ish haqi 6 000 000 soʻm, staj 70 oy, taʼtil 2-noyabrdan 126 kun. Davrda 18 yakshanba va 2 bayram bor, 106 kun qoladi: 6 000 000 ÷ 25,3 × 106 = 25 138 340 soʻm.",
  ],
  faq: [
    {
      pregunta: "Dekret puli uchun qancha staj kerak?",
      respuesta: "Kamida oʻn oy sugʻurta staji va hodisadan oldingi oxirgi olti oy davomida uzluksiz staj.",
    },
    {
      pregunta: "Dekret pulidan soliq ushlanadimi?",
      respuesta: "Yoʻq. Qonunda belgilangan nafaqalar jami daromadga kiritilmaydi. Soliq faqat vaqtincha mehnatga layoqatsizlik nafaqasidan ushlanadi.",
    },
    {
      pregunta: "Nafaqa uchun ariza yozish kerakmi?",
      respuesta: "Yoʻq. Homiladorlik va tugʻish nafaqasi mehnatga layoqatsizlik varaqasi asosida murojaatsiz, proaktiv tayinlanadi.",
    },
  ],
  glosario: [
    { termino: "Dekret taʼtili", definicion: "Homiladorlik va tugʻish taʼtili: tugʻruqqacha va tugʻruqdan keyingi davr." },
    { termino: "Sugʻurta staji", definicion: "Nomingizdan ijtimoiy soliq yoki sugʻurta badali toʻlangan oylar." },
  ],
});
