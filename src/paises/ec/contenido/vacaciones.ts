import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.vacaciones",
  h1: "Calculadora de vacaciones",
  title: "Vacaciones en Ecuador 2026: días y cuánto te pagan",
  description: "Calcula tus días de vacaciones ({{ec.vacaciones-dias}} al año, más días por antigüedad) y cuánto te pagan por las proporcionales y las no tomadas.",
  intro: [
    "En Ecuador te corresponden {{ec.vacaciones-dias}} de vacaciones por cada año de trabajo, contando fines de semana y feriados. Después de {{ec.vacaciones-anios-sin-adicional}} con el mismo empleador, se suma un día por año.",
    "Si te vas sin haberlas tomado, te pagan las vacaciones proporcionales y las pendientes. Esta calculadora te dice cuánto.",
  ],
  comoSeCalcula: [
    "Cada año de servicio da {{ec.vacaciones-dias}}. Desde el año siguiente a los primeros {{ec.vacaciones-anios-sin-adicional}}, se suma un día por cada año extra, hasta {{ec.vacaciones-adicionales-max}} adicionales.",
    "El pago es la veinticuatroava parte de lo que ganaste en el año. Por quince días equivale a medio sueldo, así que cada día vale tu sueldo dividido para 30.",
    "Si no completaste el año, cobras la parte proporcional desde tu último aniversario.",
    "Las vacaciones de años anteriores que no tomaste se pagan aparte, a ese mismo valor por día.",
  ],
  ejemplo: [
    "Ganas $900 y llevas 2 años y 7 meses. Desde tu último aniversario acumulaste 8,75 días. Si sales ese día, te pagan $262,50 de vacaciones proporcionales.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me corresponden en Ecuador?",
      respuesta: "{{ec.vacaciones-dias}} por año, incluidos los días no laborables. Desde el sexto año con el mismo empleador se suma un día por año, hasta {{ec.vacaciones-adicionales-max}} adicionales.",
    },
    {
      pregunta: "¿Me pueden pagar los días adicionales en vez de dármelos?",
      respuesta: "Sí. Para los días adicionales por antigüedad, el empleador elige si te los da de descanso o te los paga.",
    },
    {
      pregunta: "¿Puedo acumular vacaciones?",
      respuesta: "Sí, hasta tres años seguidos, para tomarlas juntas en el cuarto año.",
    },
    {
      pregunta: "¿Qué pasa con mis vacaciones si me voy?",
      respuesta: "Te pagan la parte proporcional al tiempo trabajado y las que no tomaste de años anteriores. Van en tu liquidación.",
    },
  ],
  glosario: [
    { termino: "Vacaciones proporcionales", definicion: "La parte de las vacaciones que acumulaste desde tu último aniversario." },
    { termino: "Días adicionales", definicion: "Los días extra por antigüedad que se suman desde el sexto año con el mismo empleador." },
  ],
});
