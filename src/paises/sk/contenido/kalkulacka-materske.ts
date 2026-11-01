import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.kalkulacka-materske",
  h1: "Kalkulačka materské {{anio}}",
  title: "Kalkulačka materské {{anio}}: {{sk.davky[materske]}} a maximálna dávka",
  description: "Vypočítajte materské: {{sk.davky[materske]}} denného vymeriavacieho základu, najviac zo {{sk.max-dvz}} denne, na {{sk.materske-tyzdne[bezne]}} až {{sk.materske-tyzdne[viac-deti]}}.",
  intro: [
    "Materské je {{sk.davky[materske]}} denného vymeriavacieho základu a vypláca ho Sociálna poisťovňa za kalendárne dni. V roku 2026 je najvyššia suma 2 254,70 eura za 30-dňový mesiac.",
    "Bežne trvá {{sk.materske-tyzdne[bezne]}}, osamelej matke {{sk.materske-tyzdne[osamela]}} a pri narodení dvoch a viac detí naraz {{sk.materske-tyzdne[viac-deti]}}. Kalkulačka pracuje so mzdou z minulého roka prepočítanou na dni.",
  ],
  comoSeCalcula: [
    "Denný vymeriavací základ je mesačná mzda krát 12 vydelená 365, najviac {{sk.max-dvz}}.",
    "Denné materské je {{sk.davky[materske]}} z tohto základu.",
    "Mesačná suma je denné materské krát počet dní v mesiaci, zaokrúhlená na 10 centov nahor.",
  ],
  ejemplo: ["Pri mzde 1 500 eur je denné materské asi 36,99 eura. Za 30-dňový mesiac dostanete 1 109,60 eura a za 31-dňový 1 146,60 eura."],
  faq: [
    { pregunta: "Aké je maximálne materské?", respuesta: "Ak nárok vznikne v roku 2026, Sociálna poisťovňa vypláca najviac 2 254,70 eura za 30 dní a 2 329,90 eura za 31 dní. V roku 2027 to bude 2 396,80 a 2 476,70 eura." },
    { pregunta: "Kedy vzniká nárok na materské?", respuesta: "Od začiatku šiesteho týždňa pred očakávaným pôrodom, najskôr od začiatku ôsmeho týždňa, ak o to poistenka požiada." },
    { pregunta: "Môže materské poberať aj otec?", respuesta: "Podmienky uvádza Sociálna poisťovňa v časti Ako požiadať o materské. Za to isté obdobie sa dávka poskytuje len raz a len jednému poistencovi." },
  ],
  glosario: [
    { termino: "Materské", definicion: "Nemocenská dávka počas starostlivosti o novorodené dieťa." },
    { termino: "Pravdepodobný denný vymeriavací základ", definicion: "Základ, ktorý sa použije, keď poistenec nemal v rozhodujúcom období príjem." },
  ],
});
