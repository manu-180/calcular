import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.retencion-servicios-profesionales",
  h1: "Calculadora de retención del {{sv.retencion-servicios}} por servicios profesionales",
  title: "Retención del {{sv.retencion-servicios}} por servicios en El Salvador: calculadora",
  description: "Calcule la retención de renta del {{sv.retencion-servicios}} sobre honorarios y cuánto recibe en mano, con o sin IVA. También al revés: desde lo que quiere cobrar.",
  intro: [
    "Si presta un servicio sin ser empleado, la empresa o institución que le paga le retiene el {{sv.retencion-servicios}} como anticipo de renta, sin importar el monto.",
    "Ponga el valor del servicio o lo que quiere recibir. Si está inscrito en el IVA, la calculadora suma el {{sv.iva}} y le muestra lo que entra a su cuenta.",
  ],
  comoSeCalcula: [
    "Retención: {{sv.retencion-servicios}} del valor del servicio, sin el IVA.",
    "IVA: si es contribuyente, suma el {{sv.iva}} al valor del servicio.",
    "Lo que recibe es el servicio, más el IVA, menos la retención.",
  ],
  ejemplo: ["Por honorarios de $1,000 le retienen $100. Si cobra IVA, suma $130 y recibe $1,030."],
  faq: [
    {
      pregunta: "¿Quién me tiene que hacer la retención?",
      respuesta: "Las empresas, las personas jurídicas, el Estado, las municipalidades y las instituciones autónomas que le paguen un servicio cuando usted no es su empleado.",
    },
    {
      pregunta: "¿Pierdo ese dinero?",
      respuesta: "No. Es un anticipo de su impuesto sobre la renta. En su declaración anual lo resta del impuesto y, si le retuvieron de más, le queda saldo a favor.",
    },
    {
      pregunta: "¿La retención va sobre el monto con IVA?",
      respuesta: "No. Se calcula sobre el valor del servicio. El IVA lo cobra y lo declara usted aparte.",
    },
    {
      pregunta: "¿También aplica a alquileres?",
      respuesta: "Sí. Los pagos por arrendamiento a personas naturales tienen la misma retención del {{sv.retencion-servicios}}.",
    },
  ],
  glosario: [
    { termino: "Honorarios", definicion: "Lo que cobra un profesional independiente por su servicio." },
    { termino: "Agente de retención", definicion: "Quien paga y está obligado a retener el impuesto y entregarlo a Hacienda." },
  ],
});
