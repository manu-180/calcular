import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.subsidio-por-enfermedad",
  h1: "Calculadora del subsidio por enfermedad del BPS",
  title: "Subsidio por enfermedad BPS {{anio}}: cuánto cobrás",
  description:
    "Calculá cuánto te paga el BPS si estás certificado: el {{uy.enfermedad-porcentaje}} de tu promedio, con tope de {{uy.enfermedad-tope}} por mes, desde el cuarto día de certificación.",
  intro: [
    "Cuando el médico te certifica, tu empleador no te paga esos días: los paga el BPS con el subsidio por enfermedad. Cobrás el {{uy.enfermedad-porcentaje}} de lo que ganabas, con un tope.",
    "Poné tu promedio y los días de certificación. Te decimos cuánto cobrás y cuánto de aguinaldo suma.",
  ],
  comoSeCalcula: [
    "Se promedia lo que cobraste en los 180 días anteriores al último día del mes previo a enfermarte, sin el aguinaldo.",
    "El subsidio es el {{uy.enfermedad-porcentaje}} de ese promedio, con un tope de {{uy.enfermedad-tope}} por mes. Por día, se divide entre 30.",
    "Los primeros {{uy.enfermedad-dias-sin-pago}} de certificación no se pagan. Si estuviste internado, se paga desde el primer día.",
    "Además, el BPS paga la parte de aguinaldo de esos días.",
  ],
  ejemplo: ["Con un promedio de $ 60.000 y 10 días certificado cobrás 7 días a $ 1.400: $ 9.800, más $ 816,67 de aguinaldo."],
  faq: [
    {
      pregunta: "¿Cuánto paga el BPS por enfermedad?",
      respuesta: "El {{uy.enfermedad-porcentaje}} de tu promedio de los últimos seis meses, con un tope de {{uy.enfermedad-tope}} por mes, más la parte de aguinaldo.",
    },
    {
      pregunta: "¿Se pagan los tres primeros días de certificación?",
      respuesta: "No, salvo que estés internado (en sanatorio o en tu casa). En ese caso se paga desde el primer día.",
    },
    {
      pregunta: "¿Cuánto tiempo puedo estar certificado?",
      respuesta: "Hasta un año, con un año más de prórroga si la certificación es seguida. Por la misma dolencia, hasta cuatro años con cortes.",
    },
    {
      pregunta: "¿Qué pasa si es un accidente de trabajo?",
      respuesta: "Paga el Banco de Seguros del Estado (BSE) y el BPS te completa la diferencia hasta el {{uy.enfermedad-porcentaje}}.",
    },
    {
      pregunta: "¿Me pueden despedir mientras estoy certificado?",
      respuesta: "No. Si te despiden durante la enfermedad o en los 30 días después del alta, la indemnización es doble.",
    },
  ],
  glosario: [
    { termino: "Certificación", definicion: "La constancia médica que dice cuántos días no podés trabajar." },
    { termino: "Tope", definicion: "El máximo que paga el BPS por mes, aunque ganes más." },
  ],
});
