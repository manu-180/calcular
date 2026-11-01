import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.orlofslaun",
  h1: "Orlofslaun {{anio}}: reiknaðu {{is.orlofsprosenta[d24]}} af launum",
  title: "Orlofslaun {{anio}}: {{is.orlofsprosenta[d24]}} af heildarlaunum",
  description: "Orlofslaun: {{is.orlofsprosenta[d24]}} af launum fyrir 24 daga orlof, {{is.orlofsprosenta[d27]}} fyrir 27 daga og {{is.orlofsprosenta[d30]}} fyrir 30 daga.",
  intro: [
    "Orlofsprósentan er {{is.orlofsprosenta[d24]}} fyrir 24 daga orlof (192 stundir), {{is.orlofsprosenta[d27]}} fyrir 27 daga og {{is.orlofsprosenta[d30]}} fyrir 30 daga. Hlutföllin koma úr leiðbeiningum fjármálaráðuneytisins um orlofsrétt.",
    "Þú færð lengra orlof samkvæmt kjarasamningi, ekki lögum, svo að þú skoðar samninginn þinn áður en þú velur hærra hlutfall.",
  ],
  comoSeCalcula: [
    "Orlofsprósentan er hlutfallið á milli orlofsvikna og vinnuvikna: 192 stunda orlof er 4,8 vikur og 4,8 á móti 47,2 gerir {{is.orlofsprosenta[d24]}}.",
    "Launin eru margfölduð með hlutfallinu og námunduð að heilli krónu.",
    "Reiknivélin reiknar af þeirri upphæð sem þú slærð inn, hvort sem það eru mánaðarlaun eða laun heils árs.",
  ],
  ejemplo: [
    "Af 600.000 kr. launum eru orlofslaun með 10,17% 61.020 kr. Með 11,59% verða þau 69.540 kr. og með 13,04% 78.240 kr.",
  ],
  faq: [
    { pregunta: "Hvernig er prósentan fundin?", respuesta: "Hún er hlutfall orlofsvikna á móti unnum vikum: 4,8 á móti 47,2 gefur {{is.orlofsprosenta[d24]}}, samkvæmt leiðbeiningum ráðuneytisins." },
    { pregunta: "Hvenær gildir hærra hlutfall?", respuesta: "Leiðbeiningar ráðuneytisins sýna {{is.orlofsprosenta[d27]}} fyrir 216 stunda orlof og {{is.orlofsprosenta[d30]}} fyrir 240 stunda orlof. Hvort það á við þig fer eftir kjarasamningi." },
    { pregunta: "Hvenær ávinnst orlofsrétturinn?", respuesta: "Á orlofsávinnsluárinu, frá 1. maí til 30. apríl. Orlofið er svo tekið á næsta orlofsári." },
  ],
  glosario: [
    { termino: "Orlofslaun", definicion: "Laun fyrir orlofstíma, reiknuð sem hlutfall af launum." },
    { termino: "Orlofsár", definicion: "Tímabilið frá 1. maí til 30. apríl, þegar orlofsréttur ávinnst." },
  ],
});
