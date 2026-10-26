import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.drojsmalsranta",
  h1: "Beräkna dröjsmålsränta enligt räntelagen",
  title: "Dröjsmålsränta 2026: beräkna räntan på en sen betalning",
  description:
    "Beräkna dröjsmålsränta på en obetald faktura: Riksbankens referensränta ({{se.referensranta}}) plus {{se.drojsmalsranta-tillagg}} procentenheter, dag för dag.",
  intro: [
    "Betalas en faktura för sent har du rätt till dröjsmålsränta enligt räntelagen, om ni inte har avtalat något annat. Kalkylatorn räknar räntan för varje dag som skulden är försenad.",
    "Räntan följer Riksbankens referensränta, som bestäms för ett halvår i taget. Går skulden över flera halvår räknas varje period för sig.",
  ],
  comoSeCalcula: [
    "Dröjsmålsräntan är referensräntan plus {{se.drojsmalsranta-tillagg}} procentenheter per år.",
    "Referensräntan fastställs av Riksbanken för varje kalenderhalvår. Just nu är den {{se.referensranta}}.",
    "Räntan räknas från dagen efter förfallodagen till och med dagen då skulden betalas: belopp × räntesats × dagar / 365.",
  ],
  ejemplo: ["En faktura på 10 000 kronor som förföll 30 juni 2025 och betalades 31 januari 2026 ger 589,04 kronor i dröjsmålsränta, med 10 procent per år under hela perioden."],
  faq: [
    {
      pregunta: "Hur hög är dröjsmålsräntan 2026?",
      respuesta: "Referensräntan är {{se.referensranta}} och tillägget {{se.drojsmalsranta-tillagg}} procentenheter. Tillsammans blir det dröjsmålsräntan per år.",
    },
    {
      pregunta: "Från vilken dag räknas räntan om fakturan saknar förfallodag?",
      respuesta:
        "Då räknas ränta från den dag som infaller 30 dagar efter att du skickade räkningen, om det framgick att för sen betalning ger ränta. Mellan företag behövs inte den upplysningen.",
    },
    {
      pregunta: "Kan man avtala om en annan ränta?",
      respuesta: "Ja. Räntelagen gäller om inget annat har avtalats. Mellan ett företag och en myndighet får ett avtal inte ge lägre ränta än lagen.",
    },
  ],
  glosario: [
    { termino: "Dröjsmålsränta", definicion: "Ränta som gäldenären betalar när en skuld betalas för sent." },
    { termino: "Referensränta", definicion: "En ränta som Riksbanken fastställer för varje halvår och som dröjsmålsräntan bygger på." },
    { termino: "Förfallodag", definicion: "Den sista dagen för betalning." },
  ],
});
