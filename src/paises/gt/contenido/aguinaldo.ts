import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.aguinaldo",
  h1: "Calculadora de aguinaldo en Guatemala",
  title: "Calcular aguinaldo en Guatemala 2026: diciembre y enero",
  description:
    "Calcule su aguinaldo completo o proporcional y vea cuánto le pagan en diciembre y cuánto en enero. Período del 1 de diciembre al 30 de noviembre. Decreto 76-78.",
  intro: [
    "El aguinaldo en Guatemala es el {{gt.aguinaldo}} de su salario ordinario mensual por un año de trabajo. Se paga la mitad en la primera quincena de diciembre y la otra mitad en la segunda quincena de enero.",
    "Si no completó el año, le toca la parte proporcional a los días trabajados. Si deja de trabajar, se la tienen que pagar en ese momento.",
  ],
  comoSeCalcula: [
    "Se cuentan los días trabajados del 1 de diciembre al 30 de noviembre (o hasta su último día, si dejó de trabajar).",
    "Aguinaldo = salario ordinario mensual × {{gt.aguinaldo}} × días trabajados / 365.",
    "Se paga el {{gt.aguinaldo-pago-diciembre}} en diciembre y el resto en enero, salvo que la empresa pague todo en diciembre.",
  ],
  ejemplo: ["Gana Q3,000 y trabajó todo el año: su aguinaldo es Q3,000. Recibe Q1,500 en diciembre y Q1,500 en enero."],
  faq: [
    {
      pregunta: "¿Cuándo se paga el aguinaldo en Guatemala?",
      respuesta: "La mitad en la primera quincena de diciembre y la otra mitad en la segunda quincena de enero. Si la empresa lo paga todo en diciembre, en enero no debe nada más.",
    },
    {
      pregunta: "¿Cómo se calcula el aguinaldo proporcional?",
      respuesta: "Multiplique su salario ordinario mensual por los días trabajados desde el 1 de diciembre y divida entre 365.",
    },
    {
      pregunta: "¿El aguinaldo paga ISR o IGSS?",
      respuesta: "No. La ley del aguinaldo lo deja libre de impuestos y de cuotas del IGSS, IRTRA e INTECAP. Para el ISR, el límite es un salario ordinario mensual.",
    },
    {
      pregunta: "¿Me toca aguinaldo si me retiro antes de diciembre?",
      respuesta: "Sí. Al terminar la relación laboral le tienen que pagar de inmediato la parte proporcional al tiempo trabajado.",
    },
    {
      pregunta: "¿Qué pasa si trabajo en el campo o por temporadas?",
      respuesta: "Tiene derecho si trabajó por lo menos {{gt.aguinaldo-jornadas-campo}} de trabajo en el año, sin importar el tipo de contrato.",
    },
    {
      pregunta: "¿Un anticipo cuenta como pago del aguinaldo?",
      respuesta: "Los anticipos no liberan al patrono de pagar el total en las fechas de la ley. El pago tiene que quedar por escrito.",
    },
  ],
  glosario: [
    { termino: "Aguinaldo", definicion: "Prestación anual del Decreto 76-78, equivalente a un salario ordinario por año de servicios continuos." },
    { termino: "Parte proporcional", definicion: "Lo que le corresponde según los días que trabajó, cuando no completó el año." },
  ],
});
