import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.bruto-netto-berekenen",
  h1: "Bruto netto berekenen: je nettoloon in België",
  title: "Bruto netto berekenen {{anio}}: van brutoloon naar nettoloon",
  description:
    "Bereken je nettoloon uit je brutoloon: RSZ, werkbonus, bedrijfsvoorheffing en bijzondere bijdrage, volgens de officiële regels. Voor bedienden en arbeiders.",
  intro: [
    "Van je brutoloon gaan eerst je persoonlijke RSZ-bijdragen af. Wat overblijft is je belastbaar loon. Daarop houdt je werkgever bedrijfsvoorheffing in, een voorschot op je belastingen, en een kleine bijzondere bijdrage voor de sociale zekerheid.",
    "Vul je brutomaandloon in, kies of je bediende of arbeider bent en geef je gezinssituatie op. Je ziet meteen hoeveel er netto op je rekening komt en waar het verschil naartoe gaat.",
  ],
  comoSeCalcula: [
    "RSZ: {{be.rsz-werknemer}} van je brutoloon. Voor arbeiders op 108 % van het brutoloon, omdat hun vakantiegeld via de RJV of een vakantiefonds loopt.",
    "Werkbonus: bij een laag loon krijg je een korting op die RSZ-bijdrage. Hoe lager je loon, hoe groter de korting, tot je volledige bijdrage.",
    "Bedrijfsvoorheffing: we passen de sleutelformule van de FOD Financiën toe. Je belastbaar loon wordt omgerekend naar een jaarbedrag, daar gaan forfaitaire beroepskosten af, dan volgt de belasting per schijf, min de belastingvrije som en de verminderingen voor kinderen. Het resultaat delen we door 12.",
    "Bij een lager loon gaat er ook een fiscale werkbonus af van de bedrijfsvoorheffing.",
    "Bijzondere bijdrage voor de sociale zekerheid: een bedrag per kwartaal dat afhangt van je loon en je gezinssituatie, per maand ingehouden.",
  ],
  ejemplo: [
    "Een alleenstaande bediende met € 3.500 bruto per maand betaalt € 457,45 RSZ. Het belastbaar loon is dan € 3.042,55. Daarop gaat € 617,41 bedrijfsvoorheffing en € 24,74 bijzondere bijdrage af. Netto blijft er € 2.400,40 over.",
  ],
  faq: [
    {
      pregunta: "Waarom verschilt mijn loonbrief van deze berekening?",
      respuesta:
        "Op je loonbrief staan vaak extra's die hier niet in zitten: maaltijdcheques, een bedrijfswagen, overuren, een groepsverzekering of een eindejaarspremie. De berekening gaat ook uit van een voltijdse, volledige maand.",
    },
    {
      pregunta: "Is de bedrijfsvoorheffing mijn echte belasting?",
      respuesta:
        "Nee. Het is een voorschot. Je echte personenbelasting wordt berekend met je belastingaangifte. Dan krijg je geld terug of betaal je bij, bijvoorbeeld omdat je gemeente een andere aanvullende gemeentebelasting heft.",
    },
    {
      pregunta: "Wat is de werkbonus?",
      respuesta:
        "Een vermindering van je persoonlijke RSZ-bijdragen als je loon laag is. Hij bestaat uit twee delen: een voor lage lonen en een voor zeer lage lonen. Daarbovenop krijg je een fiscale werkbonus op je bedrijfsvoorheffing.",
    },
    {
      pregunta: "Waarom zijn de RSZ-bijdragen van een arbeider hoger?",
      respuesta:
        "Voor arbeiders worden de bijdragen berekend op 108 % van het brutoloon. Zo worden de bijdragen op het enkel vakantiegeld, dat de RJV of een vakantiefonds uitbetaalt, al vooraf ingehouden.",
    },
  ],
  glosario: [
    { termino: "RSZ", definicion: "Rijksdienst voor Sociale Zekerheid. De persoonlijke RSZ-bijdrage is je bijdrage aan pensioen, ziekteverzekering en werkloosheid." },
    { termino: "Bedrijfsvoorheffing", definicion: "Het voorschot op je personenbelasting dat je werkgever elke maand inhoudt." },
    { termino: "Belastbaar loon", definicion: "Je brutoloon min je persoonlijke RSZ-bijdrage. Daarop wordt de bedrijfsvoorheffing berekend." },
    { termino: "Bijzondere bijdrage voor de sociale zekerheid", definicion: "Een extra bijdrage die afhangt van je loon en je gezinssituatie en die met je belastingaangifte wordt afgerekend." },
  ],
});
