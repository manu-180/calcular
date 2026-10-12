import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.multa-sri",
  h1: "Calculadora de multa del SRI por declaración tardía",
  title: "Multa del SRI por declarar tarde: calcula cuánto pagas",
  description: "Calcula la multa por presentar tarde una declaración al SRI: {{ec.multa-declaracion}} del impuesto por mes, o {{ec.multa-sin-impuesto}} de tus ingresos si no hay impuesto.",
  intro: [
    "Si presentas una declaración después del plazo, el SRI cobra una multa por cada mes o fracción de mes de retraso. No hace falta que te notifiquen: la calculas y la pagas tú.",
    "Pon el impuesto de la declaración (o tus ingresos, si no hay impuesto) y los meses de retraso.",
  ],
  comoSeCalcula: [
    "Con impuesto a pagar: {{ec.multa-declaracion}} del impuesto por cada mes o fracción, con un tope del {{ec.multa-declaracion-tope}}.",
    "En el IVA, la multa se calcula sobre el valor a pagar después del crédito tributario.",
    "Sin impuesto a pagar: {{ec.multa-sin-impuesto}} de las ventas o ingresos del período por mes, con un tope del {{ec.multa-sin-impuesto-tope}}.",
    "Si no la pagas tú y la cobra el SRI, sube un {{ec.multa-recargo-cobro}}.",
  ],
  ejemplo: ["Si debías $500 de impuesto y declaras con 2 meses de retraso, la multa es $30."],
  faq: [
    {
      pregunta: "¿Cuánto es la multa por declarar tarde al SRI?",
      respuesta: "El {{ec.multa-declaracion}} del impuesto por cada mes o fracción de retraso, hasta el {{ec.multa-declaracion-tope}} del impuesto.",
    },
    {
      pregunta: "¿Y si mi declaración no tiene impuesto a pagar?",
      respuesta: "Pagas el {{ec.multa-sin-impuesto}} de tus ventas o ingresos del período por cada mes, hasta el {{ec.multa-sin-impuesto-tope}}.",
    },
    {
      pregunta: "¿Unos días de retraso cuentan como un mes?",
      respuesta: "Sí. Cada fracción de mes se cuenta como un mes entero.",
    },
    {
      pregunta: "¿Además de la multa pago intereses?",
      respuesta: "Sí, si hay impuesto a pagar. Los intereses de mora corren desde el vencimiento y se calculan aparte.",
    },
  ],
  glosario: [
    { termino: "Impuesto causado", definicion: "El impuesto que resulta de tu declaración, antes de restar retenciones y anticipos." },
    { termino: "Crédito tributario", definicion: "El IVA que pagaste en tus compras y que restas del IVA de tus ventas." },
  ],
});
