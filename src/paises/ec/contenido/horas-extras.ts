import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.horas-extras",
  h1: "Calculadora de horas extras en Ecuador",
  title: "Horas extras en Ecuador {{anio}}: calcula cuánto te pagan",
  description: "Calcula tus horas extras: suplementarias con {{ec.recargo-suplementarias}} de recargo y extraordinarias con {{ec.recargo-extraordinarias}}, sobre el valor de tu hora según el Código del Trabajo.",
  intro: [
    "En Ecuador las horas extras se pagan con recargo sobre tu hora normal: {{ec.recargo-suplementarias}} las suplementarias, {{ec.recargo-madrugada}} las de madrugada y {{ec.recargo-extraordinarias}} las de sábado o domingo (extraordinarias).",
    "Pon tu sueldo y las horas del mes. La calculadora separa cada tipo y te da el total.",
  ],
  comoSeCalcula: [
    "Tu hora normal es el sueldo dividido para 30 días y para la jornada de {{ec.jornada-diaria}}. En la práctica, el sueldo dividido para 240.",
    "Horas suplementarias (después de tu jornada, hasta las 24:00): la hora normal más un {{ec.recargo-suplementarias}}.",
    "Horas suplementarias entre las 24:00 y las 06:00: la hora normal más un {{ec.recargo-madrugada}}.",
    "Horas en sábado o domingo (extraordinarias): la hora normal más un {{ec.recargo-extraordinarias}}.",
  ],
  ejemplo: [
    "Ganas $720: tu hora vale $3. Diez horas suplementarias suman $45, dos de madrugada $12 y ocho de sábado $48. En total cobras $105 de horas extras.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga la hora extra en Ecuador?",
      respuesta: "La suplementaria, tu hora normal más un {{ec.recargo-suplementarias}}. La de madrugada (de 24:00 a 06:00), más un {{ec.recargo-madrugada}}, y la de sábado o domingo, más un {{ec.recargo-extraordinarias}}.",
    },
    {
      pregunta: "¿Cuál es la diferencia entre horas suplementarias y extraordinarias?",
      respuesta: "Las suplementarias son las que haces después de tu jornada, entre semana. Las extraordinarias son las que trabajas en sábado o domingo.",
    },
    {
      pregunta: "¿Cuántas horas suplementarias puedo hacer?",
      respuesta: "Hasta {{ec.suplementarias-max-dia}} por día y {{ec.suplementarias-max-semana}} por semana. Tienen que estar pactadas por escrito.",
    },
    {
      pregunta: "¿Cómo se calcula el valor de la hora?",
      respuesta: "Divide tu sueldo mensual para 240 (30 días por {{ec.jornada-diaria}}). Sobre ese valor se suma el recargo.",
    },
    {
      pregunta: "¿Las horas extras cuentan para el décimo tercero y el IESS?",
      respuesta: "Sí. Son parte de tu remuneración: suben tu décimo tercero, tu fondo de reserva y tus aportes al IESS.",
    },
  ],
  glosario: [
    { termino: "Horas suplementarias", definicion: "Horas trabajadas después de la jornada, de lunes a viernes." },
    { termino: "Horas extraordinarias", definicion: "Horas trabajadas en sábado o domingo." },
    { termino: "Recargo", definicion: "El porcentaje que se suma al valor de la hora normal." },
  ],
});
