import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.nuevo-rus",
  h1: "Calculadora del Nuevo RUS: tu categoría y tu cuota",
  title: "Nuevo RUS 2026: calcula tu categoría y tu cuota",
  description:
    "Calcula en qué categoría del Nuevo RUS estás y cuánto pagas al mes según tus ventas y compras. Con los límites mensual y anual de la SUNAT.",
  intro: [
    "El Nuevo RUS es el régimen más simple para personas con un negocio pequeño, como una bodega o un puesto de mercado. Pagas una cuota fija al mes y no llevas libros contables.",
    "La cuota es de {{pe.nrus-cuota[categoria-1]}} o {{pe.nrus-cuota[categoria-2]}} según tu categoría, y te deja dentro mientras no pases los límites de la SUNAT.",
  ],
  comoSeCalcula: [
    "Se toma el mayor monto entre tus ventas (ingresos brutos) y tus compras del mes.",
    "Si no pasa de {{pe.nrus-limite-mensual[categoria-1]}}, estás en la Categoría 1 y pagas {{pe.nrus-cuota[categoria-1]}}.",
    "Si pasa de ese monto pero no de {{pe.nrus-limite-mensual[categoria-2]}}, estás en la Categoría 2 y pagas {{pe.nrus-cuota[categoria-2]}}.",
    "Si en el mes pasas de {{pe.nrus-limite-mensual[categoria-2]}}, o en el año de {{pe.nrus-limite-anual}}, ya no puedes estar en el Nuevo RUS.",
  ],
  ejemplo: [
    "Pedro vendió S/ 4,500 y compró S/ 3,500 en su bodega. Ninguno pasa de {{pe.nrus-limite-mensual[categoria-1]}}: está en la Categoría 1 y paga {{pe.nrus-cuota[categoria-1]}} ese mes.",
  ],
  faq: [
    {
      pregunta: "¿Qué pasa si un mes vendo más?",
      respuesta: "Pagas la cuota de la categoría que te toque ese mes. Si pasas a la Categoría 2, pagas la cuota mayor solo por ese mes.",
    },
    {
      pregunta: "¿Qué comprobantes puedo emitir?",
      respuesta: "Boletas de venta y tickets. En el Nuevo RUS no puedes emitir facturas.",
    },
    {
      pregunta: "¿Existe una categoría que no paga?",
      respuesta: "Sí, la Categoría Especial: para quien vende solo frutas, hortalizas y productos similares en mercados de abastos, o cultiva y vende sus productos en estado natural, con ingresos o compras de hasta S/ 60,000 al año. Hay que presentar el Formulario 2010.",
    },
    {
      pregunta: "¿Quiénes pueden estar en el Nuevo RUS?",
      respuesta: "Personas naturales y sucesiones indivisas con negocios u oficios. Las empresas no pueden.",
    },
  ],
  glosario: [
    { termino: "NRUS", definicion: "Nuevo Régimen Único Simplificado de la SUNAT." },
    { termino: "Ingresos brutos", definicion: "Todo lo que vendiste o cobraste en el mes, sin restar gastos." },
  ],
});
