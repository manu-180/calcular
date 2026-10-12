import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.irp-alquiler",
  h1: "Calculadora del IRP por alquileres",
  title: "Impuesto por alquilar en Paraguay: calculá tu IRP",
  description: "Calculá el IRP que pagás por alquilar un inmueble: {{py.irp-capital-tasa}} sobre el {{py.irp-alquiler-presunta}} del alquiler o sobre el alquiler menos gastos, lo que te convenga.",
  intro: [
    "Si alquilás una casa, un departamento o un local, esos ingresos pagan el IRP de rentas del capital. La tasa es del {{py.irp-capital-tasa}}.",
    "La ley te deja elegir la base: el {{py.irp-alquiler-presunta}} del alquiler, o el alquiler menos los gastos del inmueble con comprobante.",
  ],
  comoSeCalcula: [
    "Renta presunta: el {{py.irp-alquiler-presunta}} de lo que cobraste de alquiler en el año.",
    "Renta real: el alquiler menos impuesto inmobiliario, mantenimiento, gestión y administración, con comprobantes.",
    "Se toma la que te conviene y se le aplica el {{py.irp-capital-tasa}}.",
  ],
  ejemplo: ["Si cobraste Gs. 36.000.000 de alquiler en el año y tuviste Gs. 4.000.000 de gastos, te conviene la renta presunta de Gs. 18.000.000. Pagás Gs. 1.440.000."],
  faq: [
    {
      pregunta: "¿Cuánto impuesto pago por alquilar?",
      respuesta: "El {{py.irp-capital-tasa}} de la renta neta. Si no tenés gastos que documentar, la base es el {{py.irp-alquiler-presunta}} del alquiler.",
    },
    {
      pregunta: "¿Cuándo se declara?",
      respuesta: "En la declaración jurada anual del IRP de rentas y ganancias del capital, en marzo del año siguiente.",
    },
    {
      pregunta: "¿El alquiler paga IVA?",
      respuesta: "Si sos contribuyente de IVA, el alquiler de vivienda paga {{py.iva-reducida}}. El de locales comerciales paga la tasa general.",
    },
  ],
  glosario: [
    { termino: "IRP", definicion: "Impuesto a la Renta Personal. Grava los ingresos de las personas físicas." },
    { termino: "Rentas del capital", definicion: "Lo que ganás con tus bienes: alquileres, intereses, ventas de inmuebles." },
  ],
});
