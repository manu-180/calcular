import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.renuncia",
  h1: "¿Cuánto me corresponde si renuncio?",
  title: "Liquidación por renuncia en Uruguay: cuánto cobrás",
  description:
    "Calculá lo que cobrás si renunciás: aguinaldo proporcional, licencia no gozada y salario vacacional. Con los días de licencia por antigüedad y tus descuentos.",
  intro: [
    "Si renunciás, no cobrás despido, pero sí todo lo que generaste: la parte de aguinaldo, la licencia que no te tomaste y su salario vacacional.",
    "Poné tu sueldo, la fecha de ingreso y el último día de trabajo. Te mostramos cada partida y el total.",
  ],
  comoSeCalcula: [
    "Aguinaldo: la parte proporcional a los días trabajados desde el último aguinaldo (junio o diciembre).",
    "Licencia: los días generados en el año ({{uy.licencia-dias}} por año completo, más por antigüedad) y los que te quedaron sin gozar, a razón del sueldo dividido entre 30.",
    "Salario vacacional: el {{uy.salario-vacacional}} del jornal líquido por cada día de licencia a pagar.",
  ],
  ejemplo: [
    "Con $ 60.000 de sueldo, ingreso el 1/3/2023 y renuncia el 7/10/2026, cobrás $ 21.147,54 de aguinaldo, $ 30.680 de licencia y $ 24.666,72 de salario vacacional: $ 76.494,26.",
  ],
  faq: [
    {
      pregunta: "¿Qué me corresponde si renuncio?",
      respuesta: "El aguinaldo proporcional, la licencia no gozada (la del año y la que te haya quedado de antes) y el salario vacacional de esos días.",
    },
    {
      pregunta: "¿Cobro indemnización si renuncio?",
      respuesta: "No. La indemnización es solo por despido. Si te fuiste porque el empleador incumplió (por ejemplo, no te pagaba), un juez puede considerarlo un despido indirecto.",
    },
    {
      pregunta: "¿Puedo cobrar seguro de paro si renuncio?",
      respuesta: "No. El seguro de paro es por despido, suspensión o reducción del trabajo.",
    },
    {
      pregunta: "¿Me pagan la licencia si trabajé menos de un año?",
      respuesta: "Sí. El empleador te paga la licencia por el tiempo que trabajaste, aunque sea poco.",
    },
  ],
  glosario: [
    { termino: "Licencia no gozada", definicion: "Los días de licencia que generaste y no te tomaste. Se pagan al irte." },
    { termino: "Despido indirecto", definicion: "Cuando renunciás por un incumplimiento grave del empleador. Puede dar derecho a indemnización." },
  ],
});
