import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.decimo-tercer-mes",
  h1: "Calculadora del décimo tercer mes (aguinaldo) en Honduras",
  title: "Décimo tercer mes en Honduras: calcule su aguinaldo",
  description: "Calcule su décimo tercer mes (aguinaldo de diciembre) completo o la parte proporcional si no trabajó todo el año o dejó de trabajar.",
  intro: [
    "El décimo tercer mes, o aguinaldo, es un salario extra que se paga en diciembre. Lo fija la Ley del Séptimo Día y Décimo Tercer Mes (Decreto 112-82).",
    "Si trabajó todo el año recibe un salario completo. Si trabajó menos, o dejó de trabajar, recibe la parte proporcional.",
  ],
  comoSeCalcula: [
    "Se toma el promedio de su salario ordinario mensual del año, sin horas extra.",
    "Se cuentan los días trabajados entre el 1 de enero y el 31 de diciembre (o hasta su último día, si dejó de trabajar).",
    "Aguinaldo = salario promedio × {{hn.decimo-tercero}} × días trabajados / 365.",
  ],
  ejemplo: [
    "Entró el 1 de julio de 2026 y gana L15,000. Hasta el 31 de diciembre cuentan 184 días: 15,000 × 184 / 365 = L7,561.64.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se paga el décimo tercer mes?",
      respuesta: "En diciembre de cada año. Usted y su patrono pueden pactar otra fecha, pero no pueden pagarle menos.",
    },
    {
      pregunta: "¿Me toca aguinaldo si renuncio?",
      respuesta: "Sí. Si renuncia o lo despiden, con causa o sin ella, el patrono le paga la parte proporcional al tiempo trabajado en el año.",
    },
    {
      pregunta: "¿Qué salario se usa para calcularlo?",
      respuesta: "El promedio del salario ordinario que ganó en el año, el de la jornada normal. Las horas extra no entran.",
    },
    {
      pregunta: "¿El aguinaldo paga ISR?",
      respuesta: "No paga ISR hasta el equivalente a diez salarios mínimos promedio. Solo lo que pase de ese monto queda gravado.",
    },
    {
      pregunta: "¿Los jubilados y pensionados reciben décimo tercer mes?",
      respuesta: "Sí. La ley lo reconoce a los trabajadores permanentes y también a jubilados y pensionados.",
    },
  ],
  glosario: [
    { termino: "Aguinaldo", definicion: "El décimo tercer mes de salario, que se paga en diciembre." },
    { termino: "Salario ordinario", definicion: "Lo que se gana en una jornada normal de trabajo, sin horas extra." },
  ],
});
