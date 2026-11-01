import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.asignacion-familiar",
  h1: "Calculadora de asignación familiar {{anio}}",
  title: "Asignación familiar {{anio}}: monto por carga y tramo",
  description: "Calcula tu asignación familiar {{anio}} según tu ingreso y tus cargas. Montos de la Ley 21.830, vigentes desde mayo de {{anio}}.",
  intro: [
    "La asignación familiar es un monto mensual por cada carga que tengas reconocida (hijos, cónyuge, padres que dependen de ti). Cuánto recibes depende de tu ingreso.",
    "Escribe tu ingreso mensual y tus cargas. Te decimos tu tramo y el total al mes.",
  ],
  comoSeCalcula: [
    "Tu ingreso define el tramo: A, B, C o D. Cada tramo tiene un monto fijo por carga.",
    "El monto por carga se multiplica por la cantidad de cargas.",
    "En el tramo D no hay pago en dinero, pero las cargas se mantienen reconocidas.",
  ],
  ejemplo: ["Si ganas $600.000 y tienes dos hijos como carga, estás en el tramo A: recibes $45.202 al mes."],
  faq: [
    {
      pregunta: "¿Qué ingreso se usa para definir el tramo?",
      respuesta: "Por regla general, el promedio de tus ingresos de enero a junio, y ese tramo rige de julio a junio del año siguiente. Si tienes dudas sobre tu caso, tu caja de compensación o el IPS te dicen qué tramo tienes.",
    },
    {
      pregunta: "¿Quiénes pueden ser carga?",
      respuesta: "Entre otros, hijos y cónyuge que dependen de ti, con los requisitos de edad y estudios que fija la ley. Las reconoce tu caja de compensación, el IPS o tu empleador.",
    },
    {
      pregunta: "¿Qué es el subsidio familiar (SUF)?",
      respuesta: "Es un aporte parecido para familias de menores recursos que no reciben asignación familiar. Hoy es de {{cl.subsidio-familiar}} por carga.",
    },
    {
      pregunta: "¿Cuándo cambian los montos?",
      respuesta: "Cuando sube el ingreso mínimo. Según la Ley 21.830, los límites de ingreso suben otra vez el 1 de enero de 2027.",
    },
  ],
  glosario: [
    { termino: "Carga familiar", definicion: "Persona que depende económicamente de ti y está reconocida para recibir la asignación." },
    { termino: "Tramo", definicion: "Rango de ingreso que define el monto por carga." },
  ],
});
