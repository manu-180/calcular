import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.isr-aguinaldo-articulo-174",
  h1: "ISR del aguinaldo y la PTU con el artículo 174",
  title: "ISR de aguinaldo con el artículo 174 del reglamento",
  description:
    "Calcula el ISR de tu aguinaldo, PTU o prima vacacional con el artículo 174 del Reglamento de la LISR y compáralo con la retención normal.",
  intro: [
    "Cuando cobras aguinaldo, PTU o una prima, tu empresa puede retenerte el ISR de dos formas: sumando el pago a tu sueldo del mes, o con el procedimiento del artículo 174 del Reglamento de la Ley del ISR, que suele dar una retención menor.",
    "Escribe la parte gravada del pago (lo que pasa del exento) y tu sueldo mensual normal.",
  ],
  comoSeCalcula: [
    "Divide la parte gravada entre 365 y multiplícala por {{mx.factor-mensual-174}}.",
    "Súmala a tu sueldo mensual y calcula el ISR con la tarifa mensual. Réstale el ISR de tu sueldo solo.",
    "Divide esa diferencia entre la parte mensual del primer paso: es tu tasa de retención.",
    "Aplica esa tasa a toda la parte gravada.",
  ],
  ejemplo: ["Con 10,000 pesos gravados de aguinaldo y un sueldo de 15,000, el artículo 174 da una retención de 1,792 pesos. Si se sumara al sueldo del mes, serían 2,048.83."],
  faq: [
    {
      pregunta: "¿Puedo pedirle a mi empresa que use el artículo 174?",
      respuesta: "Es una opción de quien paga. Puedes pedirlo, pero la empresa decide. En la declaración anual el impuesto se ajusta igual.",
    },
    {
      pregunta: "¿Para qué pagos sirve?",
      respuesta: "Para el aguinaldo, la PTU, la prima vacacional y la prima dominical.",
    },
    {
      pregunta: "¿Cuánto de mi aguinaldo es exento?",
      respuesta: "No pagan ISR hasta {{mx.exencion-aguinaldo}} del aguinaldo, {{mx.exencion-ptu}} de la PTU y {{mx.exencion-prima-vacacional}} de la prima vacacional. Usa la calculadora de aguinaldo para saber tu parte gravada.",
    },
  ],
  glosario: [{ termino: "Parte gravada", definicion: "Lo que pasa del monto exento y sí paga ISR." }],
});
