import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.nt-mokestis",
  h1: "NT mokestis {{anio}}: nekilnojamojo turto mokesčio skaičiuoklė",
  title: "NT mokestis {{anio}}: nekilnojamojo turto skaičiuoklė",
  description: "Įveskite turto mokestinę vertę ir apskaičiuokite metinį nekilnojamojo turto mokestį pagal galiojančius tarifus.",
  intro: [
    "Skaičiuoklė apskaičiuoja metinį nekilnojamojo turto mokestį.",
  ],
  comoSeCalcula: [
    "Kiekviena vertės dalis apmokestinama savo tarifu.",
  ],
  faq: [],
  glosario: [],
});
