import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.certificado-de-deposito",
  h1: "Calculadora de certificado de depósito a plazo (CDP)",
  title: "Calculadora de CDP en Costa Rica: intereses e impuesto",
  description:
    "Calcule cuánto gana un certificado de depósito a plazo: intereses, la retención del {{cr.renta-capital[general]}} y lo que recibe al vencer. Con la tasa básica pasiva del BCCR.",
  intro: [
    "Un certificado de depósito a plazo (CDP) paga intereses por dejar su dinero quieto un tiempo. A los intereses se les retiene el impuesto sobre la renta.",
    "Escriba el monto, la tasa que le ofrecen y el plazo. Le mostramos lo que gana en limpio y la tasa básica pasiva del día como referencia.",
  ],
  comoSeCalcula: [
    "Intereses: monto por tasa anual por días, dividido entre la base de días del año (360 o 365).",
    "Retención: {{cr.renta-capital[general]}} de los intereses en bancos, Banco Popular y cooperativas; {{cr.renta-capital[vivienda]}} en títulos del Sistema Financiero Nacional para la Vivienda.",
    "Intereses netos: los intereses menos la retención.",
  ],
  ejemplo: ["₡1.000.000 a 180 días al 5 % anual (base 360) gana ₡25.000. Se retienen ₡3.750 y recibe ₡21.250 de intereses."],
  faq: [
    {
      pregunta: "¿Cuánto impuesto pagan los intereses de un CDP?",
      respuesta: "{{cr.renta-capital[general]}} de los intereses. La entidad lo retiene al pagar y es el impuesto final.",
    },
    {
      pregunta: "¿Qué es la tasa básica pasiva?",
      respuesta: "Una tasa de referencia que calcula el Banco Central con lo que pagan las entidades por los depósitos. Muchos créditos la usan para ajustar su tasa.",
    },
    {
      pregunta: "¿Se calcula con 360 o con 365 días?",
      respuesta: "Depende de la entidad. Con 360 días los intereses salen un poco más altos que con 365. El contrato del CDP dice cuál usan.",
    },
  ],
  glosario: [
    { termino: "CDP", definicion: "Certificado de depósito a plazo: una inversión a un plazo fijo con tasa pactada." },
    { termino: "TBP", definicion: "Tasa básica pasiva, calculada por el BCCR." },
  ],
});
