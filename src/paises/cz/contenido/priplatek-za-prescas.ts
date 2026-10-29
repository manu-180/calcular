import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.priplatek-za-prescas",
  h1: "Příplatek za přesčas, noc, víkend a svátek",
  title: "Příplatek za přesčas {{anio}}: výpočet podle zákoníku práce",
  description:
    "Spočítejte příplatky za práci přesčas ({{cz.priplatky[prescas]}}), v noci, o víkendu ({{cz.priplatky[vikend]}}) a ve svátku ({{cz.priplatky[svatek]}}) z průměrného výdělku.",
  intro: [
    "Za práci přesčas, v noci, o víkendu a ve svátek vám kromě mzdy náleží příplatek. Zákoník práce určuje jeho nejnižší výši jako procento průměrného hodinového výdělku.",
    "Kalkulačka sečte příplatky za všechny druhy práce a ukáže, kolik dostanete za přesčasové hodiny celkem.",
  ],
  comoSeCalcula: [
    "Práce přesčas: dosažená mzda a příplatek nejméně {{cz.priplatky[prescas]}} průměrného výdělku, nebo náhradní volno, pokud se tak dohodnete.",
    "Noční práce: příplatek nejméně {{cz.priplatky[noc]}} průměrného výdělku. Práce v sobotu a v neděli: nejméně {{cz.priplatky[vikend]}}.",
    "Práce ve svátek: náhradní volno, nebo po dohodě příplatek nejméně {{cz.priplatky[svatek]}} průměrného výdělku.",
    "Pokud se druhy práce překrývají, příplatky se sčítají.",
  ],
  ejemplo: ["Při průměrném výdělku 250 Kč za hodinu je příplatek za 10 hodin přesčasu 625 Kč. S mzdou za tyto hodiny dostanete 3 125 Kč."],
  faq: [
    {
      pregunta: "Kolik je příplatek za přesčas?",
      respuesta: "Nejméně {{cz.priplatky[prescas]}} průměrného hodinového výdělku za každou hodinu přesčasu, navíc ke mzdě. Místo příplatku si můžete dohodnout náhradní volno.",
    },
    {
      pregunta: "Kolik přesčasů může zaměstnavatel nařídit?",
      respuesta: "Nejvýše 8 hodin v týdnu a 150 hodin za kalendářní rok. Další přesčasy jsou možné jen po dohodě se zaměstnancem.",
    },
    {
      pregunta: "Musí mi zaměstnavatel proplatit přesčasy, když mám mzdu sjednanou s přesčasy?",
      respuesta: "Pokud je ve smlouvě sjednáno, že mzda už zahrnuje určitý rozsah přesčasů, příplatek za tyto hodiny nenáleží. Takto lze sjednat nejvýše 150 hodin přesčasu za rok, u vedoucích zaměstnanců celý zákonný rozsah přesčasů.",
    },
  ],
  glosario: [
    { termino: "Průměrný hodinový výdělek", definicion: "Hrubá mzda za předchozí čtvrtletí vydělená odpracovanými hodinami." },
    { termino: "Náhradní volno", definicion: "Placené volno místo příplatku, které musí zaměstnavatel poskytnout do 3 měsíců." },
  ],
});
