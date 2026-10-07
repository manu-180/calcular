import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.horas-extra",
  h1: "Calculadora de horas extra",
  title: "Horas extra en Paraguay: calculá cuánto te pagan",
  description: "Calculá tus horas extra de día (recargo del {{py.recargo-hora-extra}}), de noche y en feriados (recargo del {{py.recargo-feriado}}), según el Código del Trabajo.",
  intro: [
    "Las horas que trabajás por encima de tu jornada se pagan con recargo. Cuánto depende de si son de día, de noche o en un feriado.",
    "Poné tu salario mensual, tu jornada habitual y cuántas horas hiciste de cada tipo.",
  ],
  comoSeCalcula: [
    "Tu hora ordinaria es el salario mensual dividido {{py.divisor-salario-diario}}, y eso dividido {{py.horas-jornada-diurna}} si tu jornada es diurna o {{py.horas-jornada-nocturna}} si es nocturna.",
    "La hora extra de día se paga con un recargo del {{py.recargo-hora-extra}}.",
    "La hora extra de noche se paga con un recargo del {{py.recargo-extra-nocturna}} sobre la hora nocturna. Si trabajás de día, tu hora nocturna es tu hora más un {{py.recargo-nocturno}}.",
    "Cada hora trabajada en un feriado lleva un recargo del {{py.recargo-feriado}} sobre tu hora de día hábil.",
  ],
  ejemplo: [
    "Con jornada diurna y un salario de Gs. 4.800.000, tu hora vale Gs. 20.000. Una hora extra de día vale Gs. 30.000, una de noche Gs. 52.000 y una en feriado Gs. 40.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga la hora extra en Paraguay?",
      respuesta: "De día, tu hora más el {{py.recargo-hora-extra}}. De noche, la hora nocturna más el {{py.recargo-extra-nocturna}}. En feriado, tu hora más el {{py.recargo-feriado}}.",
    },
    {
      pregunta: "¿Qué horario es nocturno?",
      respuesta: "El trabajo entre las 20 y las 6. La jornada nocturna es de {{py.horas-jornada-nocturna}} por día como máximo; la diurna, de {{py.horas-jornada-diurna}}.",
    },
    {
      pregunta: "¿Las horas extra suman para el aguinaldo?",
      respuesta: "Sí. El aguinaldo es la doceava parte de todo lo que cobraste en el año, horas extra incluidas.",
    },
  ],
  glosario: [
    { termino: "Recargo", definicion: "El porcentaje que se suma al valor de tu hora normal." },
    { termino: "Mensualero", definicion: "Quien cobra un salario por mes, en vez de por día (jornalero)." },
  ],
});
