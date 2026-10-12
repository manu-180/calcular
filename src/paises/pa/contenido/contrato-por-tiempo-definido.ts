import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.contrato-por-tiempo-definido",
  h1: "Calculadora de despido en contrato por tiempo definido en Panamá",
  title: "Despido en contrato definido en Panamá: cuánto te deben",
  description:
    "Si te despiden sin causa antes de que termine tu contrato definido en Panamá, te deben los salarios hasta el final. Calcula ese monto, vacaciones y décimo.",
  intro: [
    "Cuando el empleador termina un contrato por tiempo definido o por obra antes de tiempo y sin causa justificada, te tiene que pagar los salarios que faltaban hasta el final del contrato.",
    "Escribe tu salario, tus fechas y la fecha en que terminaba el contrato. Te mostramos los salarios restantes, las vacaciones y el décimo proporcional.",
  ],
  comoSeCalcula: [
    "Salarios restantes: tu salario mensual por los meses que faltaban, con los días en treintavos.",
    "Vacaciones: salario por los meses pendientes, dividido entre {{pa.vacaciones-meses}}.",
    "Décimo proporcional: lo ganado desde el último corte, más las vacaciones, dividido entre {{pa.decimo-divisor}}.",
  ],
  ejemplo: [
    "Con B/. 900 al mes y un contrato hasta el 31 de diciembre, si te despiden el 12 de octubre faltan 2 meses y 19 días: B/. 2,370. Con 9 meses de vacaciones pendientes y el décimo, el total es B/. 3,310.22.",
  ],
  faq: [
    {
      pregunta: "¿Qué pasa si me despiden antes de que termine mi contrato?",
      respuesta: "Si no hay causa justificada, te deben los salarios de todo el tiempo que faltaba del contrato, además de las vacaciones y el décimo.",
    },
    {
      pregunta: "¿Hay prima de antigüedad en un contrato definido?",
      respuesta: "No. La prima de antigüedad es solo para los contratos por tiempo indefinido.",
    },
    {
      pregunta: "¿Cuánto puede durar un contrato por tiempo definido?",
      respuesta: "Un año como máximo, o tres si el trabajo pide una preparación técnica especial. Tiene que estar por escrito.",
    },
    {
      pregunta: "¿Mi contrato puede volverse indefinido?",
      respuesta: "Sí, si sigues trabajando después del vencimiento o si te firman contratos seguidos para encubrir un trabajo permanente.",
    },
  ],
  glosario: [
    { termino: "Contrato por tiempo definido", definicion: "El que tiene una fecha de fin pactada." },
    { termino: "Contrato por obra", definicion: "El que dura hasta que se termina una obra determinada." },
  ],
});
