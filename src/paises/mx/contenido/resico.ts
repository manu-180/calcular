import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.resico",
  h1: "Calculadora RESICO 2026: ISR mensual de personas físicas",
  title: "Calculadora RESICO 2026: ISR mensual de personas físicas",
  description:
    "Calcula tu pago mensual de ISR en el RESICO con la tabla de tasas del artículo 113-E y resta lo que te retuvieron empresas. Escribe lo que cobraste y listo.",
  intro: [
    "En el RESICO pagas ISR con una tasa baja sobre todo lo que cobraste en el mes, sin deducir gastos. Mientras más cobras, más alta es la tasa, y se aplica a todo el monto.",
    "Puedes estar en el RESICO si tus ingresos del año no pasan de {{mx.tope-resico}}. Escribe lo que cobraste en el mes sin IVA y te decimos cuánto pagas.",
  ],
  comoSeCalcula: [
    "Suma lo que cobraste en el mes por tus facturas, sin el IVA.",
    "Busca la tasa que corresponde a ese monto en la tabla del artículo 113-E de la Ley del ISR. La tasa se aplica a todo el monto, no por partes.",
    "Si facturaste a empresas (personas morales), te retuvieron ISR. Ese ISR retenido se resta del que te toca pagar.",
  ],
  ejemplo: [
    "Si en un mes de 2026 cobraste 30,000 pesos sin IVA, te toca la tasa de 1.10%. Tu ISR del mes es de 330 pesos.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga de ISR en el RESICO?",
      respuesta: "Un porcentaje de lo que cobraste en el mes, según la tabla del artículo 113-E. La calculadora te muestra la tasa que te toca y el ISR a pagar.",
    },
    {
      pregunta: "¿Puedo deducir gastos en el RESICO?",
      respuesta: "No para el pago mensual. El ISR se calcula sobre lo cobrado, sin deducciones.",
    },
    {
      pregunta: "¿Cuándo se paga?",
      respuesta: "A más tardar el día 17 del mes siguiente. Además presentas una declaración anual.",
    },
    {
      pregunta: "¿Qué pasa si paso el límite de ingresos?",
      respuesta: "Desde el mes siguiente dejas de tributar en el RESICO y pasas al régimen que te corresponda, con otras reglas.",
    },
  ],
  glosario: [
    { termino: "RESICO", definicion: "Régimen Simplificado de Confianza para personas físicas con actividad empresarial, profesional o de arrendamiento." },
    { termino: "Persona moral", definicion: "Una empresa o sociedad. Cuando te paga, te retiene ISR." },
  ],
});
