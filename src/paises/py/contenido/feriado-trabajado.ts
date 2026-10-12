import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.feriado-trabajado",
  h1: "Calculadora de feriado trabajado",
  title: "Feriado trabajado en Paraguay: cuánto te tienen que pagar",
  description: "Calculá cuánto cobrás por trabajar un feriado: cada hora lleva {{py.recargo-feriado}} de recargo sobre tu hora de día hábil. Según el Código del Trabajo.",
  intro: [
    "Los feriados son días de descanso obligatorio. Si igual trabajás, cada hora se paga con un recargo del {{py.recargo-feriado}} sobre tu hora normal.",
    "Poné tu salario y las horas que trabajaste en feriados.",
  ],
  comoSeCalcula: [
    "Tu hora normal es el salario mensual dividido {{py.divisor-salario-diario}} y dividido {{py.horas-jornada-diurna}}.",
    "La hora en feriado lleva un recargo del {{py.recargo-feriado}}, o sea que vale el doble.",
    "Se multiplica por las horas que trabajaste ese día.",
  ],
  ejemplo: ["Con el salario mínimo, tu hora vale Gs. 12.683 y la hora en feriado, Gs. 25.367. Ocho horas en un feriado son Gs. 202.933."],
  faq: [
    {
      pregunta: "¿Se paga doble trabajar un feriado?",
      respuesta: "Sí. Cada hora trabajada en feriado lleva un recargo del {{py.recargo-feriado}} sobre la hora de un día hábil.",
    },
    {
      pregunta: "¿Mi salario mensual ya incluye el feriado?",
      respuesta: "Sí, como día de descanso pagado. El recargo es por haberlo trabajado.",
    },
    {
      pregunta: "¿El pago por feriado suma para el aguinaldo?",
      respuesta: "Sí. Todo lo que cobrás por tu trabajo suma para el aguinaldo y paga aporte al IPS.",
    },
  ],
  glosario: [
    { termino: "Feriado", definicion: "Día de descanso obligatorio fijado por ley (artículo 217 del Código del Trabajo)." },
    { termino: "Hora de día hábil", definicion: "Lo que vale tu hora en un día normal de trabajo." },
  ],
});
