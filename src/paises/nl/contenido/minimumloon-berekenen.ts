import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.minimumloon-berekenen",
  h1: "Minimumloon berekenen per uur, week, maand en jaar",
  title: "Minimumloon {{anio}}: {{nl.minimumloon[21-plus]}} per uur, en per maand?",
  description:
    "Het minimumloon is {{nl.minimumloon[21-plus]}} bruto per uur vanaf 21 jaar. Bereken wat dat is per week, maand en jaar voor jouw leeftijd en uren, plus je vakantiegeld.",
  intro: [
    "Het wettelijk minimumloon is een bedrag per uur. Vanaf 21 jaar is het {{nl.minimumloon[21-plus]}} bruto. Voor jongeren van 15 tot en met 20 jaar gelden lagere minimumjeugdlonen, bijvoorbeeld {{nl.minimumloon[20]}} op je 20e en {{nl.minimumloon[18]}} op je 18e.",
    "Kies je leeftijd en vul je contracturen in. Je ziet dan wat je minstens verdient per week, per maand en per jaar, en hoeveel vakantiegeld je daar bovenop krijgt.",
  ],
  comoSeCalcula: [
    "We nemen het minimumuurloon voor je leeftijd en vermenigvuldigen dat met je uren per week.",
    "Voor een jaar rekenen we met 52 weken. Het maandbedrag is het jaarbedrag gedeeld door 12. In werkelijkheid hangt je maandloon af van het aantal werkdagen in die maand.",
    "Het vakantiegeld is minstens {{nl.vakantiebijslag}} van je brutoloon en komt bovenop het minimumloon.",
    "Het minimumloon verandert twee keer per jaar, op 1 januari en op 1 juli.",
  ],
  ejemplo: [
    "Ben je 21 jaar of ouder en werk je 36 uur per week, dan verdien je minstens 36 × {{nl.minimumloon[21-plus]}} per week. Over een jaar komt daar nog {{nl.vakantiebijslag}} vakantiegeld bij.",
  ],
  faq: [
    {
      pregunta: "Is er nog een minimumloon per maand?",
      respuesta: "Nee. Sinds 1 januari 2024 is er alleen een wettelijk minimumloon per uur. Wat je per week of per maand minimaal verdient, hangt af van het aantal uren dat je werkt.",
    },
    {
      pregunta: "Vanaf welke leeftijd geldt het minimumloon?",
      respuesta: "Het minimumuurloon geldt voor alle werknemers vanaf 15 jaar. Vanaf 21 jaar krijg je het volledige minimumloon. Van 15 tot en met 20 jaar gelden vaste minimumjeugdlonen per uur.",
    },
    {
      pregunta: "Wanneer gaat het minimumloon omhoog?",
      respuesta: "Het minimumloon wordt elk half jaar opnieuw vastgesteld, per 1 januari en per 1 juli.",
    },
    {
      pregunta: "Telt vakantiegeld mee voor het minimumloon?",
      respuesta: "Nee. Het minimumloon is je brutoloon per uur. Daarbovenop heb je recht op minstens {{nl.vakantiebijslag}} vakantiebijslag over je loon.",
    },
  ],
  glosario: [
    { termino: "Minimumuurloon", definicion: "Het bruto bedrag per uur dat je werkgever je minstens moet betalen." },
    { termino: "Minimumjeugdloon", definicion: "Het lagere minimumuurloon voor werknemers van 15 tot en met 20 jaar." },
    { termino: "Vakantiebijslag", definicion: "Je vakantiegeld: minstens {{nl.vakantiebijslag}} van je brutoloon." },
  ],
});
