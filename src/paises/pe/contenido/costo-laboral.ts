import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.costo-laboral",
  h1: "Calculadora de costo laboral: cuánto cuesta un trabajador",
  title: "Costo laboral en Perú: cuánto cuesta un trabajador",
  description:
    "Calcula cuánto le cuesta a la empresa un trabajador en planilla: EsSalud, gratificaciones con bonificación extraordinaria y CTS, por mes y por año.",
  intro: [
    "Un trabajador en planilla cuesta más que su sueldo. Además de las 12 remuneraciones, la empresa paga EsSalud, dos gratificaciones con su bonificación y dos depósitos de CTS.",
    "Aquí ves el costo total del año y el promedio por mes, en el régimen general o en la pequeña empresa.",
  ],
  comoSeCalcula: [
    "EsSalud: {{pe.aporte-essalud}} de la remuneración cada mes, nunca sobre menos que la remuneración mínima vital.",
    "Gratificaciones de julio y diciembre: un sueldo cada una en el régimen general y medio sueldo en la pequeña empresa. Se suma la bonificación extraordinaria de {{pe.bonificacion-extraordinaria[essalud]}} ({{pe.bonificacion-extraordinaria[eps]}} si el trabajador está en una EPS).",
    "CTS de mayo y noviembre: la remuneración más un sexto de la gratificación, por 6 meses, entre 12. En la pequeña empresa es la mitad.",
    "La asignación familiar ({{pe.asignacion-familiar}} de la remuneración mínima vital) se suma a la remuneración y entra en todos los cálculos.",
  ],
  ejemplo: [
    "Un sueldo de S/ 3,000 en el régimen general cuesta S/ 49,280 al año: S/ 36,000 de sueldos, S/ 3,240 de EsSalud, S/ 6,540 de gratificaciones con bonificación y S/ 3,500 de CTS. En promedio, S/ 4,106.67 al mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto más que el sueldo cuesta un trabajador?",
      respuesta: "Depende del régimen y del seguro de salud. La fila «Costo extra sobre las 12 remuneraciones» te da el porcentaje exacto de tu caso.",
    },
    {
      pregunta: "¿Incluye las vacaciones?",
      respuesta: "Sí. Las vacaciones son días de descanso pagados dentro de las 12 remuneraciones del año, así que no suman un costo aparte. Si el trabajador no las toma, sí hay un pago extra.",
    },
    {
      pregunta: "¿Y la microempresa?",
      respuesta: "No la incluimos: en la microempresa del régimen especial no hay gratificaciones ni CTS, y el seguro de salud funciona distinto.",
    },
    {
      pregunta: "¿Incluye el SCTR o un seguro de vida?",
      respuesta: "No. Esos seguros se contratan con una aseguradora y su costo depende de la póliza, así que súmalos aparte si tu empresa los paga.",
    },
  ],
  glosario: [
    { termino: "Costo laboral", definicion: "Todo lo que paga la empresa por un trabajador: remuneraciones, aportes y beneficios sociales." },
    { termino: "Remuneración computable", definicion: "La base de la CTS: remuneración más un sexto de la gratificación del semestre." },
  ],
});
