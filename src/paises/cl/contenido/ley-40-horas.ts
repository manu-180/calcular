import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.ley-40-horas",
  h1: "Calculadora de la Ley de 40 horas",
  title: "Ley 40 horas: tu jornada máxima hoy y la próxima rebaja",
  description:
    "Revisa si tu contrato cumple la Ley 40 horas: hoy la jornada máxima es de {{cl.jornada-maxima}} a la semana, repartidas en {{cl.jornada-dias-minimo}} a {{cl.jornada-dias-maximo}} días.",
  intro: [
    "La Ley 21.561 baja la jornada laboral por etapas: 44 horas desde abril de 2024, 42 desde el 26 de abril de 2026 y 40 desde el 26 de abril de 2028.",
    "Escribe las horas de tu contrato y los días que trabajas. Te decimos si pasan el máximo de hoy y cuándo viene la próxima rebaja.",
  ],
  comoSeCalcula: [
    "Comparamos tus horas semanales con la jornada máxima vigente: {{cl.jornada-maxima}}.",
    "Repartimos la jornada legal en tus días de trabajo. La jornada completa se reparte en {{cl.jornada-dias-minimo}} o {{cl.jornada-dias-maximo}} días, y nunca más de {{cl.jornada-diaria-maxima}} ordinarias por día.",
    "Te mostramos la próxima etapa de la ley, con su fecha.",
  ],
  ejemplo: ["Si tu contrato dice 44 horas, desde el 26 de abril de 2026 pasa la jornada máxima por 2 horas. Con 5 días de trabajo, la jornada legal es de 8,4 horas diarias."],
  faq: [
    {
      pregunta: "¿Cuándo empieza la jornada de 40 horas?",
      respuesta: "El 26 de abril de 2028. Hasta esa fecha el máximo es de 42 horas semanales.",
    },
    {
      pregunta: "¿Me pueden bajar el sueldo por la reducción de jornada?",
      respuesta: "No. La ley dice que la rebaja de la jornada no puede reducir tu remuneración.",
    },
    {
      pregunta: "¿Qué pasa con las horas extra?",
      respuesta: "Se pagan sobre la nueva jornada. Como la jornada es más corta, el valor de cada hora sube. Usa la calculadora de horas extra para ver cuánto.",
    },
    {
      pregunta: "¿A quién no se le aplica?",
      respuesta: "A quienes no tienen límite de jornada, como gerentes o personas que trabajan sin fiscalización superior inmediata, entre otras excepciones del Código del Trabajo.",
    },
  ],
  glosario: [
    { termino: "Jornada ordinaria", definicion: "Horas de trabajo pactadas en tu contrato, sin contar horas extra." },
    { termino: "Ley 21.561", definicion: "Ley que reduce la jornada laboral de 45 a 40 horas semanales por etapas." },
  ],
});
