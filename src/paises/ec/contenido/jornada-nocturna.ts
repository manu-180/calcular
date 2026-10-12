import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.jornada-nocturna",
  h1: "Calculadora de jornada nocturna en Ecuador",
  title: "Jornada nocturna Ecuador: calcula el recargo del {{ec.recargo-nocturno}}",
  description: "Si trabajas entre las 19:00 y las 06:00, tu sueldo sube un {{ec.recargo-nocturno}}. Calcula el recargo nocturno del mes y el valor de tu hora de noche.",
  intro: [
    "En Ecuador la jornada nocturna va de las 19:00 a las 06:00 del día siguiente. Puede durar lo mismo que la de día, pero se paga con un recargo del {{ec.recargo-nocturno}}.",
    "Pon tu sueldo de día y si trabajas toda la jornada de noche o solo algunas horas. Te mostramos el recargo y el valor de tu hora nocturna.",
  ],
  comoSeCalcula: [
    "Si toda tu jornada es nocturna, el sueldo sube un {{ec.recargo-nocturno}}.",
    "Si solo algunas horas caen de noche, se calcula el valor de la hora (sueldo dividido para 30 y para {{ec.jornada-diaria}}) y a cada hora nocturna se le suma el {{ec.recargo-nocturno}}.",
    "Las horas extra que hagas de noche se pagan con su propio recargo. Para eso está la calculadora de horas extras.",
  ],
  ejemplo: [
    "Con el salario básico y toda la jornada de noche, el recargo es de $120,50 y el sueldo del mes queda en $602,50.",
  ],
  faq: [
    {
      pregunta: "¿Qué horario es jornada nocturna en Ecuador?",
      respuesta: "El que se trabaja entre las 19:00 y las 06:00 del día siguiente.",
    },
    {
      pregunta: "¿Cuánto es el recargo nocturno?",
      respuesta: "El {{ec.recargo-nocturno}} sobre la remuneración de una jornada de día igual.",
    },
    {
      pregunta: "¿La jornada nocturna puede ser más larga?",
      respuesta: "No. Puede tener la misma duración que la diurna, hasta {{ec.jornada-diaria}} al día. Lo que pase de eso son horas suplementarias.",
    },
    {
      pregunta: "¿El recargo nocturno entra en el décimo tercero y el aporte al IESS?",
      respuesta: "Sí. Es parte de tu remuneración, así que se suma para el décimo tercero, el fondo de reserva y los aportes.",
    },
  ],
  glosario: [
    { termino: "Jornada nocturna", definicion: "Trabajo entre las 19:00 y las 06:00 del día siguiente." },
    { termino: "Recargo", definicion: "El porcentaje que se suma al valor normal del trabajo." },
  ],
});
