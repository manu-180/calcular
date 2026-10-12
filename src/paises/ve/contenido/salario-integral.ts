import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.salario-integral",
  h1: "Calculadora de salario integral en Venezuela",
  title: "Salario integral en Venezuela: cómo calcularlo",
  description:
    "Calcula tu salario integral diario y mensual: salario normal más la alícuota de utilidades y de bono vacacional. Es la base de tus prestaciones sociales.",
  intro: [
    "El salario integral es tu salario normal más la parte diaria de dos pagos anuales: las utilidades y el bono vacacional. Con él se calculan las prestaciones sociales y la indemnización por despido.",
    "Escribe tu salario, los días de utilidades que paga tu empresa y tus años de servicio. Te mostramos cada parte por separado.",
  ],
  comoSeCalcula: [
    "Salario diario: tu salario normal mensual entre {{ve.dias-mes-salario}}.",
    "Alícuota de utilidades: salario diario por los días de utilidades, entre 360.",
    "Alícuota de bono vacacional: salario diario por los días de bono de este año, entre 360.",
    "Salario integral diario: la suma de las tres partes. El mensual es ese monto por {{ve.dias-mes-salario}}.",
  ],
  ejemplo: ["Con $300 al mes, utilidades de 30 días y menos de un año: 10 + 0,83 + 0,42 = $11,25 diarios de salario integral."],
  faq: [
    {
      pregunta: "¿Qué es el salario integral?",
      respuesta: "Es tu salario normal más la alícuota de utilidades y la de bono vacacional. La ley lo usa para las prestaciones sociales y las indemnizaciones.",
    },
    {
      pregunta: "¿Qué diferencia hay con el salario normal?",
      respuesta: "El salario normal es lo que cobras de forma regular. El integral le suma la parte diaria de lo que cobras una vez al año como utilidades y bono vacacional.",
    },
    {
      pregunta: "¿Por qué se divide entre 360?",
      respuesta: "Porque la alícuota reparte un pago anual entre los días del año, y la ley cuenta meses de 30 días: 12 por 30 son 360.",
    },
    {
      pregunta: "¿El cestaticket entra en el salario integral?",
      respuesta: "No. El cestaticket y el bono de guerra económica no son salario, así que no entran.",
    },
  ],
  glosario: [
    { termino: "Alícuota", definicion: "La parte diaria de un pago que se cobra una vez al año." },
    { termino: "Salario integral", definicion: "Salario normal más las alícuotas de utilidades y bono vacacional (art. 122 de la LOTTT)." },
  ],
});
