import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.costo-empleador",
  h1: "Calculadora de costo de un empleado",
  title: "Costo de un empleado en Bolivia {{anio}}: calcúlelo",
  description: "Calcule cuánto le cuesta un trabajador por mes y por año: caja de salud, aportes patronales a la Gestora y provisiones de aguinaldo e indemnización.",
  intro: [
    "Un sueldo le cuesta a la empresa más que el total ganado: hay aportes que paga el empleador y beneficios que conviene ir guardando cada mes.",
    "Escriba el total ganado mensual del trabajador.",
  ],
  comoSeCalcula: [
    "Caja de salud: {{bo.aporte-salud-patronal}} del total ganado, a cargo del empleador.",
    "Gestora: aporte patronal solidario de {{bo.aportes-patronales[solidario]}} y riesgo profesional de {{bo.aportes-patronales[riesgo-profesional]}}.",
    "Provisiones: un doceavo del total ganado por mes para el aguinaldo y otro para la indemnización.",
    "El costo anual es el mensual por 12.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto paga el empleador además del sueldo?",
      respuesta: "La caja de salud ({{bo.aporte-salud-patronal}}) y los aportes patronales a la Gestora. Además conviene provisionar el aguinaldo y la indemnización, que se pagan con un sueldo por año cada uno.",
    },
    {
      pregunta: "¿Por qué se provisiona la indemnización?",
      respuesta: "Porque corresponde un sueldo por año trabajado tanto si el trabajador renuncia como si lo despiden. Guardar un doceavo por mes evita que el pago llegue de golpe.",
    },
    {
      pregunta: "¿Incluye el aporte para vivienda?",
      respuesta: "No. Solo sumamos los aportes que pudimos verificar en fuente oficial. Si su empresa paga un aporte para vivienda u otro de su sector, súmelo aparte.",
    },
  ],
  glosario: [
    { termino: "Aporte patronal", definicion: "El aporte que paga el empleador por cada trabajador, aparte del sueldo." },
    { termino: "Provisión", definicion: "Dinero que la empresa aparta cada mes para un pago futuro." },
  ],
});
