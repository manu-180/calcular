import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.periodo-de-prueba",
  h1: "Calculadora del periodo de prueba",
  title: "Periodo de prueba en Perú: calcula cuándo termina",
  description:
    "El periodo de prueba dura {{pe.periodo-prueba[general]}} por ley y puede llegar a {{pe.periodo-prueba[direccion]}} en puestos de dirección. Calcula tu último día con tu fecha de ingreso.",
  intro: [
    "Cuando entras a un trabajo en planilla, los primeros {{pe.periodo-prueba[general]}} son de prueba. Mientras dura, si te despiden no te corresponde indemnización por despido arbitrario.",
    "Pon tu fecha de ingreso y tu tipo de puesto. Te decimos qué día termina el periodo de prueba y si hoy sigues en él.",
  ],
  comoSeCalcula: [
    "Por ley el periodo de prueba es de {{pe.periodo-prueba[general]}}, contados desde tu fecha de ingreso.",
    "Puede ser más largo solo si se pacta por escrito: hasta {{pe.periodo-prueba[calificado]}} en total para trabajadores calificados o de confianza, y hasta {{pe.periodo-prueba[direccion]}} para personal de dirección.",
    "El periodo termina el día anterior a la misma fecha de ingreso, tantos meses después.",
  ],
  ejemplo: ["Entraste el 15 de agosto de 2026 a un puesto común. Tu periodo de prueba termina el 14 de noviembre de 2026."],
  faq: [
    {
      pregunta: "¿Cuánto dura el periodo de prueba?",
      respuesta: "{{pe.periodo-prueba[general]}} para la mayoría de trabajadores. Hasta {{pe.periodo-prueba[calificado]}} para calificados o de confianza y hasta {{pe.periodo-prueba[direccion]}} para dirección, si se pactó por escrito.",
    },
    {
      pregunta: "¿Me pueden despedir durante el periodo de prueba?",
      respuesta: "Sí, y no te corresponde indemnización por despido arbitrario. Igual te deben pagar tus beneficios truncos, como CTS, gratificación y vacaciones, si ya los generaste.",
    },
    {
      pregunta: "¿Qué pasa cuando termina el periodo de prueba?",
      respuesta: "Ganas la protección contra el despido arbitrario: si te despiden sin causa, te corresponde una indemnización.",
    },
    {
      pregunta: "¿El periodo de prueba se puede extender de palabra?",
      respuesta: "No. La ampliación tiene que constar por escrito. Sin ese documento, el periodo es de {{pe.periodo-prueba[general]}}.",
    },
  ],
  glosario: [
    { termino: "Periodo de prueba", definicion: "Los primeros meses de un trabajo, en los que todavía no tienes protección contra el despido arbitrario (DS 003-97-TR, artículo 10)." },
    { termino: "Despido arbitrario", definicion: "Despido sin una causa justa que la ley reconozca o sin que se pruebe en juicio." },
  ],
});
