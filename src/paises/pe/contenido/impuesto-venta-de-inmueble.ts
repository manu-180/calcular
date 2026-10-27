import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.venta-inmueble",
  h1: "Calculadora del impuesto por venta de inmueble",
  title: "Impuesto por vender un inmueble {{anio}}: calcula tu pago",
  description:
    "Si vendes un departamento, casa o terreno con ganancia, pagas {{pe.tasa-renta-capital}} sobre la ganancia menos el {{pe.deduccion-renta-capital}}. Calcula cuánto pagar a SUNAT antes de la escritura.",
  intro: [
    "Cuando una persona natural vende un inmueble y gana plata con la venta, paga impuesto a la renta sobre esa ganancia antes de firmar la escritura.",
    "Pon el precio de venta y lo que te costó. Te decimos la ganancia y el impuesto a pagar.",
  ],
  comoSeCalcula: [
    "La ganancia es el precio de venta menos lo que te costó el inmueble (compra, mejoras y gastos que puedas sustentar).",
    "A la ganancia se le resta {{pe.deduccion-renta-capital}} y a lo que queda se le aplica {{pe.tasa-renta-capital}}. En la práctica es el 5 % de la ganancia.",
    "Si el inmueble es la casa donde vives, la venta no está gravada, salvo que te dediques a comprar y vender inmuebles.",
  ],
  ejemplo: [
    "Compraste un departamento en S/ 300,000 y lo vendes en S/ 420,000. Ganas S/ 120,000: restas el 20 %, quedan S/ 96,000 y el impuesto es S/ 6,000.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto impuesto pago si vendo mi departamento?",
      respuesta: "{{pe.tasa-renta-capital}} sobre la ganancia después de restar el {{pe.deduccion-renta-capital}}. Si vendes sin ganancia, no pagas impuesto a la renta.",
    },
    {
      pregunta: "¿Cuándo se paga el impuesto por la venta?",
      respuesta: "Antes de elevar la minuta a escritura pública. El notario te pide el comprobante de pago para continuar.",
    },
    {
      pregunta: "¿Si vendo la casa donde vivo pago impuesto?",
      respuesta: "La ley dice que la venta del inmueble que ocupas como casa habitación no es ganancia gravada. Confirma con SUNAT que tu caso cumpla las condiciones.",
    },
    {
      pregunta: "¿Qué puedo sumar al costo del inmueble?",
      respuesta: "El precio que pagaste al comprarlo y las mejoras que le hiciste, siempre que puedas sustentarlos con documentos. Mientras más alto el costo, menor la ganancia y el impuesto.",
    },
  ],
  glosario: [
    { termino: "Ganancia de capital", definicion: "Lo que ganas al vender un bien por más de lo que te costó." },
    { termino: "Pago definitivo", definicion: "Un pago que cierra el impuesto de esa operación: no se vuelve a declarar en el año." },
  ],
});
