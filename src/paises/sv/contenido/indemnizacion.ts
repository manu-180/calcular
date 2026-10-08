import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.indemnizacion",
  h1: "Cálculo de indemnización por despido en El Salvador",
  title: "Cálculo de indemnización por despido en El Salvador 2026",
  description:
    "Calcule su indemnización por despido injustificado: {{sv.indemnizacion-dias-por-anio}} de salario por año, con el tope de {{sv.indemnizacion-tope}} salarios mínimos diarios del sector. Vea el monto exacto.",
  intro: [
    "La indemnización por despido en El Salvador es de {{sv.indemnizacion-dias-por-anio}} de salario por cada año trabajado, y la parte proporcional del último año. Nunca puede ser menos de {{sv.indemnizacion-dias-minimo}} de salario.",
    "Le toca si lo despiden sin causa justificada y su contrato es por tiempo indefinido. Ponga su salario, las fechas de inicio y de salida, y el sector de la empresa, que define el tope de la ley.",
  ],
  comoSeCalcula: [
    "Se saca su salario diario: el salario mensual dividido por 30.",
    "Ese salario diario no puede pasar de {{sv.indemnizacion-tope}} veces el salario mínimo diario del sector. Si lo pasa, se usa el tope.",
    "Le corresponden {{sv.indemnizacion-dias-por-anio}} de salario por cada año trabajado, y la parte proporcional por la fracción del último año.",
    "Nunca puede ser menos de {{sv.indemnizacion-dias-minimo}} de salario, aunque haya trabajado poco tiempo.",
  ],
  ejemplo: [
    "Trabajó 6 años y 273 días con un salario de $900. Su salario diario es $30. Le corresponden 180 días por los años completos y 22.44 por la fracción: $6,073.15.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me toca de indemnización si me despiden?",
      respuesta: "{{sv.indemnizacion-dias-por-anio}} de salario por cada año, más la parte proporcional del último año. El salario diario que se usa tiene un tope según el sector.",
    },
    {
      pregunta: "¿Cuál es el tope de la indemnización?",
      respuesta: "Para el cálculo, ningún salario diario puede pasar de {{sv.indemnizacion-tope}} veces el salario mínimo diario. En comercio y servicios el mínimo diario es {{sv.salario-minimo-diario@comercio-servicios}}, así que el tope es {{sv.indemnizacion-tope}} veces ese monto.",
    },
    {
      pregunta: "¿La indemnización incluye las vacaciones y el aguinaldo?",
      respuesta: "No. Aparte de la indemnización le deben las vacaciones y el aguinaldo proporcionales al tiempo trabajado.",
    },
    {
      pregunta: "¿Me pagan indemnización si renuncio?",
      respuesta: "No. Si renuncia por su cuenta le corresponde la prestación por renuncia voluntaria, que tiene su propia calculadora.",
    },
    {
      pregunta: "¿Qué hago si no me quieren pagar?",
      respuesta: "Puede acudir al Ministerio de Trabajo y Previsión Social para una audiencia de conciliación con su patrono.",
    },
  ],
  glosario: [
    { termino: "Despido injustificado", definicion: "Cuando el patrono termina el contrato sin una causa que la ley acepte." },
    { termino: "Salario mínimo diario", definicion: "El que fija el decreto de salarios mínimos para cada sector. De él sale el tope." },
    { termino: "Contrato por tiempo indefinido", definicion: "El que no tiene fecha de fin. Es la forma más común de contrato." },
  ],
});
