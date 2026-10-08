import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.liquidacion",
  h1: "Calculadora de liquidación laboral",
  title: "Liquidación laboral en Venezuela: calcula cuánto te toca",
  description:
    "Calcula tu liquidación con la LOTTT: prestaciones sociales, indemnización por despido, vacaciones, bono vacacional y utilidades. En bolívares o en dólares.",
  intro: [
    "La liquidación es todo lo que te deben pagar cuando termina tu trabajo: prestaciones sociales, vacaciones pendientes, bono vacacional y utilidades del año.",
    "Si te despidieron sin causa justificada y no pides el reenganche, se suma una indemnización igual a tus prestaciones.",
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
      pregunta: "¿Si renuncio también cobro prestaciones?",
      respuesta: "Sí. Las prestaciones, las vacaciones pendientes y las utilidades se pagan siempre, sin importar por qué terminó el trabajo. Lo único que depende del motivo es la indemnización por despido.",
    },
    {
      pregunta: "¿Qué es el reenganche?",
      respuesta: "Si te despiden sin causa justificada, puedes pedir ante la Inspectoría del Trabajo que te devuelvan el puesto. Si decides no pedirlo, la empresa te paga la indemnización.",
    },
    {
      pregunta: "¿Los bonos entran en la liquidación?",
      respuesta: "No. El cestaticket y el bono de guerra económica no son salario. La liquidación se calcula solo con tu salario.",
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
