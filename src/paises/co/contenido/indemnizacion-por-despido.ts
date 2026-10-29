import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.indemnizacion-por-despido",
  h1: "Calculadora de indemnización por despido sin justa causa",
  title: "Indemnización por despido sin justa causa {{anio}}: calcúlala",
  description:
    "Calcula tu indemnización por despido sin justa causa en contrato indefinido o a término fijo con la tabla del artículo 64 del Código Sustantivo del Trabajo.",
  intro: [
    "Si te despiden sin justa causa con contrato indefinido y ganas menos de {{co.indemnizacion-umbral}}, te pagan {{co.indemnizacion-dias[primer-anio-menor]}} de salario por el primer año y {{co.indemnizacion-dias[anio-adicional-menor]}} por cada año siguiente. Con contrato a término fijo, los salarios que faltaban.",
    "Escribe tu salario, tu tipo de contrato y tus fechas. La calculadora aplica la tabla del artículo 64 y te da el valor exacto.",
  ],
  comoSeCalcula: [
    "Contrato a término indefinido, si ganas menos de {{co.indemnizacion-umbral}}: {{co.indemnizacion-dias[primer-anio-menor]}} de salario por el primer año y {{co.indemnizacion-dias[anio-adicional-menor]}} por cada año siguiente, en proporción por la fracción.",
    "Si ganas {{co.indemnizacion-umbral}} o más: {{co.indemnizacion-dias[primer-anio-mayor]}} por el primer año y {{co.indemnizacion-dias[anio-adicional-mayor]}} por cada año siguiente.",
    "Con menos de un año de trabajo te pagan los días del primer año completos.",
    "Contrato a término fijo: los salarios del tiempo que faltaba para terminar el contrato.",
    "El salario diario es tu salario mensual dividido por 30. Los años se cuentan de 360 días.",
  ],
  ejemplo: [
    "Con un salario de $3.000.000 y dos años trabajados en un contrato indefinido, te tocan 50 días de salario: $5.000.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me pagan si me despiden sin justa causa?",
      respuesta: "Con contrato indefinido y salario menor a {{co.indemnizacion-umbral}}, {{co.indemnizacion-dias[primer-anio-menor]}} de salario por el primer año y {{co.indemnizacion-dias[anio-adicional-menor]}} por cada año más. Además te pagan tu liquidación.",
    },
    {
      pregunta: "¿Me pagan indemnización si renuncio?",
      respuesta: "Solo si renuncias por una justa causa que causó la empresa. En ese caso la ley la trata como un despido sin justa causa.",
    },
    {
      pregunta: "¿La indemnización incluye la liquidación?",
      respuesta: "No. La indemnización es aparte. Además te tienen que pagar cesantías, intereses, prima y vacaciones pendientes.",
    },
    {
      pregunta: "¿Qué pasa si llevo menos de un año?",
      respuesta: "En un contrato indefinido te pagan los días del primer año completos, aunque hayas trabajado pocos meses.",
    },
    {
      pregunta: "¿La reforma laboral cambió la indemnización?",
      respuesta: "No. La Ley 2466 de 2025 no modificó el artículo 64 del Código Sustantivo del Trabajo.",
    },
  ],
  glosario: [
    { termino: "Justa causa", definicion: "Un motivo que la ley permite para terminar el contrato sin pagar indemnización, como faltas graves del trabajador." },
    { termino: "Contrato a término fijo", definicion: "Contrato con una fecha de terminación pactada desde el inicio." },
  ],
});
