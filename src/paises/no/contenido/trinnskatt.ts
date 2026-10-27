import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.trinnskatt",
  h1: "Trinnskatt {{anio}}: kalkulator og satser",
  title: "Trinnskatt {{anio}}: kalkulator med alle fem trinn",
  description:
    "Regn ut trinnskatten for {{anio}}. Trinn 1 starter på {{no.trinnskatt[1].desde}} med {{no.trinnskatt[1].tasa}}, og trinn 5 er {{no.trinnskatt[-1].tasa}}. Se skatten i hvert trinn.",
  intro: [
    "Trinnskatt er en skatt på personinntekten din, altså lønn før fradrag. Den har fem trinn, og satsen øker jo høyere inntekten er.",
    "Skriv inn årslønnen, så ser du trinnskatten for 2026 og hvor mye som faller i hvert trinn.",
  ],
  comoSeCalcula: [
    "Inntekt opp til {{no.trinnskatt[1].desde}} er fri for trinnskatt.",
    "Trinn 1: {{no.trinnskatt[1].tasa}} av inntekten mellom {{no.trinnskatt[1].desde}} og {{no.trinnskatt[1].hasta}}.",
    "Trinn 2: {{no.trinnskatt[2].tasa}} opp til {{no.trinnskatt[2].hasta}}. Trinn 3: {{no.trinnskatt[3].tasa}} opp til {{no.trinnskatt[3].hasta}}.",
    "Trinn 4: {{no.trinnskatt[4].tasa}} opp til {{no.trinnskatt[4].hasta}}. Trinn 5: {{no.trinnskatt[5].tasa}} av alt over {{no.trinnskatt[5].desde}}.",
    "Hver sats gjelder bare for den delen av inntekten som ligger i trinnet. Trinnskatten er summen av alle trinnene.",
  ],
  ejemplo: [
    "Med 800 000 kr i lønn betaler du 1 567,40 kr i trinn 1, 16 270 kr i trinn 2 og 10 268,15 kr i trinn 3. Trinnskatten blir 28 105,55 kr for året.",
  ],
  faq: [
    {
      pregunta: "Hva er trinnskatt?",
      respuesta: "En progressiv skatt på personinntekt (lønn, pensjon og næringsinntekt) som kommer i tillegg til skatten på alminnelig inntekt og trygdeavgiften. Den regnes uten fradrag.",
    },
    {
      pregunta: "Betaler jeg trinn 3 på hele lønnen hvis jeg kommer over grensen?",
      respuesta: "Nei. Bare den delen av lønnen som ligger over {{no.trinnskatt[3].desde}} får satsen i trinn 3. Inntekten under grensen beholder satsene i de lavere trinnene.",
    },
    {
      pregunta: "Har Finnmark og Nord-Troms egen trinnskatt?",
      respuesta: "For 2026 er satsen i trinn 3 den samme i tiltakssonen som i resten av landet, {{no.trinnskatt[3].tasa}}. Det som er lavere der, er skatten på alminnelig inntekt.",
    },
    {
      pregunta: "Hvor mye trinnskatt betaler jeg av 600 000 kr?",
      respuesta: "12 835,40 kr i 2026: 1 567,40 kr i trinn 1 og 11 268 kr i trinn 2.",
    },
  ],
  glosario: [
    { termino: "Personinntekt", definicion: "Lønn, pensjon og annen arbeidsinntekt før fradrag." },
    { termino: "Trinn", definicion: "Et inntektsintervall med sin egen sats." },
  ],
});
