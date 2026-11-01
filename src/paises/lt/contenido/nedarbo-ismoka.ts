import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.nedarbo-ismoka",
  h1: "Nedarbo išmokos skaičiuoklė {{anio}}",
  title: "Nedarbo išmokos skaičiuoklė {{anio}}: suma per mėnesį",
  description: "Apskaičiuokite nedarbo išmoką: pastovią dalį pagal MMA ir kintamą dalį pagal jūsų vidutinį darbo užmokestį.",
  intro: [
    "Skaičiuoklė parodo nedarbo išmoką, sudarytą iš pastoviosios ir kintamosios dalies.",
  ],
  comoSeCalcula: [
    "Pastovioji dalis skaičiuojama nuo MMA.",
    "Kintamoji dalis skaičiuojama nuo vidutinio užmokesčio.",
  ],
  faq: [],
  glosario: [],
});
