import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.rimpe",
  h1: "Calculadora RIMPE: impuesto a la renta de negocios populares y emprendedores",
  title: "Calculadora RIMPE 2026: cuánto pagas de impuesto a la renta",
  description:
    "Calcula el impuesto a la renta del RIMPE con las tablas del SRI: cuota de negocio popular hasta USD 20.000 y tabla de emprendedores hasta USD 300.000.",
  intro: [
    "El RIMPE es el régimen simplificado del SRI para emprendedores y negocios populares. El impuesto a la renta sale de una tabla según tus ingresos brutos del año, sin restar gastos.",
    "Escribe tus ingresos y te decimos en qué categoría estás y cuánto pagas en la declaración anual.",
  ],
  comoSeCalcula: [
    "Si eres persona natural con ingresos de hasta USD 20.000, eres negocio popular: pagas una cuota fija según el tramo de tus ingresos. Esa cuota incluye el IVA.",
    "Si tus ingresos pasan de USD 20.000, o si eres una sociedad, eres emprendedor: pagas una cuota fija más un porcentaje del excedente, según la tabla del SRI.",
    "Con más de USD 300.000 de ingresos ya no estás en el RIMPE.",
    "La base son los ingresos brutos de las actividades del régimen, menos devoluciones y descuentos.",
  ],
  ejemplo: ["Un emprendedor con USD 60.000 en el año paga 360 + 1,25 % × 10.000 = USD 485."],
  faq: [
    {
      pregunta: "¿Cuánto paga un negocio popular?",
      respuesta: "Una cuota fija al año que sube por tramos de ingresos, y con los ingresos más bajos no paga nada. No declara IVA porque la cuota ya lo incluye. Pon tus ingresos arriba y te mostramos la cuota exacta.",
    },
    {
      pregunta: "¿Cuándo se declara?",
      respuesta: "Una vez al año. Las personas naturales, en mayo; las sociedades emprendedoras, en abril. El día depende del noveno dígito del RUC.",
    },
    {
      pregunta: "¿Puedo restar gastos?",
      respuesta: "No. En el RIMPE el impuesto se calcula sobre los ingresos brutos y la tarifa no admite rebajas.",
    },
    {
      pregunta: "¿Qué actividades no entran en el RIMPE?",
      respuesta: "Entre otras, las profesionales, el arriendo de bienes, la construcción, el transporte (salvo taxis), las agropecuarias y el trabajo en relación de dependencia.",
    },
  ],
  glosario: [
    { termino: "RIMPE", definicion: "Régimen Simplificado para Emprendedores y Negocios Populares." },
    { termino: "Negocio popular", definicion: "Persona natural del RIMPE con ingresos brutos anuales de hasta USD 20.000." },
    { termino: "SRI", definicion: "Servicio de Rentas Internas." },
  ],
});
