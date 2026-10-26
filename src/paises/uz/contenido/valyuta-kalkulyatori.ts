import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uz.valyuta-kalkulyatori",
  h1: "Valyuta kalkulyatori: Markaziy bank kursi boʻyicha",
  title: "Dollar kursi bugun: Markaziy bank kursida hisoblash",
  description: "AQSh dollarini soʻmga yoki soʻmni dollarga Oʻzbekiston Respublikasi Markaziy banki belgilagan rasmiy kurs boʻyicha oʻtkazing.",
  intro: ["Markaziy bank har kuni xorijiy valyutalarning soʻmga nisbatan rasmiy kursini belgilaydi. Kalkulyator shu kurs boʻyicha hisoblaydi."],
  comoSeCalcula: ["Dollardan soʻmga: summa × rasmiy kurs. Soʻmdan dollarga: summa ÷ rasmiy kurs."],
  faq: [],
  glosario: [{ termino: "Rasmiy kurs", definicion: "Markaziy bank belgilagan, buxgalteriya va soliq hisobida ishlatiladigan kurs." }],
});
