import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.deposito-a-plazo",
  h1: "Calculadora de depósito a plazo fijo en Nicaragua",
  title: "Depósito a plazo fijo en Nicaragua: calculá tus intereses",
  description: "Calculá cuánto ganás con un depósito a plazo fijo en Nicaragua: intereses, el IR del {{ni.ir-rentas-capital}} que retiene el banco y el total al vencimiento.",
  intro: [
    "Un depósito a plazo fijo te paga intereses por dejar tu dinero en el banco un tiempo acordado. El banco te retiene el IR sobre esos intereses.",
    "Poné el monto, la tasa anual que te ofrecen y el plazo. Te mostramos lo que vas a recibir.",
  ],
  comoSeCalcula: [
    "Intereses: monto por tasa anual por días del plazo, dividido entre el año que usa el banco (360 o 365 días).",
    "IR: el {{ni.ir-rentas-capital}} de los intereses, como retención definitiva.",
    "Total al vencimiento: el monto depositado más los intereses netos.",
  ],
  ejemplo: ["Si depositás C$50,000 al 5 % anual por 360 días, ganás C$2,500 de intereses. El banco retiene C$375 de IR y al final recibís C$52,125."],
  faq: [
    {
      pregunta: "¿Cuánto IR se paga por los intereses de un depósito en Nicaragua?",
      respuesta: "El {{ni.ir-rentas-capital}} de los intereses. El banco lo retiene directamente.",
    },
    {
      pregunta: "¿Tengo que declarar los intereses?",
      respuesta: "No, si el banco ya te retuvo el IR: es una retención definitiva.",
    },
    {
      pregunta: "¿Qué tasa me conviene comparar?",
      respuesta: "La tasa anual y si el banco calcula con años de 360 o de 365 días. Con 360 días ganás un poco más con la misma tasa.",
    },
    {
      pregunta: "¿Puedo retirar el dinero antes?",
      respuesta: "Depende del contrato con el banco. Muchos cobran una penalidad o bajan la tasa si retirás antes del vencimiento.",
    },
  ],
  glosario: [
    { termino: "Depósito a plazo fijo", definicion: "Dinero que dejás en el banco por un plazo acordado a cambio de una tasa de interés." },
    { termino: "Retención definitiva", definicion: "Un impuesto que se cobra en el momento y no se vuelve a declarar." },
  ],
});
