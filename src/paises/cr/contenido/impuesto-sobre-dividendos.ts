import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.impuesto-sobre-dividendos",
  h1: "Impuesto sobre dividendos en Costa Rica",
  title: "Impuesto sobre dividendos en Costa Rica: retención",
  description:
    "Calcule la retención sobre los dividendos que reparte una sociedad: {{cr.renta-capital[general]}} cuando los recibe una persona, y los casos exentos.",
  intro: [
    "Cuando una sociedad reparte utilidades a sus socios, retiene el impuesto sobre las rentas de capital: {{cr.renta-capital[general]}}.",
    "Si el socio es otra sociedad costarricense con actividad económica, o si se paga en acciones de la propia sociedad, no hay retención.",
  ],
  comoSeCalcula: [
    "Persona física: se retiene {{cr.renta-capital[general]}} de los dividendos.",
    "Sociedad de Costa Rica con actividad y sujeta al impuesto: exento.",
    "Dividendos pagados en acciones de la propia sociedad: exentos (la venta posterior de esas acciones sí puede pagar).",
  ],
  ejemplo: ["Si una sociedad reparte ₡10.000.000 a un socio persona física, retiene ₡1.500.000 y el socio recibe ₡8.500.000."],
  faq: [
    {
      pregunta: "¿Cuánto es el impuesto sobre dividendos?",
      respuesta: "{{cr.renta-capital[general]}}, retenido por la sociedad al pagar. Es el impuesto final para el socio.",
    },
    {
      pregunta: "¿Los dividendos entre empresas pagan?",
      respuesta: "No, si la que recibe es una sociedad domiciliada en Costa Rica que tiene actividad económica y paga renta.",
    },
    {
      pregunta: "¿Y si me pagan con acciones?",
      respuesta: "Los dividendos en acciones de la propia sociedad están exentos. Si después vende esas acciones, puede pagar impuesto por ganancia de capital.",
    },
  ],
  glosario: [{ termino: "Dividendos", definicion: "La parte de las utilidades de una sociedad que se reparte entre los socios." }],
});
