import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.horas-extra",
  h1: "Calculadora de horas extra en Panamá",
  title: "Horas extra en Panamá: calcula tus recargos",
  description:
    "Calcula tus horas extra con los recargos del artículo 33: {{pa.recargo-horas-extra[diurna]}} de día, {{pa.recargo-horas-extra[nocturna]}} de noche y {{pa.recargo-horas-extra[prolongacion-nocturna]}} al alargar la nocturna.",
  intro: [
    "Las horas que trabajas por encima de tu jornada se pagan con recargo. El recargo depende de cuándo las trabajas.",
    "Escribe tu salario, tu jornada y las horas extra de la semana. Te mostramos cuánto te deben pagar.",
  ],
  comoSeCalcula: [
    "El valor de tu hora es tu salario mensual dividido entre las horas de tu jornada en un mes: {{pa.jornada-semanal[diurna]}} por semana en jornada diurna, {{pa.jornada-semanal[nocturna]}} en nocturna y {{pa.jornada-semanal[mixta]}} en mixta.",
    "Horas extra de día: recargo del {{pa.recargo-horas-extra[diurna]}}. De noche, o al alargar una jornada mixta que empezó de día: {{pa.recargo-horas-extra[nocturna]}}.",
    "Al alargar una jornada nocturna, o una mixta que empezó de noche: {{pa.recargo-horas-extra[prolongacion-nocturna]}}.",
    "No se pueden trabajar más de {{pa.horas-extra-maximo-dia}} extra por día ni {{pa.horas-extra-maximo-semana}} por semana. Las horas de más llevan otro {{pa.recargo-exceso-horas-extra}} de recargo.",
  ],
  ejemplo: [
    "Con B/. 1,040 al mes en jornada diurna, tu hora vale B/. 5. Cuatro horas extra de día te dan B/. 25.",
  ],
  faq: [
    {
      pregunta: "¿Estoy obligado a trabajar horas extra?",
      respuesta: "No, salvo en una emergencia que ponga en peligro vidas o la empresa, o si lo pactaste en una convención colectiva y en tu contrato.",
    },
    {
      pregunta: "¿Cuántas horas extra puedo trabajar?",
      respuesta: "Hasta {{pa.horas-extra-maximo-dia}} por día y {{pa.horas-extra-maximo-semana}} por semana. Si te hacen trabajar más, esas horas llevan un recargo adicional y el empleador puede ser multado.",
    },
    {
      pregunta: "¿Cuándo me deben pagar las horas extra?",
      respuesta: "Con el salario del período. El pago incluye las horas extra trabajadas hasta cinco días hábiles antes del día de pago.",
    },
    {
      pregunta: "¿Qué es la jornada mixta?",
      respuesta: "La que abarca horas de día y de noche, con no más de tres horas en el período nocturno.",
    },
  ],
  glosario: [
    { termino: "Jornada extraordinaria", definicion: "El tiempo que trabajas por encima de tu jornada ordinaria." },
    { termino: "Recargo", definicion: "Lo que se suma al valor normal de la hora." },
  ],
});
