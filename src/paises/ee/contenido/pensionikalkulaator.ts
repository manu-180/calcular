import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.pensionikalkulaator",
  h1: "Pensionikalkulaator",
  title: "Pensionikalkulaator {{anio}}: vanaduspension osakutest",
  description: "Arvuta vanaduspension: baasosa {{ee.pension-baasosa}} pluss staaž ja osakud, igaüks {{ee.pension-aastahinne}}. Staažinõue on {{ee.pension-staaz}}.",
  intro: [
    "Riiklik vanaduspension koosneb neljast osast: baasosast, staažiosast, kindlustusosast ja ühendosast (riikliku pensionikindlustuse seadus, § 11). Baasosa on {{ee.pension-baasosa}} ja iga aastahinne {{ee.pension-aastahinne}}. Kehtib alates: {{ee.pension-baasosa#desde}}.",
    "Õiguseks on vaja vähemalt {{ee.pension-staaz}} Eestis omandatud pensionistaaži. Kui seda pole, võib kõne alla tulla rahvapension {{ee.rahvapension}}. Väärtused indekseeritakse igal aastal 1. aprillil.",
  ],
  comoSeCalcula: [
    "Staažiosa: aastad kuni 31. detsembrini 1998 korda aastahinne.",
    "Kindlustusosa: kindlustusosakud aastatest 1999 kuni 2020 korda aastahinne.",
    "Ühendosa: pool kindlustusosakutest pluss pool solidaarosakutest alates 2021 korda aastahinne.",
    "Liida juurde baasosa. Tulemus on pension kuus enne tulumaksu ja praeguste väärtustega, ilma tulevase indekseerimiseta.",
  ],
  ejemplo: [
    "Staaž 10 aastat, 15 kindlustusosakut ja alates 2021 viis kindlustusosakut ning viis solidaarosakut: 399,24 + 10 × 10,477 + 15 × 10,477 + 5 × 10,477 = 713,55 eurot kuus.",
    "Iga lisanduv osak või staažiaasta tõstab pensioni 10,48 eurot kuus. Kogu osakute täpse seisu leiad riigiportaalist eesti.ee.",
  ],
  faq: [
    {
      pregunta: "Mis vanuses pension algab?",
      respuesta: "Õigus tekib 65-aastaselt, kui staaž on täidetud (§ 7). Alates 2027. aastast seotakse vanaduspensioniiga eeldatava eluea muutusega (§ 71). Täpse vanuse leiad Sotsiaalkindlustusametist.",
    },
    {
      pregunta: "Mis on aastahinne?",
      respuesta: "Ühe staažiaasta, kindlustusosaku või solidaarosaku 1,000 rahaline väärtus. Praegu on see {{ee.pension-aastahinne}}.",
    },
    {
      pregunta: "Kuidas pensione indekseeritakse?",
      respuesta: "Igal aastal 1. aprilliks: indeks koosneb 20 protsendi ulatuses tarbijahinnaindeksi kasvust ja 80 protsendi ulatuses sotsiaalmaksu pensionikindlustuse osa laekumise kasvust (§ 26).",
    },
    {
      pregunta: "Mis vahe on rahvapensionil ja vanaduspensionil?",
      respuesta: "Vanaduspension sõltub sinu staažist ja osakutest. Rahvapension on kindel summa {{ee.rahvapension}} kuus. See on mõeldud neile, kelle staažist vanaduspensioniks ei piisa.",
    },
  ],
  glosario: [
    { termino: "Kindlustusosak", definicion: "Sinu sotsiaalmaksu osa jagatud Eesti keskmisega antud aastal." },
    { termino: "Solidaarosak", definicion: "Osak, mis sõltub sellest, kas sinu eest on aastas makstud piisavalt sotsiaalmaksu." },
    { termino: "Baasosa", definicion: "Kindel osa, mis on kõigil sama." },
  ],
});
