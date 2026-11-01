import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.nahrada-mzdy",
  h1: "Náhrada mzdy a priemerný zárobok {{anio}}",
  title: "Náhrada mzdy za dovolenku {{anio}}: priemerný zárobok",
  description: "Vypočítajte priemerný zárobok a náhradu mzdy za dovolenku podľa § 134 Zákonníka práce. Najmenej {{sk.minimalna-mzda-hodinova}} za hodinu.",
  intro: [
    "Za dovolenku patrí náhrada mzdy v sume priemerného zárobku. Nesmie byť nižšia ako minimálna mzda {{sk.minimalna-mzda-hodinova}} za hodinu.",
    "Priemerný zárobok sa zisťuje z predchádzajúceho štvrťroka a používa sa celý nasledujúci štvrťrok. Rovnaké číslo slúži aj pri odstupnom, odchodnom a pri príplatkoch za nadčas.",
  ],
  comoSeCalcula: [
    "Mzda zúčtovaná vo štvrťroku sa vydelí odpracovanými hodinami a zaokrúhli na štyri desatinné miesta (§ 134 ods. 4).",
    "Priemerný mesačný zárobok je hodinový zárobok krát priemerný počet hodín na mesiac. Kalkulačka používa 174 hodín, s ktorými počíta aj § 120, a zaokrúhľuje nahor na cent.",
    "Náhrada je hodinový zárobok krát hodiny dovolenky.",
  ],
  ejemplo: ["Pri mzde 6 000 eur za 520 hodín je hodinový zárobok 11,5385 eura. Za päť osemhodinových dní dovolenky patrí 461,54 eura."],
  faq: [
    { pregunta: "Z akého obdobia sa počíta priemerný zárobok?", respuesta: "Z kalendárneho štvrťroka pred tým, v ktorom sa zisťuje (§ 134 ods. 2 Zákonníka práce)." },
    { pregunta: "Čo keď som vo štvrťroku pracoval málo?", respuesta: "Pri menej ako 21 dňoch alebo 168 hodinách sa použije pravdepodobný zárobok (§ 134 ods. 3)." },
    { pregunta: "Môže byť náhrada nižšia ako minimálna mzda?", respuesta: "Nie. Podľa § 134 ods. 5 sa priemerný zárobok zvýši na minimálnu mzdu alebo na minimálny mzdový nárok." },
  ],
  glosario: [
    { termino: "Priemerný zárobok", definicion: "Hodinový zárobok z predchádzajúceho štvrťroka na pracovnoprávne účely." },
    { termino: "Pravdepodobný zárobok", definicion: "Odhad zárobku, keď zamestnanec v rozhodujúcom období neodpracoval dosť času." },
  ],
});
