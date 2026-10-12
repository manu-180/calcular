import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.dia-feriado",
  h1: "Calculadora de pago por trabajar un día feriado",
  title: "Trabajar un feriado en RD: cuánto te tienen que pagar",
  description: "Calcula el pago por trabajar un día feriado o tu día de descanso: tu salario de ese día con {{do.recargo-feriado}} de aumento, según el Código de Trabajo.",
  intro: [
    "Si trabajas un día feriado o tu día de descanso semanal, ese día se paga con un aumento de {{do.recargo-feriado}}.",
    "En el descanso semanal puedes elegir entre cobrar el aumento o tomar un descanso igual la semana siguiente.",
  ],
  comoSeCalcula: [
    "Tu salario diario es el mensual dividido entre {{do.divisor-salario-diario}}.",
    "El recargo es el {{do.recargo-feriado}} de ese salario diario.",
    "Como el feriado ya está pagado en tu salario del mes, el recargo es lo que se suma a tu pago.",
  ],
  ejemplo: [
    "Con RD$30,000 al mes, tu salario diario es RD$1,258.92. Por cada feriado trabajado te suman RD$1,258.92: ese día vale RD$2,517.84 en total.",
  ],
  faq: [
    { pregunta: "¿Cuánto me pagan si trabajo un feriado?", respuesta: "Tu salario de ese día con {{do.recargo-feriado}} de aumento. En la práctica, el día vale el doble." },
    { pregunta: "¿Y si trabajo mi día de descanso?", respuesta: "Puedes cobrarlo con {{do.recargo-feriado}} de aumento o tomar un descanso igual la semana siguiente. Lo eliges tú." },
    { pregunta: "¿Cuánto dura el descanso semanal?", respuesta: "36 horas seguidas. Si no se acordó otro día, empieza el sábado a mediodía." },
  ],
  glosario: [
    { termino: "Día feriado", definicion: "Día declarado no laborable por la ley. Es descanso pagado." },
    { termino: "Descanso semanal", definicion: "Las 36 horas seguidas de descanso que te tocan cada semana." },
  ],
});
