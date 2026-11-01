import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.prispevki-sp",
  h1: "Prispevki za s.p. {{anio}}: izračun po dobičku",
  title: "Prispevki za s.p. {{anio}}: izračun po dobičku",
  description: "Prispevki samozaposlenih od najnižje osnove {{si.najnizja-osnova}} do najvišje {{si.najvisja-osnova-sp}}. Izračunajte mesečni znesek po dobičku.",
  intro: [
    "Samozaposleni prispevke plača sam, po stopnjah delavca in delodajalca. Osnova izhaja iz dobička preteklega leta in je najmanj {{si.najnizja-osnova}} na mesec, kar je 60 odstotkov povprečne plače za leto 2025.",
    "Zgornja meja je {{si.najvisja-osnova-sp}}. Prispevek za dolgotrajno oskrbo je za samozaposlene {{si.prispevki-sp[do]}}, pavšal OZP pa {{si.ozp}}. Rok plačila je 20. dan v mesecu za pretekli mesec.",
  ],
  comoSeCalcula: [
    "Zavarovalna osnova = letni dobiček / 12, znižan za {{si.znizanje-osnove-sp}} (145. člen ZPIZ-2).",
    "Če je osnova nižja od {{si.najnizja-osnova}}, se uporabi ta znesek. Najvišja osnova je {{si.najvisja-osnova-sp}}.",
    "Stopnje: pokojninsko {{si.prispevki-sp[piz-zav]}} in {{si.prispevki-sp[piz-del]}}, zdravstveno {{si.prispevki-sp[zz-zav]}} in {{si.prispevki-sp[zz-del]}}, poškodbe pri delu {{si.prispevki-sp[pd]}}, starševsko varstvo in zaposlovanje skupaj 0,40 odstotka.",
  ],
  ejemplo: [
    "Od najnižje osnove 1.521,62 € je po preglednici FURS za oktober 2026 prispevkov 651,04 €: pokojninsko 370,51 €, zdravstvo z OZP 244,02 €, dolgotrajna oskrba 30,43 € in drugi 6,08 €.",
    "Pri dobičku 30.000,00 € je osnova 1.875,00 €, prispevkov pa 793,14 € na mesec.",
  ],
  faq: [
    {
      pregunta: "Kdo sestavi obračun prispevkov?",
      respuesta: "FURS pripravi predizpolnjen obračun in ga do 10. dne v mesecu vroči v eDavke. Če podatki niso pravilni, ga zavezanec sam predloži do 15. dne, plačilo pa je do 20. dne.",
    },
    {
      pregunta: "Kako je pri popoldanskem s.p.?",
      respuesta: "Če ste že zavarovani na drugi podlagi, plačujete pavšalne prispevke. FURS za 2026 navaja {{si.pavsalni-prispevki[zz]}} in {{si.pavsalni-prispevki[pd]}} za zdravstvo ter {{si.pavsalni-prispevki[do]}} za dolgotrajno oskrbo.",
    },
    {
      pregunta: "Ali lahko plačam več od najnižje osnove?",
      respuesta: "Zavarovalna osnova sledi dobičku. Največ se lahko plača od 3,5-kratnika povprečne plače, kot navaja FURS po petem odstavku 145. člena ZPIZ-2.",
    },
  ],
  glosario: [
    { termino: "Zavarovalna osnova", definicion: "Znesek, od katerega se računajo prispevki samozaposlenega." },
    { termino: "POPSV", definicion: "Predizpolnjen obračun prispevkov za socialno varnost." },
  ],
});
