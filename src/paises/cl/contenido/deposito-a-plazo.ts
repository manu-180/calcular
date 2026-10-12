import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.deposito-a-plazo",
  h1: "Calculadora de depósito a plazo",
  title: "Depósito a plazo: calcula cuánto ganas en pesos",
  description: "Calcula los intereses de tu depósito a plazo en pesos: monto, tasa mensual o anual y días. Ves lo que recibes al vencimiento y la tasa anual equivalente.",
  intro: [
    "Un depósito a plazo es dejar tu plata en el banco por un número de días a cambio de una tasa fija. Al vencimiento recibes el monto más los intereses.",
    "Escribe el monto, la tasa que te ofrece el banco y el plazo. Te decimos cuánto ganas.",
  ],
  comoSeCalcula: [
    "Si la tasa es mensual (base 30 días), se multiplica por los días del plazo y se divide por 30.",
    "Si la tasa es anual (base 360 días), primero se divide por 12 para llevarla a 30 días.",
    "Los intereses son el monto por esa tasa del período. Se suman al monto al vencimiento.",
  ],
  ejemplo: ["Si depositas $1.000.000 a 30 días con una tasa de 0,35 % mensual, ganas $3.500 y recibes $1.003.500."],
  faq: [
    {
      pregunta: "¿Qué es la tasa base 30 días?",
      respuesta: "Es la tasa que ganas por cada 30 días de plazo. Los bancos en Chile la usan para comparar depósitos de distintos plazos.",
    },
    {
      pregunta: "¿Los intereses pagan impuesto?",
      respuesta: "Los intereses se declaran como renta en la Operación Renta. El banco te envía un certificado con lo que ganaste en el año.",
    },
    {
      pregunta: "¿Qué pasa si retiro antes?",
      respuesta: "En un depósito a plazo fijo no puedes retirar antes del vencimiento. Si es renovable, se renueva solo con la tasa del día.",
    },
    {
      pregunta: "¿Conviene un depósito en UF?",
      respuesta: "Un depósito reajustable en UF te protege de la inflación, pero suele exigir plazos más largos. Compara la tasa real que te ofrecen con la inflación esperada.",
    },
  ],
  glosario: [
    { termino: "Depósito a plazo", definicion: "Inversión en un banco por un plazo fijo, con una tasa pactada al inicio." },
    { termino: "Interés simple", definicion: "Interés que se calcula solo sobre el monto inicial, sin sumar intereses sobre intereses." },
  ],
});
