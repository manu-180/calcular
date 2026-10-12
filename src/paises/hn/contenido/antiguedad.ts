import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.antiguedad",
  h1: "Calculadora de antigüedad laboral en Honduras",
  title: "Antigüedad laboral en Honduras: años, vacaciones y cesantía",
  description: "Calcule su antigüedad exacta en años, meses y días, y vea qué le corresponde por ella: días de vacaciones, preaviso y meses de cesantía.",
  intro: [
    "Su antigüedad decide cuántos días de vacaciones tiene, cuánto preaviso le deben y cuánta cesantía cobraría si lo despiden sin causa.",
    "Escriba su fecha de ingreso y le mostramos el tiempo exacto y lo que le corresponde hoy.",
  ],
  comoSeCalcula: [
    "Se cuentan años, meses y días desde la fecha de ingreso hasta la fecha que elija, incluido ese día.",
    "Vacaciones: {{hn.vacaciones-dias[1]}} con 1 año, {{hn.vacaciones-dias[2]}} con 2, {{hn.vacaciones-dias[3]}} con 3 y {{hn.vacaciones-dias[4]}} desde 4 años.",
    "Cesantía: un mes de salario por año, la fracción en proporción y un tope de {{hn.cesantia-tope-meses[general]}}.",
  ],
  ejemplo: ["Entró el 1 de marzo de 2022. Al 30 de septiembre de 2026 tiene 4 años y 7 meses: 20 días de vacaciones, 60 días de preaviso y 4.58 meses de cesantía."],
  faq: [
    {
      pregunta: "¿Cómo se cuenta la antigüedad laboral?",
      respuesta: "Desde el primer día de trabajo con el mismo patrono, aunque el contrato escrito tenga otra fecha.",
    },
    {
      pregunta: "¿Se pierde la antigüedad por una incapacidad o unas vacaciones?",
      respuesta: "No. La enfermedad justificada, las vacaciones, las licencias y la renovación del contrato no cortan la continuidad.",
    },
    {
      pregunta: "¿Qué cambia con la antigüedad?",
      respuesta: "Los días de vacaciones, el preaviso, la cesantía y, con muchos años de servicio, el derecho a una parte de la cesantía si renuncia.",
    },
  ],
  glosario: [
    { termino: "Antigüedad", definicion: "El tiempo de trabajo continuo con el mismo patrono." },
    { termino: "Continuidad", definicion: "Que el trabajo no se cortó. Las causas que no terminan el contrato no la interrumpen." },
  ],
});
