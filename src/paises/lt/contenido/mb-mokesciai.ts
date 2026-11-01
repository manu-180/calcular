import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.mb-mokesciai",
  h1: "MB mokesčiai {{anio}}: mažosios bendrijos skaičiuoklė",
  title: "MB mokesčiai {{anio}}: pelno mokestis ir GPM",
  description: "Apskaičiuokite mažosios bendrijos pelno mokestį ir GPM nuo pelno, paskirstyto nariams. Įveskite metinį pelną ir pasirinkite tarifą.",
  intro: [
    "Skaičiuoklė parodo, kiek iš mažosios bendrijos pelno lieka sumokėjus mokesčius.",
  ],
  comoSeCalcula: [
    "Nuo pelno skaičiuojamas pelno mokestis.",
    "Nuo paskirstyto pelno skaičiuojamas GPM.",
  ],
  faq: [],
  glosario: [],
});
