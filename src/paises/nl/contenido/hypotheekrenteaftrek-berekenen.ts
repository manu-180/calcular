import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.hypotheekrenteaftrek-berekenen",
  h1: "Hypotheekrenteaftrek berekenen {{anio}}",
  title: "Hypotheekrenteaftrek {{anio}}: hoeveel krijg je terug?",
  description:
    "Bereken je hypotheekrenteaftrek over {{anio}}: rente min eigenwoningforfait, tegen maximaal {{nl.aftrek-maximumtarief}}. Met het effect op je heffingskorting en je netto rentelasten.",
  intro: [
    "Betaal je rente op de hypotheek voor je eigen woning, dan mag je die aftrekken van je inkomen in box 1. Daar staat het eigenwoningforfait tegenover, een percentage van de WOZ-waarde dat je bij je inkomen telt.",
    "Vul je rente, de WOZ-waarde en je inkomen in. Je ziet hoeveel belasting je terugkrijgt en wat de rente je netto per maand kost.",
  ],
  comoSeCalcula: [
    "We berekenen het eigenwoningforfait met de tabel uit de wet en trekken de betaalde rente ervan af. Is de rente hoger, dan is het verschil je aftrek.",
    "We berekenen je belasting twee keer: zonder en met je eigen woning. Het verschil is je belastingvoordeel. Daarin zit ook dat je algemene heffingskorting hoger wordt als je inkomen daalt.",
    "Valt een deel van de aftrek in de hoogste schijf, dan krijg je daarover maar {{nl.aftrek-maximumtarief}} terug.",
    "Is je forfait hoger dan je rente, dan krijg je een extra aftrek van {{nl.hillen}} van het verschil.",
  ],
  ejemplo: [
    "Je betaalt € 9.000 rente, je woning heeft een WOZ-waarde van € 400.000 en je verdient € 60.000. Het forfait is € 1.400, dus je trekt € 7.600 af. Je krijgt € 3.340,81 terug: de rente kost je netto € 5.659,19 per jaar.",
  ],
  faq: [
    {
      pregunta: "Wat is het maximale aftrektarief in 2026?",
      respuesta: "{{nl.aftrek-maximumtarief}}. Valt je inkomen in de hoogste schijf, dan krijg je over je aftrekposten toch niet meer terug dan dat percentage.",
    },
    {
      pregunta: "Welke kosten zijn aftrekbaar?",
      respuesta: "Onder meer de hypotheekrente, periodieke betalingen voor erfpacht, opstal of beklemming, de kosten voor het afsluiten van je hypotheek en aftrekbare kosten van een restschuld na verkoop van je woning.",
    },
    {
      pregunta: "Wat als je bijna geen rente meer betaalt?",
      respuesta: "Is je eigenwoningforfait hoger dan je aftrekbare kosten, dan krijg je een aftrek van {{nl.hillen}} van het verschil. Je betaalt dan maar over een klein deel van het forfait belasting.",
    },
  ],
  glosario: [
    { termino: "Eigenwoningforfait", definicion: "Het bedrag dat je voor je eigen woning bij je inkomen telt, een percentage van de WOZ-waarde." },
    { termino: "Tariefsaanpassing", definicion: "De correctie waardoor je over aftrekposten in de hoogste schijf maar het maximale aftrektarief terugkrijgt." },
  ],
});
