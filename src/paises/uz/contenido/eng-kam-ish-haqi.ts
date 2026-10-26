import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.eng-kam-ish-haqi",
  h1: "Eng kam ish haqi 2026: {{uz.mhtekm}}",
  title: "Eng kam ish haqi 2026: oyiga {{uz.mhtekm}}",
  description:
    "Mehnatga haq toʻlashning eng kam miqdori {{uz.mhtekm#desde}} sanasidan oyiga {{uz.mhtekm}}. Yarim stavka uchun eng kam maoshni va qoʻlga tegadigan summani toping.",
  intro: [
    "Mehnatga haq toʻlashning eng kam miqdori (MHTEKM) {{uz.mhtekm#desde}} sanasidan oyiga {{uz.mhtekm}}. Uni Prezident Farmoni bilan butun respublika uchun bir xil belgilaydi.",
    "Oylik ish vaqti normasini ishlab bergan xodimning maoshi bundan kam boʻlishi mumkin emas. Toʻliqsiz ish vaqtida eng kam miqdor ishlangan vaqtga mutanosib hisoblanadi.",
  ],
  comoSeCalcula: [
    "Toʻliq stavka: eng kam oylik {{uz.mhtekm}}.",
    "Toʻliqsiz ish vaqti: {{uz.mhtekm}} × ish vaqtingiz ulushi. Yarim stavkada bu summaning yarmi.",
    "Qoʻlga tegadigan summa: eng kam oylikdan {{uz.jshds[rezident-mehnat]}} daromad soligʻi ayriladi.",
  ],
  ejemplo: ["Yarim stavkada ishlaydigan xodimning eng kam maoshi 680 000 soʻm (1 360 000 soʻmning yarmi). Soliqdan keyin unga 598 400 soʻm tegadi."],
  faq: [
    {
      pregunta: "2026-yilda eng kam ish haqi qancha?",
      respuesta: "{{uz.mhtekm#desde}} sanasidan oyiga {{uz.mhtekm}}. Undan oldin, 2025-yil 1-avgustdan boshlab, 1 271 000 soʻm edi.",
    },
    {
      pregunta: "Eng kam ish haqiga mukofot va ustamalar kiradimi?",
      respuesta: "Yoʻq. Mehnat kodeksining 245-moddasiga koʻra mukofotlar, ustamalar, ish vaqtidan tashqari, dam olish kunlari va tungi ish uchun toʻlovlar eng kam miqdorga kiritilmaydi.",
    },
    {
      pregunta: "Eng kam ish haqi va BHM bir xilmi?",
      respuesta: "Yoʻq. BHM (bazaviy hisoblash miqdori) jarimalar, yigʻimlar va boj hisobida ishlatiladi. Eng kam ish haqi esa maoshning quyi chegarasi.",
    },
  ],
  glosario: [
    { termino: "MHTEKM", definicion: "Mehnatga haq toʻlashning eng kam miqdori: toʻliq ish vaqti uchun eng past oylik maosh." },
    { termino: "Toʻliqsiz ish vaqti", definicion: "Kunlik yoki haftalik normadan kam ish vaqti. Haq ishlangan vaqtga mutanosib toʻlanadi." },
  ],
});
