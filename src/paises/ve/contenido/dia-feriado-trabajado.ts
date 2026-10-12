import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.dia-feriado-trabajado",
  h1: "Calculadora de día feriado o domingo trabajado en Venezuela",
  title: "Día feriado o domingo trabajado en Venezuela",
  description:
    "Si trabajas un domingo, tu día de descanso o un feriado, te pagan lo trabajado con {{ve.recargo-feriado}} de recargo. Calcula el monto y el descanso compensatorio.",
  intro: [
    "Trabajar un día feriado se paga aparte: el salario de ese día y además lo que trabajaste con un recargo de {{ve.recargo-feriado}}. Si cobras por mes, el salario del día ya está incluido y lo que se suma es el pago con recargo.",
    "Si trabajaste tu domingo o tu día de descanso semanal, también te toca un descanso compensatorio la semana siguiente.",
  ],
  comoSeCalcula: [
    "Hora normal: tu salario mensual entre {{ve.dias-mes-salario}} y entre {{ve.jornada-diurna-horas}}.",
    "Hora con recargo: la hora normal más {{ve.recargo-feriado}}.",
    "Pago adicional: la hora con recargo por las horas trabajadas.",
    "Descanso compensatorio: un día completo si trabajaste {{ve.descanso-compensatorio-umbral-horas}} o más en tu día de descanso; medio día si fueron menos.",
  ],
  ejemplo: ["Con $240 al mes, un domingo de 8 horas te suma $12 y un día de descanso compensatorio."],
  faq: [
    {
      pregunta: "¿Cuánto me pagan por trabajar un feriado?",
      respuesta: "El salario del día más lo trabajado con un recargo de {{ve.recargo-feriado}}. Si tu salario es mensual, el día ya está pago y se suma el trabajo con recargo.",
    },
    {
      pregunta: "¿Qué días son feriados?",
      respuesta: "Los domingos, el 1 de enero, el lunes y martes de Carnaval, el Jueves y el Viernes Santo, el 1 de mayo, el 24, 25 y 31 de diciembre y las fiestas nacionales. También hasta tres días que declaren el Gobierno, los estados o los municipios.",
    },
    {
      pregunta: "¿Cuándo me toca descanso compensatorio?",
      respuesta: "Cuando trabajas tu domingo o tu día de descanso semanal. Si trabajas {{ve.descanso-compensatorio-umbral-horas}} o más, te toca un día; si son menos, medio día. Se toma la semana siguiente.",
    },
    {
      pregunta: "¿Y si trabajo un 1 de mayo o un 25 de diciembre?",
      respuesta: "Se paga con el recargo, pero no da descanso compensatorio, salvo que ese feriado caiga en tu domingo o en tu día de descanso.",
    },
  ],
  glosario: [
    { termino: "Descanso compensatorio", definicion: "Día libre pago que te toca por haber trabajado tu día de descanso (art. 188 de la LOTTT)." },
    { termino: "Recargo", definicion: "Porcentaje que se suma al valor normal de la hora." },
  ],
});
