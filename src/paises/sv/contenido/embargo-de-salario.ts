import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.embargo-de-salario",
  h1: "Calculadora de embargo de salario",
  title: "Embargo de salario en El Salvador: cuánto le pueden quitar",
  description: "Calcule el máximo que le pueden embargar del salario: el {{sv.embargo-porcentaje}} de lo que pasa del mínimo, o de todo el salario si demanda un banco o cooperativa.",
  intro: [
    "Si un juez ordena embargar su salario, la ley pone un límite. Para la mayoría de las deudas, el salario mínimo está protegido y solo se puede embargar hasta el {{sv.embargo-porcentaje}} de lo que gane por encima del mínimo.",
    "Si quien demanda es un banco, una aseguradora, una financiera o una cooperativa por un préstamo, el límite es el {{sv.embargo-porcentaje}} de todo su salario. La cuota alimenticia no tiene ese límite.",
  ],
  comoSeCalcula: [
    "Deuda con una persona o empresa común: a su salario se le resta el mínimo mensual del sector y se toma hasta el {{sv.embargo-porcentaje}} de lo que queda.",
    "Préstamo de banco, aseguradora, financiera o cooperativa: hasta el {{sv.embargo-porcentaje}} de todo el salario ordinario.",
  ],
  ejemplo: ["Con $800 de salario en comercio: por una deuda común le pueden embargar $78.24 al mes; por un préstamo bancario, $160."],
  faq: [
    {
      pregunta: "¿Me pueden embargar el salario mínimo?",
      respuesta: "Por deudas comunes, no. Sí se puede por cuota alimenticia, y también por préstamos de bancos, aseguradoras, financieras o cooperativas, hasta el {{sv.embargo-porcentaje}} del salario.",
    },
    {
      pregunta: "¿El banco puede descontarme directo de la planilla?",
      respuesta: "Solo si usted lo autorizó por escrito con una orden de descuento. Esa cuota no puede pasar del {{sv.embargo-porcentaje}} de su salario ordinario.",
    },
    {
      pregunta: "¿Pueden embargar mis herramientas de trabajo?",
      respuesta: "No. Los instrumentos de trabajo son inembargables.",
    },
  ],
  glosario: [
    { termino: "Embargo", definicion: "La retención de parte de su salario por orden de un juez para pagar una deuda." },
    { termino: "Salario ordinario", definicion: "Lo que gana por su jornada normal, sin horas extra." },
  ],
});
