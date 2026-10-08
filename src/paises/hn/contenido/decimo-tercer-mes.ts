import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.decimo-tercer-mes",
  h1: "Calculadora del décimo tercer mes (aguinaldo)",
  title: "Décimo tercer mes en Honduras: calcule su aguinaldo",
  description: "Calcule su aguinaldo de diciembre o la parte proporcional si dejó de trabajar.",
  intro: [
    "El décimo tercer mes, o aguinaldo, es un salario extra que se paga en diciembre.",
    "Si trabajó todo el año recibe un salario entero. Si trabajó menos, recibe la parte proporcional.",
  ],
  comoSeCalcula: [
    "Se toma el promedio de su salario ordinario mensual del año.",
    "Se cuentan los días trabajados en el año (o hasta su último día, si dejó de trabajar).",
    "Aguinaldo = salario promedio × {{hn.decimo-tercero}} × días trabajados / 365.",
  ],
  faq: [],
  glosario: [{ termino: "Aguinaldo", definicion: "Décimo tercer mes de salario, que se paga en diciembre." }],
});
