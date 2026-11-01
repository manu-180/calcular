import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.valutaomvandlare",
  h1: "Valutaomvandlare med Riksbankens kurser",
  title: "Valutaomvandlare: euro, dollar, norska kronor till SEK",
  description:
    "Räkna om euro, dollar, pund, norska och danska kronor till svenska kronor med Riksbankens mittkurs. En euro kostar i dag {{se.eur}}.",
  intro: [
    "Räkna om ett belopp mellan svenska kronor och fem vanliga valutor. Kalkylatorn använder Riksbankens mittkurs från den senaste bankdagen.",
    "Mittkursen är ett snitt mellan köp och sälj på valutamarknaden. Banker och växlingskontor tar ut ett påslag.",
  ],
  comoSeCalcula: [
    "Från valuta till kronor: belopp × mittkursen.",
    "Från kronor till valuta: belopp / mittkursen.",
    "Kurserna hämtas från Riksbanken varje bankdag. Kursdagen visas i resultatet.",
  ],
  ejemplo: ["Med mittkursen 11,131 kronor per euro blir 100 euro 1 113,10 kronor."],
  faq: [
    {
      pregunta: "Vad är mittkurs?",
      respuesta: "Genomsnittet av köp- och säljkursen. Riksbanken publicerar mittkurser för många valutor varje bankdag.",
    },
    {
      pregunta: "Varför får jag sämre kurs i banken?",
      respuesta: "Banker och växlingskontor lägger på en marginal eller tar en avgift. Mittkursen visar valutans värde utan påslag.",
    },
    {
      pregunta: "Hur mycket är en euro i svenska kronor?",
      respuesta: "Enligt Riksbankens senaste mittkurs är en euro {{se.eur}} ({{se.eur#desde}}).",
    },
  ],
  glosario: [
    { termino: "Valutakurs", definicion: "Priset på en valuta uttryckt i en annan valuta." },
    { termino: "SEK", definicion: "Koden för svenska kronor." },
  ],
});
