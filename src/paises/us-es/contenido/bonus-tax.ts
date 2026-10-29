import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.bonus-tax",
  h1: "Calculadora de impuestos sobre un bono",
  title: "Impuestos sobre un bono {{anio}}: cuánto te queda",
  description: "Mira cuánto te queda de tu bono después de la retención federal de {{us.supplemental-rate}}, el Seguro Social y Medicare, con las reglas del IRS de {{anio}}.",
  intro: [
    "Los bonos parecen pagar más impuestos porque los empleadores suelen retener un {{us.supplemental-rate}} fijo de impuesto federal, más el Seguro Social y Medicare.",
    "Escribe el monto de tu bono para ver cada parte y lo que llega a tu cuenta.",
  ],
  comoSeCalcula: [
    "Impuesto federal: {{us.supplemental-rate}} del bono. Cuando tu pago suplementario del año pasa de {{us.supplemental-threshold}}, la parte que excede se retiene al {{us.supplemental-rate-over-1m}}.",
    "Seguro Social: {{us.social-security-rate}} del bono, pero solo hasta que tus salarios del año llegan a {{us.social-security-wage-base}}.",
    "Medicare: {{us.medicare-rate}} del bono, más {{us.additional-medicare-rate}} sobre la parte de tus salarios anuales por encima de {{us.additional-medicare-withholding}}.",
  ],
  ejemplo: [
    "Sobre un bono de $5,000, $1,100 van al impuesto federal, $310 al Seguro Social y $72.50 a Medicare. Te quedan $3,517.50 antes del impuesto estatal.",
  ],
  faq: [
    { pregunta: "¿Los bonos pagan más impuestos que el sueldo normal?", respuesta: "No. El método de retención es distinto, pero en la declaración de impuestos un bono es simplemente más salario. Si el {{us.supplemental-rate}} es más que tu tasa real, la diferencia vuelve en tu reembolso." },
    { pregunta: "¿Mi empleador puede usar otro método?", respuesta: "Sí. Si el bono se paga junto con el sueldo normal, el empleador puede sumar los dos y retener como si fuera un solo cheque más grande. Eso muchas veces retiene más." },
    { pregunta: "¿Puedo poner mi bono en mi 401(k) para ahorrar impuestos?", respuesta: "Muchas veces sí, si tu plan permite aportes desde bonos. El dinero que va a un 401(k) tradicional no tiene retención de impuesto federal, pero igual paga Seguro Social y Medicare." },
  ],
  glosario: [
    { termino: "Salarios suplementarios", definicion: "Pagos fuera de tu salario normal, como bonos, comisiones e indemnizaciones." },
    { termino: "Método de tasa fija", definicion: "Retener un porcentaje fijo de los salarios suplementarios en lugar de usar las tablas de impuestos." },
  ],
});
