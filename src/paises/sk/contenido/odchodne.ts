import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.odchodne",
  h1: "Odchodné do dôchodku {{anio}}",
  title: "Odchodné do dôchodku {{anio}}: komu a koľko patrí",
  description: "Odchodné je najmenej {{sk.odchodne}} násobok priemerného mesačného zárobku pri prvom skončení práce po vzniku nároku na dôchodok (§ 76a Zákonníka práce).",
  intro: [
    "Odchodné je najmenej jeden priemerný mesačný zárobok. Patrí pri prvom skončení pracovného pomeru po vzniku nároku na starobný dôchodok alebo invalidný dôchodok s poklesom viac ako 70 %.",
    "Zákon určuje minimum, zamestnávateľ alebo kolektívna zmluva môžu dať viac. Zadajte priemerný zárobok, ktorý vám vypočíta mzdová účtáreň alebo naša kalkulačka náhrady mzdy.",
  ],
  comoSeCalcula: [
    "Priemerný mesačný zárobok sa vynásobí zákonným minimom podľa § 76a.",
    "O dôchodok treba požiadať pred skončením pracovného pomeru alebo do desiatich pracovných dní po ňom.",
    "Odchodné patrí len od jedného zamestnávateľa.",
  ],
  ejemplo: ["Pri priemernom mesačnom zárobku 1 800 eur patrí odchodné najmenej 1 800 eur."],
  faq: [
    { pregunta: "Koľko je odchodné v čistom?", respuesta: "Kalkulačka uvádza hrubú sumu najmenej podľa zákona. Zdanenie a odvody závisia od ostatných príjmov v mesiaci výplaty, presnú sumu vypočíta mzdová účtáreň." },
    { pregunta: "Patrí odchodné pri odchode na invalidný dôchodok?", respuesta: "Áno, ak pokles schopnosti vykonávať zárobkovú činnosť je viac ako 70 % a o dôchodok požiadate včas (§ 76a ods. 1)." },
    { pregunta: "Patrí odchodné aj pri predčasnom starobnom dôchodku?", respuesta: "Áno, ak bol priznaný na základe žiadosti podanej pred skončením pracovného pomeru alebo do desiatich dní po ňom (§ 76a ods. 2)." },
    { pregunta: "Kedy zamestnávateľ odchodné platiť nemusí?", respuesta: "Ak sa pracovný pomer skončil okamžite podľa § 68 ods. 1 Zákonníka práce." },
    { pregunta: "Môžem dostať odchodné od dvoch zamestnávateľov?", respuesta: "Nie. Podľa § 76a ods. 3 patrí len od jedného zamestnávateľa." },
  ],
  glosario: [
    { termino: "Odchodné", definicion: "Jednorazová platba pri odchode do dôchodku." },
    { termino: "Priemerný mesačný zárobok", definicion: "Zárobok zistený podľa § 134 Zákonníka práce." },
  ],
});
