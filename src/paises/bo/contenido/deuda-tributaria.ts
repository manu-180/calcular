import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.deuda-tributaria",
  h1: "Calculadora de deuda tributaria con UFV e intereses",
  title: "Deuda tributaria Bolivia: calcule UFV, intereses y multa",
  description: "Calcule cuánto debe hoy al SIN por un impuesto no pagado: tributo actualizado en UFV, intereses por tramos de mora y multa por omisión de pago.",
  intro: [
    "Si no pagó un impuesto a tiempo, la deuda crece de dos formas: se actualiza con la UFV y suma intereses por cada día de mora.",
    "Escriba el impuesto que no pagó, la fecha en que vencía y la UFV de ese día.",
  ],
  comoSeCalcula: [
    "El tributo omitido se pasa a UFV con la UFV del día del vencimiento.",
    "Intereses: {{bo.deuda-tributaria-tasas[hasta-4]}} anual los primeros cuatro años de mora, {{bo.deuda-tributaria-tasas[hasta-7]}} del quinto al séptimo y {{bo.deuda-tributaria-tasas[desde-8]}} desde el octavo, con capitalización diaria sobre 360.",
    "Tributo e intereses se vuelven a pasar a bolivianos con la UFV de hoy.",
    "Si el SIN determina la deuda, suma una multa del {{bo.multa-omision-pago}} del tributo actualizado.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula la deuda tributaria?",
      respuesta: "Es el tributo omitido en UFV más los intereses (Código Tributario, artículo 47). Al pagar, se convierte a bolivianos con la UFV del día.",
    },
    {
      pregunta: "¿Puedo evitar la multa?",
      respuesta: "Sí. Si paga toda la deuda antes de que pasen 20 días desde que le notifiquen la Vista de Cargo, la multa del {{bo.multa-omision-pago}} se extingue (arrepentimiento eficaz).",
    },
    {
      pregunta: "¿Y si pago después?",
      respuesta: "La multa se reduce un 80 % si paga antes de la Resolución Determinativa, un 60 % antes del recurso de alzada y un 40 % antes del recurso jerárquico (artículo 156).",
    },
  ],
  glosario: [
    { termino: "Tributo omitido", definicion: "El impuesto que no se pagó en su fecha." },
    { termino: "UFV", definicion: "Unidad de Fomento de Vivienda, que el Banco Central publica cada día y sigue a la inflación." },
    { termino: "Vista de Cargo", definicion: "La notificación del SIN que le informa la deuda que encontró." },
  ],
});
