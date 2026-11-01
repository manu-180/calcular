import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.atlaisanas-pabalsts",
  h1: "Atlaišanas pabalsts {{anio}}: aprēķins",
  title: "Atlaišanas pabalsts {{anio}}: cik pienākas",
  description: "Aprēķiniet atlaišanas pabalstu pēc mēneša vidējās izpeļņas un nodarbinātības ilguma pie darba devēja.",
  intro: ["Atlaišanas pabalsta apmērs atkarīgs no tā, cik ilgi strādājat pie viena darba devēja. Kalkulators to aprēķina no vidējās izpeļņas."],
  comoSeCalcula: ["Ievadiet mēneša vidējo izpeļņu un nodarbinātības ilgumu. Rezultāts ir vidējās izpeļņas reizinājums."],
  faq: [],
  glosario: [],
});
