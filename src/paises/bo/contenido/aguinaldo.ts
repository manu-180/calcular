import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.aguinaldo",
  h1: "Calculadora de aguinaldo de Navidad 2026",
  title: "Aguinaldo Bolivia 2026: calcule el suyo por duodécimas",
  description: "Calcule su aguinaldo de Navidad 2026 con el promedio de los últimos 3 meses y las duodécimas del tiempo trabajado en la gestión, como indica el Ministerio.",
  intro: [
    "El aguinaldo de Navidad en Bolivia es un sueldo más por año: el promedio del total ganado de los últimos 3 meses. Si no trabajó la gestión completa, se paga por duodécimas, en proporción al tiempo trabajado.",
    "Escriba su sueldo promedio y sus fechas. Si sigue trabajando, deje vacía la fecha de retiro.",
  ],
  comoSeCalcula: [
    "La base es el promedio del total ganado de los últimos 3 meses. Para obreros, el salario del último mes.",
    "Por cada mes trabajado en la gestión se paga un doceavo de esa base, y por cada día suelto, un 1/360.",
    "Para cobrarlo hay que trabajar al menos {{bo.aguinaldo-meses-minimos[empleado]}} seguidos en la gestión (empleados) o {{bo.aguinaldo-meses-minimos[obrero]}} (obreros), en el mismo lugar.",
    "No se descuentan aportes ni RC-IVA, y no se puede pagar en especie.",
  ],
  ejemplo: [
    "Con un sueldo promedio de Bs 3.000 y retiro el 15 de septiembre: 3.000 / 12 × 8 meses = Bs 2.000, más 3.000 / 360 × 15 días = Bs 125. Total: Bs 2.125.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el aguinaldo en Bolivia?",
      respuesta: "Se toma el promedio del total ganado de los últimos 3 meses (para obreros, el salario del último mes). Por cada mes trabajado en la gestión se paga un doceavo de ese promedio, y por cada día suelto, 1/360.",
    },
    {
      pregunta: "¿Hasta cuándo se paga el aguinaldo?",
      respuesta: "Lo fija cada año el Ministerio de Trabajo. En 2025 el plazo para el sector privado fue el 20 de diciembre. Si el empleador no paga a tiempo, debe pagarlo doble.",
    },
    {
      pregunta: "¿Qué entra en el total ganado?",
      respuesta: "El haber básico, el bono de antigüedad, las horas extras, el recargo nocturno, los domingos y feriados trabajados, las comisiones y todo pago permanente y regular.",
    },
    {
      pregunta: "¿Me corresponde aguinaldo si renuncié?",
      respuesta: "Sí, por duodécimas, si trabajó al menos 3 meses seguidos en la gestión. Se paga junto con el finiquito.",
    },
    {
      pregunta: "¿Este año hay segundo aguinaldo?",
      respuesta: "El segundo aguinaldo «Esfuerzo por Bolivia» solo se paga si el PIB crece más de 4,5 % y un decreto del año lo dispone. No lo incluimos en este cálculo.",
    },
  ],
  glosario: [
    { termino: "Duodécima", definicion: "Un doceavo del sueldo: lo que corresponde por cada mes trabajado." },
    { termino: "Total ganado", definicion: "Todo lo que se cobra en el mes antes de descuentos: haber básico, bonos, horas extras y comisiones." },
    { termino: "Gestión", definicion: "El año, de enero a diciembre." },
  ],
});
