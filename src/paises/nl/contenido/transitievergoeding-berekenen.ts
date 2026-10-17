import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nl.transitievergoeding-berekenen",
  h1: "Transitievergoeding berekenen",
  title: "Transitievergoeding 2026: een derde maandloon per jaar",
  description:
    "Bereken je transitievergoeding bij ontslag: een derde maandloon per gewerkt jaar, inclusief vakantiegeld en vaste toeslagen. Maximaal {{nl.transitievergoeding-max}} in 2026.",
  intro: [
    "Word je ontslagen of verlengt je werkgever je contract niet, dan heb je in de meeste gevallen recht op een transitievergoeding. Dat staat in artikel 7:673 van het Burgerlijk Wetboek.",
    "Je krijgt een derde maandloon voor elk jaar dat je in dienst was, en een evenredig deel voor de rest. Je bouwt de vergoeding op vanaf je eerste werkdag.",
  ],
  comoSeCalcula: [
    "Je maandloon is je bruto maandsalaris plus vaste toeslagen, plus een twaalfde van je vakantiegeld en van een vaste eindejaarsuitkering.",
    "Per volledig jaar krijg je een derde van dat maandloon. Per losse maand een twaalfde daarvan, en losse dagen rekenen we naar verhouding van 365 dagen.",
    "De vergoeding is in 2026 maximaal {{nl.transitievergoeding-max}}, of een jaarsalaris als je meer verdient dan dat bedrag.",
  ],
  ejemplo: [
    "Je verdient € 3.500 per maand plus 8% vakantiegeld, dus je maandloon is € 3.780. Na 8 jaar en 6 maanden is je transitievergoeding 8 × € 1.260 + 6 × € 105 = € 10.710 bruto.",
  ],
  faq: [
    {
      pregunta: "Wanneer heb je recht op een transitievergoeding?",
      respuesta: "Als je werkgever je contract opzegt, de rechter het op verzoek van je werkgever ontbindt, of je werkgever een tijdelijk contract niet verlengt. Ook als jij zelf opzegt door ernstig verwijtbaar handelen van je werkgever.",
    },
    {
      pregunta: "Wat telt mee als loon?",
      respuesta: "Je bruto uurloon maal je arbeidsduur per maand, plus vakantiegeld en een vaste eindejaarsuitkering (gedeeld door twaalf) en vaste looncomponenten. Ook variabele looncomponenten van de laatste drie jaar tellen mee, gedeeld door 36. Die laatste kun je hier optellen bij je vaste toeslagen.",
    },
    {
      pregunta: "Wat is de maximale transitievergoeding in 2026?",
      respuesta: "{{nl.transitievergoeding-max}}. Verdien je per jaar meer dan dat bedrag, dan is het maximum een bruto jaarsalaris.",
    },
    {
      pregunta: "Telt een eerder contract bij dezelfde werkgever mee?",
      respuesta: "Ja, als er tussen de contracten niet meer dan zes maanden zat. Dan tellen ze samen als één dienstverband. Vul dan de begindatum van je eerste contract in.",
    },
  ],
  glosario: [
    { termino: "Transitievergoeding", definicion: "De wettelijke vergoeding die je werkgever betaalt als je contract op zijn initiatief eindigt." },
    { termino: "Ontbinding", definicion: "Het beëindigen van je contract door de kantonrechter." },
  ],
});
