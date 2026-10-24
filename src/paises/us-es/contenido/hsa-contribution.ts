import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.hsa-contribution",
  h1: "Calculadora de aportes a la HSA",
  title: "Calculadora de límite de HSA 2026",
  description: "Vea su límite de 2026 en la cuenta de ahorros para la salud: {{us.hsa-self-only}} con cobertura individual, {{us.hsa-family}} familiar, más el catch-up a los 55. Prorrateado por mes.",
  intro: [
    "Una cuenta de ahorros para la salud (HSA) le permite apartar dinero antes de impuestos para gastos médicos si tiene un plan de salud con deducible alto.",
    "Indique su cobertura, su edad y los meses en que fue elegible para ver cuánto puede aportar todavía este año.",
  ],
  comoSeCalcula: [
    "El límite de 2026 es de {{us.hsa-self-only}} con cobertura individual y {{us.hsa-family}} con cobertura familiar.",
    "Si tiene 55 años o más al final del año, puede sumar {{us.hsa-catch-up}}.",
    "Si no fue elegible todo el año, el límite se prorratea por los meses en que tenía cobertura HDHP el primer día del mes.",
    "Los aportes del empleador cuentan para el mismo límite, así que se restan de lo que usted puede aportar.",
  ],
  ejemplo: [
    "Con cobertura familiar todo el año, 56 años y $1,000 de su empleador, su límite es de $9,750 y puede aportar $8,750 más.",
  ],
  faq: [
    { pregunta: "¿Cuáles son los límites de la HSA para 2026?", respuesta: "{{us.hsa-self-only}} con cobertura individual y {{us.hsa-family}} con cobertura familiar. Las personas de 55 años o más pueden sumar {{us.hsa-catch-up}}." },
    { pregunta: "¿Mi cónyuge y yo podemos hacer los dos aportes catch-up?", respuesta: "Sí, si ambos tienen 55 años o más, pero cada catch-up tiene que ir a la cuenta del cónyuge que califica." },
    { pregunta: "¿Puedo seguir aportando cuando me inscribo en Medicare?", respuesta: "No. Desde el primer mes en que está inscrito en Medicare ya no puede aportar, aunque puede seguir usando el dinero de la cuenta." },
  ],
  glosario: [
    { termino: "HDHP", definicion: "Un plan de salud con deducible alto que cumple las reglas del IRS sobre deducible mínimo y gastos máximos de bolsillo." },
    { termino: "Regla del último mes", definicion: "Si es elegible el 1 de diciembre, se le trata como elegible todo el año, con un período de prueba posterior." },
  ],
});
