import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.retencion-honorarios",
  h1: "Calculadora de retención de ISR a honorarios",
  title: "Retención a honorarios en RD {{anio}}: calcula el {{do.retencion-honorarios}}",
  description: "Calcula la retención de ISR del {{do.retencion-honorarios}} sobre honorarios y servicios de personas físicas, vigente desde el 1 de julio de {{anio}} con la Ley 30-26.",
  intro: [
    "Cuando una empresa le paga honorarios a una persona física, le retiene una parte para el ISR. Desde el 1 de julio de 2026 esa retención es del {{do.retencion-honorarios}}.",
    "Pon el monto de los honorarios y ves cuánto te retienen y cuánto recibes.",
  ],
  comoSeCalcula: [
    "La retención es el {{do.retencion-honorarios}} del monto de los honorarios, sin el ITBIS.",
    "Lo que recibes es el monto menos la retención.",
    "La retención es un pago a cuenta: la restas del ISR en tu declaración anual.",
  ],
  ejemplo: [
    "Por honorarios de RD$50,000 te retienen RD$7,500 y recibes RD$42,500.",
  ],
  faq: [
    { pregunta: "¿Cuánto es la retención a honorarios en 2026?", respuesta: "El {{do.retencion-honorarios}} desde el 1 de julio de 2026. Antes era 10 %." },
    { pregunta: "¿Quién tiene que retener?", respuesta: "Las empresas y los negocios de único dueño. Una persona física sin negocio no retiene." },
    { pregunta: "¿Pierdo ese dinero?", respuesta: "No. Es un adelanto del ISR del año: lo restas en tu IR-1." },
  ],
  glosario: [
    { termino: "Retención", definicion: "Parte del pago que el pagador entrega a la DGII a tu nombre." },
    { termino: "Pago a cuenta", definicion: "Un adelanto del impuesto anual." },
  ],
});
