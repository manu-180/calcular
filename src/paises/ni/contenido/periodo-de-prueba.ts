import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.periodo-de-prueba",
  h1: "Calculadora del período de prueba en Nicaragua",
  title: "Período de prueba en Nicaragua: hasta qué día dura",
  description: "Calculá el último día de tu período de prueba en Nicaragua: hasta {{ni.periodo-prueba-dias}} en un contrato por tiempo indeterminado y {{ni.periodo-prueba-domestico-dias}} en el trabajo doméstico.",
  intro: [
    "En un contrato por tiempo indeterminado, vos y el empleador pueden pactar un período de prueba de hasta {{ni.periodo-prueba-dias}}. En ese tiempo cualquiera de los dos puede terminar la relación sin indemnización.",
    "Poné tu primer día de trabajo y te decimos hasta qué día dura la prueba.",
  ],
  comoSeCalcula: [
    "Se cuenta desde tu primer día de trabajo, incluido.",
    "Contrato por tiempo indeterminado: hasta {{ni.periodo-prueba-dias}}, solo si lo pactaron.",
    "Trabajo doméstico: los primeros {{ni.periodo-prueba-domestico-dias}} son de prueba por ley.",
  ],
  ejemplo: ["Si empezaste el 1 de octubre de 2026 con un contrato por tiempo indeterminado, la prueba termina el 30 de octubre de 2026."],
  faq: [
    {
      pregunta: "¿Cuánto dura el período de prueba en Nicaragua?",
      respuesta: "Hasta {{ni.periodo-prueba-dias}} en un contrato por tiempo indeterminado. En el trabajo doméstico son {{ni.periodo-prueba-domestico-dias}}.",
    },
    {
      pregunta: "¿Me pueden despedir en el período de prueba sin pagarme nada?",
      respuesta: "No te pagan indemnización por antigüedad. Sí te tienen que pagar los días trabajados y las prestaciones proporcionales.",
    },
    {
      pregunta: "¿Hay período de prueba en un contrato por tiempo determinado?",
      respuesta: "No. El Código del Trabajo lo permite solo en los contratos por tiempo indeterminado.",
    },
    {
      pregunta: "¿Qué pasa cuando termina la prueba?",
      respuesta: "Seguís trabajando con todos tus derechos. Desde ahí, si te despiden sin causa justificada te corresponde la indemnización por antigüedad.",
    },
  ],
  glosario: [
    { termino: "Período de prueba", definicion: "Los primeros días del contrato en los que cualquiera de las dos partes puede terminarlo sin responsabilidad." },
    { termino: "Contrato por tiempo indeterminado", definicion: "El que no tiene fecha de fin. Es el contrato que se presume si no se pactó un plazo." },
  ],
});
