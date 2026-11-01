import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.mzda-za-nadcas",
  h1: "Mzda za prácu nadčas {{anio}}",
  title: "Práca nadčas {{anio}}: príplatok {{sk.nadcas[bezna]}} a {{sk.nadcas[rizikova]}}",
  description: "Vypočítajte mzdu za nadčas: zvýhodnenie najmenej {{sk.nadcas[bezna]}} priemerného zárobku, pri rizikovej práci {{sk.nadcas[rizikova]}}, podľa § 121 Zákonníka práce.",
  intro: [
    "Za prácu nadčas patrí dosiahnutá mzda a zvýhodnenie najmenej {{sk.nadcas[bezna]}} priemerného zárobku. Pri rizikovej práci je to najmenej {{sk.nadcas[rizikova]}}.",
    "Namiesto zvýhodnenia sa môžete dohodnúť na náhradnom voľne v rozsahu, v akom nadčas trval. Vtedy príplatok nepatrí a kalkulačka nie je potrebná.",
  ],
  comoSeCalcula: [
    "Hodinová mzda sa vynásobí hodinami nadčasu.",
    "Zvýhodnenie je percento z priemerného hodinového zárobku krát hodiny.",
    "Oboje sa sčíta. Výsledok je pred odvodmi a daňou.",
  ],
  ejemplo: ["Pri hodinovej mzde a priemernom zárobku 12 eur a desiatich hodinách nadčasu dostanete 120 eur mzdy a 30 eur zvýhodnenia, spolu 150 eur."],
  faq: [
    { pregunta: "Koľko nadčasov môže firma nariadiť?", respuesta: "Hranice práce nadčas určuje § 97 Zákonníka práce a môže ich upraviť aj kolektívna zmluva. Kalkulačka počíta len peniaze za už odpracované hodiny." },
    { pregunta: "Musí mi firma platiť príplatok za nadčas?", respuesta: "Áno, okrem dohody o náhradnom voľne alebo dohody podľa § 121 ods. 2 s vybranými zamestnancami, ktorá zahŕňa nadčas do mzdy, najviac 150 hodín ročne." },
    { pregunta: "Dokedy treba vyčerpať náhradné voľno?", respuesta: "Ak sa nedohodnete inak, najneskôr do štyroch mesiacov po mesiaci, v ktorom bol nadčas vykonaný. Inak patrí zvýhodnenie (§ 121 ods. 4 a 5)." },
    { pregunta: "Aký zárobok sa používa?", respuesta: "Priemerný zárobok podľa § 134 Zákonníka práce, zistený z predchádzajúceho štvrťroka." },
  ],
  glosario: [
    { termino: "Práca nadčas", definicion: "Práca nad určený týždenný pracovný čas." },
    { termino: "Náhradné voľno", definicion: "Voľno namiesto príplatku v rozsahu odpracovaného nadčasu." },
  ],
});
