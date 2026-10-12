import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.plazo-fijo",
  h1: "Calculadora de plazo fijo en Guatemala",
  title: "Plazo fijo en Guatemala: calcule sus intereses",
  description:
    "Calcule cuánto gana con un depósito a plazo fijo: intereses, ISR que retiene el banco y lo que recibe al vencer. Con la tasa pasiva del Banguat.",
  intro: [
    "Un depósito a plazo fijo le paga intereses por dejar su dinero en el banco durante un tiempo. Al vencer, el banco le devuelve el monto más los intereses, menos el ISR.",
    "Si no sabe qué tasa le ofrecen, usamos la tasa pasiva promedio del sistema bancario que publica el Banco de Guatemala: {{gt.tasa-pasiva}}.",
  ],
  comoSeCalcula: [
    "Intereses = monto × tasa anual × días / 365.",
    "ISR = intereses × {{gt.isr-rentas-capital}}. Lo retiene el banco.",
    "Recibe al vencer = monto + intereses menos ISR.",
  ],
  ejemplo: ["Q10,000 al 5 % anual durante 365 días dan Q500 de intereses. El banco retiene Q50 de ISR y usted recibe Q10,450."],
  faq: [
    {
      pregunta: "¿Los intereses del plazo fijo pagan ISR?",
      respuesta: "Sí, el {{gt.isr-rentas-capital}}. El banco lo retiene al pagarle los intereses y usted no tiene que declararlo.",
    },
    {
      pregunta: "¿Qué es la tasa pasiva?",
      respuesta: "Es la tasa que pagan los bancos por los depósitos. El Banco de Guatemala publica el promedio ponderado del sistema cada mes.",
    },
    {
      pregunta: "¿Puedo retirar el dinero antes de que venza?",
      respuesta: "Depende del banco. Muchos no lo permiten o cobran una penalización. Pregunte antes de abrir el depósito.",
    },
  ],
  glosario: [
    { termino: "Tasa pasiva", definicion: "Interés que paga el banco por el dinero que usted le deposita." },
    { termino: "Plazo fijo", definicion: "Depósito que no se puede retirar hasta la fecha pactada, a cambio de un interés." },
  ],
});
