import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.aow-berekenen",
  h1: "AOW berekenen: je AOW-leeftijd en je AOW per maand",
  title: "AOW berekenen 2026: AOW-leeftijd en bedrag per maand",
  description:
    "Bereken wanneer je AOW ingaat en hoeveel AOW je krijgt. Met de AOW-leeftijden van de SVB en de bedragen voor alleenstaanden ({{nl.aow-bruto[alleenstaand]}}) en samenwonenden.",
  intro: [
    "De AOW is het basispensioen van de overheid. Je krijgt het vanaf je AOW-leeftijd, die afhangt van je geboortedatum. Voor wie voor 1 oktober 1964 is geboren ligt die vast, voor latere geboortedata geeft de SVB een verwachte leeftijd.",
    "Hoeveel AOW je krijgt, hangt af van je woonsituatie en van de jaren dat je verzekerd was. Een volledige AOW is nu {{nl.aow-bruto[alleenstaand]}} bruto per maand als je alleen woont en {{nl.aow-bruto[samenwonend]}} per persoon als je getrouwd bent of samenwoont.",
  ],
  comoSeCalcula: [
    "We zoeken je AOW-leeftijd op in de tabel van de SVB en tellen die op bij je geboortedatum.",
    "Je bouwt AOW op in de 50 jaar voor je AOW-leeftijd. Voor elk jaar dat je niet verzekerd was, bijvoorbeeld omdat je in het buitenland woonde, gaat er {{nl.aow-korting}} van je AOW af.",
    "Het bedrag rekenen we met de AOW-bedragen van nu. Daarbovenop bouw je elke maand vakantiegeld op.",
  ],
  ejemplo: [
    "Ben je op 20 mei 1960 geboren, dan is je AOW-leeftijd 67 jaar en bereik je die op 20 mei 2027. Woon je alleen en was je altijd verzekerd, dan krijg je nu {{nl.aow-bruto[alleenstaand]}} bruto per maand plus {{nl.aow-vakantiegeld[alleenstaand]}} vakantiegeld.",
  ],
  faq: [
    {
      pregunta: "Waarom is mijn AOW-leeftijd nog niet zeker?",
      respuesta: "Voor wie op of na 1 oktober 1964 is geboren, is de AOW-leeftijd nog niet vastgesteld. Hij hangt af van de levensverwachting. Het CBS bekijkt elk jaar in december de nieuwe gegevens en past de schatting aan.",
    },
    {
      pregunta: "Hoeveel AOW verlies je per jaar in het buitenland?",
      respuesta: "Voor elk kalenderjaar dat je tussen je aanvangsleeftijd en je AOW-leeftijd niet verzekerd was, gaat er {{nl.aow-korting}} van je AOW af.",
    },
    {
      pregunta: "Wanneer krijg je het AOW-vakantiegeld?",
      respuesta: "Je bouwt elke maand vakantiegeld op en de SVB betaalt het uit in mei.",
    },
    {
      pregunta: "Is de AOW bruto of netto?",
      respuesta: "De bedragen hier zijn bruto. De SVB houdt er loonheffing en de bijdrage voor de Zorgverzekeringswet op in.",
    },
  ],
  glosario: [
    { termino: "AOW", definicion: "Algemene Ouderdomswet: het basispensioen van de overheid, uitgevoerd door de SVB." },
    { termino: "AOW-leeftijd", definicion: "De leeftijd waarop je AOW krijgt. Hij hangt af van je geboortedatum." },
    { termino: "Opbouw", definicion: "Het deel van de volledige AOW waar je recht op hebt, {{nl.aow-korting}} per verzekerd jaar." },
  ],
});
