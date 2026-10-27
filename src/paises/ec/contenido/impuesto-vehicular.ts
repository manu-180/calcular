import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.impuesto-vehicular",
  h1: "Calculadora del impuesto vehicular del SRI",
  title: "Impuesto vehicular SRI {{anio}}: calcula tu matrícula",
  description: "Calcula el impuesto a la propiedad de tu vehículo con la tabla del SRI según el avalúo, y el {{ec.impuesto-vehiculo-usado}} si compras un auto usado.",
  intro: [
    "Cada año pagas al SRI el impuesto a la propiedad de tu vehículo, que es parte de la matrícula. Se calcula sobre el avalúo que el SRI tiene registrado, no sobre lo que pagaste.",
    "Si compras un auto usado, además pagas el {{ec.impuesto-vehiculo-usado}} del precio de compra. Pon el avalúo y te damos los valores.",
  ],
  comoSeCalcula: [
    "La tabla del SRI tiene siete tramos según el avalúo: un valor fijo por tramo más un porcentaje del excedente, del 0,5 % al 6 %.",
    "Para un usado, el {{ec.impuesto-vehiculo-usado}} se calcula sobre el precio del contrato, pero nunca sobre menos que el avalúo.",
    "Las tasas de la ANT y el impuesto municipal al rodaje se pagan aparte.",
  ],
  ejemplo: ["Con un avalúo de $15.000, el impuesto a la propiedad es $230: $140 fijos más el 3 % de los $3.000 que pasan de $12.000."],
  faq: [
    {
      pregunta: "¿Cómo sé el avalúo de mi auto?",
      respuesta: "En la consulta de valores a pagar del SRI, con tu número de placa. El SRI lo actualiza cada año.",
    },
    {
      pregunta: "¿Quién no paga el impuesto vehicular?",
      respuesta: "Hay exoneraciones para adultos mayores, personas con discapacidad, transporte público y vehículos de una tonelada o más para actividades productivas, entre otros. Se piden en SRI en Línea.",
    },
    {
      pregunta: "¿Cuánto se paga al comprar un auto usado?",
      respuesta: "El {{ec.impuesto-vehiculo-usado}} del precio del contrato, o del avalúo si es mayor. Tienes 30 días hábiles para pagarlo.",
    },
    {
      pregunta: "¿Este es el total de la matrícula?",
      respuesta: "No. La matrícula suma la tasa de la ANT y el impuesto al rodaje del municipio, que varían según tu cantón.",
    },
  ],
  glosario: [
    { termino: "Avalúo", definicion: "El valor de tu vehículo que el SRI tiene registrado para cobrar el impuesto." },
    { termino: "Matrícula", definicion: "El pago anual que habilita tu vehículo para circular." },
  ],
});
