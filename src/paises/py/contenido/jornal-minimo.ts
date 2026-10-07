import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.jornal-minimo",
  h1: "Calculadora de jornal mínimo",
  title: "Jornal mínimo en Paraguay: cuánto cobrar por día",
  description: "El jornal mínimo es {{py.minimos[jornal]}} por día de jornada diurna. Calculá cuánto te corresponde como mínimo por los días que trabajaste.",
  intro: [
    "Si cobrás por día trabajado (jornalero), tu pago no puede ser menor al jornal mínimo: {{py.minimos[jornal]}} por día en jornada diurna.",
    "Elegí tu jornada y poné cuántos días trabajaste.",
  ],
  comoSeCalcula: [
    "El jornal mínimo es el salario mínimo mensual dividido 26 días.",
    "En jornada diurna es {{py.minimos[jornal]}}; en jornada nocturna, {{py.minimos[jornal-nocturno]}}.",
    "Se multiplica por los días trabajados.",
  ],
  ejemplo: ["Si trabajaste 20 días de jornada diurna, cobrás como mínimo 20 jornales."],
  faq: [
    {
      pregunta: "¿Cuánto es el jornal mínimo en Paraguay?",
      respuesta: "{{py.minimos[jornal]}} por día de jornada diurna y {{py.minimos[jornal-nocturno]}} por día de jornada nocturna, desde el {{py.minimos#desde}}.",
    },
    {
      pregunta: "¿Cuál es la diferencia entre jornalero y mensualero?",
      respuesta: "El jornalero cobra por cada día trabajado. El mensualero cobra un salario por mes que ya incluye los días de descanso.",
    },
    {
      pregunta: "¿El jornal mínimo vale para el trabajo a destajo?",
      respuesta: "Sí. Si cobrás por pieza o por tarea, lo que ganás por día no puede quedar debajo del jornal mínimo.",
    },
  ],
  glosario: [
    { termino: "Jornalero", definicion: "Quien cobra por día trabajado." },
    { termino: "A destajo", definicion: "Pago por pieza, tarea o unidad de obra." },
  ],
});
