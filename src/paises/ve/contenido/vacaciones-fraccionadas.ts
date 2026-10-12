import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.vacaciones-fraccionadas",
  h1: "Calculadora de vacaciones fraccionadas en Venezuela",
  title: "Vacaciones fraccionadas en Venezuela: calcula las tuyas",
  description:
    "Si te vas antes de cumplir el año, cobras vacaciones y bono vacacional proporcionales a los meses completos. Calcúlalos con la LOTTT, en bolívares o dólares.",
  intro: [
    "Cuando la relación de trabajo termina antes de cumplir un año más de servicio, te pagan la parte de las vacaciones y del bono vacacional que ganaste en ese año. Se cuenta por meses completos.",
    "Vale para el primer año y para los siguientes. Escribe tu salario y tus fechas, y te mostramos los días y el monto.",
  ],
  comoSeCalcula: [
    "Contamos los meses completos desde tu último aniversario hasta tu último día de trabajo.",
    "Vemos cuántos días de vacaciones y de bono te tocaban ese año: {{ve.vacaciones-dias-base}} de cada uno el primero, uno más por año siguiente (vacaciones hasta {{ve.vacaciones-dias-adicionales-tope}} adicionales y bono hasta {{ve.bono-vacacional-dias-tope}}).",
    "Esos días se multiplican por los meses completos y se dividen entre 12.",
    "El resultado se paga con tu salario normal diario (mensual entre {{ve.dias-mes-salario}}).",
  ],
  ejemplo: ["Con $300 al mes, dos años y seis meses: el tercer año da 17 días de cada uno. Por 6 meses te tocan 8,5 días de vacaciones y 8,5 de bono, $170 en total."],
  faq: [
    {
      pregunta: "¿Qué son las vacaciones fraccionadas?",
      respuesta: "La parte proporcional de las vacaciones y del bono vacacional del año que no llegaste a completar. Te la pagan al terminar la relación de trabajo, por cualquier motivo.",
    },
    {
      pregunta: "¿Me toca aunque renuncie?",
      respuesta: "Sí. Las vacaciones fraccionadas se pagan en una renuncia, en un despido y en cualquier otro final de la relación.",
    },
    {
      pregunta: "¿Cuentan los días sueltos?",
      respuesta: "No. La ley habla de meses completos. Si trabajaste 4 meses y 20 días desde tu aniversario, se cuentan 4.",
    },
    {
      pregunta: "¿Y las vacaciones que no tomé de años anteriores?",
      respuesta: "Se pagan aparte y completas, con tu último salario. La calculadora de liquidación las suma.",
    },
  ],
  glosario: [
    { termino: "Vacaciones fraccionadas", definicion: "Pago proporcional de las vacaciones del año en curso al terminar la relación (art. 196 de la LOTTT)." },
    { termino: "Aniversario", definicion: "La fecha en que cumples cada año de trabajo en la empresa." },
  ],
});
