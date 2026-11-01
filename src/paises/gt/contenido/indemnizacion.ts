import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.indemnizacion",
  h1: "Cálculo de prestaciones laborales e indemnización en Guatemala",
  title: "Cálculo de prestaciones e indemnización Guatemala {{anio}}",
  description:
    "Calcule sus prestaciones laborales: indemnización con sextos, aguinaldo, Bono 14 y vacaciones proporcionales, por despido o renuncia. Gratis y al instante.",
  intro: [
    "La indemnización en Guatemala es de {{gt.indemnizacion-meses-por-anio}} de salario por cada año trabajado, y la parte proporcional del último año, si lo despiden sin causa justa después del período de prueba.",
    "Además, sin importar cómo terminó la relación laboral, le tienen que pagar el aguinaldo, el Bono 14 y las vacaciones que le falten. Escriba su salario y sus fechas para ver el total de sus prestaciones.",
  ],
  comoSeCalcula: [
    "Se saca el promedio de su salario de los últimos seis meses.",
    "A ese promedio se le suma la sexta parte del aguinaldo y del Bono 14 de seis meses. Es como sumar una doceava parte del salario por cada uno.",
    "Indemnización = salario con sextos × {{gt.indemnizacion-meses-por-anio}} por año × días trabajados / 365.",
    "Aguinaldo y Bono 14: la parte de cada período hasta su último día.",
    "Vacaciones: {{gt.vacaciones-dias-habiles}} por año, en proporción a los días desde su último aniversario, más los días que tenga pendientes. Cada día vale el promedio dividido entre 30.",
  ],
  ejemplo: [
    "Trabajó del 1 de marzo de 2022 al 31 de agosto de 2026 (1,645 días) y su promedio es Q6,000. El salario con sextos es Q7,000 y la indemnización, 7,000 × 1,645 / 365 = Q31,547.95. Con aguinaldo, Bono 14 y vacaciones proporcionales, el total es Q38,583.24.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me toca de indemnización si me despiden?",
      respuesta: "Un mes de salario por cada año trabajado, y la parte proporcional del último año. El salario que se usa es el promedio de los últimos seis meses, más la sexta parte del aguinaldo y del Bono 14.",
    },
    {
      pregunta: "¿Qué prestaciones laborales me pagan si renuncio?",
      respuesta: "El aguinaldo, el Bono 14 y las vacaciones proporcionales. La indemnización no, salvo que renuncie por una falta grave del patrono (despido indirecto).",
    },
    {
      pregunta: "¿Qué son los sextos de aguinaldo y Bono 14?",
      respuesta: "Es la sexta parte de lo que le pagaron de aguinaldo y de Bono 14 en seis meses. Se suma al salario promedio para calcular la indemnización.",
    },
    {
      pregunta: "¿La indemnización paga ISR?",
      respuesta: "No. La indemnización por tiempo servido está exenta del impuesto sobre la renta.",
    },
    {
      pregunta: "¿Se pueden cobrar en dinero las vacaciones que no tomé?",
      respuesta: "Solo cuando termina la relación laboral. Ahí le pagan en dinero las vacaciones pendientes y la parte proporcional del último año.",
    },
    {
      pregunta: "¿La bonificación incentivo cuenta para la indemnización?",
      respuesta: "No. La indemnización se calcula con el salario, sin la bonificación incentivo.",
    },
  ],
  glosario: [
    { termino: "Indemnización por tiempo servido", definicion: "Pago del artículo 82 del Código de Trabajo cuando lo despiden sin causa justa." },
    { termino: "Prestaciones laborales", definicion: "Lo que se paga al terminar: aguinaldo, Bono 14 y vacaciones proporcionales, más la indemnización si corresponde." },
    { termino: "Despido indirecto", definicion: "Cuando la persona renuncia porque el patrono cometió una falta grave. Da derecho a indemnización." },
  ],
});
