import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.kalkulacka-dph",
  h1: "Kalkulačka DPH {{anio}}",
  title: "Kalkulačka DPH {{anio}}: {{sk.dph[zakladna]}}, {{sk.dph[znizena]}} a {{sk.dph[najnizsia]}}",
  description: "Vypočítajte DPH zo sumy aj cenu bez DPH. Základná sadzba je {{sk.dph[zakladna]}}, znížené sadzby sú {{sk.dph[znizena]}} a {{sk.dph[najnizsia]}}.",
  intro: [
    "Základná sadzba DPH je {{sk.dph[zakladna]}}. Vybrané tovary a služby majú sadzbu {{sk.dph[znizena]}} alebo {{sk.dph[najnizsia]}}, ako určuje § 27 zákona o DPH a jeho prílohy.",
    "Zadajte sumu, vyberte sadzbu a povedzte, či je suma s DPH alebo bez nej. Kalkulačka dopočíta zvyšné dve čísla. Výsledok je zaokrúhlený na centy, ako v bežnej faktúre.",
  ],
  comoSeCalcula: [
    "Cena s DPH je cena bez DPH vynásobená výrazom 1 + sadzba / 100.",
    "Cena bez DPH je cena s DPH vydelená rovnakým výrazom.",
    "DPH je rozdiel oboch súm.",
  ],
  ejemplo: ["Tovar za 100 eur bez DPH stojí pri sadzbe {{sk.dph[zakladna]}} celkom 123 eur, z toho je DPH 23 eur. Z ceny 119 eur pri sadzbe {{sk.dph[znizena]}} je základ 100 eur."],
  faq: [
    { pregunta: "Na čo sa vzťahuje sadzba {{sk.dph[znizena]}}?", respuesta: "Na tovary z prílohy č. 7 bodu 1 a služby z prílohy č. 7a bodu 1 zákona o DPH." },
    { pregunta: "Na čo sa vzťahuje sadzba {{sk.dph[najnizsia]}}?", respuesta: "Na tovary z prílohy č. 7 bodov 2 a 3, služby z prílohy č. 7a bodu 2 a na vybrané plnenia registrovaných sociálnych podnikov a nájomného bývania (§ 27 ods. 3)." },
    { pregunta: "Odkedy platí základná sadzba {{sk.dph[zakladna]}}?", respuesta: "Od {{sk.dph#desde}} ju uvádza § 27 ods. 1 znenia zákona, s ktorým kalkulačka pracuje." },
  ],
  glosario: [
    { termino: "Základ dane", definicion: "Suma bez DPH, z ktorej sa daň počíta." },
    { termino: "Platiteľ DPH", definicion: "Podnikateľ, ktorý DPH účtuje a odvádza." },
  ],
});
