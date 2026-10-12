import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.feriado-progresivo",
  h1: "Calculadora de feriado progresivo",
  title: "Feriado progresivo: cuántos días extra de vacaciones tienes",
  description:
    "Calcula tus días de feriado progresivo: uno más por cada {{cl.feriado-progresivo-cada}} nuevos de trabajo después de {{cl.feriado-progresivo-anios-base}}. Cuentan hasta {{cl.feriado-progresivo-tope-anteriores}} anteriores.",
  intro: [
    "El feriado progresivo son días de vacaciones extra que ganas con los años. Se suman a los {{cl.feriado-anual}} hábiles del feriado legal.",
    "Cuando llevas {{cl.feriado-progresivo-anios-base}} de trabajo, ganas un día más por cada {{cl.feriado-progresivo-cada}} nuevos que trabajes.",
  ],
  comoSeCalcula: [
    "Se suman tus años con empleadores anteriores (hasta {{cl.feriado-progresivo-tope-anteriores}}) y tus años completos en tu trabajo actual.",
    "A ese total se le restan {{cl.feriado-progresivo-anios-base}}. Lo que queda se divide por {{cl.feriado-progresivo-cada}} y se toma la parte entera.",
    "Ese número son tus días de feriado progresivo. Se suman a los {{cl.feriado-anual}} del feriado legal ({{cl.feriado-anual-austral}} en Magallanes, Aysén y Palena).",
  ],
  ejemplo: [
    "Tienes 10 años cotizados con otros empleadores y 3 años en tu trabajo actual. Sumas 13 años, así que te toca 1 día de feriado progresivo: 16 días hábiles de vacaciones al año.",
  ],
  faq: [
    {
      pregunta: "¿Cuentan los años con otros empleadores?",
      respuesta: "Sí, pero solo hasta 10 años. Los años nuevos que dan cada día extra tienen que ser con tu empleador actual.",
    },
    {
      pregunta: "¿Cómo acredito los años anteriores?",
      respuesta: "Con el certificado de cotizaciones de tu AFP o del IPS. Se lo entregas a tu empleador.",
    },
    {
      pregunta: "¿El feriado progresivo se paga en el finiquito?",
      respuesta: "Sí. Si no lo usaste, se suma a las vacaciones pendientes que te pagan al terminar el contrato.",
    },
    {
      pregunta: "¿Se puede negociar más días?",
      respuesta: "Sí. La ley dice que este exceso se puede negociar de forma individual o colectiva, siempre a tu favor.",
    },
  ],
  glosario: [
    { termino: "Feriado legal", definicion: "Vacaciones pagadas de 15 días hábiles al año, después de un año de trabajo." },
    { termino: "Feriado progresivo", definicion: "Días hábiles extra de vacaciones que se ganan desde los 10 años de trabajo." },
  ],
});
