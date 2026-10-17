import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.indemnizacion-despido",
  h1: "Calculadora de indemnización por despido",
  title: "Indemnización por despido: improcedente y objetivo",
  description:
    "Calcula tu indemnización por despido improcedente u objetivo según el Estatuto de los Trabajadores, con el régimen de contratos anteriores a 2012 y sus topes.",
  intro: [
    "Si te despiden, la indemnización depende de dos cosas: cuánto tiempo llevas en la empresa y de si el despido es objetivo o improcedente.",
    "Esta calculadora aplica los días por año del Estatuto de los Trabajadores, el prorrateo por meses y los topes, incluido el régimen especial de los contratos firmados antes del 12 de febrero de 2012.",
  ],
  comoSeCalcula: [
    "El salario diario es tu sueldo bruto anual entre 365.",
    "La antigüedad se cuenta en meses. Un mes empezado cuenta como completo.",
    "Despido objetivo: {{es.despido-objetivo-dias}} por año trabajado, con un máximo de {{es.despido-objetivo-tope}} de salario.",
    "Despido improcedente: {{es.despido-improcedente-dias}} por año, con un máximo de {{es.despido-improcedente-tope}} de salario.",
    "Si tu contrato es anterior al 12 de febrero de 2012, el tiempo hasta esa fecha se paga a {{es.despido-anterior-2012-dias}} por año. El total no puede pasar de {{es.despido-anterior-2012-tope-dias}}, salvo que el tramo anterior a 2012 ya los supere. En ese caso el tope es ese tramo, con un límite de {{es.despido-anterior-2012-tope-maximo}}.",
  ],
  ejemplo: [
    "Si entraste el 15 de marzo de 2020, te despiden el 14 de octubre de 2026 y cobras 25.000 euros al año, se cuentan 79 meses.",
    "Con despido improcedente te corresponden 217,25 días de salario: 14.880,14 euros. Si el despido es objetivo, 9.018,26 euros.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días por año me corresponden si me despiden?",
      respuesta: "En un despido objetivo, {{es.despido-objetivo-dias}} por año. En uno improcedente, {{es.despido-improcedente-dias}} por año. Si tu contrato es anterior a 2012, el tiempo previo se paga a {{es.despido-anterior-2012-dias}}.",
    },
    {
      pregunta: "¿Qué pasa en un despido disciplinario?",
      respuesta: "Si es procedente no hay indemnización. Si un juez lo declara improcedente, la empresa elige entre readmitirte o pagarte la indemnización por despido improcedente.",
    },
    {
      pregunta: "¿La indemnización paga IRPF?",
      respuesta: "La indemnización obligatoria por ley está exenta hasta 180.000 euros. Lo que la empresa pague por encima del mínimo legal sí tributa.",
    },
    {
      pregunta: "¿Qué sueldo se usa para calcularla?",
      respuesta: "El que cobras en el momento del despido, con las pagas extra prorrateadas y los pluses fijos.",
    },
  ],
  glosario: [
    { termino: "Despido objetivo", definicion: "Despido por causas económicas, técnicas, organizativas o de producción, o por las otras causas del artículo 52 del Estatuto de los Trabajadores." },
    { termino: "Despido improcedente", definicion: "El que un juez o un acuerdo de conciliación declara sin causa suficiente o sin cumplir las formas." },
    { termino: "Finiquito", definicion: "Liquidación de lo que se te debe al terminar el contrato: salario pendiente, vacaciones y pagas extra. Es distinto de la indemnización." },
  ],
});
