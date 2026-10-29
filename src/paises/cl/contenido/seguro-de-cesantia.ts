import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.seguro-de-cesantia",
  h1: "Calculadora del seguro de cesantía",
  title: "Seguro de cesantía {{anio}}: cuánto te pagan cada mes",
  description:
    "Calcula los pagos del seguro de cesantía: {{cl.fcs-porcentaje[indefinido-1]}} de tu promedio el primer mes, con los montos mínimos y máximos vigentes hasta febrero de 2027.",
  intro: [
    "Si te quedas sin trabajo, el seguro de cesantía (AFC) te paga un monto mensual que baja mes a mes. Se calcula sobre el promedio de tus remuneraciones de los últimos 10 meses.",
    "Cada mes tiene un monto mínimo y uno máximo que fija la Superintendencia de Pensiones. Acá ves los cinco pagos con esos límites.",
  ],
  comoSeCalcula: [
    "Contrato indefinido: {{cl.fcs-porcentaje[indefinido-1]}}, {{cl.fcs-porcentaje[indefinido-2]}}, {{cl.fcs-porcentaje[indefinido-3]}}, {{cl.fcs-porcentaje[indefinido-4]}} y {{cl.fcs-porcentaje[indefinido-5]}} de tu promedio, del primer al quinto mes.",
    "Contrato a plazo fijo u obra: {{cl.fcs-porcentaje[plazo-fijo-1]}}, {{cl.fcs-porcentaje[plazo-fijo-2]}}, {{cl.fcs-porcentaje[plazo-fijo-3]}}, {{cl.fcs-porcentaje[plazo-fijo-4]}} y {{cl.fcs-porcentaje[plazo-fijo-5]}}.",
    "Si el porcentaje da menos que el mínimo del mes, recibes el mínimo. Si da más que el máximo, recibes el máximo. Por ejemplo, el primer mes con contrato indefinido va de {{cl.fcs-valor-inferior[indefinido-1]}} a {{cl.fcs-valor-superior[indefinido-1]}}.",
  ],
  ejemplo: ["Con contrato indefinido y un promedio de $800.000, recibes $560.000 el primer mes, $480.000 el segundo, $360.000 el tercero, $320.000 el cuarto y $280.000 el quinto."],
  faq: [
    {
      pregunta: "¿Quién puede cobrar el seguro de cesantía?",
      respuesta: "Quien queda sin trabajo y tiene cotizaciones en la AFC. Los fondos de tu cuenta individual se pueden retirar sea cual sea la causal de término. Para el Fondo de Cesantía Solidario necesitas, entre otros requisitos, un mínimo de cotizaciones en los últimos 24 meses (las tres últimas seguidas y con el mismo empleador) y que el contrato termine por necesidades de la empresa, fin del plazo u obra, o caso fortuito.",
    },
    {
      pregunta: "¿De dónde sale la plata?",
      respuesta: "Primero de tu cuenta individual de cesantía, que se forma con tus cotizaciones y las de tu empleador. Si no alcanza, el Fondo de Cesantía Solidario completa los montos de esta tabla.",
    },
    {
      pregunta: "¿Cuándo cambian los montos mínimos y máximos?",
      respuesta: "Cada 1 de marzo, según el IPC y el índice de remuneraciones del año anterior. Los de ahora rigen hasta el 28 de febrero de 2027.",
    },
    {
      pregunta: "¿Dónde pido el seguro?",
      respuesta: "En la AFC, por su sitio web o en una sucursal, con tu finiquito o la carta de despido.",
    },
  ],
  glosario: [
    { termino: "AFC", definicion: "Administradora de Fondos de Cesantía. Administra el seguro de cesantía." },
    { termino: "Fondo de Cesantía Solidario", definicion: "Fondo común que completa los pagos cuando tu cuenta individual no alcanza." },
  ],
});
