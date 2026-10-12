import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.plazo-fijo",
  h1: "Calculadora de depósito a plazo fijo",
  title: "Depósito a plazo en El Salvador: calcule sus intereses",
  description: "Calcule los intereses de su depósito a plazo y la retención de renta del {{sv.retencion-intereses}}. Vea si su saldo queda exento y cuánto recibe al vencimiento.",
  intro: [
    "Un depósito a plazo le paga intereses por dejar su dinero en el banco o la cooperativa durante un tiempo fijo.",
    "Sobre esos intereses el banco retiene el {{sv.retencion-intereses}} de renta. Si usted es persona y el saldo promedio de todos sus depósitos es menor de {{sv.intereses-exento-saldo}}, no le retienen nada.",
  ],
  comoSeCalcula: [
    "Intereses: monto × tasa anual × días del plazo, dividido entre los días del año que usa su banco (365 o 360).",
    "Retención: el {{sv.retencion-intereses}} de los intereses, salvo que esté exento.",
    "Lo que recibe es el interés menos la retención.",
  ],
  ejemplo: [
    "$10,000 al 5 % por 180 días, base 365: $246.58 de intereses. Si es su único depósito, no paga renta.",
    "$30,000 al 4 % por un año, base 360: $1,200 de intereses, $120 de retención y $1,080 para usted.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo no me retienen renta por los intereses?",
      respuesta: "Cuando el depósito es de una persona domiciliada en El Salvador y el saldo promedio mensual de todos sus depósitos es menor de {{sv.intereses-exento-saldo}}.",
    },
    {
      pregunta: "¿Tengo que declarar esos intereses?",
      respuesta: "Si es persona y ya le retuvieron, no: la retención es el pago definitivo del impuesto. Las empresas la restan en su declaración anual.",
    },
    {
      pregunta: "¿Mi banco cuenta el año de 360 o de 365 días?",
      respuesta: "Depende del banco y del contrato. Revíselo en su certificado de depósito y elija esa opción en la calculadora.",
    },
    {
      pregunta: "¿La tasa que me ofrecen es anual?",
      respuesta: "Sí. Las tasas de los depósitos a plazo se publican como tasa anual, aunque el plazo sea de 30, 90 o 180 días.",
    },
  ],
  glosario: [
    { termino: "Depósito a plazo", definicion: "Dinero que deja en el banco por un tiempo fijo a cambio de una tasa de interés." },
    { termino: "Saldo promedio", definicion: "Lo que tuvo en promedio durante el mes en todas sus cuentas y depósitos." },
  ],
});
