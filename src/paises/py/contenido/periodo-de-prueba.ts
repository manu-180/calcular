import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.periodo-de-prueba",
  h1: "Calculadora de período de prueba",
  title: "Período de prueba en Paraguay: cuándo termina el tuyo",
  description: "Calculá el último día de tu período de prueba: {{py.periodo-prueba-dias[no-calificado]}} para trabajos no calificados y {{py.periodo-prueba-dias[calificado]}} para calificados, según el Código del Trabajo.",
  intro: [
    "Al empezar un trabajo hay un período de prueba. Sirve para que el empleador vea si sabés hacer el trabajo y para que vos veas si te conviene.",
    "Dura como máximo {{py.periodo-prueba-dias[no-calificado]}} en el servicio doméstico y los trabajos no calificados, y {{py.periodo-prueba-dias[calificado]}} en los trabajos calificados y para aprendices.",
  ],
  comoSeCalcula: [
    "Se cuenta desde tu primer día de trabajo, que es el día uno.",
    "Se suman los días según el tipo de trabajo: {{py.periodo-prueba-dias[no-calificado]}} o {{py.periodo-prueba-dias[calificado]}}.",
    "El resultado es el último día en que cualquiera puede terminar el contrato sin preaviso ni indemnización.",
  ],
  ejemplo: ["Si entraste el 1 de octubre a un trabajo calificado, la prueba termina el 29 de noviembre."],
  faq: [
    {
      pregunta: "¿Cuánto dura el período de prueba?",
      respuesta: "Como máximo {{py.periodo-prueba-dias[no-calificado]}} para el servicio doméstico y trabajos no calificados, y {{py.periodo-prueba-dias[calificado]}} para trabajos calificados y aprendices. Para técnicos muy especializados se puede pactar otro plazo.",
    },
    {
      pregunta: "¿Me pueden despedir durante el período de prueba?",
      respuesta: "Sí, sin preaviso ni indemnización. Vos también podés irte sin avisar. Igual te tienen que pagar los días trabajados, el aguinaldo proporcional y el IPS.",
    },
    {
      pregunta: "¿El período de prueba cuenta para la antigüedad?",
      respuesta: "Sí. Si al terminar nadie corta el contrato, sigue y ese tiempo cuenta para todos tus derechos.",
    },
    {
      pregunta: "¿Me pueden poner otro período de prueba si me vuelven a contratar?",
      respuesta: "No para el mismo trabajo con el mismo empleador. En un contrato nuevo con las mismas partes y la misma tarea no hay prueba.",
    },
  ],
  glosario: [
    { termino: "Período de prueba", definicion: "El tiempo inicial del contrato para evaluar si la relación funciona (artículo 58 del Código del Trabajo)." },
    { termino: "Trabajo calificado", definicion: "El que requiere un oficio, una técnica o una formación específica." },
  ],
});
