import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.trabajo-nocturno",
  h1: "Calculadora de salario nocturno",
  title: "Salario nocturno Paraguay 2026: recargo del 30 %",
  description: "Calculá tu salario si trabajás de noche: el recargo es del {{py.recargo-nocturno}} sobre el salario diurno. También ves tu diario y tu hora nocturna.",
  intro: [
    "Si trabajás de noche (entre las 20 y las 6), tu salario lleva un recargo del {{py.recargo-nocturno}} sobre lo que cobrarías de día por el mismo trabajo.",
    "La jornada nocturna es más corta: {{py.horas-jornada-nocturna}} por día como máximo. Por eso la hora nocturna vale bastante más que la diurna.",
  ],
  comoSeCalcula: [
    "Al salario diurno se le suma el {{py.recargo-nocturno}}.",
    "El salario diario es el mensual nocturno dividido {{py.divisor-salario-diario}}.",
    "La hora nocturna es el diario dividido {{py.horas-jornada-nocturna}}.",
    "Nunca puede quedar debajo del mínimo nocturno, que hoy es {{py.minimos[mensual-nocturno]}}.",
  ],
  ejemplo: ["Con el salario mínimo diurno, el nocturno es {{py.minimos[mensual-nocturno]}} y la hora nocturna vale {{py.minimos[hora-nocturna]}}."],
  faq: [
    {
      pregunta: "¿Cuánto es el recargo por trabajo nocturno?",
      respuesta: "El {{py.recargo-nocturno}} sobre el salario del trabajo diurno (artículo 234 del Código del Trabajo).",
    },
    {
      pregunta: "¿Cuál es el salario mínimo nocturno?",
      respuesta: "{{py.minimos[mensual-nocturno]}} por mes. El jornal mínimo nocturno es {{py.minimos[jornal-nocturno]}}.",
    },
    {
      pregunta: "¿Y si trabajo una parte de día y otra de noche?",
      respuesta: "Es jornada mixta, de siete horas y media como máximo. Cada hora se paga según el horario en que la trabajaste.",
    },
    {
      pregunta: "¿Las horas extra de noche cuánto se pagan?",
      respuesta: "Con 100 % de recargo sobre la hora nocturna. Para calcularlas, usá la calculadora de horas extra.",
    },
  ],
  glosario: [
    { termino: "Trabajo nocturno", definicion: "El que se hace entre las 20 y las 6 (artículo 195 del Código del Trabajo)." },
    { termino: "Recargo", definicion: "Lo que se suma al salario por trabajar en condiciones especiales, como de noche." },
  ],
});
