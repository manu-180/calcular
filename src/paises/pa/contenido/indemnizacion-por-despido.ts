import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.indemnizacion-por-despido",
  h1: "Calculadora de indemnización por despido injustificado en Panamá",
  title: "Indemnización por despido injustificado en Panamá: cálculo",
  description:
    "Calcula tu indemnización por despido injustificado en Panamá: {{pa.indemnizacion-semanas[primeros-10-anios]}} semanas de salario por año los diez primeros años y {{pa.indemnizacion-semanas[desde-anio-11]}} desde el año 11 (art. 225).",
  intro: [
    "En Panamá, la indemnización por despido injustificado es de {{pa.indemnizacion-semanas[primeros-10-anios]}} semanas de salario por año trabajado en los diez primeros años. Desde el año 11 se suma {{pa.indemnizacion-semanas[desde-anio-11]}} semana por año.",
    "Te la deben si te despiden sin causa justificada de un contrato por tiempo indefinido. Se suma a la prima de antigüedad.",
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
      pregunta: "¿Cómo se calcula la indemnización por despido en Panamá?",
      respuesta: "Multiplicas tu salario semanal por {{pa.indemnizacion-semanas[primeros-10-anios]}} por cada año de los diez primeros, y por {{pa.indemnizacion-semanas[desde-anio-11]}} por cada año siguiente. Los años incompletos cuentan en proporción.",
    },
    {
      pregunta: "¿Cuándo me toca indemnización?",
      respuesta: "Cuando te despiden sin una causa justificada o sin la autorización previa que exige la ley, en un contrato por tiempo indefinido.",
    },
    {
      pregunta: "¿La indemnización incluye la prima de antigüedad?",
      respuesta: "No. Son dos pagos distintos. Si te despiden sin causa, cobras la prima de antigüedad y además la indemnización.",
    },
    {
      pregunta: "¿Si renuncio me pagan indemnización?",
      respuesta: "No. Al renunciar recibes la prima de antigüedad, las vacaciones y el décimo proporcional, pero no la indemnización.",
    },
    {
      pregunta: "¿Y si empecé a trabajar antes de 1995?",
      respuesta: "Esta escala vale para relaciones que empezaron desde el 14 de agosto de 1995. Las anteriores usan otras escalas del mismo artículo.",
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
