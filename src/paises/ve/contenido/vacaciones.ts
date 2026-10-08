import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.vacaciones",
  h1: "Calculadora de vacaciones y bono vacacional en Venezuela",
  title: "Bono vacacional y vacaciones en Venezuela: calcula tus días",
  description:
    "Calcula tu bono vacacional y tus días de vacaciones según la LOTTT: {{ve.vacaciones-dias-base}} hábiles el primer año y uno más por cada año. En bolívares o en dólares.",
  intro: [
    "En Venezuela el primer año te tocan {{ve.vacaciones-dias-base}} hábiles de vacaciones y {{ve.bono-vacacional-dias-base}} de bono vacacional, más un día de cada uno por cada año de servicio. El bono llega hasta {{ve.bono-vacacional-dias-tope}}.",
    "Los dos se cobran al empezar las vacaciones. Escribe tu salario y tus años de servicio, y te mostramos el resultado en bolívares y en dólares.",
  ],
  comoSeCalcula: [
    "Vacaciones: {{ve.vacaciones-dias-base}} hábiles el primer año, más uno por cada año siguiente, con un máximo de {{ve.vacaciones-dias-adicionales-tope}} adicionales.",
    "Bono vacacional: {{ve.bono-vacacional-dias-base}} de salario normal el primer año, más uno por cada año siguiente, hasta {{ve.bono-vacacional-dias-tope}}.",
    "Cada día se paga a tu salario mensual dividido entre {{ve.dias-mes-salario}}.",
  ],
  ejemplo: ["En tu quinto año, con Bs 6.000 al mes, te tocan 19 días de vacaciones y 19 de bono: Bs 7.600 en total."],
  faq: [
    {
      pregunta: "¿Cómo se calcula el bono vacacional?",
      respuesta: "Divide tu salario mensual entre {{ve.dias-mes-salario}} y multiplica por tus días de bono: {{ve.bono-vacacional-dias-base}} el primer año y uno más por cada año, hasta {{ve.bono-vacacional-dias-tope}}.",
    },
    {
      pregunta: "¿Los días de vacaciones son hábiles o continuos?",
      respuesta: "Hábiles. Los sábados, domingos y feriados que caen en tus vacaciones no se descuentan de tus días.",
    },
    {
      pregunta: "¿Y si me voy antes de cumplir el año?",
      respuesta: "Te pagan las vacaciones y el bono en proporción a los meses completos trabajados. Calcúlalo con la calculadora de liquidación.",
    },
    {
      pregunta: "¿El bono vacacional es salario?",
      respuesta: "Sí. La ley dice que tiene carácter salarial, por eso entra en el salario integral de tus prestaciones.",
    },
    {
      pregunta: "¿Mi empresa puede darme más días?",
      respuesta: "Sí. La ley fija mínimos. Si tu contrato colectivo da más días, vale lo del contrato.",
    },
  ],
  glosario: [
    { termino: "Bono vacacional", definicion: "Pago especial que recibes al salir de vacaciones, además del salario de esos días." },
    { termino: "Días hábiles", definicion: "Los días que trabajas normalmente. No cuentan descansos ni feriados." },
  ],
});
