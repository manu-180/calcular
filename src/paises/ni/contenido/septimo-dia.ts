import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.septimo-dia",
  h1: "Calculadora del séptimo día trabajado en Nicaragua",
  title: "Séptimo día trabajado en Nicaragua: cuánto te pagan",
  description: "Si trabajás tu día de descanso en Nicaragua, se paga con un recargo del {{ni.recargo-horas-extra}}. Calculá cuánto te toca por cada séptimo día trabajado.",
  intro: [
    "Por cada seis días de trabajo tenés derecho a un día de descanso pagado, el séptimo día. Casi siempre es el domingo.",
    "Si lo trabajás, ese trabajo se paga con un recargo del {{ni.recargo-horas-extra}} sobre tu salario de un día normal.",
  ],
  comoSeCalcula: [
    "Salario diario: tu salario mensual dividido entre 30.",
    "Pago por cada día de descanso trabajado: el salario diario más el {{ni.recargo-horas-extra}}.",
    "Se multiplica por la cantidad de días de descanso que trabajaste.",
  ],
  ejemplo: ["Con un salario de C$9,000, tu salario diario es C$300. Cada domingo trabajado se paga C$600. Dos domingos, C$1,200."],
  faq: [
    {
      pregunta: "¿Cómo se paga el séptimo día trabajado en Nicaragua?",
      respuesta: "Como trabajo extraordinario: tu salario de un día más el {{ni.recargo-horas-extra}}. Es aparte de tu salario del mes.",
    },
    {
      pregunta: "¿El séptimo día siempre es domingo?",
      respuesta: "Por regla general sí, salvo las excepciones de la ley. Si tu descanso es rotativo, el séptimo día es el que te toque descansar.",
    },
    {
      pregunta: "¿Me pueden dar otro día libre en lugar de pagarme?",
      respuesta: "Si trabajás tu día de descanso, la ley dice que ese día se paga como extraordinario. Un día compensatorio que trabajes también se paga así.",
    },
    {
      pregunta: "¿Y si trabajo menos de seis días por semana?",
      respuesta: "Si tu semana es más corta, se cuentan dos semanas seguidas. Ganás el descanso cuando completás seis días de trabajo sin faltar.",
    },
  ],
  glosario: [
    { termino: "Séptimo día", definicion: "El día de descanso pagado que ganás por cada seis días de trabajo." },
    { termino: "Día compensatorio", definicion: "El día libre que te dan a cambio de un día de descanso que trabajaste." },
  ],
});
