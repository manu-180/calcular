import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.huurwaardebelasting-berekenen",
  h1: "Huurwaardebelasting berekenen",
  title: "Huurwaardebelasting Suriname: {{sr.huurwaardebelasting}} van de huurwaarde",
  description:
    "Bereken de huurwaardebelasting op je huis of verhuurde pand: {{sr.huurwaardebelasting}} van de huurwaarde, met een minimum van {{sr.huurwaardebelasting-minimum}} per jaar.",
  intro: [
    "Wie een gebouw in Suriname bezit of het genot ervan heeft, betaalt elk jaar huurwaardebelasting. Die wordt berekend over de huurwaarde van het gebouw.",
    "Voor een woning in eigen gebruik is de huurwaarde een klein percentage van de verkoopwaarde. Voor een verhuurd pand is het de huur die je ontvangt.",
  ],
  comoSeCalcula: [
    "Eigen gebruik: huurwaarde = {{sr.huurwaarde-eigen-gebruik}} van de vrije verkoopwaarde, nadat daar {{sr.huurwaarde-aftrek}} van af is gegaan.",
    "Verhuurd: huurwaarde = de huuropbrengst van een jaar, maar minstens {{sr.huurwaarde-eigen-gebruik}} van de vrije verkoopwaarde.",
    "Belasting: {{sr.huurwaardebelasting}} van de huurwaarde, met een minimum van {{sr.huurwaardebelasting-minimum}}.",
  ],
  ejemplo: ["Een eigen woning met een verkoopwaarde van SRD 1.000.000 heeft een huurwaarde van SRD 9.500. De huurwaardebelasting is SRD 570 per jaar."],
  faq: [
    {
      pregunta: "Hoe vaak wordt de huurwaarde vastgesteld?",
      respuesta: "De inspecteur stelt de huurwaarde eens in de drie jaar vast. Die geldt voor dat jaar en de twee jaren daarna, tenzij je gebouw in de tussentijd wordt gebouwd, ingrijpend verbouwd, gesplitst of afgebroken.",
    },
    {
      pregunta: "Welke gebouwen zijn vrijgesteld?",
      respuesta: "Onder meer gebouwen voor de publieke dienst van de staat, voor erediensten, onderwijs, liefdadigheid, wetenschap of kunst, begraafplaatsen, landbouw en veeteelt (woonhuizen niet), fabrieken en werkplaatsen, en ambassades bij wederkerigheid.",
    },
    {
      pregunta: "Wat is de vrije verkoopwaarde?",
      respuesta: "De prijs die het gebouw bij verkoop op de vrije markt zou opbrengen. De inspecteur van de Belastingdienst stelt de huurwaarde vast; deze berekening is een schatting.",
    },
  ],
  glosario: [
    { termino: "Huurwaarde", definicion: "Het bedrag waarover de huurwaardebelasting wordt berekend." },
    { termino: "Vrije verkoopwaarde", definicion: "Wat het gebouw bij verkoop op de vrije markt waard is." },
  ],
});
