import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.verslo-liudijimas",
  h1: "Verslo liudijimas {{anio}}: kaina ir įmokos",
  title: "Verslo liudijimas {{anio}}: kaina, įmokos ir pajamų riba",
  description: "Įveskite savivaldybės nustatytą verslo liudijimo kainą ir pajamas. Apskaičiuokite įmokas ir tai, kiek lieka per metus.",
  intro: [
    "Skaičiuoklė prie verslo liudijimo kainos prideda VSD ir PSD įmokas.",
  ],
  comoSeCalcula: [
    "Liudijimo kainą įvedate patys pagal savivaldybės sprendimą.",
    "Įmokos skaičiuojamos nuo pajamų dalies.",
  ],
  faq: [],
  glosario: [],
});
