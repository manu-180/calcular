import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.feriado-trabajado",
  h1: "Calculadora de feriado trabajado",
  title: "Feriado trabajado en Bolivia 2026: cuánto le pagan",
  description: "Calcule cuánto le deben por trabajar un feriado: un recargo del {{bo.recargo-feriado}} sobre el salario del día, además de su sueldo del mes.",
  intro: [
    "Si trabajó un feriado nacional, su empleador le debe un recargo del {{bo.recargo-feriado}} sobre el salario de ese día, o bien darle otro día de descanso en la semana.",
    "Escriba su haber básico y cuántos feriados trabajó.",
  ],
  comoSeCalcula: [
    "El salario de un día es el haber básico dividido 30.",
    "Por cada feriado trabajado se suma un recargo del {{bo.recargo-feriado}} de ese salario diario.",
    "El día ya está pagado en su sueldo mensual, así que el recargo va aparte.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga por trabajar un feriado en Bolivia?",
      respuesta: "Un recargo del {{bo.recargo-feriado}} sobre el haber básico del día. En la práctica, el día se paga doble: el que ya viene en el sueldo y el recargo.",
    },
    {
      pregunta: "¿Me pueden dar un día libre en vez de pagarme?",
      respuesta: "Sí. La ley deja elegir al empleador entre pagar el recargo o compensar con otro día de descanso en la semana.",
    },
    {
      pregunta: "¿Cuáles son los feriados nacionales?",
      respuesta: "1 de enero, 22 de enero, lunes y martes de Carnaval, Viernes Santo, 1 de mayo, Corpus Christi, 21 de junio, 6 de agosto, 2 de noviembre y 25 de diciembre (D.S. N° 2750). Los feriados departamentales rigen solo en su departamento.",
    },
  ],
  glosario: [
    { termino: "Haber básico", definicion: "El sueldo fijo del mes, sin bonos ni horas extras." },
    { termino: "Feriado nacional", definicion: "Día con suspensión de actividades públicas y privadas en todo el país." },
  ],
});
