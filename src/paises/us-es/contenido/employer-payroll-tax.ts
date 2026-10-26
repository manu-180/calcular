import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.employer-payroll-tax",
  h1: "Calculadora de impuestos de nómina para empleadores",
  title: "Impuestos de nómina del empleador 2026: costo de un empleado",
  description: "Calcula cuánto cuesta de verdad un empleado en 2026: salario más el Seguro Social, Medicare, FUTA y SUTA que paga el empleador.",
  intro: [
    "Contratar a alguien cuesta más que el salario. Como empleador pagas tu parte del Seguro Social y de Medicare, más los impuestos federal y estatal de desempleo.",
    "Escribe el salario anual para ver cada impuesto y el costo total por empleado.",
  ],
  comoSeCalcula: [
    "Seguro Social: {{us.social-security-rate}} de los salarios hasta {{us.social-security-wage-base}}.",
    "Medicare: {{us.medicare-rate}} de todo el salario. A diferencia de los empleados, los empleadores nunca pagan el impuesto adicional de Medicare.",
    "FUTA: {{us.futa-rate}} de los primeros {{us.futa-wage-base}} del salario de cada empleado, menos un crédito de hasta {{us.futa-credit}} por pagar el impuesto estatal de desempleo. La mayoría de los empleadores paga un neto de 0.6%.",
    "SUTA: la tasa que te asigna tu estado, sobre los salarios hasta la base salarial de tu estado.",
  ],
  ejemplo: [
    "Un empleado con $50,000 al año cuesta $53,867: $3,100 de Seguro Social, $725 de Medicare y $42 de FUTA, antes del impuesto estatal de desempleo.",
  ],
  faq: [
    { pregunta: "¿Cuánto cuesta un empleado además del salario?", respuesta: "Los impuestos federales de nómina suman alrededor de 7.7% en la mayoría de los salarios. El impuesto estatal de desempleo, los beneficios y la compensación laboral suelen subir el total." },
    { pregunta: "¿Cuál es mi tasa de SUTA?", respuesta: "Cada estado la fija todos los años según tu industria y cuántos exempleados pidieron beneficios de desempleo. Los empleadores nuevos reciben una tasa inicial estándar del estado." },
    { pregunta: "¿Pago estos impuestos por contratistas?", respuesta: "No. Los contratistas independientes que reciben un 1099 pagan su propio impuesto sobre el trabajo por cuenta propia. Clasifica bien a tus trabajadores: el IRS y el Departamento de Trabajo miran cómo se controla el trabajo, no el título del contrato." },
  ],
  glosario: [
    { termino: "FUTA", definicion: "El impuesto de la Ley Federal de Impuestos de Desempleo, que pagan solo los empleadores." },
    { termino: "SUTA", definicion: "Impuesto estatal de desempleo. La tasa y la base salarial cambian según el estado y el empleador." },
  ],
});
