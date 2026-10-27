import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.am-bidrag",
  h1: "Am-bidrag: beregn dit arbejdsmarkedsbidrag",
  title: "Am-bidrag {{anio}}: beregn dit arbejdsmarkedsbidrag",
  description: "Beregn am-bidraget på {{dk.am-bidrag}} af din løn pr. måned og pr. år. Med egen pension og ATP trukket fra, som på din lønseddel.",
  intro: [
    "Am-bidraget er det første, der trækkes i din løn. Det er {{dk.am-bidrag}} af lønnen, før A-skatten beregnes.",
    "Skriv din månedsløn og din egen pensionsindbetaling. Beregneren viser am-grundlaget, am-bidraget og lønnen efter am-bidrag.",
  ],
  comoSeCalcula: [
    "Am-grundlaget er din bruttoløn minus den pension, du selv betaler via lønnen, og din andel af ATP.",
    "Am-bidraget er {{dk.am-bidrag}} af am-grundlaget.",
    "Med fuldt ATP-bidrag betaler du {{dk.atp-loenmodtager[fuld]}} om måneden, og arbejdsgiveren betaler {{dk.atp-arbejdsgiver[fuld]}}.",
  ],
  ejemplo: ["Med 40.000 kr. i månedsløn og fuldt ATP-bidrag er am-grundlaget 39.901 kr. Am-bidraget er 3.192,08 kr. om måneden og 38.304,96 kr. om året."],
  faq: [
    {
      pregunta: "Hvor mange procent er am-bidraget?",
      respuesta: "Am-bidraget er {{dk.am-bidrag}} af lønnen efter egen pension og ATP. Satsen er den samme for alle lønmodtagere.",
    },
    {
      pregunta: "Kan jeg trække am-bidraget fra i skat?",
      respuesta: "Am-bidraget trækkes fra, før skatten beregnes. Bundskat, mellemskat og topskat beregnes af lønnen efter am-bidrag.",
    },
    {
      pregunta: "Betaler jeg am-bidrag af min pension?",
      respuesta: "Den pension, du selv indbetaler via lønnen, trækkes fra, før am-bidraget af lønnen beregnes. Derfor sænker en højere pensionsindbetaling am-bidraget på lønsedlen.",
    },
  ],
  glosario: [
    { termino: "Am-bidrag", definicion: "Arbejdsmarkedsbidrag. En skat på {{dk.am-bidrag}} af lønnen." },
    { termino: "Am-grundlag", definicion: "Den løn, am-bidraget beregnes af: bruttoløn minus egen pension og ATP." },
  ],
});
