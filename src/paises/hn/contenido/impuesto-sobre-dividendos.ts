import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.impuesto-sobre-dividendos",
  h1: "Calculadora del impuesto sobre dividendos en Honduras",
  title: "Impuesto sobre dividendos en Honduras: retención del {{hn.dividendos}}",
  description: "Calcule la retención del {{hn.dividendos}} sobre los dividendos o utilidades que reparte una sociedad hondureña y cuánto recibe cada socio.",
  intro: [
    "Los dividendos y cualquier otra forma de repartir utilidades a personas residentes en Honduras pagan un impuesto del {{hn.dividendos}}.",
    "Lo retiene la sociedad que paga. El socio recibe el resto.",
  ],
  comoSeCalcula: ["Retención = dividendos × {{hn.dividendos}}.", "Lo que recibe el socio = dividendos − retención."],
  ejemplo: ["Una sociedad reparte L100,000 a un socio. Retiene L10,000 y le paga L90,000."],
  faq: [
    {
      pregunta: "¿Cuánto impuesto pagan los dividendos en Honduras?",
      respuesta: "El {{hn.dividendos}} para personas naturales y jurídicas residentes o domiciliadas en el país.",
    },
    {
      pregunta: "¿Quién paga el impuesto?",
      respuesta: "Lo retiene y lo entera al SAR la sociedad que reparte los dividendos.",
    },
    {
      pregunta: "¿Se paga dos veces si una empresa reparte dividendos que recibió de otra?",
      respuesta: "No. Si los dividendos ya fueron gravados, no se retienen de nuevo al volver a distribuirlos. La sociedad debe llevar cuenta separada.",
    },
  ],
  glosario: [
    { termino: "Dividendos", definicion: "La parte de las utilidades de una sociedad que se reparte entre sus socios o accionistas." },
    { termino: "Retención", definicion: "El impuesto que descuenta quien paga y entrega al SAR." },
  ],
});
