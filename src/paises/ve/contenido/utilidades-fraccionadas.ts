import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.utilidades-fraccionadas",
  h1: "Calculadora de utilidades fraccionadas en Venezuela",
  title: "Utilidades fraccionadas en Venezuela: cuánto te toca",
  description:
    "Si te vas antes de terminar el año, cobras la parte de las utilidades de los meses completos que trabajaste: entre {{ve.utilidades-dias-minimo}} y {{ve.utilidades-dias-maximo}} al año.",
  intro: [
    "Las utilidades se pagan por año. Si te vas antes del cierre o entraste después del inicio, cobras la parte proporcional a los meses completos que trabajaste. Eso son las utilidades fraccionadas.",
    "Escribe tu salario, los días que paga tu empresa y tus fechas. Te mostramos los meses que cuentan y el monto.",
  ],
  comoSeCalcula: [
    "Contamos los meses completos desde el 1 de enero (o desde tu ingreso, si fue después) hasta tu último día.",
    "Días que te tocan: los días de utilidades al año por los meses completos, entre 12.",
    "Monto: esos días por tu salario diario (mensual entre {{ve.dias-mes-salario}}).",
  ],
  ejemplo: ["Con $300 al mes, 30 días de utilidades y salida el 30 de septiembre, te tocan 22,5 días: $225."],
  faq: [
    {
      pregunta: "¿Cómo se calculan las utilidades fraccionadas?",
      respuesta: "Se toman los días de utilidades del año, se multiplican por los meses completos trabajados y se dividen entre 12. Ese número de días se paga con tu salario diario.",
    },
    {
      pregunta: "¿Cuándo me las pagan si me voy antes del cierre?",
      respuesta: "La empresa puede pagarlas al cerrar su ejercicio, cuando ya sabe cuánto ganó. Muchas las pagan en la liquidación.",
    },
    {
      pregunta: "¿Y si en diciembre ya me adelantaron utilidades?",
      respuesta: "Ese adelanto es parte de las utilidades del mismo ejercicio, así que se descuenta de lo que te toca.",
    },
    {
      pregunta: "¿Cuentan los días sueltos?",
      respuesta: "No. La ley habla de meses completos de servicio.",
    },
  ],
  glosario: [
    { termino: "Utilidades fraccionadas", definicion: "Parte proporcional de las utilidades por los meses completos trabajados en el ejercicio (art. 131 de la LOTTT)." },
    { termino: "Ejercicio", definicion: "El año contable de la empresa. Casi siempre coincide con el año calendario." },
  ],
});
