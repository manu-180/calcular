import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.liquidacion",
  h1: "Calculadora de liquidación por despido",
  title: "Liquidación por despido 2026: calcula tu indemnización",
  description:
    "Calcula tu liquidación por despido injustificado: {{mx.meses-indemnizacion}} de salario, prima de antigüedad, días por año y tu finiquito. Según la LFT vigente.",
  intro: [
    "Si te despidieron sin una causa justificada, tu empresa te debe una liquidación: tu finiquito más una indemnización.",
    "La indemnización constitucional es de {{mx.meses-indemnizacion}} de salario. A eso se suma la prima de antigüedad y, en algunos casos, {{mx.dias-indemnizacion-anio}} de salario por cada año trabajado.",
  ],
  comoSeCalcula: [
    "Indemnización constitucional: {{mx.meses-indemnizacion}} de salario, contando 30 días por mes. Se usa tu salario diario integrado (con la parte de aguinaldo, prima vacacional y otras prestaciones).",
    "Prima de antigüedad: {{mx.dias-prima-antiguedad}} de salario por año de servicio. El salario se topa en {{mx.tope-prima-antiguedad}} veces el salario mínimo de tu zona.",
    "Días por año de servicio: {{mx.dias-indemnizacion-anio}} de salario por cada año, si procede (artículo 50, fracción II).",
    "Finiquito: días sin pagar, aguinaldo y vacaciones proporcionales y prima vacacional.",
    "La indemnización, la prima de antigüedad y los días por año no pagan ISR hasta {{mx.exencion-indemnizacion}} por cada año de servicio. Hoy una UMA vale {{mx.uma-diaria}}.",
  ],
  faq: [
    {
      pregunta: "¿Siempre me tienen que pagar los días por año de servicio?",
      respuesta: "No siempre. Proceden cuando la empresa no está obligada a reinstalarte o se niega a hacerlo. En la práctica muchas empresas los incluyen al negociar.",
    },
    {
      pregunta: "¿Qué son los salarios vencidos?",
      respuesta: "Si demandas y ganas el juicio, la empresa te paga además los salarios desde el despido, hasta por 12 meses. Esta calculadora no los incluye.",
    },
    {
      pregunta: "¿Cuánto tiempo tengo para reclamar un despido?",
      respuesta: "Pocos meses: acude cuanto antes al Centro de Conciliación de tu estado o a la PROFEDET, que te asesora gratis.",
    },
    {
      pregunta: "¿Qué es el salario diario integrado?",
      respuesta: "Tu salario diario más la parte diaria de tus prestaciones, como aguinaldo y prima vacacional. Suele aparecer en tu recibo como SDI o SBC.",
    },
  ],
  glosario: [
    { termino: "Liquidación", definicion: "Finiquito más indemnización, cuando el despido es injustificado." },
    { termino: "Indemnización constitucional", definicion: "Pago de {{mx.meses-indemnizacion}} de salario por despido injustificado (artículo 123 de la Constitución y artículos 48 y 50 de la Ley Federal del Trabajo)." },
    { termino: "SDI", definicion: "Salario diario integrado: base para calcular la indemnización." },
  ],
});
