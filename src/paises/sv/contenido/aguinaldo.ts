import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.aguinaldo",
  h1: "Calculadora de aguinaldo en El Salvador",
  title: "Aguinaldo 2026 en El Salvador: calcule cuánto le toca",
  description:
    "Calcule su aguinaldo según el Código de Trabajo: {{sv.aguinaldo-dias[uno-a-tres]}}, {{sv.aguinaldo-dias[tres-a-diez]}} o {{sv.aguinaldo-dias[diez-o-mas]}} de salario según su antigüedad.",
  intro: [
    "El aguinaldo es una prima que todo patrono le paga una vez al año a sus trabajadores. Cuánto recibe depende de su salario y del tiempo que lleva con el mismo patrono.",
    "Ponga su salario mensual y su antigüedad. Si tiene menos de un año, indique los días que lleva trabajando y le calculamos la parte proporcional.",
  ],
  comoSeCalcula: [
    "Se saca su salario diario: el salario mensual dividido por 30.",
    "De 1 a menos de 3 años le corresponden {{sv.aguinaldo-dias[uno-a-tres]}} de salario. De 3 a menos de 10 años, {{sv.aguinaldo-dias[tres-a-diez]}}. Con 10 años o más, {{sv.aguinaldo-dias[diez-o-mas]}}.",
    "Con menos de un año cobra la parte proporcional: los días de aguinaldo multiplicados por los días trabajados y divididos por 365.",
  ],
  ejemplo: [
    "Con un salario de $600 y dos años con su patrono, su salario diario es $20. Le corresponden 15 días: $300 de aguinaldo.",
    "Si entró hace 180 días con un salario de $450, cobra 15 × 180 / 365 = 7.40 días de salario: $110.96.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo me tienen que pagar el aguinaldo en 2026?",
      respuesta: "La reforma de septiembre de 2026 permite pagarlo desde el 1 de octubre. El último día para pagarlo es el 20 de diciembre. Cada patrono elige la fecha dentro de ese plazo.",
    },
    {
      pregunta: "¿Me pueden quitar el aguinaldo por faltas o sanciones?",
      respuesta: "No. El Código de Trabajo dice que nadie pierde el aguinaldo por razones disciplinarias, faltas injustificadas ni ninguna otra causa.",
    },
    {
      pregunta: "¿Qué salario se usa para calcularlo?",
      respuesta: "El salario básico que gana a la fecha de pago, sin horas extra ni bonificaciones. Si le pagan por obra o comisión, se usa el promedio de los últimos seis meses.",
    },
    {
      pregunta: "¿Me descuentan renta del aguinaldo?",
      respuesta: "El aguinaldo no paga renta hasta dos salarios mínimos mensuales de comercio y servicios. En 2025 una norma transitoria subió ese límite a $1,500. Si su aguinaldo pasa el límite, solo paga renta por la diferencia.",
    },
    {
      pregunta: "¿Y si me despiden antes de recibirlo?",
      respuesta: "Si lo despiden sin causa legal, tiene derecho a la parte proporcional del aguinaldo por el tiempo que trabajó.",
    },
  ],
  glosario: [
    { termino: "Aguinaldo", definicion: "Prima anual obligatoria que paga el patrono por cada año de trabajo." },
    { termino: "Salario básico", definicion: "Lo que gana por su jornada ordinaria, sin horas extra ni bonificaciones." },
    { termino: "Patrono", definicion: "La persona o empresa para la que trabaja." },
  ],
});
