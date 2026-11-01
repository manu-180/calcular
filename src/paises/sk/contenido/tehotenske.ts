import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.tehotenske",
  h1: "Tehotenské {{anio}}",
  title: "Tehotenské {{anio}}: kalkulačka dávky pre budúce mamičky",
  description: "Vypočítajte tehotenské: {{sk.davky[tehotenske]}} denného vymeriavacieho základu, najviac zo {{sk.max-dvz}} denne. Najviac 451 eur za 30-dňový mesiac.",
  intro: [
    "Tehotenské je dávka Sociálnej poisťovne vo výške {{sk.davky[tehotenske]}} denného vymeriavacieho základu. V roku 2026 je najvyššia suma 451 eur za 30-dňový a 466 eur za 31-dňový mesiac.",
    "Zadajte hrubú mzdu z minulého roka. Dávka sa vypláca popri mzde, kalkulačka ukáže sumu za oba typy mesiacov aj dennú výšku.",
  ],
  comoSeCalcula: [
    "Denný vymeriavací základ je mesačná mzda krát 12 vydelená 365, najviac {{sk.max-dvz}}.",
    "Denné tehotenské je {{sk.davky[tehotenske]}} z tohto základu.",
    "Mesačná suma je denná dávka krát počet dní v mesiaci, zaokrúhlená na 10 centov nahor.",
  ],
  ejemplo: ["Pri mzde 1 500 eur je denné tehotenské 7,40 eura po zaokrúhlení a za 30-dňový mesiac dostanete 222 eur."],
  faq: [
    { pregunta: "Koľko je tehotenské pri mzde 1 000 eur?", respuesta: "Denný vymeriavací základ je 32,8768 eura, dávka za deň asi 4,93 eura a za 30-dňový mesiac 148 eur." },
    { pregunta: "Aké je maximálne tehotenské?", respuesta: "V roku 2026 je to podľa Sociálnej poisťovne 451 eur za 30 dní a 466 eur za 31 dní. V roku 2027 stúpne na 479,40 a 495,40 eura." },
    { pregunta: "Z čoho sa počíta tehotenské?", respuesta: "Z denného vymeriavacieho základu, spravidla z príjmov za kalendárny rok pred vznikom nároku." },
    { pregunta: "Vypláca sa tehotenské spolu s mzdou?", respuesta: "Tehotenské vypláca Sociálna poisťovňa, nie zamestnávateľ. O podmienkach nároku rozhoduje ona." },
  ],
  glosario: [
    { termino: "Tehotenské", definicion: "Nemocenská dávka počas tehotenstva a krátko po pôrode." },
    { termino: "Všeobecný vymeriavací základ", definicion: "Priemerná mzda, z ktorej Sociálna poisťovňa odvodzuje stropy dávok." },
  ],
});
