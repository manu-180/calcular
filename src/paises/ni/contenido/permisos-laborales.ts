import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.permisos-laborales",
  h1: "Permisos laborales con goce de salario en Nicaragua",
  title: "Permisos laborales en Nicaragua: días y pago",
  description: "Permisos con goce de salario en Nicaragua: {{ni.permisos-dias[fallecimiento]}} por fallecimiento de un familiar y {{ni.permisos-dias[matrimonio]}} por matrimonio. Calculá cuánto te pagan.",
  intro: [
    "El Código del Trabajo te da días de permiso pagados por fallecimiento de un familiar cercano, por casarte y por la enfermedad grave de alguien de tu casa.",
    "Elegí el motivo y poné tu salario. Te decimos cuántos días son y cuánto te pagan.",
  ],
  comoSeCalcula: [
    "Fallecimiento de padre, madre, hijos, cónyuge o pareja: hasta {{ni.permisos-dias[fallecimiento]}} hábiles con salario completo.",
    "Matrimonio: hasta {{ni.permisos-dias[matrimonio]}} hábiles con salario completo.",
    "Enfermedad grave de un familiar que vive con vos: hasta {{ni.permisos-dias[enfermedad-familiar]}}, con al menos el {{ni.permiso-enfermedad-familiar-minimo}} de tu salario.",
    "Cada día se paga con tu salario diario: el mensual dividido entre 30.",
  ],
  ejemplo: ["Si te casás y ganás C$9,000, tenés {{ni.permisos-dias[matrimonio]}} de permiso pagados: C$1,500."],
  faq: [
    {
      pregunta: "¿Cuántos días de permiso me dan por la muerte de un familiar?",
      respuesta: "Hasta {{ni.permisos-dias[fallecimiento]}} hábiles seguidos con salario, por padre, madre, hijos, cónyuge o pareja en unión de hecho estable.",
    },
    {
      pregunta: "¿Cuántos días me dan por casarme?",
      respuesta: "Hasta {{ni.permisos-dias[matrimonio]}} hábiles seguidos con salario completo.",
    },
    {
      pregunta: "¿Me pagan si falto para cuidar a un familiar enfermo?",
      respuesta: "Hasta {{ni.permisos-dias[enfermedad-familiar]}} laborables si la enfermedad es grave y vive con vos. El pago se acuerda, pero no puede ser menor del {{ni.permiso-enfermedad-familiar-minimo}} de tu salario.",
    },
    {
      pregunta: "¿Tengo permiso para ir al médico?",
      respuesta: "Sí. Para tu consulta médica o la de tus hijos menores o con discapacidad, con el salario completo y presentando la constancia.",
    },
  ],
  glosario: [
    { termino: "Permiso con goce de salario", definicion: "Un día que no trabajás pero que te pagan igual." },
    { termino: "Días hábiles", definicion: "Los días en que normalmente trabajás." },
  ],
});
