import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.iva",
  h1: "Calculadora de IVA e IT",
  title: "IVA e IT en Bolivia: calcule los impuestos de su factura",
  description: "Vea cuánto IVA ({{bo.iva}}) y cuánto IT ({{bo.it}}) hay en un precio con factura, o cuánto facturar para recibir un monto limpio.",
  intro: [
    "En Bolivia el IVA va incluido en el precio de la factura. Quien vende, además, paga el Impuesto a las Transacciones (IT) sobre lo que cobra.",
    "Elija si parte del precio con factura o de lo que quiere recibir, y escriba el monto.",
  ],
  comoSeCalcula: [
    "IVA: el {{bo.iva}} del precio facturado. No se suma aparte: ya está dentro del precio.",
    "IT: el {{bo.it}} del precio facturado.",
    "Para saber cuánto facturar y recibir un monto limpio, se divide ese monto por lo que queda después de los dos impuestos.",
  ],
  faq: [
    {
      pregunta: "¿Por qué el IVA es del {{bo.iva}} pero parece más?",
      respuesta: "Porque se calcula sobre el precio que ya lo incluye. Sobre el precio sin impuesto equivale a casi 15 %.",
    },
    {
      pregunta: "¿Pago todo ese IVA?",
      respuesta: "No necesariamente. Del IVA de sus ventas se resta el crédito fiscal de sus compras con factura. Esta calculadora no lo resta.",
    },
    {
      pregunta: "¿Sigue vigente el IT?",
      respuesta: "Sí. Rige con una alícuota de {{bo.it}} según la Ley N° 843. Si una ley lo cambia, actualizamos el cálculo.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto al Valor Agregado. En Bolivia forma parte del precio de la factura." },
    { termino: "IT", definicion: "Impuesto a las Transacciones: un porcentaje de los ingresos brutos de quien vende o presta servicios." },
    { termino: "Crédito fiscal", definicion: "El IVA de sus compras con factura, que se resta del IVA de sus ventas." },
  ],
});
