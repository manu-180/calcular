import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.mol-mulk-soligi-kalkulyatori",
  h1: "Mol-mulk soligʻi kalkulyatori (jismoniy shaxslar)",
  title: "Mol-mulk soligʻi {{anio}}: uy-joy va kvartira uchun hisoblash",
  description:
    "Uy, kvartira yoki noturar joy uchun mol-mulk soligʻini kadastr qiymatidan hisoblang: eng past stavka {{uz.mol-mulk-soligi[asosiy]}}, pensionerlarga 60 kv.m imtiyoz.",
  intro: [
    "Jismoniy shaxslar uy-joy, kvartira, dala hovli va boshqa koʻchmas mulk uchun har yili mol-mulk soligʻi toʻlaydi. Soliq bazasi kadastr qiymati.",
    "Soliqni soliq organi hisoblaydi va toʻlov xabarnomasini 1-martgacha yuboradi. Kalkulyator summani oldindan bilish uchun.",
  ],
  comoSeCalcula: [
    "Stavka: 200 kv.m gacha uy-joy va kvartiralar {{uz.mol-mulk-soligi[asosiy]}}. Shaharda 200 dan 500 kv.m gacha {{uz.mol-mulk-soligi[shahar-200-500]}}, 500 kv.m dan ortiq {{uz.mol-mulk-soligi[shahar-500-dan-ortiq]}}.",
    "Tadbirkorlik yoki ijaraga berish uchun ishlatiladigan va noturar joylar: {{uz.mol-mulk-soligi[tadbirkorlik]}}.",
    "Uy-joy uchun soliq bazasi kamida {{uz.mol-mulk-eng-kam-baza}} qilib olinadi.",
    "Mahalliy Kengash stavkaga 0,7 dan 1,3 gacha koeffitsiyent qoʻllashi mumkin. Yil oʻrtasida mulk sotib olingan boʻlsa, soliq egalik qilingan oylar uchun hisoblanadi.",
  ],
  ejemplo: ["Kadastr qiymati 400 000 000 soʻm boʻlgan 80 kv.m kvartira uchun soliq 1 440 000 soʻm. Uni ikki teng qismda, 720 000 soʻmdan toʻlaysiz."],
  faq: [
    {
      pregunta: "Mol-mulk soligʻi qachon toʻlanadi?",
      respuesta: "Teng ulushlarda 15-aprelgacha va 15-oktabrgacha. Toʻlov xabarnomasi har yili 1-martdan kechiktirmay shaxsiy kabinetga, SMS yoki imzo qoʻydirib topshiriladi.",
    },
    {
      pregunta: "Pensionerlar mol-mulk soligʻi toʻlaydimi?",
      respuesta: "Pensionerlar, I va II guruh nogironligi boʻlganlar, oʻn va undan ortiq farzandli ota-onalarning mulki 60 kv.m doirasida soliqdan ozod. Imtiyoz faqat bitta uy-joyga beriladi.",
    },
    {
      pregunta: "Kadastr qiymatini qayerdan bilaman?",
      respuesta: "Uni koʻchmas mulkka boʻlgan huquqlarni davlat roʻyxatidan oʻtkazuvchi organ belgilaydi. Qiymat kadastr hujjatlarida va soliq xabarnomasida koʻrsatiladi.",
    },
  ],
  glosario: [
    { termino: "Kadastr qiymati", definicion: "Davlat roʻyxatidan oʻtkazuvchi organ belgilagan koʻchmas mulk qiymati: mol-mulk soligʻining bazasi." },
  ],
});
