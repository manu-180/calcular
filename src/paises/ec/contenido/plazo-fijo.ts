import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.plazo-fijo",
  h1: "Calculadora de depósito a plazo fijo en Ecuador",
  title: "Plazo fijo Ecuador: calcula tus intereses y el impuesto",
  description: "Calcula cuánto ganas con un depósito a plazo fijo y si pagas impuesto: a {{ec.plazo-fijo-exento-dias}} o más los intereses están exentos; si no, te retienen el {{ec.retencion-renta[rendimientos]}}.",
  intro: [
    "Un depósito a plazo fijo te paga intereses por dejar tu dinero un tiempo en el banco o la cooperativa. Pon el monto, la tasa que te ofrecen y el plazo.",
    "Te mostramos los intereses, si te retienen impuesto a la renta y cuánto recibes al final.",
  ],
  comoSeCalcula: [
    "Intereses: monto por tasa anual por días de plazo, dividido para los días del año que usa tu banco (casi siempre 360).",
    "Si el plazo es de {{ec.plazo-fijo-exento-dias}} o más y no tienes un préstamo con esa entidad, los intereses no pagan impuesto a la renta.",
    "Si no, la entidad te retiene el {{ec.retencion-renta[rendimientos]}} de los intereses.",
  ],
  ejemplo: ["Con $10.000 a 180 días al 6 % ganas $300, sin impuesto. Al vencimiento recibes $10.300."],
  faq: [
    {
      pregunta: "¿Los intereses del plazo fijo pagan impuesto?",
      respuesta: "No, si el depósito es a {{ec.plazo-fijo-exento-dias}} o más y no le debes a esa entidad. Si no, te retienen el {{ec.retencion-renta[rendimientos]}}.",
    },
    {
      pregunta: "¿Una deuda de tarjeta de crédito me quita la exención?",
      respuesta: "No. Para la exención no cuentan las deudas de tarjeta de crédito, ni corrientes ni diferidas.",
    },
    {
      pregunta: "¿Qué tasa pagan los bancos en Ecuador?",
      respuesta: "Cada entidad fija la suya y cambia con el plazo y el monto. El Banco Central publica cada mes las tasas referenciales. Pon la tasa que te ofrecen a ti.",
    },
    {
      pregunta: "¿Qué pasa si retiro el dinero antes?",
      respuesta: "En un plazo fijo, por lo general no puedes retirarlo antes del vencimiento. Revisa las condiciones con tu entidad.",
    },
  ],
  glosario: [
    { termino: "Tasa anual", definicion: "El porcentaje de interés que te pagan en un año." },
    { termino: "Vencimiento", definicion: "El día en que termina el plazo y recibes tu dinero con los intereses." },
  ],
});
