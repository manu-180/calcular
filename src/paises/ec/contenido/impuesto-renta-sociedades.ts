import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.impuesto-renta-sociedades",
  h1: "Calculadora del impuesto a la renta de sociedades",
  title: "Impuesto a la renta de empresas en Ecuador: {{ec.impuesto-renta-sociedades}}",
  description: "Calcula el impuesto a la renta de tu empresa: primero el {{ec.utilidades}} de participación de trabajadores y después el {{ec.impuesto-renta-sociedades}} sobre la base imponible.",
  intro: [
    "Una sociedad en Ecuador paga el {{ec.impuesto-renta-sociedades}} de impuesto a la renta. Antes se resta el {{ec.utilidades}} de las utilidades que corresponde a los trabajadores.",
    "Pon la utilidad contable del año y los ajustes más comunes. Te mostramos la base imponible, el impuesto y lo que queda para los socios.",
  ],
  comoSeCalcula: [
    "A la utilidad contable se le resta la participación de los trabajadores: el {{ec.utilidades}}.",
    "Se suman los gastos no deducibles y se restan los ingresos exentos. Eso es la base imponible.",
    "Sobre la base se aplica el {{ec.impuesto-renta-sociedades}}.",
    "Si la sociedad no informó quiénes son sus socios, o tiene socios en paraísos fiscales, la tarifa sube {{ec.impuesto-renta-sociedades-recargo}}.",
  ],
  ejemplo: ["Con una utilidad de $100.000 y $5.000 de gastos no deducibles: $15.000 para los trabajadores, base de $90.000 e impuesto de $22.500."],
  faq: [
    {
      pregunta: "¿Cuál es la tarifa del impuesto a la renta de sociedades?",
      respuesta: "El {{ec.impuesto-renta-sociedades}} de la base imponible. Con el recargo por no informar a los socios o por paraísos fiscales, {{ec.impuesto-renta-sociedades-recargo}} más.",
    },
    {
      pregunta: "¿Primero se calcula el {{ec.utilidades}} de los trabajadores o el impuesto?",
      respuesta: "Primero la participación de los trabajadores. El impuesto se calcula sobre la utilidad que queda, con los ajustes de la conciliación tributaria.",
    },
    {
      pregunta: "¿Qué es un gasto no deducible?",
      respuesta: "Un gasto que la ley no deja restar para el impuesto, por ejemplo uno sin comprobante válido. Se vuelve a sumar a la base.",
    },
  ],
  glosario: [
    { termino: "Conciliación tributaria", definicion: "Los ajustes que llevan de la utilidad contable a la base imponible del impuesto." },
    { termino: "Base imponible", definicion: "El valor sobre el que se aplica la tarifa del impuesto." },
  ],
});
