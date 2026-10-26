import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.sof-ish-haqi-hisoblash",
  h1: "Sof ish haqidan yalpi maoshni hisoblash",
  title: "Sof ish haqi: qoʻlga tegadigan summadan yalpi maosh",
  description:
    "Qoʻlingizga aniq qancha tegishini bilasizmi? Shartnomaga qancha yozilishi, daromad soligʻi ({{uz.jshds[rezident-mehnat]}}) va ish beruvchi xarajatini hisoblang.",
  intro: [
    "Ish haqi haqida koʻpincha «qoʻlga» summa bilan kelishiladi. Shartnomaga esa yalpi maosh yoziladi, soliq undan ushlanadi.",
    "Bu kalkulyator teskari hisob qiladi: qoʻlga tegishi kerak boʻlgan summadan yalpi maoshni topadi.",
  ],
  comoSeCalcula: [
    "Yalpi maosh: qoʻlga tegadigan summa ÷ (1 − {{uz.jshds[rezident-mehnat]}}). Natija butun soʻmgacha yaxlitlanadi.",
    "Keyin soliq qayta hisoblanadi, shunda yalpi maoshdan soliq ayrilganda aynan siz kiritgan summa qoladi.",
    "Ish beruvchi yalpi maosh ustiga ijtimoiy soliq toʻlaydi: {{uz.ijtimoiy-soliq[umumiy]}}, budjet tashkilotlarida {{uz.ijtimoiy-soliq[budjet]}}.",
  ],
  ejemplo: [
    "Qoʻlga 5 280 000 soʻm tegishi uchun shartnomaga 6 000 000 soʻm yoziladi. Soliq 720 000 soʻm, ish beruvchining jami xarajati 6 720 000 soʻm.",
  ],
  faq: [
    {
      pregunta: "Qoʻlga 5 million soʻm olish uchun yalpi maosh qancha boʻlishi kerak?",
      respuesta: "Rezident uchun 5 681 818 soʻm. Undan 681 818 soʻm daromad soligʻi ushlanadi va qoʻlingizga 5 000 000 soʻm tegadi.",
    },
    {
      pregunta: "Nega 12 foizni qoʻlga tegadigan summaga qoʻshib boʻlmaydi?",
      respuesta: "Soliq yalpi maoshdan hisoblanadi, qoʻlga tegadigan summadan emas. 5 000 000 ga 12 foiz qoʻshsangiz 5 600 000 chiqadi, undan soliq ushlansa qoʻlga 4 928 000 qoladi.",
    },
    {
      pregunta: "Bu hisob norezidentlarga ham toʻgʻri keladimi?",
      respuesta: "Norezidentning mehnat daromadiga ham {{uz.jshds[norezident-mehnat]}} soliq qoʻllaniladi, shuning uchun natija bir xil boʻladi.",
    },
  ],
  glosario: [
    { termino: "Sof ish haqi", definicion: "Daromad soligʻi ushlangandan keyin qoʻlga yoki kartaga tushadigan summa." },
    { termino: "Yalpi ish haqi", definicion: "Mehnat shartnomasidagi, soliq ushlanmasdan oldingi summa." },
  ],
});
