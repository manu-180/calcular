import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.deposito-a-plazo",
  h1: "Calculadora de depósito a plazo fijo en Honduras",
  title: "Depósito a plazo fijo: calcule sus intereses en lempiras",
  description: "Calcule cuánto gana con un depósito a plazo fijo en un banco o cooperativa de Honduras: intereses, retención y total al vencimiento.",
  intro: [
    "Un depósito a plazo fijo le paga intereses por dejar su dinero quieto un tiempo acordado.",
    "Escriba el monto, la tasa que le ofrecen y el plazo en días. Le mostramos los intereses y lo que recibe al final.",
  ],
  comoSeCalcula: [
    "Intereses = monto × tasa anual × días / 360 (o 365, según el banco).",
    "Si le retienen un impuesto, se descuenta de los intereses.",
    "Total al vencimiento = monto + intereses netos.",
  ],
  ejemplo: ["Deposita L100,000 al 7 % anual por 360 días. Gana L7,000 de intereses y retira L107,000."],
  faq: [
    {
      pregunta: "¿Cómo se calculan los intereses de un plazo fijo?",
      respuesta: "Con interés simple: el monto por la tasa anual por los días del plazo, dividido entre los días del año que usa el banco.",
    },
    {
      pregunta: "¿Por qué algunos bancos usan 360 días?",
      respuesta: "Es una costumbre bancaria. Con 360 días el interés sale un poco mayor que con 365 para la misma tasa.",
    },
    {
      pregunta: "¿Puedo sacar el dinero antes?",
      respuesta: "Depende del contrato. Muchos bancos cobran una penalidad o pagan menos intereses si retira antes del vencimiento.",
    },
  ],
  glosario: [
    { termino: "Depósito a plazo fijo", definicion: "Un ahorro que se deja en el banco por un tiempo acordado a cambio de una tasa de interés." },
    { termino: "Vencimiento", definicion: "El día en que termina el plazo y puede retirar el dinero con sus intereses." },
  ],
});
