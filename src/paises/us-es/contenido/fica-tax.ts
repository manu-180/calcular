import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.fica-tax",
  h1: "Calculadora del impuesto FICA",
  title: "Calculadora FICA 2026: Seguro Social y Medicare",
  description: "Calcule el impuesto del Seguro Social y de Medicare sobre sus salarios de 2026, el impuesto adicional de Medicare y lo que paga su empleador. Base salarial de {{us.social-security-wage-base}}.",
  intro: [
    "El FICA es el impuesto de nómina que financia el Seguro Social y Medicare. Usted paga la mitad y su empleador paga la otra mitad.",
    "Indique sus salarios del año para ver cada parte y el costo total sobre su pago.",
  ],
  comoSeCalcula: [
    "Seguro Social: {{us.social-security-rate}} de los salarios hasta {{us.social-security-wage-base}} para usted y lo mismo para su empleador.",
    "Medicare: {{us.medicare-rate}} de todo el salario para usted y lo mismo para su empleador.",
    "Además, usted paga el impuesto adicional de Medicare de {{us.additional-medicare-rate}} sobre los salarios por encima de {{us.additional-medicare-threshold[single]}} si es soltero, {{us.additional-medicare-threshold[mfj]}} en una declaración conjunta o {{us.additional-medicare-threshold[mfs]}} si declara por separado. El empleador no lo iguala.",
  ],
  ejemplo: [
    "Sobre $75,000 de salario usted paga $4,650 de Seguro Social y $1,087.50 de Medicare, en total $5,737.50. Su empleador paga otra vez el mismo monto.",
  ],
  faq: [
    { pregunta: "¿Cuál es la tasa del FICA en 2026?", respuesta: "7.65% para usted y 7.65% para su empleador: {{us.social-security-rate}} para el Seguro Social y {{us.medicare-rate}} para Medicare." },
    { pregunta: "¿Los aportes al 401(k) bajan el FICA?", respuesta: "No. Los aportes al 401(k) tradicional bajan el impuesto sobre el ingreso pero igual pagan FICA. Las primas de salud pagadas por un plan cafetería sí bajan el FICA." },
    { pregunta: "Tuve dos empleos y pagué demasiado Seguro Social. ¿Lo puedo recuperar?", respuesta: "Sí. Si dos o más empleadores juntos retuvieron Seguro Social sobre más de {{us.social-security-wage-base}}, el exceso se reclama como crédito en su declaración federal." },
  ],
  glosario: [
    { termino: "Base salarial", definicion: "El máximo de salarios que paga impuesto del Seguro Social en un año. Medicare no tiene límite." },
    { termino: "Impuesto adicional de Medicare", definicion: "Un impuesto extra del empleado sobre salarios altos que financia Medicare." },
  ],
});
