import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.salario-atrasado",
  h1: "Calculadora de salario atrasado en Nicaragua",
  title: "Salario atrasado en Nicaragua: calculá el recargo",
  description: "Si te pagan tarde el salario en Nicaragua, el empleador te debe un {{ni.atraso-salario-recargo}} más por semana de retraso, hasta {{ni.atraso-salario-semanas}} semanas. Calculá cuánto.",
  intro: [
    "El salario se paga en el plazo de tu contrato: como máximo cada semana si sos obrero y cada quince días si sos empleado.",
    "Si te lo pagan tarde, el Código del Trabajo obliga al empleador a pagarte un {{ni.atraso-salario-recargo}} más de lo que te debe por cada una de las {{ni.atraso-salario-semanas}} semanas que siguen a la primera.",
  ],
  comoSeCalcula: [
    "Se cuentan los días desde que te tenían que pagar hasta el día en que te pagaron.",
    "La primera semana de retraso no genera recargo.",
    "Cada una de las {{ni.atraso-salario-semanas}} semanas completas siguientes suma un {{ni.atraso-salario-recargo}} del salario adeudado.",
  ],
  ejemplo: ["Te debían C$10,000 el 30 de septiembre y te pagaron el 14 de octubre. Son dos semanas de retraso: te corresponden C$1,000 de recargo, C$11,000 en total."],
  faq: [
    {
      pregunta: "¿Cada cuánto me tienen que pagar el salario en Nicaragua?",
      respuesta: "En el plazo de tu contrato. Si sos obrero, como máximo cada semana; si sos empleado, como máximo cada quince días (artículo 86 del Código del Trabajo).",
    },
    {
      pregunta: "¿Qué pasa si me pagan el salario tarde?",
      respuesta: "El empleador te tiene que pagar un {{ni.atraso-salario-recargo}} más de lo que te debe por cada una de las {{ni.atraso-salario-semanas}} semanas de retraso que siguen a la primera, además de las sanciones del Código del Trabajo.",
    },
    {
      pregunta: "¿Hay casos en que no corre el recargo?",
      respuesta: "Sí. Si el atraso se debe a fuerza mayor o caso fortuito, el empleador no paga el recargo.",
    },
    {
      pregunta: "¿Dónde reclamo si no me pagan?",
      respuesta: "En la Inspectoría Departamental del Trabajo del Ministerio del Trabajo. Llevá tus colillas de pago y tu contrato si lo tenés.",
    },
  ],
  glosario: [
    { termino: "Recargo por atraso", definicion: "Lo que el empleador te debe sumar al salario cuando te paga después del plazo." },
    { termino: "Fuerza mayor", definicion: "Un hecho que no se puede prever ni evitar, como un desastre natural." },
  ],
});
