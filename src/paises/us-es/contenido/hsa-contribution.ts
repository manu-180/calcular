import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.hsa-contribution",
  h1: "Calculadora de aportes a la HSA",
  title: "Calculadora de límite de HSA {{anio}}",
  description: "Mira tu límite de {{anio}} en la cuenta de ahorros para la salud: {{us.hsa-self-only}} individual, {{us.hsa-family}} familiar, más el catch-up a los 55.",
  intro: [
    "Una cuenta de ahorros para la salud (HSA) te permite apartar dinero antes de impuestos para gastos médicos si tienes un plan de salud con deducible alto.",
    "Elige tu cobertura, tu edad y los meses en que fuiste elegible para ver cuánto puedes aportar todavía este año.",
  ],
  comoSeCalcula: [
    "El límite de 2026 es de {{us.hsa-self-only}} con cobertura individual y {{us.hsa-family}} con cobertura familiar.",
    "Si tienes 55 años o más al final del año, puedes sumar {{us.hsa-catch-up}}.",
    "Si no fuiste elegible todo el año, el límite se prorratea por los meses en que tenías cobertura HDHP el primer día del mes.",
    "Los aportes del empleador cuentan para el mismo límite, así que se restan de lo que tú puedes aportar.",
  ],
  ejemplo: [
    "Con cobertura familiar todo el año, 56 años y $1,000 de tu empleador, tu límite es de $9,750 y puedes aportar $8,750 más.",
  ],
  faq: [
    { pregunta: "¿Cuáles son los límites de la HSA para 2026?", respuesta: "{{us.hsa-self-only}} con cobertura individual y {{us.hsa-family}} con cobertura familiar. Las personas de 55 años o más pueden sumar {{us.hsa-catch-up}}." },
    { pregunta: "¿Mi cónyuge y yo podemos hacer los dos aportes catch-up?", respuesta: "Sí, si ambos tienen 55 años o más, pero cada catch-up tiene que ir a la cuenta del cónyuge que califica." },
    { pregunta: "¿Puedo seguir aportando cuando me inscribo en Medicare?", respuesta: "No. Desde el primer mes en que estás inscrito en Medicare ya no puedes aportar, aunque puedes seguir usando el dinero de la cuenta." },
  ],
  glosario: [
    { termino: "HDHP", definicion: "Un plan de salud con deducible alto que cumple las reglas del IRS sobre deducible mínimo y gastos máximos de bolsillo." },
    { termino: "Regla del último mes", definicion: "Si eres elegible el 1 de diciembre, se te trata como elegible todo el año, con un período de prueba posterior." },
  ],
});
