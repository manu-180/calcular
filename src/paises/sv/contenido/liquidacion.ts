import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.liquidacion",
  h1: "Calculadora de liquidación por despido en El Salvador",
  title: "Liquidación por despido en El Salvador 2026: calculadora",
  description: "Calcule todo lo que le deben si lo despiden sin causa: indemnización de {{sv.indemnizacion-dias-por-anio}} por año, vacaciones y aguinaldo proporcionales.",
  intro: [
    "Si lo despiden sin causa justificada, su patrono le debe la indemnización, las vacaciones proporcionales con su recargo y el aguinaldo proporcional. Si le quedó salario sin pagar, también.",
    "Ponga su salario, las fechas y el sector de la empresa. La calculadora suma cada parte y le muestra el total.",
  ],
  comoSeCalcula: [
    "Indemnización: {{sv.indemnizacion-dias-por-anio}} de salario por cada año y la parte proporcional de la fracción. Nunca menos de {{sv.indemnizacion-dias-minimo}}. El salario diario se limita a {{sv.indemnizacion-tope}} veces el mínimo diario de su sector.",
    "Vacaciones: {{sv.vacaciones-dias}} de salario por año, en proporción a los días trabajados desde su último aniversario, más el {{sv.vacaciones-recargo}} de recargo.",
    "Aguinaldo: la parte proporcional de los días que trabajó desde el 13 de diciembre anterior, con la escala de {{sv.aguinaldo-dias[uno-a-tres]}}, {{sv.aguinaldo-dias[tres-a-diez]}} o {{sv.aguinaldo-dias[diez-o-mas]}} según su antigüedad.",
    "Salario pendiente: los días trabajados que todavía no le pagaron.",
  ],
  ejemplo: [
    "Con $600 de salario, del 1 de marzo de 2021 al 30 de septiembre de 2026: indemnización $3,351.78, vacaciones $228.66 y aguinaldo $304. Total: $3,884.44.",
  ],
  faq: [
    {
      pregunta: "¿Qué me tienen que pagar si me despiden sin causa?",
      respuesta: "La indemnización por los años trabajados, las vacaciones proporcionales con su recargo, el aguinaldo proporcional y cualquier salario pendiente.",
    },
    {
      pregunta: "¿Y si renuncio?",
      respuesta: "Si renuncia no hay indemnización. Con dos años o más con el mismo patrono cobra la prestación por renuncia voluntaria, que tiene su propia calculadora.",
    },
    {
      pregunta: "¿La liquidación paga renta o ISSS?",
      respuesta: "La indemnización no paga renta, ISSS ni AFP. El salario pendiente sí lleva sus descuentos normales.",
    },
    {
      pregunta: "¿Qué hago si no me quieren pagar?",
      respuesta: "Puede pedir asesoría gratis en el Ministerio de Trabajo, que cita al patrono a una audiencia de conciliación. Guarde su contrato, boletas de pago y cualquier carta de despido.",
    },
  ],
  glosario: [
    { termino: "Liquidación", definicion: "Todo lo que le deben al terminar el trabajo." },
    { termino: "Despido sin causa justificada", definicion: "El patrono termina el contrato sin una de las razones que permite el Código de Trabajo." },
  ],
});
