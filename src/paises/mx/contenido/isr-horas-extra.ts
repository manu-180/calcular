import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.isr-horas-extra",
  h1: "¿Cuánto de mis horas extra paga ISR?",
  title: "Horas extra exentas de ISR {{anio}}: calcula tu parte",
  description:
    "Calcula qué parte de tus horas extra y descansos trabajados no paga ISR: el {{mx.exencion-horas-extra-porcentaje}} con tope de {{mx.exencion-horas-extra-uma}} por semana, o todo si ganas el mínimo.",
  intro: [
    "Las horas extra dobles y los días de descanso trabajados tienen una parte exenta de ISR. Si ganas el salario mínimo, están exentos completos mientras no pasen del límite de la ley.",
    "Si ganas más, no paga ISR el {{mx.exencion-horas-extra-porcentaje}} de ese pago, con un tope de {{mx.exencion-horas-extra-uma}} por semana. Las horas triples pagan ISR completas.",
  ],
  comoSeCalcula: [
    "Suma lo que cobraste en la semana por horas extra dobles y por descansos trabajados.",
    "Si ganas el salario mínimo, todo eso es exento.",
    "Si no, el exento es el {{mx.exencion-horas-extra-porcentaje}} de ese pago, sin pasar de {{mx.exencion-horas-extra-uma}} por semana.",
    "Lo demás, más las horas triples, se suma a tu sueldo para calcular el ISR.",
  ],
  ejemplo: ["Si en una semana cobras 1,000 pesos de horas extra dobles y ganas 15,000 al mes, 500 pesos no pagan ISR y 500 sí."],
  faq: [
    {
      pregunta: "¿Las horas extra pagan ISR?",
      respuesta: "En parte. La mitad de las horas dobles es exenta, con un tope semanal. Si ganas el salario mínimo, no pagan nada dentro del límite legal.",
    },
    {
      pregunta: "¿Y las horas triples?",
      respuesta: "Pasan del límite que permite la ley, así que pagan ISR completas.",
    },
    {
      pregunta: "¿Los días de descanso trabajados también tienen exención?",
      respuesta: "Sí, cuando no te dan otro día de descanso a cambio. Entran en la misma cuenta que las horas extra.",
    },
  ],
  glosario: [{ termino: "Tiempo extraordinario", definicion: "Horas trabajadas por encima de la jornada legal." }],
});
