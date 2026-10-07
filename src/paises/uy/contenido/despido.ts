import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.despido",
  h1: "Calculadora de indemnización por despido",
  title: "Indemnización por despido en Uruguay: calculala",
  description:
    "Calculá tu indemnización por despido común: un sueldo por año o fracción hasta {{uy.despido-tope-meses}}, o {{uy.despido-jornales-anio}} jornales por año si sos jornalero.",
  intro: [
    "Si te despiden sin notoria mala conducta, te corresponde una indemnización. Para un mensual es un sueldo por cada año o fracción trabajada, con un tope.",
    "Para jornaleros y destajistas se cuenta en jornales, según los días trabajados en cada año.",
  ],
  comoSeCalcula: [
    "Mensuales: se cuentan los años desde el ingreso hasta el despido. Cada fracción de año cuenta como un año entero, con un tope de {{uy.despido-tope-meses}}.",
    "La base es la remuneración total del mes: sueldo, promedio de horas extra y comisiones, más la parte de aguinaldo (sueldo / 12) y la de licencia (sueldo / 30 por los días anuales / 12), como indica el MTSS.",
    "Jornaleros: {{uy.despido-jornales-anio}} por cada año con 240 jornales trabajados. En los años que no llegan a 240, 2 jornales por cada 25 trabajados.",
    "El tope para jornaleros es de {{uy.despido-tope-jornales}}. Con menos de 100 jornales trabajados no nace el derecho.",
  ],
  ejemplo: [
    "Un mensual de $ 50.000 que entró el 1/3/2023 y fue despedido el 7/10/2026 suma 4 años (3 y una fracción). Su base es $ 56.944,45 y la indemnización, $ 227.777,80.",
  ],
  faq: [
    {
      pregunta: "¿La indemnización por despido paga IRPF?",
      respuesta: "No, mientras sea la indemnización legal. Lo que cobres por encima del mínimo legal sí paga IRPF por la diferencia.",
    },
    {
      pregunta: "¿Se descuentan aportes de la indemnización?",
      respuesta: "No. La indemnización por despido no lleva descuentos jubilatorios.",
    },
    {
      pregunta: "¿Necesito una antigüedad mínima?",
      respuesta: "Los mensuales no: desde el primer día les corresponde al menos un sueldo. Las trabajadoras y los trabajadores domésticos tienen derecho desde los 90 días corridos.",
    },
    {
      pregunta: "¿Qué pasa si me mandan al seguro de paro y no me reintegran?",
      respuesta: "Si después de seis meses de seguro de paro no te reintegran, se considera un despido y podés reclamar la indemnización.",
    },
    {
      pregunta: "¿Qué más cobro además de la indemnización?",
      respuesta: "El aguinaldo proporcional, la licencia no gozada y el salario vacacional. Podés calcular todo junto en la liquidación por egreso.",
    },
  ],
  glosario: [
    { termino: "Notoria mala conducta", definicion: "Falta grave que el empleador tiene que probar. Si se prueba, no hay indemnización." },
    { termino: "Jornalero", definicion: "Quien cobra por día o por hora en lugar de un sueldo mensual." },
    { termino: "Despido común", definicion: "El régimen general de indemnización. Hay regímenes especiales con reglas propias." },
  ],
});
