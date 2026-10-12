import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.venta-de-inmuebles",
  h1: "Calculadora del IR por venta de casas, terrenos y vehículos",
  title: "IR por venta de una casa o un vehículo en Nicaragua",
  description: "Calculá el IR que paga quien vende una casa, un terreno o un vehículo en Nicaragua: una tabla por tramos en dólares, al tipo de cambio oficial del día.",
  intro: [
    "Cuando vendés un bien que se inscribe en un registro público (una casa, un terreno, un vehículo), pagás una retención definitiva del IR.",
    "El porcentaje depende del valor del bien en dólares. Poné el valor y la moneda: te decimos el tramo y el IR.",
  ],
  comoSeCalcula: [
    "Se pasa el valor a dólares con el tipo de cambio oficial del Banco Central: hoy {{ni.tipo-cambio}} córdobas por dólar.",
    "Se busca el tramo: va del 1 % para bienes de hasta 50,000 dólares al 7 % para los de más de 500,000.",
    "El porcentaje del tramo se aplica sobre todo el valor.",
  ],
  ejemplo: ["Si vendés una casa en US$80,000, el tramo es del 2 %: pagás US$1,600, que son C$58,598.88 al tipo de cambio oficial."],
  faq: [
    {
      pregunta: "¿Cuánto IR se paga por vender una casa en Nicaragua?",
      respuesta: "Entre el 1 % y el 7 % del valor, según el tramo en dólares. Por ejemplo, el 2 % para una casa de entre 50,000 y 100,000 dólares.",
    },
    {
      pregunta: "¿También se paga al vender un carro?",
      respuesta: "Sí. La tabla vale para todos los bienes que se inscriben en un registro público, y los vehículos se inscriben.",
    },
    {
      pregunta: "¿Quién paga este impuesto?",
      respuesta: "Quien vende. Es una retención definitiva del IR sobre la ganancia de capital.",
    },
    {
      pregunta: "¿Qué tipo de cambio se usa?",
      respuesta: "El oficial del Banco Central de Nicaragua para el día de la operación.",
    },
  ],
  glosario: [
    { termino: "Ganancia de capital", definicion: "Lo que ganás al vender un bien que tenías." },
    { termino: "Bienes sujetos a registro", definicion: "Los que se inscriben en un registro público, como inmuebles y vehículos." },
  ],
});
