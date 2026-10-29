import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.essalud",
  h1: "Calculadora del aporte a EsSalud",
  title: "Aporte a EsSalud {{anio}}: calcula el {{pe.aporte-essalud}} de tu planilla",
  description:
    "Calcula el aporte a EsSalud que paga el empleador: {{pe.aporte-essalud}} de la remuneración, con un mínimo sobre la RMV de {{pe.rmv}}. Por trabajador y para toda la planilla.",
  intro: [
    "El aporte a EsSalud es el {{pe.aporte-essalud}} de la remuneración de cada trabajador en planilla. Lo paga la empresa, no se descuenta del sueldo.",
    "Pon la remuneración y cuántos trabajadores la cobran. Te damos el aporte del mes y del año.",
  ],
  comoSeCalcula: [
    "Se toma la remuneración mensual del trabajador, con la asignación familiar si la cobra.",
    "Si es menor que la remuneración mínima vital ({{pe.rmv}}), el aporte se calcula sobre la RMV.",
    "Se multiplica por {{pe.aporte-essalud}}. Las gratificaciones de julio y diciembre no pagan EsSalud.",
  ],
  ejemplo: ["Un trabajador gana S/ 2,500. La empresa paga S/ 225 al mes a EsSalud, S/ 2,700 en el año."],
  faq: [
    {
      pregunta: "¿Quién paga EsSalud, el trabajador o el empleador?",
      respuesta: "El empleador. El {{pe.aporte-essalud}} sale de la empresa y no se descuenta de tu sueldo. Lo que sí te descuentan es la AFP o la ONP.",
    },
    {
      pregunta: "¿Cuál es el aporte mínimo a EsSalud?",
      respuesta: "El {{pe.aporte-essalud}} de la remuneración mínima vital de {{pe.rmv}}, aunque el sueldo sea menor.",
    },
    {
      pregunta: "¿La gratificación paga EsSalud?",
      respuesta: "No. Por eso con la gratificación se paga la bonificación extraordinaria: el trabajador recibe lo que la empresa habría aportado.",
    },
    {
      pregunta: "¿Cuándo se paga EsSalud?",
      respuesta: "Cada mes, junto con la declaración de la planilla electrónica (PLAME), según el cronograma de SUNAT.",
    },
  ],
  glosario: [
    { termino: "EsSalud", definicion: "Seguro Social de Salud: da atención médica y subsidios a los trabajadores en planilla y sus familias." },
    { termino: "PLAME", definicion: "Planilla mensual de pagos que la empresa declara a SUNAT." },
  ],
});
