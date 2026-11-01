import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.vypocet-dovolene",
  h1: "Výpočet dovolené v hodinách",
  title: "Výpočet dovolené {{anio}}: nárok v hodinách i dnech",
  description:
    "Spočítejte nárok na dovolenou podle zákoníku práce: výměra {{cz.vymera-dovolene[zakladni]}}, krácení podle odpracovaných týdnů, zkrácený úvazek a převod hodin na dny.",
  intro: [
    "Od roku 2021 se dovolená počítá v hodinách. Nárok záleží na týdenní pracovní době, výměře dovolené a na tom, kolik týdnů v roce jste u zaměstnavatele odpracovali.",
    "Kalkulačka spočítá dovolenou za celý rok i její poměrnou část při nástupu nebo odchodu v průběhu roku.",
  ],
  comoSeCalcula: [
    "Za celý rok máte nárok na týdenní pracovní dobu vynásobenou výměrou dovolené. Výměra je nejméně {{cz.vymera-dovolene[zakladni]}}, u státu, krajů a obcí {{cz.vymera-dovolene[verejny]}} a u pedagogů {{cz.vymera-dovolene[pedagog]}}.",
    "Když neodpracujete celý rok, náleží vám za každý odpracovaný týden jedna dvaapadesátina roční dovolené. Nárok vzniká po 4 odpracovaných týdnech.",
    "Výsledek se zaokrouhluje na celé hodiny nahoru.",
  ],
  ejemplo: ["Při plném úvazku 40 hodin týdně a celém odpracovaném roce máte nárok na 160 hodin, tedy 20 osmihodinových dnů. Když v roce odpracujete jen 30 týdnů, máte nárok na 93 hodin."],
  faq: [
    {
      pregunta: "Kolik dní dovolené mám za rok?",
      respuesta: "Při zákonné výměře {{cz.vymera-dovolene[zakladni]}} a pětidenním týdnu 20 pracovních dnů. Zaměstnavatel vám může dát i delší dovolenou.",
    },
    {
      pregunta: "Jak se počítá dovolená při zkráceném úvazku?",
      respuesta: "Z vaší kratší týdenní pracovní doby. Při 20 hodinách týdně je to 80 hodin za rok, což při čtyřhodinových směnách odpovídá 20 dnům.",
    },
    {
      pregunta: "Proplácí se nevyčerpaná dovolená?",
      respuesta: "Jen když pracovní poměr skončí. Pak vám zaměstnavatel za nevyčerpané hodiny zaplatí náhradu mzdy ve výši průměrného výdělku.",
    },
  ],
  glosario: [
    { termino: "Výměra dovolené", definicion: "Počet týdnů dovolené za rok, nejméně {{cz.vymera-dovolene[zakladni]}}." },
    { termino: "Poměrná část dovolené", definicion: "Dovolená za část roku, jedna dvaapadesátina roční dovolené za každý odpracovaný týden." },
  ],
});
