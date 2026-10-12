import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.aportacion-infonavit",
  h1: "Calculadora de aportación al Infonavit 2026",
  title: "Aportación Infonavit 2026: cuánto se deposita cada bimestre",
  description:
    "Calcula cuánto aporta tu empresa al Infonavit cada bimestre: el {{mx.aportacion-vivienda}} de tu salario base de cotización, con el tope del IMSS.",
  intro: [
    "Tu empresa deposita cada bimestre el {{mx.aportacion-vivienda}} de tu salario base de cotización en tu subcuenta de vivienda. Ese ahorro cuenta para tu crédito Infonavit y, si no lo usas, se suma a tu retiro.",
    "Escribe tu salario base de cotización diario y los días del bimestre.",
  ],
  comoSeCalcula: [
    "Toma tu salario base de cotización diario, con el tope de {{mx.tope-sbc-imss}}.",
    "Multiplícalo por {{mx.aportacion-vivienda}}.",
    "Multiplica por los días del bimestre (59 a 62 según los meses).",
  ],
  ejemplo: ["Con un salario base de cotización de 500 pesos, tu empresa aporta 25 pesos por día: 1,525 en un bimestre de 61 días."],
  faq: [
    {
      pregunta: "¿La aportación al Infonavit se descuenta de mi sueldo?",
      respuesta: "No. La paga tu empresa aparte de tu sueldo. Lo que sí se descuenta es el pago de un crédito Infonavit, si tienes uno.",
    },
    {
      pregunta: "¿Dónde veo cuánto llevo ahorrado?",
      respuesta: "En Mi Cuenta Infonavit, en línea, o en el estado de cuenta de tu Afore, en la subcuenta de vivienda.",
    },
    {
      pregunta: "¿Qué pasa con ese dinero si nunca pido un crédito?",
      respuesta: "Se queda en tu subcuenta de vivienda y te lo entregan al jubilarte junto con tu ahorro para el retiro.",
    },
  ],
  glosario: [{ termino: "Subcuenta de vivienda", definicion: "Parte de tu cuenta individual donde se acumulan las aportaciones al Infonavit." }],
});
