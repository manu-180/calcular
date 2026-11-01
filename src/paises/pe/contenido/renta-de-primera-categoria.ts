import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.renta-primera",
  h1: "Calculadora del impuesto por alquiler (renta de primera categoría)",
  title: "Impuesto por alquiler {{anio}}: renta de primera categoría",
  description:
    "Calcula el impuesto que pagas por alquilar un inmueble: {{pe.tasa-renta-capital}} sobre el alquiler menos el {{pe.deduccion-renta-capital}}. Mensual y anual, con la Ley del Impuesto a la Renta.",
  intro: [
    "Si alquilas una casa, un departamento o un local y eres persona natural, pagas impuesto a la renta de primera categoría cada mes.",
    "Pon el alquiler que cobras y te decimos cuánto pagar a SUNAT por mes y en el año.",
  ],
  comoSeCalcula: [
    "Al alquiler mensual se le resta una deducción fija de {{pe.deduccion-renta-capital}}, sin necesidad de sustentar gastos.",
    "A lo que queda (la renta neta) se le aplica {{pe.tasa-renta-capital}}. En la práctica, es el 5 % de lo que cobras.",
    "El pago es mensual, con el recibo por arrendamiento (formulario 1683).",
  ],
  ejemplo: ["Cobras S/ 1,500 de alquiler. Restas S/ 300, quedan S/ 1,200 y el impuesto es S/ 75 al mes: S/ 900 en el año."],
  faq: [
    {
      pregunta: "¿Cuánto se paga de impuesto por alquilar en Perú?",
      respuesta: "{{pe.tasa-renta-capital}} sobre el alquiler después de restar el {{pe.deduccion-renta-capital}}. Equivale al 5 % del alquiler que cobras.",
    },
    {
      pregunta: "¿Cómo pago el impuesto del alquiler?",
      respuesta: "Cada mes, con el formulario virtual 1683 en SUNAT Virtual. Al pagar se genera el recibo por arrendamiento que le das a tu inquilino.",
    },
    {
      pregunta: "¿Puedo restar los gastos del inmueble?",
      respuesta: "No. La deducción de {{pe.deduccion-renta-capital}} reemplaza a todos los gastos: no se restan arbitrios, mantenimiento ni predial.",
    },
    {
      pregunta: "¿Mi inquilino puede deducir el alquiler?",
      respuesta: "Sí. Si es trabajador, puede deducir parte del alquiler en su declaración anual de renta, siempre que tenga tu recibo por arrendamiento.",
    },
  ],
  glosario: [
    { termino: "Renta de primera categoría", definicion: "La que obtienes por alquilar o ceder bienes muebles o inmuebles." },
    { termino: "Formulario 1683", definicion: "Formulario virtual de SUNAT para pagar el impuesto del alquiler y emitir el recibo por arrendamiento." },
  ],
});
