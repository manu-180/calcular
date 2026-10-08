import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.iva",
  h1: "Calculadora de IVA e IT en Bolivia",
  title: "IVA e IT Bolivia: calcule el {{bo.iva}} y el {{bo.it}} de su factura",
  description: "Calcule cuánto IVA ({{bo.iva}}) y cuánto IT ({{bo.it}}) hay en un precio con factura, o cuánto facturar para recibir un monto limpio. Gratis y al instante.",
  intro: [
    "En Bolivia el IVA es del {{bo.iva}} y va incluido en el precio de la factura. Quien vende, además, paga el {{bo.it}} de Impuesto a las Transacciones (IT) sobre lo que cobra.",
    "Elija si parte del precio con factura o de lo que quiere recibir, y escriba el monto.",
  ],
  comoSeCalcula: [
    "IVA: el {{bo.iva}} del precio facturado. No se suma aparte: ya está dentro del precio.",
    "IT: el {{bo.it}} del precio facturado.",
    "Para saber cuánto facturar y recibir un monto limpio, se divide ese monto por lo que queda después de los dos impuestos.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el IVA en Bolivia?",
      respuesta: "{{bo.iva}}, y va incluido en el precio de la factura. Además, quien vende paga {{bo.it}} de IT sobre lo que cobra.",
    },
    {
      pregunta: "¿Cómo saco el IVA de una factura?",
      respuesta: "Calcule el {{bo.iva}} del precio facturado: ese es el IVA, porque ya está dentro del precio. Lo que queda es el precio sin IVA.",
    },
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
