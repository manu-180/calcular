import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.incapacidad",
  h1: "Calculadora de incapacidad por enfermedad general",
  title: "Incapacidad médica 2026: cuánto te pagan",
  description:
    "Calcula cuánto te pagan por una incapacidad de origen común: qué parte paga la empresa, cuál la EPS y cuánto pierdes frente a tu salario.",
  intro: [
    "Si estás incapacitado por una enfermedad que no es laboral, no recibes tu salario completo. Recibes un auxilio de dos terceras partes del salario hasta el día 90 y de la mitad desde el día 91.",
    "Los primeros {{co.incapacidad-dias-empleador}} días los paga la empresa y desde el tercero, la EPS. Nunca te pueden pagar menos del salario mínimo diario.",
  ],
  comoSeCalcula: [
    "Valor del día: tu salario mensual dividido por 30.",
    "Días 1 a 90: se paga el {{co.incapacidad-porcentaje[hasta-90]}} del valor del día.",
    "Días 91 a 180: se paga el {{co.incapacidad-porcentaje[desde-91]}}.",
    "Piso: si el resultado da menos que el salario mínimo diario, se paga el mínimo diario.",
  ],
  ejemplo: [
    "Con un salario de $3.000.000 y 5 días de incapacidad, cada día se paga a $66.670. La empresa paga 2 días ($133.340) y la EPS 3 días ($200.010).",
  ],
  faq: [
    {
      pregunta: "¿Quién paga los dos primeros días de incapacidad?",
      respuesta: "La empresa. Desde el tercer día la paga la EPS, aunque muchas empresas te consignan todo y después le cobran a la EPS.",
    },
    {
      pregunta: "¿Me pueden pagar menos del salario mínimo?",
      respuesta: "No. La Corte Constitucional dijo que el auxilio por incapacidad no puede ser menor al salario mínimo. Si ganas el mínimo, recibes el mínimo diario.",
    },
    {
      pregunta: "¿Qué pasa después del día 180?",
      respuesta: "Esta calculadora llega hasta el día 180. Después, la incapacidad sigue otras reglas y suele intervenir el fondo de pensiones.",
    },
    {
      pregunta: "¿Y si la incapacidad es por un accidente de trabajo?",
      respuesta: "Ahí la paga la ARL con otras reglas. Esta calculadora es para enfermedad general.",
    },
  ],
  glosario: [
    { termino: "Incapacidad", definicion: "Los días en que un médico certifica que no puedes trabajar." },
    { termino: "Enfermedad general", definicion: "Una enfermedad o accidente que no tiene origen en el trabajo." },
  ],
});
