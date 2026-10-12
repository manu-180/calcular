import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.feriado-trabajado",
  h1: "Pago por trabajar un feriado en Honduras",
  title: "Feriado trabajado en Honduras: cuánto le deben pagar",
  description: "Calcule cuánto le pagan por trabajar un feriado o su día de descanso: el doble del salario de la jornada, en proporción a las horas.",
  intro: [
    "Si trabaja un feriado o su día de descanso, el patrono le paga {{hn.feriado-trabajado-factor}} veces el salario de la jornada ordinaria.",
    "Si trabajó solo una parte del día, se paga en proporción a las horas.",
  ],
  comoSeCalcula: [
    "Salario de un día = salario mensual / 30.",
    "Pago = salario de un día × {{hn.feriado-trabajado-factor}} × horas trabajadas / horas de su jornada.",
    "La jornada es de {{hn.jornada-horas[diurna]}} de día, {{hn.jornada-horas[mixta]}} si es mixta y {{hn.jornada-horas[nocturna]}} de noche.",
  ],
  ejemplo: ["Gana L15,000 al mes y trabaja un feriado completo de día. Su día vale L500 y le pagan L1,000 por trabajarlo."],
  faq: [
    {
      pregunta: "¿Cuánto se paga un feriado trabajado en Honduras?",
      respuesta: "El doble del salario de la jornada ordinaria, en proporción al tiempo trabajado. Además conserva su día de descanso en la semana.",
    },
    {
      pregunta: "¿Qué feriados se pagan?",
      respuesta: "El Código del Trabajo enumera el 1 de enero, el 14 de abril, el 1 de mayo, el 15 de septiembre, el 3, 12 y 21 de octubre, el 25 de diciembre y el jueves, viernes y sábado santos.",
    },
    {
      pregunta: "¿Si gano por mes me pagan el feriado aunque no lo trabaje?",
      respuesta: "Sí. Si su salario es por mes o por quincena, ya incluye los feriados que no trabaja. Si lo trabaja, el pago doble va aparte.",
    },
    {
      pregunta: "¿Pueden obligarme a trabajar un feriado?",
      respuesta: "Se trabaja por convenio y en las actividades que no pueden parar, como hoteles, restaurantes, farmacias o gasolineras.",
    },
  ],
  glosario: [
    { termino: "Feriado", definicion: "Día de fiesta nacional que el patrono paga aunque no se trabaje (artículo 339 del Código del Trabajo)." },
    { termino: "Duplo", definicion: "El doble del salario de la jornada ordinaria (artículo 340)." },
  ],
});
