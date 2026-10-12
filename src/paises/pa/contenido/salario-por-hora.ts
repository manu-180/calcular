import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.salario-por-hora",
  h1: "Calculadora de salario por hora en Panamá",
  title: "Salario por hora en Panamá: pasa tu sueldo mensual a horas",
  description:
    "Calcula cuánto ganas por hora, por día y por semana en Panamá. Usa la jornada legal de {{pa.jornada-semanal[diurna]}} semanales de día, {{pa.jornada-semanal[nocturna]}} de noche y {{pa.jornada-semanal[mixta]}} mixta.",
  intro: [
    "Tu salario por hora sale de dividir el salario mensual entre las horas que trabajas en un mes. En Panamá la semana diurna es de {{pa.jornada-semanal[diurna]}}, la nocturna de {{pa.jornada-semanal[nocturna]}} y la mixta de {{pa.jornada-semanal[mixta]}}.",
    "Ese valor por hora es la base de las horas extra, del domingo y del feriado trabajado. Escribe tu salario y tu jornada.",
  ],
  comoSeCalcula: [
    "Horas del mes: horas de la semana por 52 semanas y dividido entre 12 meses.",
    "Salario por hora: salario mensual dividido entre las horas del mes.",
    "Salario por día: valor de la hora por las horas de tu jornada diaria ({{pa.jornada-diaria[diurna]}} de día, {{pa.jornada-diaria[nocturna]}} de noche o {{pa.jornada-diaria[mixta]}} en jornada mixta).",
    "Salario por semana: el mensual por 12 y dividido entre 52, como hace el MITRADEL.",
  ],
  ejemplo: [
    "Con B/. 1,000 al mes en jornada diurna: 48 horas por semana son 208 horas al mes. Tu hora vale B/. 4.81 y tu día de 8 horas, B/. 38.46.",
  ],
  faq: [
    {
      pregunta: "¿Cómo saco mi salario por hora en Panamá?",
      respuesta: "Divide tu salario mensual entre las horas del mes. En jornada diurna completa son 208 horas: con B/. 1,000 al mes, tu hora vale B/. 4.81.",
    },
    {
      pregunta: "¿Por qué no se divide entre 30 días?",
      respuesta: "Porque la ley cuenta la jornada en horas por semana. El mes promedio tiene 52 semanas entre 12, unas 4.33 semanas.",
    },
    {
      pregunta: "¿Cuántas horas es la jornada nocturna?",
      respuesta: "Hasta {{pa.jornada-diaria[nocturna]}} por noche y {{pa.jornada-semanal[nocturna]}} por semana. Se pagan igual que {{pa.jornada-diaria[diurna]}} de día.",
    },
    {
      pregunta: "¿Y si trabajo medio tiempo?",
      respuesta: "Escribe las horas que trabajas por semana. Tu salario por hora se calcula con esas horas.",
    },
  ],
  glosario: [
    { termino: "Jornada diurna", definicion: "La que se trabaja entre las 6 a. m. y las 6 p. m." },
    { termino: "Jornada mixta", definicion: "La que tiene horas de día y hasta tres horas de noche." },
  ],
});
