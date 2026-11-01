import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.izracun-prispevkov",
  h1: "Izračun prispevkov od plače {{anio}}",
  title: "Prispevki od plače {{anio}}: delavec in delodajalec",
  description: "Pokojninsko {{si.prispevki-delavec[piz]}}, zdravstveno {{si.prispevki-delavec[zz]}}, OZP {{si.ozp}} in vse ostale postavke. Izračun za delavca in delodajalca.",
  intro: [
    "Od bruto plače delavec plača pet prispevkov po odstotkih in pavšal OZP {{si.ozp}}. Delodajalec plača svojih šest postavk. Kalkulator vse razdeli po namenu, da lahko preverite plačilno listo.",
    "Od julija 2025 se plačuje tudi prispevek za dolgotrajno oskrbo: {{si.prispevki-delavec[do]}} delavec in {{si.prispevki-delodajalec[do]}} delodajalec.",
  ],
  comoSeCalcula: [
    "Delavec: pokojninsko {{si.prispevki-delavec[piz]}}, zdravstveno {{si.prispevki-delavec[zz]}}, dolgotrajna oskrba {{si.prispevki-delavec[do]}}, starševsko varstvo {{si.prispevki-delavec[starsevsko]}}, zaposlovanje {{si.prispevki-delavec[zaposlovanje]}} in OZP {{si.ozp}}.",
    "Delodajalec: pokojninsko {{si.prispevki-delodajalec[piz]}}, zdravstveno {{si.prispevki-delodajalec[zz]}}, poškodbe pri delu {{si.prispevki-delodajalec[pd]}}, dolgotrajna oskrba {{si.prispevki-delodajalec[do]}}, starševsko varstvo {{si.prispevki-delodajalec[starsevsko]}} in zaposlovanje {{si.prispevki-delodajalec[zaposlovanje]}}.",
    "Najnižja osnova je {{si.najnizja-osnova}}. Če je plača nižja, se od razlike prav tako obračunajo vsi prispevki. Pokojninski, zdravstveni in prispevek za dolgotrajno oskrbo od razlike namesto delavca plača delodajalec.",
  ],
  ejemplo: [
    "Pri bruto plači 2.500,00 € delavec plača 387,50 € za pokojninsko zavarovanje, 159,00 € za zdravstveno, 25,00 € za dolgotrajno oskrbo, 6,00 € za starševsko varstvo in zaposlovanje ter 39,36 € OZP. Skupaj je to 616,86 €. Delodajalec doda še 427,50 €.",
  ],
  faq: [
    {
      pregunta: "Kje so določene stopnje prispevkov?",
      respuesta: "V Zakonu o prispevkih za socialno varnost (ZPSV), znesek OZP v 48. členu ZZVZZ, stopnja za dolgotrajno oskrbo pa v 56. členu ZDOsk-1. Povzema jih državni portal SPOT.",
    },
    {
      pregunta: "Ali prispevki zmanjšajo dohodnino?",
      respuesta: "Da. Po 41. členu ZDoh-2 se davčna osnova zmanjša za obvezne prispevke delavca. FURS pojasnjuje, da mednje šteje tudi OZP in prispevek za dolgotrajno oskrbo.",
    },
    {
      pregunta: "Kaj če imam dva delodajalca?",
      respuesta: "OZP obračuna glavni delodajalec, odstotne prispevke pa vsak od svojega izplačila. Kalkulator računa eno zaposlitev.",
    },
  ],
  glosario: [
    { termino: "OZP", definicion: "Obvezni zdravstveni prispevek, pavšalen mesečni znesek od januarja 2024." },
    { termino: "PIZ", definicion: "Pokojninsko in invalidsko zavarovanje." },
  ],
});
