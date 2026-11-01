import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.aguinaldo-pensionados",
  h1: "Aguinaldo de Navidad {{anio}} para pensionados",
  title: "Aguinaldo de Navidad {{anio}} pensionados: monto con cargas",
  description:
    "Calcula tu aguinaldo de pensionado: {{cl.aguinaldo-navidad-pensionados[base]}} en Navidad {{anio}} más {{cl.aguinaldo-navidad-pensionados[por-carga]}} por carga. Montos de la Ley 21.806.",
  intro: [
    "Las personas pensionadas del IPS, del ISL, de las mutualidades y quienes reciben la PGU tienen dos aguinaldos al año: uno en Fiestas Patrias y otro en Navidad.",
    "El monto base sube por cada carga familiar acreditada. Elige el aguinaldo y escribe tus cargas.",
  ],
  comoSeCalcula: [
    "Navidad 2026: {{cl.aguinaldo-navidad-pensionados[base]}} más {{cl.aguinaldo-navidad-pensionados[por-carga]}} por cada carga acreditada al 30 de noviembre.",
    "Fiestas Patrias 2026: {{cl.aguinaldo-fiestas-patrias-pensionados[base]}} más {{cl.aguinaldo-fiestas-patrias-pensionados[por-carga]}} por cada carga acreditada al 31 de agosto.",
    "Cada persona recibe un solo aguinaldo, aunque tenga más de una pensión.",
  ],
  ejemplo: ["Si tienes dos cargas familiares, tu aguinaldo de Navidad 2026 es de $29.055 más 2 × $16.415: $61.885 en total."],
  faq: [
    {
      pregunta: "¿Quiénes reciben el aguinaldo de Navidad?",
      respuesta: "Las personas pensionadas del IPS, del ISL, de las cajas de previsión y de las mutualidades, y quienes reciben la PGU, pensiones de invalidez o algunos aportes solidarios, que tengan esa calidad al 30 de noviembre de 2026.",
    },
    {
      pregunta: "¿Hay que postular?",
      respuesta: "No. Se paga junto con la pensión del mes, sin trámite.",
    },
    {
      pregunta: "¿El aguinaldo paga impuesto o descuentos?",
      respuesta: "No. La ley dice que no es imponible ni tributable, así que llega completo.",
    },
    {
      pregunta: "¿Qué pasa si la asignación familiar la cobra otra persona?",
      respuesta: "El aumento por carga se le paga a quien recibe esa asignación familiar.",
    },
  ],
  glosario: [
    { termino: "Aguinaldo", definicion: "Pago extra por una sola vez que entrega el Estado en Fiestas Patrias y en Navidad." },
    { termino: "Carga familiar", definicion: "Persona que depende de ti y está reconocida para la asignación familiar." },
  ],
});
