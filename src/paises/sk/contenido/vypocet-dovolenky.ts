import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.vypocet-dovolenky",
  h1: "Výpočet dovolenky {{anio}}",
  title: "Výpočet dovolenky {{anio}}: {{sk.dovolenka[zakladna]}} alebo {{sk.dovolenka[zvysena]}}",
  description: "Zistite nárok na dovolenku: základ {{sk.dovolenka[zakladna]}}, od 33 rokov {{sk.dovolenka[zvysena]}} a pomerná časť za mesiace práce podľa Zákonníka práce.",
  intro: [
    "Základná výmera dovolenky je {{sk.dovolenka[zakladna]}}. Zamestnanec, ktorý do konca roka dovŕši 33 rokov alebo sa trvale stará o dieťa, má najmenej {{sk.dovolenka[zvysena]}}.",
    "Kalkulačka prepočíta týždne na pracovné dni a zohľadní aj prácu len časť roka. Kolektívna alebo pracovná zmluva môže priznať viac, zadáva sa však zákonné minimum.",
  ],
  comoSeCalcula: [
    "Výmera v týždňoch sa vynásobí počtom pracovných dní v týždni.",
    "Pomerná časť je podľa § 102 Zákonníka práce jedna dvanástina za každý celý mesiac nepretržitého pracovného pomeru.",
    "Ak ste v roku neodpracovali aspoň 60 dní, patrí dovolenka za odpracované dni: jedna dvanástina za každých 21 dní (§ 105).",
  ],
  ejemplo: ["Pri výmere {{sk.dovolenka[zvysena]}} a päťdňovom týždni máte za rok 25 dní. Pri štyroch týždňoch a troch mesiacoch práce vám patrí 5 dní."],
  faq: [
    { pregunta: "Kto má nárok na {{sk.dovolenka[zvysena]}} dovolenky?", respuesta: "Zamestnanec, ktorý do konca kalendárneho roka dovŕši najmenej 33 rokov, a zamestnanec, ktorý sa trvale stará o dieťa (§ 103 ods. 2)." },
    { pregunta: "Kto má nárok na {{sk.dovolenka[pedagog]}}?", respuesta: "Najmä pedagogickí a odborní zamestnanci, vysokoškolskí učitelia a vybraní výskumní pracovníci (§ 103 ods. 3)." },
    { pregunta: "Môže mi zamestnávateľ dovolenku preplatiť?", respuesta: "Nevyčerpané štyri týždne základnej výmery možno preplatiť len pri skončení pracovného pomeru (§ 116 ods. 3). Za časť nad štyri týždne patrí náhrada, ak sa nedala vyčerpať ani do konca nasledujúceho roka." },
  ],
  glosario: [
    { termino: "Pomerná časť dovolenky", definicion: "Dvanástina dovolenky za každý celý mesiac trvania pracovného pomeru." },
    { termino: "Dodatková dovolenka", definicion: "Týždeň navyše pri práci pod zemou a pri zvlášť ťažkých alebo zdraviu škodlivých prácach." },
  ],
});
