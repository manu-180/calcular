import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.horas-extra",
  h1: "Cálculo de horas extras en El Salvador",
  title: "Cálculo de horas extras en El Salvador: cuánto le pagan",
  description:
    "Calcule el pago de sus horas extras: recargo del {{sv.recargo-hora-extra}} sobre la hora (pago doble) y {{sv.recargo-nocturno}} más si son de noche. Según el Código de Trabajo.",
  intro: [
    "En El Salvador las horas extras se pagan con un recargo del {{sv.recargo-hora-extra}}, es decir, al doble de la hora normal. Si son de noche, se suma un {{sv.recargo-nocturno}} de nocturnidad.",
    "Ponga su salario mensual, su tipo de jornada y cuántas horas extras hizo de día y de noche.",
  ],
  comoSeCalcula: [
    "Se saca el valor de su hora: el salario mensual dividido por 30 y por las horas de su jornada ({{sv.jornada-diurna}} de día, {{sv.jornada-nocturna}} de noche).",
    "La hora extra de día se paga con un recargo del {{sv.recargo-hora-extra}}: es decir, el doble.",
    "La hora extra de noche (de 19:00 a 6:00) suma el {{sv.recargo-nocturno}} de nocturnidad sobre esa hora extra.",
  ],
  ejemplo: [
    "Con un salario de $600 y jornada de día, su hora vale $2.50. Cada hora extra de día vale $5 y cada una de noche, $6.25.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se pagan las horas extras en El Salvador?",
      respuesta: "Con un recargo del {{sv.recargo-hora-extra}} sobre el valor de la hora ordinaria, o sea al doble. Las nocturnas llevan además el {{sv.recargo-nocturno}} de nocturnidad.",
    },
    {
      pregunta: "¿Cuántas horas tiene la jornada en El Salvador?",
      respuesta: "La diurna no puede pasar de {{sv.jornada-diurna}} diarias ni de {{sv.semana-diurna}} a la semana. La nocturna, de {{sv.jornada-nocturna}} diarias y {{sv.semana-nocturna}} a la semana.",
    },
    {
      pregunta: "¿Qué horas cuentan como nocturnas?",
      respuesta: "Las que van de las 19:00 a las 6:00 del día siguiente.",
    },
    {
      pregunta: "¿Me pueden obligar a hacer horas extras siempre?",
      respuesta: "No. Las horas extras solo se pueden pactar de forma ocasional, cuando hay circunstancias imprevistas o necesarias.",
    },
    {
      pregunta: "¿Y si trabajo en un día de asueto?",
      respuesta: "El día de asueto trabajado se paga con un recargo del {{sv.recargo-asueto}}. Si además hace horas extras ese día, el recargo se calcula sobre ese salario doble.",
    },
  ],
  glosario: [
    { termino: "Jornada ordinaria", definicion: "Las horas normales de trabajo de su contrato." },
    { termino: "Nocturnidad", definicion: "El recargo que se paga por trabajar entre las 19:00 y las 6:00." },
  ],
});
