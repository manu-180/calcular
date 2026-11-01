import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.salario-base",
  h1: "Salario base en Costa Rica",
  title: "Salario base {{anio}} en Costa Rica: monto y conversor",
  description: "Pase salarios base a colones. El salario base de la Ley 7337 se usa para multas, penas y otros montos que fijan las leyes.",
  intro: ["El salario base es una unidad que fija cada año el Poder Judicial. Muchas leyes lo usan para calcular multas y otros montos."],
  comoSeCalcula: ["Monto en colones: la cantidad de salarios base por {{cr.salario-base}}."],
  faq: [],
  glosario: [{ termino: "Salario base", definicion: "Unidad de referencia de la Ley 7337 para multas y sanciones." }],
});
