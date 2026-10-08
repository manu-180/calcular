import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.salario-minimo",
  h1: "Salario mínimo en Paraguay 2026",
  title: "Salario mínimo Paraguay 2026: {{py.minimos[mensual]}}, por día y hora",
  description: "El salario mínimo vigente en Paraguay es {{py.minimos[mensual]}} por mes desde el {{py.minimos#desde}}. Mirá cuánto es por día, por hora, de noche y a tiempo parcial.",
  intro: [
    "El salario mínimo vigente en Paraguay es {{py.minimos[mensual]}} por mes, desde el {{py.minimos#desde}}. Es el mínimo para actividades diversas no especificadas en jornada diurna.",
    "Elegí tu jornada y, si trabajás a tiempo parcial, poné tus horas del mes.",
  ],
  comoSeCalcula: [
    "Lo fija cada año un decreto del Poder Ejecutivo y lo reglamenta el Ministerio de Trabajo (MTESS). El reajuste rige desde el 1 de julio.",
    "El jornal mínimo, para quien cobra por día, es el mensual dividido 26: {{py.minimos[jornal]}}.",
    "El salario diario del mensualero es el mensual dividido 30 ({{py.minimos[diario]}}) y su hora, el diario dividido 8 ({{py.minimos[hora]}}).",
    "La jornada nocturna lleva un recargo por nocturnidad: {{py.minimos[mensual-nocturno]}} por mes.",
    "A tiempo parcial, la hora diurna mínima es {{py.minimos[hora-parcial]}} y la nocturna, {{py.minimos[hora-parcial-nocturna]}}.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el salario mínimo en Paraguay en 2026?",
      respuesta: "{{py.minimos[mensual]}} por mes para jornada diurna, desde el {{py.minimos#desde}}. Para jornada nocturna es {{py.minimos[mensual-nocturno]}}.",
    },
    {
      pregunta: "¿Cuánto es el salario mínimo por hora?",
      respuesta: "{{py.minimos[hora]}} por hora para quien cobra por mes en jornada diurna. A tiempo parcial, la hora mínima es {{py.minimos[hora-parcial]}}.",
    },
    {
      pregunta: "¿Cuánto es el jornal mínimo?",
      respuesta: "{{py.minimos[jornal]}} por día de jornada diurna y {{py.minimos[jornal-nocturno]}} por día de jornada nocturna.",
    },
    {
      pregunta: "¿Cuándo sube el salario mínimo?",
      respuesta: "Cada año desde el 1 de julio. El Consejo Nacional de Salarios Mínimos propone el reajuste y el Poder Ejecutivo lo fija por decreto.",
    },
    {
      pregunta: "¿Qué pasa si me pagan menos del mínimo?",
      respuesta: "Es una infracción. Podés denunciarlo en el Ministerio de Trabajo (MTESS). El empleador tiene que exhibir los salarios mínimos vigentes en un lugar visible.",
    },
  ],
  glosario: [
    { termino: "Jornal", definicion: "El pago por día trabajado." },
    { termino: "Mensualero", definicion: "Quien cobra un salario por mes. Su salario incluye los días de descanso." },
    { termino: "Actividades diversas no especificadas", definicion: "Las que no tienen un mínimo propio en el anexo de la resolución del MTESS. Es el mínimo general." },
  ],
});
