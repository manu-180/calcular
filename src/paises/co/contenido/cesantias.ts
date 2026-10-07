import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.cesantias",
  h1: "Calculadora de cesantías e intereses",
  title: "Cesantías 2026: calcula las tuyas y sus intereses",
  description:
    "Calcula tus cesantías y los intereses del {{co.intereses-cesantias}} anual con tu salario y los días trabajados. Con auxilio de transporte si te corresponde.",
  intro: [
    "Las cesantías son un mes de salario por cada año trabajado. La empresa las consigna cada año en el fondo de cesantías que elijas.",
    "Además, te paga a ti los intereses sobre las cesantías: el {{co.intereses-cesantias}} anual.",
  ],
  comoSeCalcula: [
    "Salario base: tu salario mensual más el auxilio de transporte de {{co.auxilio-transporte}}, si ganas hasta {{co.auxilio-tope}}.",
    "Cesantías: salario base por días trabajados, dividido por 360.",
    "Intereses: cesantías por {{co.intereses-cesantias}} por días trabajados, dividido por 360.",
  ],
  ejemplo: [
    "Con un salario de $4.000.000 y el año completo (360 días), las cesantías son $4.000.000 y los intereses $480.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo consignan las cesantías?",
      respuesta: "La empresa liquida las cesantías al 31 de diciembre y las tiene que consignar en tu fondo antes del 15 de febrero del año siguiente.",
    },
    {
      pregunta: "¿Quién me paga los intereses?",
      respuesta: "Los intereses te los paga directamente la empresa a ti, por el año o la fracción que se liquida. No van al fondo.",
    },
    {
      pregunta: "¿Puedo retirar mis cesantías?",
      respuesta: "Sí, cuando terminas el contrato. También puedes pedir una parte para comprar, construir o mejorar tu vivienda (artículo 256 del Código Sustantivo del Trabajo).",
    },
  ],
  glosario: [
    { termino: "Fondo de cesantías", definicion: "Entidad que guarda tus cesantías a tu nombre. La eliges tú." },
    { termino: "Intereses sobre las cesantías", definicion: "Pago anual del {{co.intereses-cesantias}} sobre tus cesantías, que la empresa te entrega a ti." },
  ],
});
