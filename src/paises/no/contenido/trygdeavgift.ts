import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "no.trygdeavgift",
  h1: "Trygdeavgift {{anio}}: regn ut avgiften til folketrygden",
  title: "Trygdeavgift {{anio}}: kalkulator for lønn og næring",
  description:
    "Regn ut trygdeavgiften for {{anio}}: {{no.trygdeavgift[lonn]}} på lønn, {{no.trygdeavgift[naering]}} på næringsinntekt og {{no.trygdeavgift[pensjon]}} på pensjon, med nedre grense og opptrapping.",
  intro: [
    "Trygdeavgift er medlemsavgiften til folketrygden. Den trekkes av lønn, næringsinntekt og pensjon, og den finansierer blant annet sykepenger og pensjon.",
    "Velg type inntekt og skriv inn beløpet for året. Kalkulatoren tar med den nedre grensen og opptrappingsregelen.",
  ],
  comoSeCalcula: [
    "Satsen avhenger av inntekten: {{no.trygdeavgift[lonn]}} på lønn og sykepenger, {{no.trygdeavgift[naering]}} på annen næringsinntekt og {{no.trygdeavgift[pensjon]}} på pensjon. Den lave satsen gjelder også lønn når du er under 17 eller over 69 år.",
    "Har du inntekt på {{no.trygdeavgift-nedre-grense}} eller mindre, betaler du ingen trygdeavgift.",
    "Like over grensen blir avgiften aldri mer enn {{no.trygdeavgift-opptrapping}} av den delen av inntekten som overstiger {{no.trygdeavgift-nedre-grense}}. Avgiften er det laveste av dette og full sats.",
  ],
  ejemplo: ["En lønn på 500 000 kr gir 38 000 kr i trygdeavgift for 2026. En lønn på 110 000 kr gir bare 2 587,50 kr, fordi opptrappingen begrenser avgiften."],
  faq: [
    {
      pregunta: "Hvor mye er trygdeavgiften i 2026?",
      respuesta: "{{no.trygdeavgift[lonn]}} på lønn, {{no.trygdeavgift[naering]}} på næringsinntekt og {{no.trygdeavgift[pensjon]}} på pensjon.",
    },
    {
      pregunta: "Hvem slipper trygdeavgift?",
      respuesta: "Alle med samlet inntekt på {{no.trygdeavgift-nedre-grense}} eller mindre. Over grensen trappes avgiften gradvis opp, så det lønner seg alltid å tjene mer.",
    },
    {
      pregunta: "Gir trygdeavgift fradrag i skatten?",
      respuesta: "Nei. Trygdeavgiften regnes av inntekten før fradrag og kommer i tillegg til skatten på alminnelig inntekt og trinnskatten.",
    },
  ],
  glosario: [
    { termino: "Folketrygden", definicion: "Den offentlige trygdeordningen som gir blant annet pensjon, sykepenger og foreldrepenger." },
    { termino: "Opptrapping", definicion: "Regelen som gjør at avgiften stiger gradvis like over den nedre grensen." },
  ],
});
