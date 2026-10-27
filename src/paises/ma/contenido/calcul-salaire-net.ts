import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ma.calcul-salaire-net",
  h1: "Calcul du salaire net au Maroc",
  title: "Salaire net Maroc {{anio}} : du brut au net",
  description: "Passez du salaire brut au salaire net au Maroc : cotisations CNSS et AMO, puis impôt sur le revenu retenu à la source.",
  intro: ["Du salaire brut, on retire les cotisations salariales CNSS et AMO, puis l'impôt sur le revenu."],
  comoSeCalcula: ["Net = brut − cotisations salariales − impôt sur le revenu mensuel."],
  faq: [],
  glosario: [],
});
