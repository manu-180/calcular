import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.decimo-tercer-mes-proporcional",
  h1: "Calculadora del décimo tercer mes proporcional en Panamá",
  title: "Décimo proporcional en Panamá: cuánto te toca al salir",
  description:
    "Calcula el décimo tercer mes proporcional que te pagan al dejar un trabajo en Panamá: lo ganado desde el último corte entre {{pa.decimo-divisor}}, menos el {{pa.css-decimo-trabajador}} de Seguro Social.",
  intro: [
    "Cuando terminas una relación de trabajo, te deben la parte del décimo que ganaste desde el último corte (16 de diciembre, 16 de abril o 16 de agosto) hasta tu salida.",
    "Escribe tu salario y tus fechas. Te mostramos desde cuándo se cuenta, los meses del período y el décimo neto.",
  ],
  comoSeCalcula: [
    "Período: desde el último corte (o desde tu ingreso, si entraste después) hasta tu último día.",
    "Décimo bruto: salario por los meses del período, dividido entre {{pa.decimo-divisor}}.",
    "Descuento: {{pa.css-decimo-trabajador}} de Seguro Social. El décimo no lleva seguro educativo.",
  ],
  ejemplo: ["Con B/. 1,300 al mes y salida el 12 de octubre de 2026, el período empieza el 16 de agosto: 1.9 meses. Décimo bruto B/. 205.83 y neto B/. 190.91."],
  faq: [
    {
      pregunta: "¿Me pagan el décimo si renuncio?",
      respuesta: "Sí. El décimo proporcional se paga al terminar la relación por cualquier causa.",
    },
    {
      pregunta: "¿Cuáles son los cortes del décimo?",
      respuesta: "El 15 de abril, el 15 de agosto y el 15 de diciembre. Cada partida cubre los cuatro meses anteriores.",
    },
    {
      pregunta: "¿Las vacaciones generan décimo?",
      respuesta: "Sí. Si te pagan vacaciones al salir, súmalas a lo ganado en el período antes de dividir.",
    },
  ],
  glosario: [
    { termino: "Décimo tercer mes", definicion: "Pago adicional de un doceavo de lo ganado, en tres partidas al año." },
    { termino: "Partida", definicion: "Cada uno de los tres pagos del décimo." },
  ],
});
