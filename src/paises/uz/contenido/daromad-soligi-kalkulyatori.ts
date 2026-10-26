import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.daromad-soligi-kalkulyatori",
  h1: "Daromad soligʻi kalkulyatori (JShDS)",
  title: "Daromad soligʻi {{uz.jshds[rezident-mehnat]}}: JShDS kalkulyatori 2026",
  description:
    "Jismoniy shaxslardan olinadigan daromad soligʻini hisoblang: ish haqi {{uz.jshds[rezident-mehnat]}}, dividend va foizlar {{uz.jshds[rezident-dividend]}}, norezidentlar uchun alohida stavkalar.",
  intro: [
    "Jismoniy shaxslardan olinadigan daromad soligʻi (JShDS) Oʻzbekistonda bir xil stavkada olinadi: rezidentning ish haqi va boshqa daromadlari uchun {{uz.jshds[rezident-mehnat]}}.",
    "Dividend va foizlarga rezident uchun {{uz.jshds[rezident-dividend]}}, norezident uchun {{uz.jshds[norezident-dividend]}} stavka qoʻllaniladi.",
  ],
  comoSeCalcula: [
    "Daromad turini tanlang. Kalkulyator Soliq kodeksidagi tegishli stavkani oladi.",
    "Soliq: daromad × stavka, butun soʻmgacha yaxlitlanadi.",
    "Qoladigan summa: daromad minus soliq.",
  ],
  ejemplo: ["Rezident 2 000 000 soʻm dividend olsa, soliq 100 000 soʻm boʻladi. Norezident uchun xuddi shu dividenddan 200 000 soʻm ushlanadi."],
  faq: [
    {
      pregunta: "Rezident kim hisoblanadi?",
      respuesta: "Istalgan ketma-ket oʻn ikki oy ichida Oʻzbekistonda jami 183 kalendar kundan koʻproq boʻlgan jismoniy shaxs soliq rezidenti hisoblanadi.",
    },
    {
      pregunta: "Bank omonati foizidan soliq olinadimi?",
      respuesta: "Yoʻq. Soliq kodeksining 378-moddasiga koʻra banklardagi omonatlar boʻyicha foizlar va yutuqlar jismoniy shaxslar uchun soliqqa tortilmaydi.",
    },
    {
      pregunta: "Norezidentning ish haqiga qancha soliq solinadi?",
      respuesta: "Mehnat shartnomalari va fuqarolik-huquqiy shartnomalar boʻyicha daromadga {{uz.jshds[norezident-mehnat]}}, yaʼni rezident bilan bir xil.",
    },
  ],
  glosario: [
    { termino: "Soliq rezidenti", definicion: "Oʻzbekistonda ketma-ket oʻn ikki oy ichida 183 kundan koʻproq boʻlgan jismoniy shaxs." },
    { termino: "Soliq agenti", definicion: "Daromad toʻlayotganda soliqni hisoblab, ushlab qoladigan tashkilot, masalan ish beruvchi." },
  ],
});
