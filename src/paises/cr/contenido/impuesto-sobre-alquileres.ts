import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.impuesto-sobre-alquileres",
  h1: "Impuesto sobre alquileres en Costa Rica",
  title: "Impuesto sobre alquileres en Costa Rica: cuánto pagar",
  description:
    "Calcule el impuesto sobre la renta de un alquiler: se resta {{cr.alquiler-deduccion}} sin facturas y se paga {{cr.renta-capital[general]}} sobre el resto. Vea el monto del mes y del año.",
  intro: [
    "Si usted alquila una casa, un apartamento o un local, paga impuesto sobre la renta del capital inmobiliario.",
    "La ley le deja restar {{cr.alquiler-deduccion}} del alquiler sin presentar facturas. Sobre el resto se paga {{cr.renta-capital[general]}}.",
  ],
  comoSeCalcula: [
    "Deducción: {{cr.alquiler-deduccion}} del alquiler cobrado, sin necesidad de prueba.",
    "Renta imponible: el alquiler menos la deducción.",
    "Impuesto: {{cr.renta-capital[general]}} de la renta imponible.",
  ],
  ejemplo: ["Con un alquiler de ₡400.000 al mes, el impuesto es ₡51.000 al mes y ₡612.000 al año."],
  faq: [
    {
      pregunta: "¿Cuánto es el impuesto sobre un alquiler?",
      respuesta: "En la práctica, 12,75 % del alquiler: {{cr.renta-capital[general]}} sobre el 85 % que queda después de la deducción.",
    },
    {
      pregunta: "¿Puedo restar el mantenimiento o los intereses de la hipoteca?",
      respuesta: "No. La deducción del {{cr.alquiler-deduccion}} reemplaza a cualquier otro gasto.",
    },
    {
      pregunta: "¿El alquiler de vivienda paga IVA?",
      respuesta: "El IVA es otro impuesto, con reglas propias para los alquileres. Esta calculadora cubre solo el impuesto sobre la renta.",
    },
  ],
  glosario: [
    { termino: "Capital inmobiliario", definicion: "Los ingresos por alquilar o ceder el uso de un inmueble." },
    { termino: "Deducción sin prueba", definicion: "Un porcentaje que se resta automáticamente, sin presentar facturas." },
  ],
});
