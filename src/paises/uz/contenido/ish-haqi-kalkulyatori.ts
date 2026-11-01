import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.ish-haqi-kalkulyatori",
  h1: "Ish haqi kalkulyatori: qoʻlga tegadigan maoshni hisoblash",
  title: "Ish haqi hisoblash {{anio}}: soliqdan keyingi maosh",
  description:
    "Yalpi maoshdan daromad soligʻi ({{uz.jshds[rezident-mehnat]}}) ushlanganidan keyin qoʻlingizga qancha tegishini va ish beruvchi qancha ijtimoiy soliq toʻlashini hisoblang.",
  intro: [
    "Oʻzbekistonda ish haqidan bitta soliq ushlanadi: jismoniy shaxslardan olinadigan daromad soligʻi. Rezident uchun uning stavkasi {{uz.jshds[rezident-mehnat]}}.",
    "Soliqni ish beruvchi hisoblaydi va maosh berishda ushlab qoladi. Qolgan summa qoʻlingizga yoki kartangizga tushadi. Ijtimoiy soliqni ish beruvchi oʻz hisobidan toʻlaydi, u maoshingizdan ayrilmaydi.",
  ],
  comoSeCalcula: [
    "Daromad soligʻi: yalpi maosh × {{uz.jshds[rezident-mehnat]}}. Norezidentning mehnat daromadiga ham {{uz.jshds[norezident-mehnat]}} qoʻllaniladi.",
    "Qoʻlga tegadigan maosh: yalpi maosh minus daromad soligʻi.",
    "INPS badali (shaxsiy jamgʻarib boriladigan pensiya hisobvaragʻiga) alohida ushlanmaydi. Soliq kodeksiga koʻra hisoblangan soliq summasi shu badalga kamaytiriladi, yaʼni badal soliqning ichidan oʻtkaziladi.",
    "Ijtimoiy soliq: yalpi maosh × {{uz.ijtimoiy-soliq[umumiy]}}. Budjet tashkilotlarida stavka {{uz.ijtimoiy-soliq[budjet]}}.",
  ],
  ejemplo: [
    "Yalpi maosh 6 000 000 soʻm boʻlsa, daromad soligʻi 720 000 soʻm. Qoʻlingizga 5 280 000 soʻm tegadi. Ish beruvchi yana 720 000 soʻm ijtimoiy soliq toʻlaydi, uning jami xarajati 6 720 000 soʻm.",
  ],
  faq: [
    {
      pregunta: "Maoshdan necha foiz soliq ushlanadi?",
      respuesta: "Rezident uchun {{uz.jshds[rezident-mehnat]}}. Bu stavka maoshning miqdoriga bogʻliq emas: kam maoshga ham, katta maoshga ham bir xil.",
    },
    {
      pregunta: "INPS uchun maoshdan yana pul ushlanadimi?",
      respuesta: "Yoʻq. INPS badali daromad soligʻi summasidan oʻtkaziladi. Qoʻlingizga tegadigan summa oʻzgarmaydi.",
    },
    {
      pregunta: "Ijtimoiy soliqni kim toʻlaydi?",
      respuesta: "Ish beruvchi. U maoshingiz ustiga {{uz.ijtimoiy-soliq[umumiy]}} miqdorida qoʻshimcha toʻlanadi (budjet tashkilotlarida {{uz.ijtimoiy-soliq[budjet]}}) va qoʻlingizga tegadigan summani kamaytirmaydi.",
    },
    {
      pregunta: "Eng kam ish haqi qancha?",
      respuesta: "Mehnatga haq toʻlashning eng kam miqdori oyiga {{uz.mhtekm}}. U {{uz.mhtekm#desde}} sanasidan amal qiladi. Toʻliq ish vaqtida ishlagan xodimning maoshi bundan kam boʻlishi mumkin emas.",
    },
  ],
  glosario: [
    { termino: "Yalpi ish haqi", definicion: "Mehnat shartnomasida yozilgan, soliq ushlanmasdan oldingi summa." },
    { termino: "JShDS", definicion: "Jismoniy shaxslardan olinadigan daromad soligʻi. Ish beruvchi uni har oy maoshdan ushlab qoladi." },
    { termino: "INPS", definicion: "Shaxsiy jamgʻarib boriladigan pensiya hisobvaragʻi. Unga oylik badal daromad soligʻi hisobidan oʻtkaziladi." },
  ],
});
