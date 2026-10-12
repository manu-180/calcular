import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.aguinaldo-atrasado",
  h1: "Calculadora de aguinaldo atrasado en Nicaragua",
  title: "Aguinaldo atrasado en Nicaragua: cuánto te deben por día",
  description: "Si te pagan tarde el aguinaldo en Nicaragua, el empleador te debe {{ni.aguinaldo-multa-dias}} de salario por cada día de retraso. Calculá la indemnización.",
  intro: [
    "El aguinaldo (décimo tercer mes) se paga dentro de los primeros {{ni.aguinaldo-plazo-dias}} de diciembre. Si terminó el contrato, dentro de los {{ni.aguinaldo-plazo-dias}} siguientes.",
    "Si te lo pagan tarde, el empleador te debe {{ni.aguinaldo-multa-dias}} de salario por cada día de retraso, además del aguinaldo.",
  ],
  comoSeCalcula: [
    "Se fija el último día de pago: el 10 de diciembre, o {{ni.aguinaldo-plazo-dias}} después de tu último día de trabajo.",
    "Se cuentan los días desde ese límite hasta el día en que te pagaron.",
    "Cada día de retraso vale {{ni.aguinaldo-multa-dias}} de salario: tu salario mensual dividido entre 30.",
  ],
  ejemplo: ["Ganás C$9,000 y te pagaron el aguinaldo el 20 de diciembre. Son 10 días de retraso: te deben C$3,000 de indemnización."],
  faq: [
    {
      pregunta: "¿Hasta cuándo tienen para pagarme el aguinaldo?",
      respuesta: "Hasta el 10 de diciembre. Si dejaste el trabajo, dentro de los {{ni.aguinaldo-plazo-dias}} después de terminado el contrato.",
    },
    {
      pregunta: "¿Qué pasa si no me pagan el aguinaldo a tiempo?",
      respuesta: "El empleador te tiene que pagar {{ni.aguinaldo-multa-dias}} de salario por cada día de retraso, además del aguinaldo (artículo 95 del Código del Trabajo).",
    },
    {
      pregunta: "¿Dónde reclamo si no me pagan?",
      respuesta: "En la Inspectoría Departamental del Trabajo del Ministerio del Trabajo. Llevá tus colillas de pago y tu contrato si lo tenés.",
    },
    {
      pregunta: "¿La indemnización paga INSS o IR?",
      respuesta: "El aguinaldo está exento de todo descuento. Sobre la indemnización por retraso la ley no dice nada especial.",
    },
  ],
  glosario: [
    { termino: "Décimo tercer mes", definicion: "El nombre del aguinaldo en el Código del Trabajo: un mes de salario por año trabajado." },
    { termino: "Indemnización por retraso", definicion: "Lo que el empleador te debe por cada día que se atrasa en pagarte el aguinaldo." },
  ],
});
