import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.kalkulacka-pn",
  h1: "Kalkulačka PN {{anio}}",
  title: "Kalkulačka PN {{anio}}: nemocenské a náhrada príjmu",
  description: "Vypočítajte PN: prvé 3 dni {{sk.nahrada-prijmu[prve-dni]}}, do 14. dňa {{sk.nahrada-prijmu[dalsie-dni]}} od zamestnávateľa, potom nemocenské {{sk.davky[nemocenske]}}.",
  intro: [
    "Počas PN dostáva zamestnanec prvých 14 dní náhradu príjmu od zamestnávateľa: {{sk.nahrada-prijmu[prve-dni]}} denného vymeriavacieho základu prvé tri dni a {{sk.nahrada-prijmu[dalsie-dni]}} ďalšie dni. Od 15. dňa platí nemocenské {{sk.davky[nemocenske]}} od Sociálnej poisťovne.",
    "Denný vymeriavací základ pre nemocenské má strop {{sk.max-dvz}}, preto pri vysokej mzde dávka nerastie donekonečna. Kalkulačka počíta so mzdou z minulého roka prepočítanou na dni.",
  ],
  comoSeCalcula: [
    "Denný vymeriavací základ je mesačná mzda krát 12 vydelená 365, zaokrúhlená na štyri desatinné miesta nahor.",
    "Náhrada príjmu podľa § 8 zákona č. 462/2003 Z. z. sa počíta za kalendárne dni a zaokrúhľuje nahor na cent.",
    "Nemocenské sa počíta za kalendárne dni od 15. dňa a kalkulačka sumu zaokrúhli na 10 centov nahor, ako to robia sumy Sociálnej poisťovne.",
    "SZČO a dobrovoľne poistení dostávajú {{sk.davky[prve-dni]}} prvé tri dni a potom {{sk.davky[nemocenske]}}, všetko od Sociálnej poisťovne.",
  ],
  ejemplo: ["Pri mzde 1 500 eur a 20 dňoch PN zaplatí zamestnávateľ 335,35 eura a Sociálna poisťovňa 162,80 eura. Spolu dostanete 498,15 eura."],
  faq: [
    { pregunta: "Koľko dostanem za prvé dni PN?", respuesta: "Prvé tri dni {{sk.nahrada-prijmu[prve-dni]}} denného vymeriavacieho základu a od 4. do 14. dňa {{sk.nahrada-prijmu[dalsie-dni]}} (§ 8 zákona o náhrade príjmu). Kolektívna zmluva môže určiť viac, najviac 80 %." },
    { pregunta: "Aké je maximálne nemocenské?", respuesta: "Pri strope {{sk.max-dvz}} je to podľa Sociálnej poisťovne 1 653,50 eura za 30-dňový mesiac v roku 2026." },
    { pregunta: "Ako dlho možno poberať nemocenské?", respuesta: "Najdlhšie 52 týždňov od vzniku dočasnej pracovnej neschopnosti, ako uvádza Sociálna poisťovňa." },
  ],
  glosario: [
    { termino: "PN", definicion: "Dočasná pracovná neschopnosť potvrdená lekárom." },
    { termino: "Denný vymeriavací základ", definicion: "Príjem z rozhodujúceho obdobia prepočítaný na jeden deň." },
    { termino: "Rozhodujúce obdobie", definicion: "Spravidla predchádzajúci kalendárny rok." },
  ],
});
