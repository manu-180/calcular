import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.indemnizacion-por-despido",
  h1: "Calculadora de indemnización por despido injustificado en Panamá",
  title: "Indemnización por despido en Panamá: calcula el monto",
  description:
    "Calcula tu indemnización por despido injustificado: {{pa.indemnizacion-semanas[primeros-10-anios]}} semanas de salario por año en los diez primeros años, según el artículo 225.",
  intro: [
    "Si te despiden sin causa justificada de un contrato por tiempo indefinido, el empleador te debe una indemnización.",
    "Se paga en semanas de salario por cada año trabajado y se suma a la prima de antigüedad.",
  ],
  comoSeCalcula: [
    "Por cada uno de los diez primeros años: {{pa.indemnizacion-semanas[primeros-10-anios]}} semanas de salario.",
    "Por cada año después de los diez: {{pa.indemnizacion-semanas[desde-anio-11]}} semana de salario.",
    "Los años incompletos se pagan en proporción.",
    "El salario es el promedio de los últimos seis meses o el del último mes, el que sea más alto (artículo 149). El semanal es el mensual por 12 y dividido entre 52.",
  ],
  ejemplo: [
    "Con un salario de B/. 1,300 al mes (B/. 300 por semana) y 5 años justos, son 17 semanas: B/. 5,100.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo me toca indemnización?",
      respuesta: "Cuando te despiden sin una causa justificada o sin la autorización previa que exige la ley, en un contrato por tiempo indefinido.",
    },
    {
      pregunta: "¿Y si empecé a trabajar antes de 1995?",
      respuesta: "Esta escala vale para relaciones que empezaron desde el 14 de agosto de 1995. Las anteriores usan otras escalas del mismo artículo.",
    },
    {
      pregunta: "¿Si renuncio me pagan indemnización?",
      respuesta: "No. Al renunciar recibes la prima de antigüedad, las vacaciones y el décimo proporcional, pero no la indemnización.",
    },
    {
      pregunta: "¿Me pueden pagar la indemnización en especie?",
      respuesta: "No. El artículo 225 prohíbe pagar en especie la prima de antigüedad y la indemnización.",
    },
  ],
  glosario: [
    { termino: "Despido injustificado", definicion: "El que no se basa en una de las causas que permite el Código de Trabajo." },
    { termino: "Salario semanal", definicion: "Tu salario mensual por 12 y dividido entre 52 semanas." },
  ],
});
