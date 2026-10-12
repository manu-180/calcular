import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.dia-de-asueto",
  h1: "Calculadora de pago por trabajar en día de asueto",
  title: "Pago por trabajar un día de asueto en El Salvador",
  description: "Calcule cuánto le deben si trabaja un asueto: su salario del día más un recargo del {{sv.recargo-asueto}}, y las horas extra de ese día con su propio recargo.",
  intro: [
    "Si trabaja un día de asueto, la ley le paga el salario ordinario de ese día más un recargo del {{sv.recargo-asueto}}: el doble. Trabajarlo tiene que ser de común acuerdo con su patrono.",
    "Ponga su salario, los días de asueto que trabajó y las horas extra, si las hubo.",
  ],
  comoSeCalcula: [
    "Salario del día: su salario mensual dividido por 30.",
    "Pago del asueto trabajado: ese salario más el {{sv.recargo-asueto}} de recargo.",
    "Horas extra de ese día: se calculan sobre el pago del asueto (no sobre el salario ordinario), con el recargo del {{sv.recargo-hora-extra}}.",
  ],
  ejemplo: ["Con $600 al mes, cada asueto trabajado vale $40. Si trabaja los tres días de Semana Santa, son $120."],
  faq: [
    {
      pregunta: "¿Cuáles son los días de asueto en El Salvador?",
      respuesta: "El 1 de enero; jueves, viernes y sábado de Semana Santa; 1 de mayo; 6 de agosto; 15 de septiembre; 2 de noviembre y 25 de diciembre. En San Salvador también el 3 y el 5 de agosto, y en el resto del país, el día principal de la fiesta patronal.",
    },
    {
      pregunta: "¿Me pueden obligar a trabajar un asueto?",
      respuesta: "Solo por mutuo acuerdo. La excepción son los servicios públicos o esenciales, hoteles, restaurantes, lugares de diversión y labores que no se pueden interrumpir, donde el patrono puede designar al personal necesario. Igual se paga con el recargo.",
    },
    {
      pregunta: "¿Qué pasa si el asueto cae en mi día de descanso?",
      respuesta: "Si no lo trabaja, solo recibe su salario básico. Si lo trabaja, cobra el pago del asueto trabajado y además tiene derecho a un descanso compensatorio pagado.",
    },
  ],
  glosario: [
    { termino: "Asueto", definicion: "Día feriado pagado que fija la ley." },
    { termino: "Salario extraordinario", definicion: "El salario del día más el recargo por trabajar el asueto." },
  ],
});
