import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.incapacidad-imss",
  h1: "Calculadora de incapacidad del IMSS {{anio}}",
  title: "Incapacidad IMSS {{anio}}: cuánto te pagan por día",
  description:
    "Calcula cuánto te paga el IMSS por una incapacidad: enfermedad general al {{mx.subsidio-incapacidad[enfermedad-general]}} desde el cuarto día, riesgo de trabajo y maternidad al 100 %.",
  intro: [
    "Cuando el IMSS te da una incapacidad, tu empresa deja de pagarte esos días y el IMSS te paga un subsidio. Cuánto recibes depende del tipo de incapacidad y de tu salario base de cotización.",
    "Elige el tipo, escribe tu salario base de cotización diario y los días de incapacidad.",
  ],
  comoSeCalcula: [
    "Enfermedad general: {{mx.subsidio-incapacidad[enfermedad-general]}} de tu salario base de cotización, desde el cuarto día. Los primeros {{mx.dias-espera-enfermedad}} no se pagan.",
    "Accidente o enfermedad de trabajo: {{mx.subsidio-incapacidad[riesgo-trabajo]}} desde el primer día y mientras dure.",
    "Maternidad: {{mx.subsidio-incapacidad[maternidad]}} durante {{mx.dias-maternidad}} (42 antes y 42 después del parto).",
    "El salario se toma con el tope de {{mx.tope-sbc-imss}}.",
  ],
  ejemplo: ["Con un salario base de cotización de 500 pesos y 7 días de incapacidad por enfermedad general, el IMSS te paga 4 días a 300 pesos: 1,200 en total."],
  faq: [
    {
      pregunta: "¿Por qué no me pagan los primeros tres días?",
      respuesta: "La Ley del Seguro Social paga la incapacidad por enfermedad general desde el cuarto día. Algunos contratos colectivos hacen que la empresa cubra esos días, pero no es obligatorio por ley.",
    },
    {
      pregunta: "¿Qué requisitos pide el IMSS para pagarme?",
      respuesta: "En enfermedad general necesitas al menos cuatro semanas cotizadas antes de enfermarte; si eres eventual, seis semanas en los últimos cuatro meses. En maternidad, 30 semanas en los 12 meses antes del pago.",
    },
    {
      pregunta: "¿Cuánto tiempo puede durar una incapacidad por enfermedad?",
      respuesta: "Hasta 52 semanas, y el IMSS puede extenderla 26 semanas más con un dictamen médico.",
    },
    {
      pregunta: "¿La incapacidad paga ISR?",
      respuesta: "Las indemnizaciones por riesgos de trabajo o enfermedades que se pagan conforme a la ley están exentas (Ley del ISR, artículo 93, fracción III).",
    },
  ],
  glosario: [
    { termino: "Subsidio por incapacidad", definicion: "Pago del IMSS que sustituye tu salario mientras no puedes trabajar." },
    { termino: "SBC", definicion: "Salario base de cotización con el que estás registrado en el IMSS." },
  ],
});
