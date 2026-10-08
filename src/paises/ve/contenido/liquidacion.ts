import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.liquidacion",
  h1: "Calculadora de liquidación laboral en Venezuela",
  title: "Liquidación laboral en Venezuela: calcula cuánto te toca",
  description:
    "Calcula tu liquidación con la LOTTT: prestaciones sociales, indemnización por despido, vacaciones, bono vacacional y utilidades. En bolívares o en dólares.",
  intro: [
    "La liquidación laboral en Venezuela suma tus prestaciones sociales, las vacaciones y el bono vacacional pendientes y las utilidades del año. Si te despidieron sin causa justificada y no pides el reenganche, se agrega una indemnización igual a tus prestaciones.",
    "Puedes calcularla en bolívares o en dólares. Se hace solo con tu salario: el cestaticket y el bono de guerra económica no cuentan.",
  ],
  comoSeCalcula: [
    "Prestaciones sociales: el mayor entre la garantía depositada y el cálculo retroactivo de {{ve.prestaciones-retroactivo-dias}} por año con tu último salario integral.",
    "Indemnización por despido injustificado: el mismo monto de las prestaciones (artículo 92 de la LOTTT).",
    "Vacaciones y bono vacacional fraccionados: los días del año en curso por los meses completos trabajados desde tu último aniversario, divididos entre 12. Se suman los años vencidos que no disfrutaste.",
    "Utilidades fraccionadas: los días de utilidades de tu empresa (mínimo {{ve.utilidades-dias-minimo}}) por los meses completos trabajados en el año, divididos entre 12.",
    "El salario diario es tu salario mensual entre {{ve.dias-mes-salario}}.",
  ],
  ejemplo: [
    "Con $300 al mes, tres años justos y despido injustificado: prestaciones $2.107,38, la misma suma de indemnización y $300 de utilidades del año. Total $4.514,76.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula la liquidación en Venezuela?",
      respuesta: "Se suman las prestaciones sociales, las vacaciones y el bono vacacional fraccionados y las utilidades fraccionadas. Si el despido fue injustificado, se agrega una indemnización igual a las prestaciones.",
    },
    {
      pregunta: "¿Si renuncio también cobro prestaciones?",
      respuesta: "Sí. Las prestaciones, las vacaciones pendientes y las utilidades se pagan siempre, sin importar por qué terminó el trabajo. Lo único que depende del motivo es la indemnización por despido.",
    },
    {
      pregunta: "¿Los bonos entran en la liquidación?",
      respuesta: "No. El cestaticket y el bono de guerra económica no son salario. La liquidación se calcula solo con tu salario.",
    },
    {
      pregunta: "¿Qué es el reenganche?",
      respuesta: "Si te despiden sin causa justificada, puedes pedir ante la Inspectoría del Trabajo que te devuelvan el puesto. Si decides no pedirlo, la empresa te paga la indemnización.",
    },
    {
      pregunta: "¿En cuánto tiempo me tienen que pagar?",
      respuesta: "Las prestaciones, dentro de los cinco días siguientes a tu salida. Si se atrasan, deben intereses de mora.",
    },
  ],
  glosario: [
    { termino: "Vacaciones fraccionadas", definicion: "La parte de las vacaciones y del bono vacacional que ganaste en el año que no llegaste a completar." },
    { termino: "Utilidades fraccionadas", definicion: "La parte de las utilidades por los meses completos que trabajaste en el año." },
    { termino: "Indemnización", definicion: "Pago extra por despido sin causa justificada, igual a tus prestaciones sociales." },
  ],
});
