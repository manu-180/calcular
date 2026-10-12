import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.liquidacion-por-renuncia",
  h1: "Calculadora de liquidación por renuncia en Panamá",
  title: "Liquidación por renuncia en Panamá: cuánto te toca",
  description:
    "Calcula lo que cobras si renuncias en Panamá: prima de antigüedad, vacaciones y décimo proporcional. Incluye el descuento si no das el aviso de {{pa.preaviso-renuncia-dias}}.",
  intro: [
    "Si renuncias a un contrato por tiempo indefinido, te toca la prima de antigüedad ({{pa.prima-antiguedad-semanas}} semana de salario por año), las vacaciones que no tomaste y el décimo tercer mes proporcional. No te toca indemnización.",
    "Escribe tu salario, tus fechas y los meses desde tus últimas vacaciones. Te mostramos cada parte y el total.",
  ],
  comoSeCalcula: [
    "Prima de antigüedad: salario semanal (mensual por 12 entre 52) por los años trabajados, con la fracción del último año.",
    "Vacaciones: salario mensual por los meses pendientes, dividido entre {{pa.vacaciones-meses}}.",
    "Décimo proporcional: lo ganado desde el último corte (16 de diciembre, 16 de abril o 16 de agosto), más las vacaciones que te pagan, dividido entre {{pa.decimo-divisor}}.",
    "Si no diste el aviso de {{pa.preaviso-renuncia-dias}}, se resta {{pa.penalidad-sin-preaviso-semanas}} semana de salario.",
  ],
  ejemplo: [
    "Con B/. 1,300 al mes, 8 años justos y 5 meses de vacaciones pendientes, al 12 de octubre de 2026: prima B/. 2,400, vacaciones B/. 590.91 y décimo B/. 255.08. Total B/. 3,245.99.",
  ],
  faq: [
    {
      pregunta: "¿Qué me pagan si renuncio en Panamá?",
      respuesta: "Prima de antigüedad (si tu contrato era por tiempo indefinido), vacaciones pendientes, décimo proporcional y los salarios que te deban.",
    },
    {
      pregunta: "¿Me pagan indemnización si renuncio?",
      respuesta: "No, salvo que sea una renuncia justificada: por ejemplo, si no te pagan el salario completo o te maltratan. Para ese caso usa la calculadora de renuncia justificada.",
    },
    {
      pregunta: "¿Cuánto tiempo de aviso tengo que dar?",
      respuesta: "{{pa.preaviso-renuncia-dias}} por escrito, o {{pa.preaviso-renuncia-tecnico-meses}} si eres trabajador técnico. Sin aviso te pueden descontar una semana de salario.",
    },
    {
      pregunta: "¿Cuándo me tienen que pagar la liquidación?",
      respuesta: "Al terminar la relación. Si hay demora, puedes reclamar en el MITRADEL.",
    },
  ],
  glosario: [
    { termino: "Prima de antigüedad", definicion: "Una semana de salario por cada año trabajado, que se paga al terminar un contrato indefinido." },
    { termino: "Décimo proporcional", definicion: "La parte del décimo tercer mes que ganaste desde el último pago." },
  ],
});
