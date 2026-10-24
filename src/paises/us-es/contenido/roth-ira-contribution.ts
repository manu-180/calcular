import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.roth-ira-contribution",
  h1: "Calculadora de aportes a una Roth IRA",
  title: "Calculadora de límite de Roth IRA 2026",
  description: "Mira cuánto puedes poner en una Roth IRA en 2026 según tus ingresos y tu estado civil. Límite de {{us.ira-limit}}, catch-up a los 50 y la hoja de reducción del IRS.",
  intro: [
    "El límite de la Roth IRA baja a medida que suben tus ingresos y desaparece por encima de cierto nivel. Escribe tu AGI modificado y elige tu estado civil para ver tu límite personal de 2026.",
  ],
  comoSeCalcula: [
    "El límite base es de {{us.ira-limit}}, más {{us.ira-catch-up}} si tienes 50 años o más, pero nunca más que tu compensación tributable.",
    "Los solteros y cabezas de familia tienen el límite completo hasta {{us.roth-phaseout-start[single]}} de MAGI y nada desde {{us.roth-phaseout-end[single]}}. En una declaración conjunta el rango va de {{us.roth-phaseout-start[mfj]}} a {{us.roth-phaseout-end[mfj]}}.",
    "Dentro del rango, el límite baja en proporción a cuánto avanzaste en el rango. El resultado se redondea hacia arriba a los siguientes $10, y cualquier valor entre cero y {{us.roth-minimum}} pasa a ser {{us.roth-minimum}}.",
  ],
  ejemplo: [
    "Una persona soltera de 35 años con $160,000 de MAGI está $7,000 dentro del rango de reducción de $15,000. El límite baja 46.7%, de $7,500 a $4,000.",
  ],
  faq: [
    { pregunta: "¿Cuál es el límite de la Roth IRA para 2026?", respuesta: "{{us.ira-limit}}, más un catch-up de {{us.ira-catch-up}} si tienes 50 años o más. El mismo límite se comparte con cualquier IRA tradicional." },
    { pregunta: "¿Y si mis ingresos son demasiado altos?", respuesta: "Todavía puedes hacer un aporte no deducible a una IRA tradicional. Muchas personas luego lo convierten a una Roth IRA, una estrategia conocida como backdoor Roth. Si tienes otro dinero antes de impuestos en una IRA, consulta antes con un profesional de impuestos." },
    { pregunta: "¿Hasta cuándo puedo aportar para 2026?", respuesta: "Hasta la fecha límite para declarar en abril de 2027, sin contar prórrogas." },
  ],
  glosario: [
    { termino: "Roth IRA", definicion: "Una cuenta de jubilación que se financia con dinero después de impuestos. Los retiros que califican en la jubilación están libres de impuestos." },
    { termino: "AGI modificado", definicion: "Tu AGI con algunas partidas sumadas de nuevo y sin los ingresos de conversiones a Roth." },
  ],
});
