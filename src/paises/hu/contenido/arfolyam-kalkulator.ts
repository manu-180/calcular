import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.arfolyam-kalkulator",
  h1: "Árfolyam kalkulátor: euró, dollár, frank, font",
  title: "Árfolyam kalkulátor: MNB hivatalos devizaárfolyam",
  description:
    "Válts át eurót, dollárt, svájci frankot vagy fontot forintra és vissza az MNB hivatalos árfolyamán, a legutolsó munkanap adatával.",
  intro: [
    "A Magyar Nemzeti Bank minden munkanapon közzéteszi a hivatalos devizaárfolyamokat. A kalkulátor a legutolsó árfolyammal számol.",
    "A legutolsó árfolyam napja: {{hu.eur#desde}}. Az eredménynél a pontos árfolyamot is látod, két tizedesjegyig.",
  ],
  comoSeCalcula: [
    "Devizából forintra: az összeg szorozva az árfolyammal.",
    "Forintból devizára: az összeg osztva az árfolyammal.",
    "A bankok és pénzváltók eladási és vételi árfolyama eltér a hivatalostól, mert árrést számolnak fel.",
  ],
  ejemplo: [
    "100 euró a 366,52 forintos árfolyamon 36 652 Ft.",
  ],
  faq: [
    {
      pregunta: "Mennyi most az euró árfolyama?",
      respuesta: "Válaszd az eurót, és az eredménynél látod az MNB legutolsó hivatalos árfolyamát. A legutolsó árfolyam napja: {{hu.eur#desde}}.",
    },
    {
      pregunta: "Miért más a bankom árfolyama?",
      respuesta: "A bankok saját vételi és eladási árfolyamot használnak, és ebben benne van az árrésük. Az MNB árfolyama tájékoztató középárfolyam.",
    },
    {
      pregunta: "Hétvégén melyik árfolyam érvényes?",
      respuesta: "Hétvégén és ünnepnapon az MNB nem tesz közzé árfolyamot. A kalkulátor ilyenkor a legutolsó munkanapi árfolyammal számol.",
    },
  ],
  glosario: [
    { termino: "Hivatalos devizaárfolyam", definicion: "Az MNB által munkanaponként közzétett árfolyam." },
    { termino: "Árrés", definicion: "A vételi és az eladási árfolyam közötti különbség, a váltó haszna." },
  ],
});
