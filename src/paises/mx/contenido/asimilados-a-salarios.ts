import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.asimilados-a-salarios",
  h1: "Calculadora de ISR para asimilados a salarios {{anio}}",
  title: "Asimilados a salarios {{anio}}: calcula tu ISR y tu neto",
  description:
    "Calcula el ISR que te retienen como asimilado a salarios con la tarifa {{anio}} del artículo 96, quincenal, mensual, semanal o decenal, y cuánto te queda libre.",
  intro: [
    "Si cobras como asimilado a salarios (honorarios asimilados, consejeros, socios de cooperativas, entre otros), te retienen ISR con la misma tarifa que a un asalariado.",
    "La diferencia es que no recibes el subsidio para el empleo y no cotizas al IMSS: no tienes descuento de cuotas, pero tampoco seguridad social por ese pago.",
  ],
  comoSeCalcula: [
    "Se busca tu pago en la tarifa del periodo (semanal, decenal, quincenal o mensual) del Anexo 8 de la Resolución Miscelánea Fiscal.",
    "ISR: cuota fija del renglón más el porcentaje sobre lo que pasa del límite inferior.",
    "Neto: pago bruto menos ISR. No se resta subsidio ni IMSS.",
  ],
  ejemplo: ["Con 10,000 pesos al mes como asimilado te retienen 729.02 de ISR y te quedan 9,270.98. Un asalariado con el mismo sueldo tendría subsidio para el empleo."],
  faq: [
    {
      pregunta: "¿Los asimilados a salarios reciben subsidio para el empleo?",
      respuesta: "No. El decreto del subsidio solo lo da a quienes cobran salario por un trabajo subordinado y a servidores públicos.",
    },
    {
      pregunta: "¿Un asimilado paga IMSS?",
      respuesta: "No. Al no haber relación laboral no hay cuotas obreras ni patronales, y tampoco derecho a los servicios del IMSS por ese ingreso.",
    },
    {
      pregunta: "¿Tengo que presentar declaración anual?",
      respuesta: "Depende de tus ingresos y de si tienes más de un pagador. Si te retuvieron de menos o de más, la declaración anual lo ajusta.",
    },
  ],
  glosario: [
    { termino: "Asimilados a salarios", definicion: "Ingresos que la Ley del ISR trata como salario para el impuesto, aunque no haya relación de trabajo (artículo 94)." },
  ],
});
