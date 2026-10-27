import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.decimo-cuarto-mes",
  h1: "Calculadora del décimo cuarto mes en Honduras",
  title: "Décimo cuarto mes Honduras {{anio}}: calcule su catorceavo",
  description:
    "Calcule su décimo cuarto mes (catorceavo) completo o proporcional, con el período del 1 de julio al 30 de junio. También si renunció o lo despidieron.",
  intro: [
    "El décimo cuarto mes en Honduras (el catorceavo) es el {{hn.decimo-cuarto}} de su salario ordinario promedio por un año completo de trabajo, del 1 de julio al 30 de junio. Se paga en junio.",
    "Si trabajó menos tiempo, recibe la parte proporcional a los días trabajados. Escriba su salario y su fecha de ingreso para ver cuánto le toca.",
  ],
  comoSeCalcula: [
    "Se toma el promedio de su salario ordinario mensual del período.",
    "Se cuentan los días trabajados entre el 1 de julio y el 30 de junio (o hasta su último día, si dejó de trabajar).",
    "Décimo cuarto = salario promedio × {{hn.decimo-cuarto}} × días trabajados / 365.",
  ],
  ejemplo: [
    "Entró a trabajar el 1 de enero de 2026 y gana L15,000. Para el pago de junio de 2026 cuentan 181 días: 15,000 × 181 / 365 = L7,438.36.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se paga el décimo cuarto mes?",
      respuesta: "En junio de cada año. Usted y su patrono pueden acordar otra fecha, pero el monto no cambia.",
    },
    {
      pregunta: "¿Cómo se calcula el catorceavo proporcional?",
      respuesta: "Multiplique su salario promedio por los días trabajados desde el 1 de julio y divida entre 365. La calculadora cuenta los días por usted.",
    },
    {
      pregunta: "¿Me toca si renuncio o me despiden?",
      respuesta: "Sí. Si sale antes de cumplir el año, con causa o sin ella, el patrono le paga la parte proporcional al tiempo trabajado.",
    },
    {
      pregunta: "¿Qué salario se usa?",
      respuesta: "El promedio de los salarios ordinarios que cobró en el período. Las horas extra no entran.",
    },
    {
      pregunta: "¿Es lo mismo que el aguinaldo?",
      respuesta: "No. El aguinaldo es el décimo tercer mes y se paga en diciembre. El decimocuarto se paga en junio. Le corresponden los dos.",
    },
    {
      pregunta: "¿Me pueden descontar adelantos?",
      respuesta: "Sí. Si le dieron anticipos a cuenta del décimo cuarto mes, el patrono puede restarlos cuando le paga.",
    },
  ],
  glosario: [
    { termino: "Décimo cuarto mes", definicion: "Compensación social del Decreto 135-94: un salario más por año trabajado al 30 de junio. También se le dice catorceavo o decimocuarto." },
    { termino: "Salario ordinario", definicion: "Lo que gana por su jornada normal, sin horas extra." },
  ],
});
