import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.ijtimoiy-soliq-kalkulyatori",
  h1: "Ijtimoiy soliq kalkulyatori: xodim ish beruvchiga qanchaga tushadi",
  title: "Ijtimoiy soliq {{uz.ijtimoiy-soliq[umumiy]}}: ish beruvchi xarajatini hisoblang",
  description:
    "Ish haqi fondidan ijtimoiy soliqni ({{uz.ijtimoiy-soliq[umumiy]}}, budjet tashkilotlarida {{uz.ijtimoiy-soliq[budjet]}}) va xodimning ish beruvchiga oylik va yillik jami xarajatini hisoblang.",
  intro: [
    "Ijtimoiy soliqni ish beruvchi xodimlarga hisoblangan ish haqi ustidan oʻz hisobidan toʻlaydi. Umumiy stavka {{uz.ijtimoiy-soliq[umumiy]}}.",
    "Kalkulyator bitta xodim yoki butun ish haqi fondi uchun soliqni va jami xarajatni koʻrsatadi.",
  ],
  comoSeCalcula: [
    "Ish haqi fondi: bitta xodimning maoshi × xodimlar soni.",
    "Ijtimoiy soliq: fond × {{uz.ijtimoiy-soliq[umumiy]}}. Budjet tashkilotlari uchun {{uz.ijtimoiy-soliq[budjet]}}.",
    "Ish beruvchining xarajati: fond plyus ijtimoiy soliq. Daromad soligʻi ({{uz.jshds[rezident-mehnat]}}) xarajatni oshirmaydi, u xodimning maoshidan ushlanadi.",
  ],
  ejemplo: ["6 000 000 soʻm maoshli bitta xodim uchun ijtimoiy soliq 720 000 soʻm. Xodim ish beruvchiga oyiga 6 720 000 soʻm, yiliga 80 640 000 soʻmga tushadi."],
  faq: [
    {
      pregunta: "Ijtimoiy soliq stavkasi qancha?",
      respuesta: "Umumiy stavka {{uz.ijtimoiy-soliq[umumiy]}}, budjet tashkilotlari uchun {{uz.ijtimoiy-soliq[budjet]}}. Ayrim toifalar uchun Prezident qarori bilan pasaytirilgan stavka belgilanishi mumkin.",
    },
    {
      pregunta: "Ijtimoiy soliq xodimning maoshidan ushlanadimi?",
      respuesta: "Yoʻq. Uni ish beruvchi maosh ustiga toʻlaydi. Xodimning maoshidan faqat daromad soligʻi ushlanadi.",
    },
    {
      pregunta: "Ijtimoiy soliq qachon toʻlanadi?",
      respuesta: "Soliq kodeksining 406-moddasiga koʻra soliq davri kalendar yil, hisobot davri esa yilning har bir oyi. Shuning uchun soliq har oy hisoblanadi.",
    },
  ],
  glosario: [
    { termino: "Ish haqi fondi", definicion: "Barcha xodimlarga bir oyda hisoblangan ish haqi summasi." },
    { termino: "Ijtimoiy soliq", definicion: "Ish beruvchi xodimlar ish haqi ustidan toʻlaydigan soliq." },
  ],
});
