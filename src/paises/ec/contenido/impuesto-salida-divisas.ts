import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.impuesto-salida-divisas",
  h1: "Calculadora del impuesto a la salida de divisas (ISD)",
  title: "ISD Ecuador 2026: calcula el {{ec.isd}} con tarjeta o efectivo",
  description: "Calcula el impuesto a la salida de divisas del {{ec.isd}}: compras con tarjeta en el exterior, efectivo al viajar y transferencias, con sus montos exentos.",
  intro: [
    "El impuesto a la salida de divisas (ISD) es del {{ec.isd}} del dinero que sale de Ecuador, pero cada caso tiene un monto exento.",
    "Elige cómo sale el dinero y pon el monto. Te decimos cuánto está exento y cuánto pagas.",
  ],
  comoSeCalcula: [
    "Con tarjeta de crédito o débito en el exterior, tienes {{ec.isd-exento-tarjetas}} exentos al año. Pasado ese monto, pagas el {{ec.isd}}.",
    "Si llevas efectivo al viajar, están exentos {{ec.isd-exento-sbu}} (salarios básicos unificados), más un salario básico por cada menor que viaja contigo.",
    "En transferencias al exterior, también están exentos {{ec.isd-exento-sbu}} (salarios básicos unificados).",
    "Sobre lo que pasa el monto exento se aplica el {{ec.isd}}.",
  ],
  ejemplo: ["Si este año ya gastaste $4.000 con tarjeta afuera y compras $2.000 más, pagas ISD solo por $811,74: $40,59."],
  faq: [
    {
      pregunta: "¿Cuánto puedo gastar con tarjeta en el exterior sin pagar ISD?",
      respuesta: "{{ec.isd-exento-tarjetas}} al año, sumando todas tus tarjetas. El monto rige para 2025, 2026 y 2027.",
    },
    {
      pregunta: "¿Cuánto efectivo puedo sacar del país sin pagar ISD?",
      respuesta: "{{ec.isd-exento-sbu}} (salarios básicos unificados) por persona adulta, más un salario básico por cada menor que viaja contigo. Lo que pase de eso paga el {{ec.isd}}.",
    },
    {
      pregunta: "¿Las compras en tiendas en línea del exterior pagan ISD?",
      respuesta: "Sí, si las pagas con tarjeta cuentan dentro del monto exento anual. Pasado ese monto, el banco cobra el {{ec.isd}}.",
    },
    {
      pregunta: "¿Hay pagos exentos aunque pasen el monto?",
      respuesta: "Sí. Los estudios en el exterior y los tratamientos de enfermedades catastróficas, raras o huérfanas están exentos, con los requisitos del SRI.",
    },
  ],
  glosario: [
    { termino: "ISD", definicion: "Impuesto a la salida de divisas: el impuesto al dinero que sale de Ecuador." },
    { termino: "Monto exento", definicion: "La parte que no paga el impuesto." },
  ],
});
