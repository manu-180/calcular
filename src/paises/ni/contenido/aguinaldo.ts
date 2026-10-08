import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.aguinaldo",
  h1: "Calculadora de aguinaldo",
  title: "Aguinaldo en Nicaragua: calculá tu décimo tercer mes",
  description: "Calculá tu aguinaldo o décimo tercer mes: {{ni.aguinaldo-meses}} de salario por año, o la parte proporcional si no completaste el año. Según el Código del Trabajo.",
  intro: [
    "El aguinaldo (en la ley se llama décimo tercer mes) es un salario extra por año. Te lo pagan en los primeros diez días de diciembre.",
    "Poné tu salario y la fecha en que entraste. Si no completaste el año, te sale la parte proporcional.",
  ],
  comoSeCalcula: [
    "Por cada año completo te toca {{ni.aguinaldo-meses}} de salario.",
    "El año se cuenta del 1 de diciembre al 30 de noviembre, que es el período de costumbre.",
    "Si trabajaste menos, se multiplica tu salario por los días trabajados y se divide entre 365.",
    "Se usa el último salario. Si ganás por comisión o a destajo, el más alto de los últimos seis meses.",
    "Si dejás el trabajo antes de diciembre, te pagan lo proporcional dentro de los diez días siguientes.",
  ],
  ejemplo: ["Si ganás C$9,000 y entraste el 15 de junio, del 15 de junio al 30 de noviembre hay 169 días. Tu aguinaldo es 9,000 × 169 / 365 = C$4,167.12."],
  faq: [
    {
      pregunta: "¿Cuándo me tienen que pagar el aguinaldo?",
      respuesta: "Dentro de los primeros diez días de diciembre. Si te lo pagan tarde, el empleador te debe un día de salario por cada día de atraso.",
    },
    {
      pregunta: "¿Me pagan aguinaldo si renuncio?",
      respuesta: "Sí. Al terminar el contrato, por la causa que sea, te pagan la parte proporcional del tiempo trabajado.",
    },
    {
      pregunta: "¿Al aguinaldo le descuentan INSS o IR?",
      respuesta: "No. Está libre de impuestos, cotizaciones y descuentos, y no se puede embargar salvo por pensión de alimentos.",
    },
    {
      pregunta: "¿Las vacaciones y los permisos cuentan como tiempo trabajado?",
      respuesta: "Sí. También cuentan las ausencias justificadas, los asuetos y los subsidios por enfermedad.",
    },
  ],
  glosario: [
    { termino: "Décimo tercer mes", definicion: "El nombre legal del aguinaldo. Lo regulan los artículos 93 a 98 del Código del Trabajo." },
    { termino: "Proporcional", definicion: "La parte que te toca según los días que trabajaste en el período." },
  ],
});
