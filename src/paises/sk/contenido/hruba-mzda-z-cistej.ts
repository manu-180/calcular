import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.hruba-mzda-z-cistej",
  h1: "Prepočet čistej mzdy na hrubú {{anio}}",
  title: "Hrubá mzda z čistej {{anio}}: koľko pýtať na pohovore",
  description: "Zadajte čistú mzdu a zistite hrubú: počítame s odvodmi, nezdaniteľnou časťou {{sk.nezdanitelna-cast}} a daňou od {{sk.dan-z-prijmov[0].tasa}}.",
  intro: [
    "Ak viete, koľko chcete dostať na účet, kalkulačka nájde hrubú mzdu, ktorú treba mať v zmluve. Hodí sa pri pohovore aj pri porovnávaní ponúk.",
    "Pri výpočte platia rovnaké pravidlá ako pri čistej mzde: zdravotné poistenie {{sk.zdravotne-odvody[zamestnanec]}}, sociálne poistenie zo základu najviac {{sk.max-vymeriavaci-zaklad}} a daň v pásmach od {{sk.dan-z-prijmov[0].tasa}} po {{sk.dan-z-prijmov[-1].tasa}}.",
  ],
  comoSeCalcula: [
    "Priamy vzorec neexistuje, lebo daň má pásma a odvody sa zaokrúhľujú. Kalkulačka preto hľadá hrubú mzdu postupným skúšaním.",
    "Pri každom pokuse odpočíta odvody zamestnanca, dvanástinu nezdaniteľnej časti a preddavok na daň, potom pripočíta daňový bonus.",
    "Výsledok je najnižšia hrubá mzda v celých centoch, pri ktorej čistá mzda dosiahne zadanú sumu.",
  ],
  ejemplo: [
    "Na čistých 1 342,52 eura bez detí potrebujete hrubú mzdu približne 1 800 eur. Zamestnávateľa bude taká mzda stáť približne 2 451,60 eura.",
  ],
  faq: [
    { pregunta: "Akú hrubú mzdu potrebujem na 1 500 eur v čistom?", respuesta: "Zadajte sumu do kalkulačky a uvidíte presnú sumu pre váš počet detí. Výpočet používa sadzby z § 35 zákona o dani z príjmov." },
    { pregunta: "Znižuje daňový bonus potrebnú hrubú mzdu?", respuesta: "Áno. Bonus {{sk.danovy-bonus[do15]}} na dieťa do 15 rokov sa pripočítava k čistej mzde, takže na rovnakú čistú sumu stačí nižšia hrubá." },
    { pregunta: "Platí výsledok aj pri druhom zamestnávateľovi?", respuesta: "Nezdaniteľnú časť možno mesačne uplatniť len u jedného zamestnávateľa. Pri druhom zamestnaní vypnite príslušnú voľbu." },
  ],
  glosario: [
    { termino: "Vyhlásenie zamestnanca", definicion: "Tlačivo, ktorým si u zamestnávateľa uplatníte nezdaniteľnú časť a daňový bonus." },
    { termino: "Preddavok na daň", definicion: "Mesačná platba dane, ktorú zamestnávateľ zráža zo mzdy." },
  ],
});
