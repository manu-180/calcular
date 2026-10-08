import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.jornal-minimo",
  h1: "Calculadora de jornal mínimo en Paraguay",
  title: "Jornal mínimo Paraguay 2026: {{py.minimos[jornal]}} diurno y nocturno",
  description: "El jornal mínimo vigente es {{py.minimos[jornal]}} por día de jornada diurna desde el {{py.minimos#desde}}. Calculá cuánto te corresponde por los días que trabajaste.",
  intro: [
    "El jornal mínimo vigente en Paraguay es {{py.minimos[jornal]}} por día en jornada diurna y {{py.minimos[jornal-nocturno]}} en jornada nocturna. Si cobrás por día trabajado (jornalero), tu pago no puede ser menor.",
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
      pregunta: "¿Cómo se calcula el jornal mínimo?",
      respuesta: "Es el salario mínimo mensual dividido 26 días. Para saber tu mínimo del mes, se multiplica por los días que trabajaste.",
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
