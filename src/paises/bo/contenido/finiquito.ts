import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.finiquito",
  h1: "Calculadora de finiquito y beneficios sociales",
  title: "Finiquito Bolivia {{anio}}: calcule sus beneficios sociales",
  description: "Calcule su finiquito {{anio}}: indemnización, desahucio, aguinaldo y vacaciones, con el método del Ministerio de Trabajo. Por despido o por renuncia.",
  intro: [
    "El finiquito en Bolivia reúne los beneficios sociales que se pagan al terminar el trabajo: indemnización por tiempo de servicios, desahucio si lo despidieron sin causa, aguinaldo por duodécimas y vacaciones.",
    "Elija cómo terminó la relación laboral, escriba su sueldo promedio y sus fechas.",
  ],
  comoSeCalcula: [
    "La base es el salario promedio indemnizable: el total ganado de los 3 meses anteriores al retiro, dividido por 3.",
    "Indemnización: un sueldo por cada año, un doceavo por cada mes y 1/360 por cada día. Corresponde con más de {{bo.indemnizacion-dias-minimos}} de trabajo continuo, también si usted renunció.",
    "Desahucio: {{bo.desahucio-sueldos}} sueldos, solo si lo despidieron sin causa justificada.",
    "Aguinaldo: un doceavo por cada mes trabajado en la gestión y 1/360 por cada día, si trabajó al menos {{bo.aguinaldo-meses-minimos[empleado]}} seguidos ese año.",
    "Vacaciones: los días no tomados de gestiones anteriores, más la fracción del año en curso (después del primer año). Cada día vale el sueldo dividido 30.",
    "Si ya cobró quinquenios, esos años no se vuelven a indemnizar.",
  ],
  ejemplo: [
    "Ejemplo del Ministerio de Trabajo: 2 años, 1 mes y 25 días con un sueldo promedio de Bs 3.000 y despido sin causa. Desahucio Bs 9.000, indemnización Bs 6.458,33, aguinaldo Bs 2.125, vacaciones Bs 3.229,17. Total: Bs 20.812,50.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el finiquito?",
      respuesta: "Se toma el promedio del total ganado de los últimos 3 meses. Con esa base se suman la indemnización (un sueldo por año), el desahucio si lo despidieron sin causa, el aguinaldo y las vacaciones.",
    },
    {
      pregunta: "¿Si renuncio me pagan indemnización?",
      respuesta: "Sí. Desde el Decreto Supremo N° 110 de 2009, la indemnización corresponde también en el retiro voluntario, si trabajó más de {{bo.indemnizacion-dias-minimos}}. Lo que no corresponde es el desahucio.",
    },
    {
      pregunta: "¿En cuánto tiempo me tienen que pagar el finiquito?",
      respuesta: "En 15 días calendario desde el último día trabajado. Si el empleador se atrasa, debe pagar una multa del 30 % del total a su favor.",
    },
    {
      pregunta: "¿Pueden darme un preaviso en lugar del desahucio?",
      respuesta: "No. El Tribunal Constitucional (Sentencia 0009/2017) eliminó el preaviso: si lo despiden sin causa justificada, corresponde el desahucio.",
    },
    {
      pregunta: "¿Qué es el Formulario Único de Finiquito?",
      respuesta: "Es el documento donde consta lo que le pagan. Para que valga, lo tiene que refrendar una Jefatura de Trabajo del Ministerio.",
    },
  ],
  glosario: [
    { termino: "Salario promedio indemnizable", definicion: "El promedio del total ganado de los 3 meses anteriores al retiro. Es la base de todo el finiquito." },
    { termino: "Desahucio", definicion: "Compensación de {{bo.desahucio-sueldos}} sueldos por un despido sin causa justificada." },
    { termino: "Duodécimas", definicion: "La parte proporcional por mes: un doceavo del sueldo por cada mes trabajado." },
    { termino: "Quinquenio", definicion: "El pago adelantado de la indemnización cada {{bo.quinquenio-anios}} de trabajo continuo." },
  ],
});
