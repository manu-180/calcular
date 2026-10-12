import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.certificado-financiero",
  h1: "Calculadora de certificado financiero en República Dominicana",
  title: "Certificado financiero en RD: calcula tus intereses",
  description: "Calcula los intereses de un certificado financiero o depósito a plazo, con la retención de {{do.retencion-intereses}} de ISR sobre los intereses.",
  intro: [
    "Un certificado financiero te paga intereses por dejar tu dinero un tiempo en el banco o la asociación. Sobre esos intereses te retienen {{do.retencion-intereses}} de ISR.",
    "Pon el monto, la tasa y el plazo, y ves cuánto ganas.",
  ],
  comoSeCalcula: [
    "Intereses: monto por tasa anual por días del plazo, dividido entre los días del año que usa la entidad.",
    "Retención: el {{do.retencion-intereses}} de los intereses.",
    "Intereses netos: intereses menos retención.",
  ],
  ejemplo: [
    "RD$100,000 al 8 % por 90 días dan RD$1,972.60 de intereses. Te retienen RD$197.26 y te quedan RD$1,775.34.",
  ],
  faq: [
    { pregunta: "¿Cuánto ISR se paga por los intereses?", respuesta: "El {{do.retencion-intereses}} de los intereses, retenido por la entidad como pago definitivo." },
    { pregunta: "¿Me pueden devolver esa retención?", respuesta: "Sí, si tu renta neta del año es baja. Lo pides en tu declaración anual." },
    { pregunta: "¿Por qué mi banco da un número un poco distinto?", respuesta: "Puede usar 360 días, capitalizar los intereses o pagarlos cada mes. Revisa esas condiciones en tu contrato." },
  ],
  glosario: [
    { termino: "Certificado financiero", definicion: "Depósito a plazo fijo que paga intereses." },
    { termino: "Tasa anual", definicion: "El interés que paga la entidad por un año." },
  ],
});
