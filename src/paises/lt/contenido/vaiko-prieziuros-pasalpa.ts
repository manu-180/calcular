import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.vaiko-prieziuros-pasalpa",
  h1: "Vaiko priežiūros pašalpa {{anio}}: skaičiuoklė",
  title: "Vaiko priežiūros pašalpa {{anio}}: suma per mėnesį",
  description: "Apskaičiuokite vaiko priežiūros pašalpą pagal vidutinį darbo užmokestį ir pasirinktą atostogų trukmę.",
  intro: [
    "Skaičiuoklė parodo vaiko priežiūros pašalpą per mėnesį.",
  ],
  comoSeCalcula: [
    "Vidutinis užmokestis padauginamas iš pasirinktos trukmės procento.",
  ],
  faq: [],
  glosario: [],
});
