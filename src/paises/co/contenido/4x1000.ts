import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.4x1000",
  h1: "Calculadora del 4x1000",
  title: "Calculadora del 4x1000 (GMF) {{anio}}",
  description:
    "Calcula cuánto pagas de 4x1000 en un retiro o transferencia y cuánto puedes mover sin pagar con la cuenta marcada como exenta: {{co.gmf-exencion}} al mes.",
  intro: [
    "El 4x1000 (en la ley, gravamen a los movimientos financieros) se cobra cuando sacas plata de una cuenta: retiros, transferencias y pagos. Son 4 pesos por cada 1.000.",
    "Si marcas una cuenta de ahorros como exenta, no pagas sobre los primeros {{co.gmf-exencion}} que retires cada mes.",
  ],
  comoSeCalcula: [
    "Tarifa: {{co.gmf-tarifa}} del movimiento.",
    "Exención: hasta {{co.gmf-exencion}} al mes en la cuenta que marcaste. Con la UVT de {{co.uvt}}, eso es lo que muestra la calculadora.",
    "Lo que pase de la exención en el mes paga el {{co.gmf-tarifa}}.",
  ],
  ejemplo: [
    "Si transfieres $1.000.000 desde una cuenta sin marcar, pagas $4.000.",
    "Si retiras $22.000.000 en un mes de tu cuenta marcada, los primeros $18.330.900 no pagan. Por el resto pagas $14.676.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto puedo sacar sin pagar 4x1000?",
      respuesta: "Hasta {{co.gmf-exencion}} al mes de la cuenta de ahorros que marques como exenta. Tienes que pedirle al banco que la marque.",
    },
    {
      pregunta: "¿Cuántas cuentas puedo marcar?",
      respuesta: "La ley dice una sola cuenta de ahorros, depósito electrónico o tarjeta prepago por persona, y que esté solo a tu nombre.",
    },
    {
      pregunta: "¿Pago 4x1000 si paso plata entre mis cuentas?",
      respuesta: "Entre cuentas corrientes del mismo banco y del mismo titular no se paga. En los demás casos, sí, salvo que el retiro esté dentro de la exención.",
    },
  ],
  glosario: [
    { termino: "GMF", definicion: "Gravamen a los movimientos financieros: el nombre legal del 4x1000." },
    { termino: "Cuenta marcada", definicion: "La cuenta de ahorros que elegiste para no pagar 4x1000 hasta el tope mensual." },
  ],
});
