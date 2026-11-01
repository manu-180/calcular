import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.kalkulacka-dochodku",
  h1: "Kalkulačka dôchodku {{anio}}",
  title: "Kalkulačka dôchodku {{anio}}: výpočet starobného dôchodku",
  description: "Odhadnite starobný dôchodok: mzdový bod krát roky poistenia krát aktuálna dôchodková hodnota {{sk.adh}}. Výpočet podľa § 63 a § 66 zákona o sociálnom poistení.",
  intro: [
    "Starobný dôchodok je súčin priemerného osobného mzdového bodu, rokov dôchodkového poistenia a aktuálnej dôchodkovej hodnoty {{sk.adh}}. Takto ho určuje § 66 zákona o sociálnom poistení.",
    "Kalkulačka je len odhad. Presný mzdový bod určí Sociálna poisťovňa z vašej histórie zárobkov a dôchodkovú prognózu nájdete v Elektronickom účte poistenca. Účasť v druhom pilieri dôchodok z prvého piliera znižuje a tu sa nezohľadňuje.",
  ],
  comoSeCalcula: [
    "Zadajte priemerný osobný mzdový bod. Jeden znamená priemernú mzdu v hospodárstve.",
    "Bod pod 1 sa zvýši o {{sk.dochodok-koef[nizky-prijem]}} rozdielu do jednotky (§ 63 ods. 4).",
    "Z časti bodu od {{sk.dochodok-koef[hranica]}} do {{sk.dochodok-koef[strop]}} sa započíta {{sk.dochodok-koef[nad-hranicou]}} (§ 63 ods. 3). Nad touto hranicou sa neprihliada.",
    "Upravený bod sa vynásobí rokmi a dôchodkovou hodnotou a zaokrúhli na 10 centov nahor.",
  ],
  ejemplo: ["Pri priemernej mzde a 40 rokoch poistenia vychádza odhad 790,60 eura mesačne."],
  faq: [
    { pregunta: "Čo je aktuálna dôchodková hodnota?", respuesta: "Suma, ktorú Sociálna poisťovňa určuje na každý rok. Na rok 2026 je {{sk.adh}}." },
    { pregunta: "Ako zistím svoj mzdový bod?", respuesta: "Za každý rok je to pomer vášho vymeriavacieho základu a všeobecného vymeriavacieho základu. Priemer určí Sociálna poisťovňa." },
    { pregunta: "Zvyšuje sa priznaný dôchodok?", respuesta: "Áno, valorizáciou. V roku 2026 sa dôchodky podľa Sociálnej poisťovne zvýšili o 3,7 %." },
  ],
  glosario: [
    { termino: "Osobný mzdový bod", definicion: "Pomer vášho ročného zárobku a priemerného zárobku v hospodárstve." },
    { termino: "Dôchodkový vek", definicion: "Vek, od ktorého vzniká nárok na starobný dôchodok." },
  ],
});
