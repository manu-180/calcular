import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.vacaciones",
  h1: "Calculadora de vacaciones",
  title: "Vacaciones en Nicaragua: calculá días y pago",
  description: "Calculá cuántos días de vacaciones acumulaste y cuánto te tienen que pagar. Son {{ni.vacaciones-dias-por-semestre}} por cada seis meses de trabajo, según el Código del Trabajo.",
  intro: [
    "Por cada seis meses de trabajo con el mismo empleador te tocan {{ni.vacaciones-dias-por-semestre}} de descanso pagado.",
    "Poné tu salario, desde cuándo acumulás vacaciones y los días que ya gozaste. Te mostramos los días pendientes y cuánto valen.",
  ],
  comoSeCalcula: [
    "Se cuentan los días trabajados en el período, de punta a punta.",
    "Se ganan {{ni.vacaciones-dias-por-semestre}} por cada seis meses. Lo calculamos día por día sobre 365.",
    "Se restan los días que ya gozaste.",
    "Cada día pendiente se paga con tu salario diario: el último salario ordinario dividido entre 30. Si tu salario varía, el promedio de los últimos seis meses.",
  ],
  ejemplo: ["Del 1 de enero al 30 de junio de 2026 hay 181 días: ganaste 14.88 días. Con un salario de C$9,000 (C$300 diarios), valen C$4,464."],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me tocan por año?",
      respuesta: "El doble de lo que te toca por semestre: {{ni.vacaciones-dias-por-semestre}} cada seis meses de trabajo continuo.",
    },
    {
      pregunta: "¿Me pagan las vacaciones si dejo el trabajo?",
      respuesta: "Sí. Al terminar el contrato te pagan la parte proporcional de las vacaciones que no gozaste, sea cual sea la causa.",
    },
    {
      pregunta: "¿Si me enfermo pierdo días de vacaciones?",
      respuesta: "No. Una enfermedad, un permiso u otra causa justa no cortan la cuenta de días trabajados.",
    },
    {
      pregunta: "¿Quién decide cuándo me voy de vacaciones?",
      respuesta: "El empleador tiene que hacer un calendario de vacaciones y darlo a conocer. Las fechas se pueden acordar entre los dos.",
    },
  ],
  glosario: [
    { termino: "Salario ordinario", definicion: "Lo que cobrás por tu jornada normal, sin horas extras ni pagos ocasionales." },
    { termino: "Vacaciones proporcionales", definicion: "Los días que ganaste en un período que todavía no llega a seis meses." },
  ],
});
