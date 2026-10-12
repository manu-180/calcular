import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.declaracion-anual",
  h1: "Calculadora de declaración anual para personas físicas",
  title: "Declaración anual: calcula tu saldo a favor del ISR",
  description:
    "Calcula tu ISR anual con la tarifa del artículo 152 y tus deducciones personales, y mira si te sale saldo a favor (devolución) o saldo a cargo.",
  intro: [
    "En la declaración anual se recalcula el ISR de todo el año. Si te retuvieron de más, o tienes deducciones personales, puede salirte saldo a favor y el SAT te lo devuelve.",
    "Escribe tus ingresos gravados del año, el ISR que te retuvieron y tus deducciones personales. Los datos están en tus constancias de retenciones y en tus facturas.",
  ],
  comoSeCalcula: [
    "Las deducciones personales tienen un tope: lo menor entre {{mx.tope-deducciones-uma}} anuales y el {{mx.tope-deducciones-porcentaje}} de tus ingresos.",
    "Base: ingresos gravados menos deducciones dentro del tope.",
    "Se aplica la tarifa anual del ISR: cuota fija más el porcentaje sobre lo que pasa del límite inferior de tu renglón.",
    "Al resultado se le resta el ISR que te retuvieron. Si da negativo, es saldo a favor; si da positivo, tienes que pagar la diferencia.",
  ],
  ejemplo: [
    "Con 300,000 pesos de sueldo, 30,000 de ISR retenido y 40,000 de gastos médicos y colegiaturas, el ISR del año da 32,875.91 y quedan 2,875.91 por pagar. Sin esas deducciones pagarías unos 8,500 más.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se presenta la declaración anual de personas físicas?",
      respuesta: "En abril del año siguiente al ejercicio, en el portal del SAT.",
    },
    {
      pregunta: "¿Qué gastos puedo deducir?",
      respuesta: "Honorarios médicos, dentales y de psicología, gastos hospitalarios, lentes ópticos, primas de seguros de gastos médicos, gastos funerales, intereses reales de crédito hipotecario, donativos, transporte escolar obligatorio y colegiaturas (estas con su propio límite), siempre con factura y pagados con medio electrónico.",
    },
    {
      pregunta: "¿Estoy obligado a presentarla si solo tengo sueldo?",
      respuesta: "No siempre. Si tuviste un solo patrón, ganaste menos de 400,000 pesos y no tienes otros ingresos, no estás obligado, pero puedes presentarla para recuperar un saldo a favor.",
    },
    {
      pregunta: "¿Qué pasa con el subsidio para el empleo?",
      respuesta: "Si tu patrón te aplicó subsidio durante el año, en la declaración se resta del impuesto anual, sin que pueda dar un saldo a favor por sí solo.",
    },
  ],
  glosario: [
    { termino: "Saldo a favor", definicion: "ISR que pagaste de más en el año y que puedes pedir que te devuelvan." },
    { termino: "Deducciones personales", definicion: "Gastos que la Ley del ISR te deja restar de tus ingresos en la declaración anual (artículo 151)." },
  ],
});
