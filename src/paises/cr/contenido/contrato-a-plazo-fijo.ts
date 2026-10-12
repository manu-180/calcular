import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.contrato-a-plazo-fijo",
  h1: "Indemnización por terminar un contrato a plazo fijo",
  title: "Contrato a plazo fijo terminado antes: indemnización en CR",
  description:
    "Si el patrono termina antes su contrato a plazo fijo o por obra, calcule la indemnización mínima del artículo 31: un día de salario por cada siete trabajados.",
  intro: [
    "Si el patrono termina un contrato a plazo fijo o por obra antes de tiempo y sin justa causa, debe pagarle una indemnización ese mismo día.",
    "Escriba su salario y las fechas para ver el monto mínimo que le corresponde.",
  ],
  comoSeCalcula: [
    "Un día de salario por cada {{cr.contrato-plazo-fijo[dias-trabajados-por-dia]}} trabajados. Una semana incompleta cuenta como completa.",
    "Nunca menos de {{cr.contrato-plazo-fijo[minimo]}} de salario.",
    "Si el contrato era de seis meses o más, nunca menos de {{cr.contrato-plazo-fijo[minimo-seis-meses]}}.",
    "Salario diario: el mensual entre {{cr.dias-mes-planilla}}.",
  ],
  ejemplo: ["En un contrato de un año que el patrono termina a los tres meses, con salario de ₡600.000, la indemnización mínima es de 22 días: ₡440.000."],
  faq: [
    {
      pregunta: "¿Qué pasa si el contrato termina en la fecha pactada?",
      respuesta: "No hay indemnización: el contrato se cumplió. Sí le pagan las vacaciones y el aguinaldo proporcionales.",
    },
    {
      pregunta: "¿Puedo reclamar más?",
      respuesta: "Sí. Además de este mínimo, el juez puede ordenar el pago de daños y perjuicios según el tiempo que faltaba y lo difícil que sea conseguir otro empleo.",
    },
    {
      pregunta: "¿Y si soy yo quien termina el contrato antes?",
      respuesta: "El patrono le puede reclamar los daños y perjuicios que demuestre ante los tribunales de trabajo.",
    },
  ],
  glosario: [
    { termino: "Contrato a plazo fijo", definicion: "El que tiene una fecha de fin pactada desde el inicio." },
    { termino: "Contrato por obra determinada", definicion: "El que termina cuando se completa un trabajo concreto." },
  ],
});
