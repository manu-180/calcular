import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.bhm-kalkulyatori",
  h1: "BHM kalkulyatori: bazaviy hisoblash miqdori {{uz.bhm}}",
  title: "BHM 2026: 1 BHM = {{uz.bhm}}, jarimani hisoblang",
  description:
    "Bazaviy hisoblash miqdori {{uz.bhm#desde}} sanasidan {{uz.bhm}}. BHMda belgilangan jarima, yigʻim va bojni soʻmga yoki summani BHMga oʻtkazing.",
  intro: [
    "Bazaviy hisoblash miqdori (BHM) {{uz.bhm#desde}} sanasidan {{uz.bhm}}. Jarimalar, davlat boji va koʻp yigʻimlar soʻmda emas, BHMda belgilanadi.",
    "BHM oʻzgarsa, jarima ham oʻzgaradi. Shuning uchun summani toʻlov kunidagi BHM bilan hisoblang.",
  ],
  comoSeCalcula: [
    "BHMdan soʻmga: BHM soni × {{uz.bhm}}.",
    "Soʻmdan BHMga: summa ÷ {{uz.bhm}}.",
  ],
  ejemplo: ["5 BHM miqdoridagi jarima 2 200 000 soʻm (5 × 440 000). Yarim BHM esa 220 000 soʻm."],
  faq: [
    {
      pregunta: "2026-yilda 1 BHM qancha?",
      respuesta: "{{uz.bhm#desde}} sanasidan 1 BHM {{uz.bhm}}. 2025-yil 1-avgustdan 2026-yil 31-avgustgacha 412 000 soʻm edi.",
    },
    {
      pregunta: "BHM va eng kam ish haqi bir xilmi?",
      respuesta: "Yoʻq. Eng kam ish haqi maoshning quyi chegarasi, BHM esa jarima, boj va yigʻimlar hisobi uchun. Ikkalasini ham Prezident Farmoni belgilaydi.",
    },
    {
      pregunta: "BHM qachon oʻzgaradi?",
      respuesta: "Yangi miqdorni Prezident Farmoni belgilaydi. Oxirgi ikki marta u 1-avgust va 1-sentabrdan oshirilgan. Kalkulyator har doim hisob kunida amal qiladigan miqdorni oladi.",
    },
  ],
  glosario: [
    { termino: "BHM", definicion: "Bazaviy hisoblash miqdori: jarima, davlat boji va yigʻimlar hisobida ishlatiladigan birlik." },
  ],
});
