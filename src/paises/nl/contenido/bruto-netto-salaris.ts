import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.bruto-netto-salaris",
  h1: "Bruto netto salaris berekenen {{anio}}",
  title: "Bruto netto salaris berekenen {{anio}}: wat houd je over?",
  description:
    "Reken je brutosalaris om naar netto met de tarieven en heffingskortingen van {{anio}}. Met vakantiegeld, dertiende maand en pensioenpremie.",
  intro: [
    "Van je brutosalaris houdt je werkgever loonheffing in: loonbelasting en premies volksverzekeringen samen. Daar gaan de algemene heffingskorting (maximaal {{nl.ahk[max]}}) en de arbeidskorting (maximaal {{nl.arbeidskorting-grenzen[max3]}}) weer vanaf.",
    "Vul je brutosalaris in, per maand of per jaar, en je ziet wat je netto overhoudt. De berekening geldt voor werknemers die de AOW-leeftijd nog niet hebben bereikt.",
  ],
  comoSeCalcula: [
    "We rekenen je jaarloon uit: je salaris, plus vakantiegeld ({{nl.vakantiebijslag}}) en een dertiende maand als je die krijgt. Je pensioenpremie gaat eraf, want die is aftrekbaar.",
    "Over dat bedrag berekenen we de belasting in box 1 met de drie schijven van 2026. In de eerste schijf zitten ook de premies volksverzekeringen.",
    "Daarna trekken we de algemene heffingskorting en de arbeidskorting af. De kortingen kunnen de belasting niet onder nul brengen.",
    "Netto is je brutoloon min je pensioenpremie en de loonheffing. Het bedrag per maand is het jaarbedrag gedeeld door 12.",
  ],
  ejemplo: [
    "Met € 3.500 bruto per maand en {{nl.vakantiebijslag}} vakantiegeld verdien je € 45.360 per jaar. De belasting is € 16.333,43; daar gaat € 2.115,38 algemene heffingskorting en € 5.680,54 arbeidskorting af. Je betaalt € 8.537,51 loonheffing en houdt € 36.822,49 netto over, gemiddeld € 3.068,54 per maand.",
  ],
  faq: [
    {
      pregunta: "Wat is het verschil tussen loonheffing en inkomstenbelasting?",
      respuesta: "Loonheffing is wat je werkgever elke maand inhoudt op je loon. Het is een voorheffing op de inkomstenbelasting. Heb je alleen loon uit één baan, dan klopt de loonheffing meestal ongeveer met de inkomstenbelasting over het jaar.",
    },
    {
      pregunta: "Waarom krijg je arbeidskorting?",
      respuesta: "De arbeidskorting is een heffingskorting voor iedereen die werkt. Ze loopt op tot maximaal {{nl.arbeidskorting-grenzen[max3]}} en wordt bij een hoger inkomen weer kleiner, tot nul bij een arbeidsinkomen vanaf {{nl.arbeidskorting-grenzen[einde]}}.",
    },
    {
      pregunta: "Geldt deze berekening ook na je AOW-leeftijd?",
      respuesta: "Nee. Heb je de AOW-leeftijd bereikt, dan betaal je geen AOW-premie meer en is het tarief in de eerste schijf lager. Ook de heffingskortingen zijn dan anders. Deze berekening is voor wie jonger is dan de AOW-leeftijd.",
    },
    {
      pregunta: "Zit de zorgverzekering in deze berekening?",
      respuesta: "De inkomensafhankelijke bijdrage Zorgverzekeringswet betaalt je werkgever, die gaat niet van je loon af. De premie voor je eigen zorgverzekering betaal je zelf aan je zorgverzekeraar, die zit hier niet in.",
    },
  ],
  glosario: [
    { termino: "Loonheffing", definicion: "Loonbelasting en premies volksverzekeringen samen, door je werkgever ingehouden op je loon." },
    { termino: "Algemene heffingskorting", definicion: "Korting op je belasting voor iedereen, die kleiner wordt naarmate je inkomen stijgt." },
    { termino: "Arbeidskorting", definicion: "Korting op je belasting voor wie werkt." },
    { termino: "Box 1", definicion: "Het deel van de inkomstenbelasting voor inkomen uit werk en woning." },
  ],
});
