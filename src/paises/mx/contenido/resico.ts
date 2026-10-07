import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.resico",
  h1: "Calculadora de ISR en el RESICO para personas físicas",
  title: "RESICO 2026: calcula tu ISR mensual",
  description:
    "Calcula el ISR mensual del Régimen Simplificado de Confianza con las tasas del artículo 113-E de la LISR, y resta lo que te retuvieron empresas.",
  intro: [
    "En el RESICO pagas ISR sobre lo que cobraste en el mes, sin deducir gastos. La tasa depende de cuánto cobraste.",
    "Puedes estar en el RESICO si tus ingresos del año no pasan de {{mx.tope-resico}}.",
  ],
  comoSeCalcula: [
    "Suma lo que cobraste en el mes por tus facturas, sin el IVA.",
    "Busca la tasa que corresponde a ese monto en la tabla del artículo 113-E. La tasa se aplica a todo el monto, no por partes.",
    "Si facturaste a empresas (personas morales), te retuvieron ISR. Ese ISR retenido se resta del que te toca pagar.",
  ],
  faq: [
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
