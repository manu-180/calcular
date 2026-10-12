import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.accidente-de-trabajo",
  h1: "Indemnización por accidente de trabajo en Nicaragua",
  title: "Accidente de trabajo en Nicaragua: calculá la indemnización",
  description: "Si un trabajador sin INSS muere o queda incapacitado por un accidente de trabajo en Nicaragua, el empleador paga {{ni.riesgo-indemnizacion-dias}} de salario. Calculalo.",
  intro: [
    "Cuando un trabajador muere o queda con incapacidad total y permanente por un accidente de trabajo o una enfermedad profesional, hay una indemnización.",
    "Si estaba inscrito en el INSS, paga el seguro social. Si el empleador no lo inscribió, la paga el empleador: {{ni.riesgo-indemnizacion-dias}} de salario.",
  ],
  comoSeCalcula: [
    "Salario diario: el último salario mensual dividido entre 30. Si era variable, el promedio de los últimos seis meses.",
    "Indemnización: {{ni.riesgo-indemnizacion-dias}} de ese salario diario.",
    "Se paga en cuotas, como se pagaba el salario, desde la muerte o desde que se determina la incapacidad.",
  ],
  ejemplo: ["Un trabajador sin INSS que ganaba C$9,000 muere en un accidente de trabajo. El empleador debe C$186,000, pagados en cuotas de C$9,000 por mes."],
  faq: [
    {
      pregunta: "¿Cuánto es la indemnización por muerte en un accidente de trabajo?",
      respuesta: "{{ni.riesgo-indemnizacion-dias}} de salario, si el trabajador no estaba inscrito en el INSS. Si estaba inscrito, el INSS paga las pensiones a sus familiares.",
    },
    {
      pregunta: "¿Qué pasa si el empleador no me inscribió en el INSS?",
      respuesta: "Responde él por las indemnizaciones de los accidentes y enfermedades profesionales que hubiera cubierto el seguro social.",
    },
    {
      pregunta: "¿Hay casos en que el empleador no paga?",
      respuesta: "Sí. Si el accidente pasó por embriaguez o drogas, si el trabajador se lesionó a propósito o si hacía tareas ajenas a la empresa.",
    },
    {
      pregunta: "¿Cuánto tiempo hay para reclamar?",
      respuesta: "Dos años, desde la muerte o desde que se determina la incapacidad.",
    },
  ],
  glosario: [
    { termino: "Riesgo profesional", definicion: "Un accidente de trabajo o una enfermedad causada por el trabajo." },
    { termino: "Incapacidad total permanente", definicion: "Cuando el trabajador ya no puede trabajar nunca más por la lesión o la enfermedad." },
  ],
});
