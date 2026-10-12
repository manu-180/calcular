import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.licencia-paternidad",
  h1: "Calculadora de licencia por paternidad en Ecuador",
  title: "Licencia de paternidad Ecuador 2026: cuántos días te tocan",
  description: "La licencia por paternidad en Ecuador es de {{ec.paternidad-dias}} con parto normal y más si es cesárea o prematuro. Calcula tus días y cuándo vuelves al trabajo.",
  intro: [
    "Desde mayo de 2023 la licencia por paternidad en Ecuador es de {{ec.paternidad-dias}} pagados por parto normal. Hay días extra por cesárea, parto múltiple o un bebé prematuro.",
    "Pon la fecha de nacimiento y las condiciones del parto. Te decimos cuántos días te corresponden y cuándo vuelves.",
  ],
  comoSeCalcula: [
    "Parto normal: {{ec.paternidad-dias}}.",
    "Cesárea o nacimiento múltiple: {{ec.paternidad-cesarea-dias}} más.",
    "Bebé prematuro o con cuidados especiales: {{ec.paternidad-prematuro-dias}} más.",
    "Si nace con una enfermedad degenerativa, terminal o irreversible, o con discapacidad severa, la licencia es de {{ec.paternidad-grave-dias}}.",
    "La calculadora cuenta días corridos desde el día del nacimiento.",
  ],
  ejemplo: ["Si tu hija nace el 1 de octubre de 2026 por cesárea y es prematura, tienes 28 días: vuelves el 29 de octubre."],
  faq: [
    {
      pregunta: "¿Cuántos días de paternidad me dan en Ecuador?",
      respuesta: "{{ec.paternidad-dias}} con parto normal. Con cesárea o parto múltiple, {{ec.paternidad-cesarea-dias}} más.",
    },
    {
      pregunta: "¿La licencia por paternidad es pagada?",
      respuesta: "Sí. Cobras tu remuneración completa durante toda la licencia.",
    },
    {
      pregunta: "¿Qué necesito para pedirla?",
      respuesta: "El certificado médico del IESS o, si no lo tienes, de otro profesional, con la fecha del nacimiento.",
    },
    {
      pregunta: "¿Qué pasa si la madre fallece en el parto?",
      respuesta: "El padre puede usar toda la licencia por maternidad, o la parte que le faltaba a la madre.",
    },
  ],
  glosario: [
    { termino: "Licencia por paternidad", definicion: "Los días pagados que tiene el padre por el nacimiento de su hija o hijo." },
    { termino: "Certificado médico", definicion: "El documento del IESS o de otro profesional que justifica la fecha y las condiciones del nacimiento." },
  ],
});
