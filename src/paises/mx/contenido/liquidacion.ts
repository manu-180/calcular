import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.liquidacion",
  h1: "Calculadora de liquidación por despido injustificado",
  title: "Calculadora de liquidación por despido {{anio}} (LFT)",
  description:
    "Calcula tu liquidación por despido injustificado: {{mx.meses-indemnizacion}} de salario, prima de antigüedad, {{mx.dias-indemnizacion-anio}} por año y tu finiquito. Gratis y paso a paso.",
  intro: [
    "Si te despidieron sin causa justificada, te toca una liquidación: {{mx.meses-indemnizacion}} de salario de indemnización, la prima de antigüedad y tu finiquito. En algunos casos se suman {{mx.dias-indemnizacion-anio}} de salario por cada año trabajado.",
    "Escribe tu sueldo y tus fechas de entrada y salida. Te mostramos cada concepto por separado, con el artículo de la Ley Federal del Trabajo que lo respalda.",
  ],
  comoSeCalcula: [
    "Indemnización constitucional: {{mx.meses-indemnizacion}} de salario, contando 30 días por mes. Se usa tu salario diario integrado (con la parte de aguinaldo, prima vacacional y otras prestaciones).",
    "Prima de antigüedad: {{mx.dias-prima-antiguedad}} de salario por año de servicio. El salario se topa en {{mx.tope-prima-antiguedad}} veces el salario mínimo de tu zona.",
    "Días por año de servicio: {{mx.dias-indemnizacion-anio}} de salario por cada año, si procede (artículo 50, fracción II).",
    "Finiquito: días sin pagar, aguinaldo y vacaciones proporcionales y prima vacacional.",
    "La indemnización, la prima de antigüedad y los días por año no pagan ISR hasta {{mx.exencion-indemnizacion}} por cada año de servicio. Hoy una UMA vale {{mx.uma-diaria}}.",
  ],
  ejemplo: [
    "Entraste el 1 de enero de 2024, ganas 12,000 pesos al mes (400 al día) y te despiden el 30 de junio de 2026. La indemnización de 3 meses es de 36,000 pesos.",
    "Con la prima de antigüedad (11,980.27 pesos) y tu finiquito (6,942.47 pesos), tu liquidación suma 54,922.74 pesos brutos, sin los días por año del artículo 50.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me toca de liquidación si me despiden?",
      respuesta: "Por lo menos {{mx.meses-indemnizacion}} de salario, la prima de antigüedad y tu finiquito. Si procede, se suman {{mx.dias-indemnizacion-anio}} de salario por cada año trabajado.",
    },
    {
      pregunta: "¿Siempre me tienen que pagar los {{mx.dias-indemnizacion-anio}} por año?",
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
