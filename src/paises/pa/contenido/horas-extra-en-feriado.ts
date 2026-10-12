import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.horas-extra-en-feriado",
  h1: "Calculadora de horas extra en feriado o domingo en Panamá",
  title: "Horas extra en feriado o domingo en Panamá",
  description:
    "Horas extra en un feriado o un domingo en Panamá: primero se aplica el recargo del día y sobre eso el de la hora extra. Calcula cuánto vale cada hora.",
  intro: [
    "Cuando trabajas horas extra en un día de fiesta nacional o en tu día de descanso, la ley manda aplicar los recargos en orden: primero el del día ({{pa.recargo-feriado}} en feriado, {{pa.recargo-descanso[domingo]}} en domingo) y sobre ese resultado el de la hora extra.",
    "Escribe tu salario, el día y las horas extra. Te mostramos el valor de cada hora y el total.",
  ],
  comoSeCalcula: [
    "Valor de la hora: salario mensual entre las horas del mes de tu jornada.",
    "Hora del día: el valor de la hora más el recargo del feriado o del domingo.",
    "Hora extra: la hora del día más el recargo de la hora extra ({{pa.recargo-horas-extra[diurna]}} de día, {{pa.recargo-horas-extra[nocturna]}} de noche o {{pa.recargo-horas-extra[prolongacion-nocturna]}} al alargar una jornada nocturna).",
  ],
  ejemplo: ["Con B/. 1,000 al mes, dos horas extra de día en un feriado valen B/. 15.02 cada una: B/. 30.05 en total."],
  faq: [
    {
      pregunta: "¿Cómo se pagan las horas extra en un feriado en Panamá?",
      respuesta: "Primero se aplica el {{pa.recargo-feriado}} del feriado a la hora y después, sobre ese valor, el recargo de la hora extra.",
    },
    {
      pregunta: "¿Y en domingo?",
      respuesta: "Igual, pero con el {{pa.recargo-descanso[domingo]}} del domingo como primer recargo.",
    },
    {
      pregunta: "¿Hay un límite de horas extra?",
      respuesta: "Sí, hay un máximo por día y por semana. Lo que pase de ahí lleva un recargo adicional y el empleador puede ser multado. Revísalo en la calculadora de horas extra.",
    },
  ],
  glosario: [
    { termino: "Recargo", definicion: "El porcentaje que se suma al valor de la hora por trabajar en condiciones especiales." },
    { termino: "Hora extra", definicion: "Cada hora que trabajas por encima de tu jornada." },
  ],
});
