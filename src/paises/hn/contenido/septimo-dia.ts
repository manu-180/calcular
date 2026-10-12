import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.septimo-dia",
  h1: "Cálculo del séptimo día en Honduras",
  title: "Séptimo día en Honduras: cuánto le pagan el descanso",
  description: "Calcule el pago del séptimo día (descanso semanal pagado) si gana por día u hora, con la Ley del Séptimo Día y Décimo Tercer Mes.",
  intro: [
    "Por cada {{hn.septimo-dia-cada}} de trabajo usted tiene un día de descanso pagado, de preferencia el domingo. Es el séptimo día.",
    "Si gana por día, por semana o por hora, se paga aparte. Si gana por mes o por quincena, ya viene incluido en su salario.",
  ],
  comoSeCalcula: [
    "El séptimo día vale una jornada ordinaria, sin contar horas extra.",
    "Si trabajó la semana completa: un día de salario.",
    "Si trabajó menos días por una causa justificada: salario de un día × días trabajados / {{hn.septimo-dia-cada}}.",
    "Si faltó sin causa justificada: no se paga.",
  ],
  ejemplo: ["Gana L400 por día y trabajó los 6 días. Su séptimo día es L400 y la semana completa suma L2,800."],
  faq: [
    {
      pregunta: "¿Qué es el séptimo día?",
      respuesta: "Es el día de descanso pagado que le corresponde por cada seis días de trabajo. La ley prefiere que sea el domingo.",
    },
    {
      pregunta: "¿Pierdo el séptimo día si falto?",
      respuesta: "Solo si falta sin una causa justificada. Si falta por una incapacidad u otra causa justificada, cobra la parte proporcional.",
    },
    {
      pregunta: "¿Me pagan aparte el séptimo día si gano por mes?",
      respuesta: "No. Si su salario es por mes o por quincena, el pago del día de descanso ya está incluido.",
    },
    {
      pregunta: "¿Y si trabajo el día de descanso?",
      respuesta: "Se paga con el doble del salario de la jornada, además del séptimo día, y tiene derecho a otro día de descanso en la semana.",
    },
  ],
  glosario: [
    { termino: "Séptimo día", definicion: "El día de descanso semanal pagado (Decreto 112-82 y artículo 338 del Código del Trabajo)." },
    { termino: "Jornada ordinaria", definicion: "La jornada normal de trabajo de un día, sin horas extra." },
  ],
});
