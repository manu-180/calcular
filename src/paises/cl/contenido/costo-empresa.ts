import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.costo-empresa",
  h1: "Calculadora de costo empresa de un trabajador",
  title: "Costo empresa: cuánto cuesta un trabajador en Chile",
  description:
    "Calcula cuánto le cuesta a la empresa un sueldo: seguro de cesantía, cotización de la reforma de pensiones, mutual y Ley SANNA, con el tope imponible del mes.",
  intro: [
    "El costo empresa es el sueldo bruto más las cotizaciones que paga el empleador. Esas cotizaciones no se descuentan del sueldo: se pagan aparte.",
    "Desde agosto de 2026 la reforma de pensiones suma una cotización de {{cl.cotizacion-empleador-pensiones}} de cargo del empleador, que ya incluye el seguro de invalidez y sobrevivencia.",
  ],
  comoSeCalcula: [
    "Seguro de cesantía: {{cl.cesantia-empleador[indefinido]}} con contrato indefinido y {{cl.cesantia-empleador[plazo-fijo]}} a plazo fijo o por obra, hasta su propio tope.",
    "Reforma de pensiones: {{cl.cotizacion-empleador-pensiones}} del sueldo imponible.",
    "Seguro de accidentes del trabajo: la cotización básica de {{cl.accidentes-basica}} más la adicional que fija tu mutual o el ISL según el riesgo.",
    "Ley SANNA: {{cl.sanna}}.",
    "Todo se calcula hasta el tope imponible del mes, en UF. La colación y la movilización suman al costo, pero no pagan cotizaciones.",
  ],
  ejemplo: [
    "Un sueldo imponible de 1.000.000 de pesos con contrato indefinido, adicional de 0,95 % y 50.000 de colación le cuesta a la empresa 1.127.800 pesos al mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto más que el sueldo cuesta un trabajador?",
      respuesta: "Depende del contrato y de la mutual. La fila «Cotizaciones sobre el sueldo imponible» te da el porcentaje exacto de tu caso, sumando cesantía, pensiones, accidentes y Ley SANNA.",
    },
    {
      pregunta: "¿La cotización de la reforma de pensiones se descuenta del sueldo?",
      respuesta: "No. La paga la empresa encima del sueldo. Quien trabaja sigue con los mismos descuentos de AFP, comisión y salud de siempre.",
    },
    {
      pregunta: "¿Cómo sé mi cotización adicional de la mutual?",
      respuesta: "Te la informa tu mutual o el ISL por carta. Al empezar depende del riesgo de la actividad, y cada dos años se revisa según los accidentes de la empresa.",
    },
    {
      pregunta: "¿Incluye la gratificación?",
      respuesta: "Sí, si la sumas al sueldo imponible. La gratificación paga cotizaciones como el resto del sueldo.",
    },
  ],
  glosario: [
    { termino: "Costo empresa", definicion: "Lo que paga el empleador por un trabajador: sueldo bruto, beneficios no imponibles y cotizaciones de cargo del empleador." },
    { termino: "Mutual", definicion: "Organismo que administra el seguro de accidentes del trabajo. Si la empresa no está en una mutual, lo administra el ISL." },
  ],
});
