import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.minimala-alga",
  h1: "Minimālā alga {{anio}}: bruto, neto un izmaksas",
  title: "Minimālā alga {{anio}}: {{lv.minimala-alga}} bruto, cik uz rokas",
  description:
    "Minimālā alga Latvijā ir {{lv.minimala-alga}} mēnesī. Aprēķiniet neto summu un darba devēja izmaksas pilnai vai nepilnai slodzei.",
  intro: [
    "Minimālā mēneša darba alga Latvijā ir {{lv.minimala-alga}} bruto normālā darba laika ietvaros. Summa spēkā no: {{lv.minimala-alga#desde}}. To nosaka Ministru kabineta 2015. gada 24. novembra noteikumi Nr. 656.",
    "Kalkulators parāda, cik no tā paliek uz rokas ar pašreizējām likmēm un cik darbinieks izmaksā darba devējam. Nepilnai slodzei minimums tiek rēķināts proporcionāli.",
  ],
  comoSeCalcula: [
    "Bruto summa ir minimālā alga, reizināta ar jūsu slodzi. No tās ietur VSAOI {{lv.vsaoi-darba-nemejs[vispariga]}}.",
    "Ar iesniegtu grāmatiņu no atlikuma atņem neapliekamo minimumu {{lv.neapliekamais-minimums}}. No tā, kas paliek, rēķina IIN {{lv.iin-alga}}.",
    "Darba devējs papildus maksā savu VSAOI daļu {{lv.vsaoi-darba-devejs[vispariga]}}, tāpēc viņa izmaksas ir lielākas par bruto summu.",
  ],
  ejemplo: [
    "Pilnā slodzē ar grāmatiņu: VSAOI 81,90 eiro, apliekamā summa 148,10 eiro, IIN 37,77 eiro. Uz rokas paliek 660,33 eiro, bet darba devējam tas izmaksā 964 eiro mēnesī. Puse slodzes dod 390 eiro bruto un, tā kā minimums aizsedz visu pārējo, 349,05 eiro neto.",
  ],
  faq: [
    {
      pregunta: "Kāda ir minimālā alga šobrīd?",
      respuesta: "Tā ir {{lv.minimala-alga}} mēnesī par normālu darba laiku. VID to norāda, atsaucoties uz grozījumiem Ministru kabineta noteikumos Nr. 656.",
    },
    {
      pregunta: "Vai minimālā alga ir bruto vai neto?",
      respuesta: "Bruto. No tās vēl ietur VSAOI un IIN, tāpēc saņemtā summa ir mazāka. Šī summa kalpo arī kā pašnodarbinātā obligāto iemaksu minimālais objekts ({{lv.pasnodarbinata-objekts}} mēnesī).",
    },
    {
      pregunta: "Kāpēc pie nepilnas slodzes nodokļa bieži nav?",
      respuesta: "Ja pēc VSAOI ieturēšanas alga nepārsniedz neapliekamo minimumu ({{lv.neapliekamais-minimums}}) un grāmatiņa ir iesniegta, apliekamā summa nerodas, un IIN ir nulle.",
    },
  ],
  glosario: [
    { termino: "Normāls darba laiks", definicion: "Pilna slodze, kurai noteikta minimālā mēneša alga." },
    { termino: "Slodze", definicion: "Darba laika daļa no normālā, izteikta procentos." },
  ],
});
