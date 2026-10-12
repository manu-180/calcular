import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.iue",
  h1: "Calculadora del IUE",
  title: "IUE Bolivia: calcule el impuesto a las utilidades",
  description: "Calcule el Impuesto sobre las Utilidades de las Empresas ({{bo.iue}} de la utilidad neta) y la retención por pagos a beneficiarios del exterior.",
  intro: [
    "El IUE es el impuesto anual que pagan las empresas sobre su utilidad neta. También se retiene cuando se paga a alguien del exterior por rentas de fuente boliviana.",
    "Elija qué quiere calcular y escriba el monto.",
  ],
  comoSeCalcula: [
    "Empresas: {{bo.iue}} de la utilidad neta imponible de la gestión.",
    "Pagos al exterior: se presume que la utilidad es el {{bo.iue-utilidad-presunta[exterior]}} de lo pagado, y sobre eso se retiene el {{bo.iue}}.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el IUE en Bolivia?",
      respuesta: "El {{bo.iue}} de la utilidad neta imponible (Ley N° 843, artículo 50).",
    },
    {
      pregunta: "¿Cuánto se retiene por pagar a alguien del exterior?",
      respuesta: "El {{bo.iue}} sobre el {{bo.iue-utilidad-presunta[exterior]}} del monto pagado. Lo retiene quien paga, como pago único y definitivo.",
    },
    {
      pregunta: "¿Los profesionales independientes pagan IUE?",
      respuesta: "Ya no. Desde 2023 pagan RC-IVA trimestral. Puede calcularlo en nuestra calculadora de RC-IVA para independientes.",
    },
  ],
  glosario: [
    { termino: "IUE", definicion: "Impuesto sobre las Utilidades de las Empresas." },
    { termino: "Utilidad neta imponible", definicion: "La ganancia de la gestión según los estados financieros, con los ajustes que pide la ley." },
  ],
});
