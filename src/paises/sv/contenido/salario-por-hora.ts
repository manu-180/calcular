import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.salario-por-hora",
  h1: "Calculadora de salario por hora y por día",
  title: "Salario por hora y por día en El Salvador: calculadora",
  description: "Pase su salario mensual, quincenal o semanal a salario por día y por hora, con la jornada legal de {{sv.jornada-diurna}} de día o {{sv.jornada-nocturna}} de noche.",
  intro: [
    "Para calcular horas extra, asuetos o descuentos necesita su salario por día y por hora. El Código de Trabajo los saca dividiendo el salario por los días del período y después por las horas de la jornada.",
    "Ponga su salario, cada cuánto se lo pagan y su jornada.",
  ],
  comoSeCalcula: [
    "Salario por día: el salario dividido por los días del período (30 por mes, 15 por quincena, 7 por semana).",
    "Salario por hora: el salario por día dividido por las horas de la jornada ordinaria: {{sv.jornada-diurna}} de día, {{sv.jornada-nocturna}} de noche.",
  ],
  ejemplo: ["Con $600 al mes y jornada diurna: $20 por día y $2.50 por hora."],
  faq: [
    {
      pregunta: "¿Cuántas horas es la jornada legal?",
      respuesta: "La diurna, hasta {{sv.jornada-diurna}} por día y {{sv.semana-diurna}} por semana. La nocturna, hasta {{sv.jornada-nocturna}} por día y {{sv.semana-nocturna}} por semana.",
    },
    {
      pregunta: "¿Por qué el decreto de salario mínimo da otro valor por hora?",
      respuesta: "El decreto calcula el diario como el mensual por 12 entre 365. La calculadora divide entre 30 días, como las planillas. Las prestaciones nunca pueden pagarse por debajo del diario del decreto.",
    },
    {
      pregunta: "¿Qué horario es diurno y cuál nocturno?",
      respuesta: "Diurno, de 6:00 a 19:00. Nocturno, de 19:00 a 6:00. Una jornada con más de cuatro horas nocturnas se considera nocturna.",
    },
  ],
  glosario: [
    { termino: "Salario básico", definicion: "Lo que gana por su jornada ordinaria, sin horas extra." },
    { termino: "Jornada ordinaria", definicion: "Las horas de trabajo pactadas dentro del límite legal." },
  ],
});
