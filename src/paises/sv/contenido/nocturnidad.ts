import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.nocturnidad",
  h1: "Calculadora de recargo nocturno",
  title: "Recargo nocturno en El Salvador: calcule su nocturnidad",
  description: "Las horas entre las 19:00 y las 6:00 se pagan con un recargo mínimo del {{sv.recargo-nocturno}}. Calcule cuánto le deben por sus horas de noche.",
  intro: [
    "Si trabaja de noche, entre las 19:00 y las 6:00, cada hora se paga como mínimo un {{sv.recargo-nocturno}} más cara que la misma hora de día.",
    "Ponga lo que ganaría haciendo el mismo trabajo de día y las horas de noche que trabajó.",
  ],
  comoSeCalcula: [
    "Hora de día: el salario mensual dividido por 30 y por la jornada diurna de {{sv.jornada-diurna}}.",
    "Hora de noche: la hora de día más el {{sv.recargo-nocturno}}.",
    "El recargo es la diferencia entre las dos, multiplicada por las horas de noche.",
  ],
  ejemplo: ["Con $600 al mes, la hora de día vale $2.50 y la de noche $3.13. Por 20 horas de noche le corresponden $12.50 de recargo."],
  faq: [
    {
      pregunta: "¿Desde qué hora es trabajo nocturno?",
      respuesta: "Desde las 19:00 hasta las 6:00 del día siguiente.",
    },
    {
      pregunta: "¿Y si hago horas extra de noche?",
      respuesta: "La hora extra nocturna lleva el recargo de hora extra y además el nocturno. Use la calculadora de horas extra para ese caso.",
    },
    {
      pregunta: "¿Una jornada nocturna es más corta?",
      respuesta: "Sí. La jornada nocturna ordinaria es de {{sv.jornada-nocturna}} por día como máximo; la diurna, de {{sv.jornada-diurna}}.",
    },
  ],
  glosario: [
    { termino: "Nocturnidad", definicion: "El recargo por trabajar en horario de noche." },
  ],
});
