import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.horas-extras",
  h1: "Calculadora de horas extras",
  title: "Horas extras en Nicaragua: calculá cuánto te pagan",
  description: "Calculá el pago de tus horas extras. Cada una se paga con un {{ni.recargo-horas-extra}} más que la hora normal, según el artículo 62 del Código del Trabajo.",
  intro: [
    "Toda hora que trabajás fuera de tu jornada ordinaria es hora extra. Se paga al doble de la hora normal.",
    "Poné tu salario mensual, tu jornada y las horas extras. Te mostramos el valor de cada hora y el total.",
  ],
  comoSeCalcula: [
    "La hora ordinaria sale de dividir tu salario mensual entre 30 días y después entre las horas de tu jornada.",
    "La jornada diurna es de {{ni.jornada-diaria[diurna]}}, la mixta de {{ni.jornada-diaria[mixta]}} y la nocturna de {{ni.jornada-diaria[nocturna]}}.",
    "A la hora ordinaria se le suma un {{ni.recargo-horas-extra}}: la hora extra vale el doble.",
    "El total es el valor de la hora extra por las horas que trabajaste.",
  ],
  ejemplo: ["Con un salario de C$12,000 en jornada diurna: 12,000 / 30 / 8 = C$50 la hora. La hora extra vale C$100. Por 10 horas extras te pagan C$1,000."],
  faq: [
    {
      pregunta: "¿Cuántas horas extras puedo trabajar?",
      respuesta: "Hasta {{ni.horas-extra-maximo-diario}} por día y {{ni.horas-extra-maximo-semanal}} por semana, salvo las excepciones del Código.",
    },
    {
      pregunta: "¿Trabajar en domingo o feriado se paga como hora extra?",
      respuesta: "Sí. El trabajo en tu día de descanso, en feriados y en asuetos decretados se paga con el mismo recargo.",
    },
    {
      pregunta: "¿Me pueden compensar las horas extras con tiempo libre?",
      respuesta: "No si el empleador te redujo la jornada por su cuenta. La ley prohíbe compensar así las horas extras.",
    },
    {
      pregunta: "¿Me pueden obligar a hacer horas extras?",
      respuesta: "La ley dice que el trabajo extraordinario se acuerda entre vos y el empleador, en un contrato especial.",
    },
  ],
  glosario: [
    { termino: "Jornada ordinaria", definicion: "Las horas que trabajás normalmente por día, según tu contrato y los límites del artículo 51." },
    { termino: "Jornada mixta", definicion: "La que tiene horas de día y de noche. Si pasa de tres horas y media de noche, cuenta como nocturna." },
  ],
});
