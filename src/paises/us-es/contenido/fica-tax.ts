import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.fica-tax",
  h1: "Calculadora del impuesto FICA",
  title: "Calculadora FICA {{anio}}: Seguro Social y Medicare",
  description: "Calcula el Seguro Social y Medicare que se descuentan de tu salario en {{anio}}, el impuesto adicional de Medicare y lo que paga tu empleador.",
  intro: [
    "El FICA es el impuesto de nómina que financia el Seguro Social y Medicare. Tú pagas la mitad y tu empleador paga la otra mitad.",
    "Escribe tus salarios del año para ver cada parte y el costo total sobre tu pago.",
  ],
  comoSeCalcula: [
    "Seguro Social: {{us.social-security-rate}} de los salarios hasta {{us.social-security-wage-base}} para ti y lo mismo para tu empleador.",
    "Medicare: {{us.medicare-rate}} de todo el salario para ti y lo mismo para tu empleador.",
    "Además pagas el impuesto adicional de Medicare de {{us.additional-medicare-rate}} sobre los salarios por encima de {{us.additional-medicare-threshold[single]}} si eres soltero, {{us.additional-medicare-threshold[mfj]}} en una declaración conjunta o {{us.additional-medicare-threshold[mfs]}} si declaras por separado. El empleador no lo iguala.",
  ],
  ejemplo: [
    "Sobre $75,000 de salario pagas $4,650 de Seguro Social y $1,087.50 de Medicare, en total $5,737.50. Tu empleador paga otra vez el mismo monto.",
  ],
  faq: [
    { pregunta: "¿Cuál es la tasa del FICA en 2026?", respuesta: "7.65% para ti y 7.65% para tu empleador: {{us.social-security-rate}} para el Seguro Social y {{us.medicare-rate}} para Medicare." },
    { pregunta: "¿Cuál es el tope del Seguro Social en 2026?", respuesta: "La base salarial es de {{us.social-security-wage-base}}. Lo que ganes por encima de ese monto ya no paga Seguro Social, pero sigue pagando Medicare." },
    { pregunta: "¿Los aportes al 401(k) bajan el FICA?", respuesta: "No. Los aportes al 401(k) tradicional bajan el impuesto sobre el ingreso pero igual pagan FICA. Las primas de salud pagadas por un plan cafetería sí bajan el FICA." },
    { pregunta: "Tuve dos empleos y pagué demasiado Seguro Social. ¿Lo puedo recuperar?", respuesta: "Sí. Si dos o más empleadores juntos retuvieron Seguro Social sobre más de {{us.social-security-wage-base}}, el exceso se reclama como crédito en tu declaración federal." },
  ],
  glosario: [
    { termino: "Base salarial", definicion: "El máximo de salarios que paga impuesto del Seguro Social en un año. Medicare no tiene límite." },
    { termino: "Impuesto adicional de Medicare", definicion: "Un impuesto extra del empleado sobre salarios altos que financia Medicare." },
  ],
});
