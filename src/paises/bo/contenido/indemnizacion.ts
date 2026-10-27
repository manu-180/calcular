import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.indemnizacion",
  h1: "Calculadora de indemnización y desahucio en Bolivia",
  title: "Indemnización y desahucio Bolivia {{anio}}: calcule ambos",
  description: "Calcule su indemnización (un sueldo por año) y el desahucio de {{bo.desahucio-sueldos}} sueldos por despido sin causa, con el método del Ministerio de Trabajo.",
  intro: [
    "La indemnización en Bolivia es un sueldo promedio por cada año trabajado, más la parte proporcional de los meses y días. Corresponde al terminar el trabajo, también si usted renunció, siempre que haya trabajado más de {{bo.indemnizacion-dias-minimos}} seguidos.",
    "El desahucio se suma solo si lo despidieron sin causa justificada.",
  ],
  comoSeCalcula: [
    "La base es el promedio del total ganado de los 3 meses anteriores al retiro.",
    "Por cada año se paga un sueldo; por cada mes, un doceavo; por cada día, 1/360.",
    "Hace falta haber trabajado más de {{bo.indemnizacion-dias-minimos}} seguidos.",
    "El desahucio son {{bo.desahucio-sueldos}} sueldos y se paga además de la indemnización.",
    "Si ya cobró quinquenios, esos años ya están pagados y se descuentan.",
  ],
  ejemplo: [
    "Ejemplo de la guía del Ministerio de Trabajo: con un sueldo promedio de Bs 2.164 y 1 año, 1 mes y 3 días, la indemnización es 2.164 + 180,33 + 18,03 = Bs 2.362,36.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula la indemnización en Bolivia?",
      respuesta: "Se toma el promedio del total ganado de los 3 meses anteriores al retiro. Se paga un sueldo por cada año, un doceavo por cada mes y 1/360 por cada día.",
    },
    {
      pregunta: "¿Cuánto es el desahucio?",
      respuesta: "{{bo.desahucio-sueldos}} sueldos, solo si lo despidieron sin causa justificada. Se paga además de la indemnización.",
    },
    {
      pregunta: "¿Cuándo no corresponde la indemnización?",
      respuesta: "Si trabajó {{bo.indemnizacion-dias-minimos}} o menos, o si lo despidieron por una de las causas del artículo 16 de la Ley General del Trabajo (por ejemplo, robo, abuso de confianza o daño intencional a los instrumentos de trabajo).",
    },
    {
      pregunta: "¿El desahucio corresponde si renuncio?",
      respuesta: "No. El desahucio es solo para el despido sin causa justificada.",
    },
    {
      pregunta: "¿Me pueden dar un preaviso en lugar del desahucio?",
      respuesta: "No. La Sentencia Constitucional 0009/2017 eliminó el preaviso. Si lo despiden sin causa, corresponde el desahucio.",
    },
  ],
  glosario: [
    { termino: "Indemnización por tiempo de servicios", definicion: "Compensación por el desgaste del trabajo: un sueldo por año, proporcional en meses y días." },
    { termino: "Desahucio", definicion: "Compensación por despido sin causa justificada, además de la indemnización." },
    { termino: "Quinquenio", definicion: "La indemnización de cada {{bo.quinquenio-anios}} cobrada por adelantado." },
  ],
});
