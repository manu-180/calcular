import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.13-plat",
  h1: "13. a 14. plat {{anio}}",
  title: "13. a 14. plat {{anio}}: koľko dostanete v čistom",
  description: "Vypočítajte 13. alebo 14. plat v čistom: odvody {{sk.zdravotne-odvody[zamestnanec]}} na zdravotné a daň od {{sk.dan-z-prijmov[0].tasa}}. Pozrite si aj náklad firmy.",
  intro: [
    "13. a 14. plat sú dobrovoľné. Zákonník práce v § 118 ods. 4 hovorí, že zamestnávateľ ich môže poskytnúť pri príležitosti letných dovoleniek a vianočných sviatkov, nárok vzniká až z dohody alebo zmluvy.",
    "Kalkulačka počíta plat ako bežnú mzdu vyplatenú v tom istom mesiaci, preto sa pri vyššom príjme môže použiť aj vyššie pásmo dane. Kalkulačka nepočíta so žiadnym oslobodením, lebo súčasné znenie § 5 ods. 7 zákona o dani z príjmov ho pre tieto platy neuvádza.",
  ],
  comoSeCalcula: [
    "Najprv sa vypočíta čistá mzda bez príplatku.",
    "Potom čistá mzda z hrubej sumy zvýšenej o 13. plat, s tými istými odvodmi a preddavkom na daň.",
    "Rozdiel oboch súm je 13. plat v čistom.",
  ],
  ejemplo: ["Pri mzde 1 800 eur a 13. plate 1 800 eur dostanete navyše 1 248,05 eura. V mesiaci výplaty bude čistá mzda 2 590,57 eura."],
  faq: [
    { pregunta: "Je 13. plat povinný?", respuesta: "Nie. Zákonník práce hovorí, že zamestnávateľ ho môže poskytnúť. Povinný je, len ak to určuje kolektívna alebo pracovná zmluva." },
    { pregunta: "Platia sa z 13. platu odvody?", respuesta: "Áno, § 118 ods. 4 ho posudzuje ako mzdu. Kalkulačka preto odpočíta sociálne aj zdravotné poistenie." },
    { pregunta: "Prečo je čistý 13. plat nižší ako bežná čistá mzda?", respuesta: "Nezdaniteľná časť sa v mesiaci uplatní len raz a celý 13. plat sa zdaní bez nej, niekedy aj vyššou sadzbou." },
  ],
  glosario: [
    { termino: "13. plat", definicion: "Plnenie k letným dovolenkám, vyplácané spravidla v júni." },
    { termino: "14. plat", definicion: "Plnenie k vianočným sviatkom, vyplácané spravidla v decembri." },
  ],
});
