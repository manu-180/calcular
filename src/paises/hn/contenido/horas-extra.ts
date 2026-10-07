import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.horas-extra",
  h1: "Calculadora de horas extra",
  title: "Horas extra en Honduras: calcule cuánto le deben pagar",
  description:
    "Calcule el pago de sus horas extra con el recargo del Código del Trabajo: {{hn.recargo-horas-extra[diurna]}} de día, {{hn.recargo-horas-extra[nocturna]}} de noche y {{hn.recargo-horas-extra[prolongacion-nocturna]}} al alargar una jornada nocturna.",
  intro: [
    "Las horas que trabaja después de su jornada ordinaria son horas extra y se pagan con un recargo.",
    "El recargo depende de cuándo las hace: de día, de noche después de una jornada de día, o alargando una jornada nocturna.",
  ],
  comoSeCalcula: [
    "Hora ordinaria de día = salario mensual / 30 / {{hn.jornada-horas[diurna]}}.",
    "Extras de día: hora ordinaria más {{hn.recargo-horas-extra[diurna]}}. Extras de noche después de una jornada de día: hora ordinaria más {{hn.recargo-horas-extra[nocturna]}}.",
    "Si las extras alargan una jornada nocturna, se parte de la hora nocturna (salario mensual / 30 / {{hn.jornada-horas[nocturna]}}) y se suma {{hn.recargo-horas-extra[prolongacion-nocturna]}}.",
  ],
  ejemplo: ["Gana L14,400 al mes y hace 10 horas extra de día. La hora ordinaria vale L60 y la extra L75. Total: L750."],
  faq: [
    {
      pregunta: "¿Cuántas horas extra puedo hacer?",
      respuesta: "La jornada ordinaria más las extras no puede pasar de 12 horas por día. Y el patrono no puede pedirle extras más de cuatro veces por semana, salvo en siembras o cosechas.",
    },
    {
      pregunta: "¿Qué horario es de día y cuál de noche?",
      respuesta: "De día es entre las 5:00 a. m. y las 7:00 p. m. De noche, entre las 7:00 p. m. y las 5:00 a. m.",
    },
    {
      pregunta: "¿Me pagan horas extra si corrijo un error mío?",
      respuesta: "No. Las horas que usa para arreglar errores que solo son suyos no se pagan como extra.",
    },
    {
      pregunta: "¿Y si trabajo un domingo o un feriado?",
      respuesta: "Eso no es hora extra: el día de descanso o feriado trabajado se paga doble.",
    },
  ],
  glosario: [
    { termino: "Jornada extraordinaria", definicion: "El trabajo fuera de los límites de la jornada ordinaria (artículo 330 del Código del Trabajo)." },
    { termino: "Jornada nocturna", definicion: "La que se trabaja entre las 7:00 p. m. y las 5:00 a. m. Dura como máximo 6 horas." },
  ],
});
