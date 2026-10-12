import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.intereses-por-mora-laboral",
  h1: "Calculadora de intereses por salarios y prestaciones atrasadas en Panamá",
  title: "Intereses por salarios atrasados en Panamá: calcula la mora",
  description:
    "Si tu empleador se atrasa con salarios, vacaciones o prestaciones, la ley le cobra {{pa.interes-mora-laboral}} de interés anual. Calcula los intereses y el total que te deben.",
  intro: [
    "Cuando el empleador no paga a tiempo salarios, vacaciones, prima, indemnización u otras prestaciones, esa deuda genera un interés del {{pa.interes-mora-laboral}} anual desde el día en que se tenía que pagar.",
    "Si un juez condena al pago de salarios, se suma además un recargo del {{pa.recargo-condena-salarios}}. Escribe el monto y las fechas.",
  ],
  comoSeCalcula: [
    "Días de atraso: desde la fecha en que te debían pagar hasta la fecha de pago.",
    "Intereses: monto por {{pa.interes-mora-laboral}} anual, por los días de atraso divididos entre 365.",
    "Recargo: {{pa.recargo-condena-salarios}} del monto, solo si son salarios reconocidos en una sentencia.",
  ],
  ejemplo: ["Si te deben B/. 1,000 desde el 12 de enero de 2026 y te pagan el 12 de octubre, son 273 días: B/. 74.79 de intereses."],
  faq: [
    {
      pregunta: "¿Qué interés se cobra por salarios atrasados en Panamá?",
      respuesta: "El {{pa.interes-mora-laboral}} anual, desde el momento en que el pago era exigible. Vale también para vacaciones, prestaciones e indemnizaciones.",
    },
    {
      pregunta: "¿Qué es el recargo del {{pa.recargo-condena-salarios}}?",
      respuesta: "Un recargo que el juez suma en toda sentencia que condena a pagar salarios, además de los intereses.",
    },
    {
      pregunta: "¿Dónde reclamo si no me pagan?",
      respuesta: "En el MITRADEL o en los juzgados de trabajo. Lleva tus talonarios, tu contrato y cualquier prueba de lo que te deben.",
    },
  ],
  glosario: [
    { termino: "Mora", definicion: "El atraso en un pago que ya se tenía que hacer." },
    { termino: "Exigible", definicion: "Cuando ya se puede reclamar el pago porque venció su fecha." },
  ],
});
