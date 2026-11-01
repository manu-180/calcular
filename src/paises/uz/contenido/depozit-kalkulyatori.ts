import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.depozit-kalkulyatori",
  h1: "Depozit kalkulyatori: omonat foizini hisoblash",
  title: "Depozit kalkulyatori: omonatdan qancha foiz olasiz",
  description:
    "Soʻmdagi bank omonati boʻyicha foiz daromadini hisoblang: oddiy foiz yoki oylik kapitallashuv, har oy toʻldirish bilan. Omonat foizlaridan soliq olinmaydi.",
  intro: [
    "Kalkulyator omonat summasi, yillik stavka va muddatdan qancha foiz olishingizni koʻrsatadi.",
    "Kapitallashuvda har oyning foizi omonatga qoʻshiladi va keyingi oy foiz kattaroq summaga hisoblanadi.",
  ],
  comoSeCalcula: [
    "Oylik foiz: qoldiq × yillik stavka ÷ 12.",
    "Kapitallashuvsiz: foiz har oy bir xil summaga hisoblanadi. Kapitallashuv bilan: foiz qoldiqqa qoʻshiladi.",
    "Har oy toʻldirsangiz, qoʻshilgan summa keyingi oydan foiz keltiradi.",
  ],
  ejemplo: ["10 000 000 soʻm, yillik 20 foiz, 12 oy: kapitallashuvsiz 2 000 000 soʻm, oylik kapitallashuv bilan 2 193 911 soʻm foiz."],
  faq: [
    {
      pregunta: "Depozit foizidan soliq olinadimi?",
      respuesta: "Yoʻq. Soliq kodeksining 378-moddasiga koʻra banklardagi omonatlar boʻyicha foizlar jismoniy shaxslar uchun soliqqa tortilmaydi.",
    },
    {
      pregunta: "Natija bank hisobidan farq qilishi mumkinmi?",
      respuesta: "Ha, biroz. Kalkulyator har oyni yilning oʻn ikkidan biri deb oladi. Shartnomangizda foiz kunlik qoldiqqa yoki oydagi haqiqiy kunlarga hisoblansa, summa bir oz boshqacha chiqadi.",
    },
    {
      pregunta: "Samarali stavka nima?",
      respuesta: "Kapitallashuvni hisobga olgan yillik stavka. Masalan, 20 foiz har oy kapitallashtirilsa, bir yilda 21,94 foiz daromad beradi.",
    },
  ],
  glosario: [
    { termino: "Kapitallashuv", definicion: "Hisoblangan foizning omonat summasiga qoʻshilishi." },
    { termino: "Muddatli omonat", definicion: "Bankka maʼlum muddatga qoʻyiladigan pul." },
  ],
});
