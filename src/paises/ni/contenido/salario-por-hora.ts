import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.salario-por-hora",
  h1: "Calculadora de salario por hora y por día en Nicaragua",
  title: "Salario por hora en Nicaragua: calculá tu hora y tu día",
  description: "Pasá tu salario mensual a salario diario, semanal y por hora según tu jornada en Nicaragua: diurna de {{ni.jornada-diaria[diurna]}}, mixta o nocturna.",
  intro: [
    "Saber cuánto vale tu día o tu hora sirve para revisar horas extras, vacaciones, descuentos y permisos.",
    "Poné tu salario mensual y tu jornada. Te mostramos tu salario diario, semanal y por hora.",
  ],
  comoSeCalcula: [
    "Salario diario: el mensual dividido entre 30.",
    "Salario por hora: el diario dividido entre las horas de tu jornada. Diurna: {{ni.jornada-diaria[diurna]}}. Mixta: {{ni.jornada-diaria[mixta]}}. Nocturna: {{ni.jornada-diaria[nocturna]}}.",
    "Salario semanal: el diario por siete, porque el séptimo día se paga.",
  ],
  ejemplo: ["Con C$9,000 al mes y jornada diurna, tu día vale C$300 y tu hora C$37.50."],
  faq: [
    {
      pregunta: "¿Cómo saco mi salario por hora en Nicaragua?",
      respuesta: "Dividís tu salario mensual entre 30 y después entre las horas de tu jornada diaria.",
    },
    {
      pregunta: "¿Cuántas horas es la jornada laboral en Nicaragua?",
      respuesta: "La diurna, {{ni.jornada-diaria[diurna]}} por día y 48 por semana. La mixta, {{ni.jornada-diaria[mixta]}} y 45. La nocturna, {{ni.jornada-diaria[nocturna]}} y 42.",
    },
    {
      pregunta: "¿Qué es la jornada nocturna?",
      respuesta: "La que se trabaja entre las 8 de la noche y las 6 de la mañana. Si una jornada mixta tiene más de tres horas y media de noche, se considera nocturna.",
    },
    {
      pregunta: "¿Por qué se divide entre 30 y no entre los días hábiles?",
      respuesta: "Porque el salario mensual paga los 30 días, incluidos los de descanso. Es la forma que usan las planillas.",
    },
  ],
  glosario: [
    { termino: "Jornada ordinaria", definicion: "Las horas normales de trabajo. Lo que pasa de ahí son horas extras." },
    { termino: "Jornada mixta", definicion: "La que tiene horas de día y de noche." },
  ],
});
