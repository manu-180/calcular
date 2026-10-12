import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.licencia-de-maternidad",
  h1: "Calculadora de licencia de maternidad en Guatemala",
  title: "Licencia de maternidad en Guatemala: fechas y pago",
  description:
    "Calcule cuándo empieza y termina su descanso por maternidad, cuándo regresa a trabajar y cuánto le pagan durante esos días.",
  intro: [
    "En Guatemala la trabajadora embarazada tiene derecho a {{gt.maternidad-dias[prenatal]}} de descanso antes del parto y {{gt.maternidad-dias[postnatal]}} después, con goce del salario completo.",
    "Escriba la fecha probable del parto y su salario. Le mostramos las fechas y una estimación de lo que recibe.",
  ],
  comoSeCalcula: [
    "El descanso empieza {{gt.maternidad-dias[prenatal]}} antes del parto, contando el día del parto.",
    "Termina {{gt.maternidad-dias[postnatal]}} después del parto. Al día siguiente regresa a trabajar.",
    "Pago: salario diario (mensual × 12 / 365) × {{gt.igss-subsidio-maternidad}} × días de descanso.",
  ],
  ejemplo: ["Con parto previsto el 15 de diciembre de 2026, el descanso va del 16 de noviembre de 2026 al 7 de febrero de 2027."],
  faq: [
    {
      pregunta: "¿Quién paga la licencia de maternidad?",
      respuesta: "Si está afiliada al IGSS y tiene las cuotas que pide el reglamento, el IGSS le paga un subsidio igual a su salario. Si no, el patrono le paga el salario completo.",
    },
    {
      pregunta: "¿Qué pasa si el bebé nace antes de la fecha prevista?",
      respuesta: "Los días de descanso prenatal que no alcanzó a tomar se suman al descanso después del parto. No pierde ningún día.",
    },
    {
      pregunta: "¿Me pueden despedir durante el embarazo?",
      respuesta: "No sin una causa justificada y la autorización de un juez de trabajo. La protección sigue durante el período de lactancia.",
    },
    {
      pregunta: "¿Qué pasa al regresar?",
      respuesta: "Empieza su período de lactancia: una hora pagada al día para alimentar a su bebé durante varios meses.",
    },
  ],
  glosario: [
    { termino: "Descanso prenatal y postnatal", definicion: "Los días de licencia antes y después del parto." },
    { termino: "Subsidio", definicion: "Lo que paga el IGSS en lugar del salario mientras usted no puede trabajar." },
  ],
});
