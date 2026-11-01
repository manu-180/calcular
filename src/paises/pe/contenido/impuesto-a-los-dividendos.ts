import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.dividendos",
  h1: "Calculadora del impuesto a los dividendos",
  title: "Impuesto a los dividendos {{anio}}: {{pe.tasa-dividendos}} en Perú",
  description:
    "Los dividendos que recibe una persona natural pagan {{pe.tasa-dividendos}} de impuesto a la renta. Calcula la retención y cuánto te llega.",
  intro: [
    "Si eres socio o accionista de una empresa peruana y te reparten utilidades, la empresa te retiene {{pe.tasa-dividendos}} de impuesto a la renta.",
    "Pon el monto del dividendo y te decimos la retención y lo que recibes.",
  ],
  comoSeCalcula: [
    "Se aplica {{pe.tasa-dividendos}} al dividendo bruto que acuerda repartir la empresa.",
    "La empresa retiene ese monto y lo paga a SUNAT. Lo que queda es lo que te depositan.",
  ],
  ejemplo: ["Te reparten S/ 10,000 de dividendos. La retención es S/ 500 y recibes S/ 9,500."],
  faq: [
    {
      pregunta: "¿Cuánto es el impuesto a los dividendos en Perú?",
      respuesta: "{{pe.tasa-dividendos}} para personas naturales domiciliadas, desde el {{pe.tasa-dividendos#desde}}.",
    },
    {
      pregunta: "¿Se retiene impuesto si el dividendo va a otra empresa?",
      respuesta: "No. La retención no se aplica cuando el dividendo se reparte a una persona jurídica domiciliada en Perú.",
    },
    {
      pregunta: "¿Quién paga el impuesto, yo o la empresa?",
      respuesta: "Es tu impuesto, pero lo retiene y lo paga la empresa que te reparte el dividendo.",
    },
  ],
  glosario: [
    { termino: "Dividendo", definicion: "Parte de las utilidades de una empresa que se reparte entre sus socios o accionistas." },
    { termino: "Retención", definicion: "Monto que descuenta quien te paga para entregarlo directamente a SUNAT." },
  ],
});
