import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.prima-dominical",
  h1: "Calculadora de prima dominical {{anio}}",
  title: "Prima dominical {{anio}}: cuánto te pagan por el domingo",
  description:
    "Calcula tu prima dominical: al menos {{mx.prima-dominical}} de tu salario diario por cada domingo trabajado, y la parte que no paga ISR.",
  intro: [
    "Si trabajas en domingo te toca una prima dominical de al menos {{mx.prima-dominical}} de tu salario diario, además de tu salario normal de ese día.",
    "Aplica aunque tu día de descanso sea otro día de la semana. Escribe tu sueldo y cuántos domingos trabajaste.",
  ],
  comoSeCalcula: [
    "Saca tu salario diario: sueldo mensual entre 30, quincenal entre 15 o semanal entre 7.",
    "Multiplica tu salario diario por {{mx.prima-dominical}} (o lo que pague tu empresa, si es más).",
    "Multiplica por los domingos trabajados.",
    "No paga ISR hasta {{mx.exencion-prima-dominical}} por cada domingo; lo que pasa de eso se suma a tu sueldo para el impuesto.",
  ],
  ejemplo: ["Con 15,000 pesos al mes tu salario diario es de 500. Cada domingo te toca una prima de 125; si trabajas los cuatro domingos del mes, son 500 pesos."],
  faq: [
    {
      pregunta: "¿Me toca prima dominical si mi descanso es otro día?",
      respuesta: "Sí. La prima se paga por trabajar en domingo, sin importar cuál sea tu día de descanso semanal.",
    },
    {
      pregunta: "¿Y si el domingo es mi día de descanso y aun así trabajo?",
      respuesta: "Entonces además te pagan salario doble por trabajar tu descanso. Usa la calculadora de día de descanso trabajado.",
    },
    {
      pregunta: "¿La prima dominical paga ISR?",
      respuesta: "Solo lo que pasa de {{mx.exencion-prima-dominical}} por cada domingo trabajado.",
    },
  ],
  glosario: [{ termino: "Prima dominical", definicion: "Pago adicional por trabajar en domingo (Ley Federal del Trabajo, artículo 71)." }],
});
