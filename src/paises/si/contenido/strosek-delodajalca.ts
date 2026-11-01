import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.strosek-delodajalca",
  h1: "Strošek delodajalca {{anio}}: koliko stane zaposleni",
  title: "Strošek delodajalca {{anio}}: izračun stroška plače",
  description: "Kaj podjetje plača poleg bruto plače: prispevki delodajalca, poškodbe pri delu {{si.prispevki-delodajalec[pd]}} in regres. Mesečno in letno.",
  intro: [
    "Bruto plača ni celoten strošek zaposlenega. Delodajalec nanjo doda prispevke, skupaj 17,10 odstotka, od julija 2025 tudi prispevek za dolgotrajno oskrbo {{si.prispevki-delodajalec[do]}}.",
    "Pri nizkih plačah se doda še ena postavka. Če je bruto plača pod najnižjo osnovo {{si.najnizja-osnova}}, delodajalec od razlike plača svoje prispevke in še pokojninski, zdravstveni ter prispevek za dolgotrajno oskrbo namesto delavca.",
  ],
  comoSeCalcula: [
    "Prispevki delodajalca: pokojninsko {{si.prispevki-delodajalec[piz]}}, zdravstveno {{si.prispevki-delodajalec[zz]}}, poškodbe pri delu {{si.prispevki-delodajalec[pd]}}, dolgotrajna oskrba {{si.prispevki-delodajalec[do]}}, starševsko varstvo {{si.prispevki-delodajalec[starsevsko]}} in zaposlovanje {{si.prispevki-delodajalec[zaposlovanje]}}.",
    "Mesečni strošek je bruto plača s temi prispevki. Pri krajšem delovnem času se najnižja osnova zmanjša sorazmerno.",
    "Letni strošek je dvanajst mesečnih stroškov in regres. Privzeti regres je minimalna plača {{si.minimalna-placa}}, sorazmerna delovnemu času.",
  ],
  ejemplo: [
    "Bruto plača 2.500,00 € pomeni prispevke delodajalca 427,50 € in mesečni strošek 2.927,50 €. Z minimalnim regresom 1.481,88 € je letni strošek 36.611,88 €.",
    "Minimalna plača 1.481,88 € je pod najnižjo osnovo. Lastni prispevki so 260,20 €, prispevki delavca od razlike pa 9,08 €, zato je mesečni strošek 1.751,16 €.",
  ],
  faq: [
    {
      pregunta: "Ali so v strošek všteti malica, prevoz in zimski regres?",
      respuesta: "Ne. Povračila stroškov so odvisna od kolektivne pogodbe in razdalje. Zimski regres izračunate posebej: po ZPZR znaša polovico minimalne plače.",
    },
    {
      pregunta: "Kdo plača prispevke od razlike do najnižje osnove?",
      respuesta: "Po pojasnilu FURS sta zavezanca delavec in delodajalec, le da prispevke zavarovanca za pokojninsko, zdravstveno zavarovanje in dolgotrajno oskrbo od razlike plača delodajalec (152. člen ZPIZ-2, 50. člen ZZVZZ, 56. člen ZDOsk-1).",
    },
    {
      pregunta: "Ali se od regresa plačajo prispevki?",
      respuesta: "Do višine zadnje znane povprečne mesečne plače ne (144. člen ZPIZ-2). Regres nad tem zneskom ni upoštevan v tem izračunu, zato ga pri višjih zneskih prištejte s prispevki.",
    },
  ],
  glosario: [
    { termino: "Prispevki delodajalca", definicion: "Obvezni prispevki, ki jih delodajalec plača poleg bruto plače." },
    { termino: "Najnižja osnova", definicion: "Najnižji znesek, od katerega se obračunajo prispevki za polni delovni čas." },
  ],
});
