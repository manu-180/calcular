import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.tasa-efectiva-anual",
  h1: "Conversor de tasas de interés: E.A., M.V. y N.M.V.",
  title: "Conversor de tasa efectiva anual a mensual",
  description:
    "Convierte una tasa efectiva anual (E.A.) a mensual vencida (M.V.) o nominal (N.M.V.), y al revés. Sirve para comparar créditos, tarjetas y CDT.",
  intro: [
    "En Colombia los bancos anuncian tasas de distintas formas: efectiva anual, mensual vencida o nominal anual. Para comparar dos ofertas hay que llevarlas a la misma.",
    "Escribe la tasa que tienes y elige su tipo. Te mostramos su equivalente en las demás.",
  ],
  comoSeCalcula: [
    "De efectiva anual a mensual: (1 + E.A.) elevado a 1/12, menos 1.",
    "De mensual a efectiva anual: (1 + M.V.) elevado a 12, menos 1.",
    "Nominal anual mes vencido: la tasa mensual por 12.",
  ],
  ejemplo: ["Una tasa del 12 % E.A. equivale a 0,9489 % mensual vencida y a 11,3866 % nominal anual mes vencido."],
  faq: [
    {
      pregunta: "¿Qué tasa sirve para comparar créditos?",
      respuesta: "La efectiva anual (E.A.). Ya incluye el efecto de cobrar intereses sobre intereses, así que es la comparación justa.",
    },
    {
      pregunta: "¿Por qué la nominal es menor que la efectiva?",
      respuesta: "Porque la nominal no suma los intereses que se capitalizan cada mes. La efectiva sí.",
    },
    {
      pregunta: "¿Cuál es la tasa de usura?",
      respuesta: "La certifica la Superintendencia Financiera cada mes, en términos efectivos anuales. Ningún crédito puede cobrar más.",
    },
  ],
  glosario: [
    { termino: "E.A.", definicion: "Efectiva anual: lo que rinde o cuesta una tasa en un año completo." },
    { termino: "M.V.", definicion: "Mensual vencida: la tasa que se paga al final de cada mes." },
  ],
});
