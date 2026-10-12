import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.contrato-a-plazo-fijo",
  h1: "Despido en un contrato a plazo fijo en Honduras",
  title: "Contrato a plazo fijo en Honduras: indemnización por despido",
  description: "Calcule la indemnización si lo despiden sin causa antes de que venza su contrato a plazo fijo o por obra determinada, con el límite del Código del Trabajo.",
  intro: [
    "Si tiene un contrato por tiempo fijo o por obra y lo despiden sin causa justificada antes del final, el patrono le debe los salarios que faltaban.",
    "Ese pago tiene un límite: no puede ser mayor que la cesantía que le tocaría con un contrato por tiempo indefinido.",
  ],
  comoSeCalcula: [
    "Salarios que faltaban = salario / 30 × días entre su último día y el vencimiento.",
    "Límite = cesantía por el tiempo trabajado: con menos de un año, {{hn.cesantia-dias-menos-de-un-anio[3-a-6-meses]}} o {{hn.cesantia-dias-menos-de-un-anio[6-a-12-meses]}}; desde el año, un mes por año, hasta {{hn.cesantia-tope-meses[general]}}.",
    "Indemnización = el menor de los dos montos.",
  ],
  ejemplo: ["Gana L15,000, entró el 1 de octubre de 2025 y lo despiden el 1 de diciembre de 2026, un mes antes del vencimiento. Cobra L15,000."],
  faq: [
    {
      pregunta: "¿Qué pasa si me despiden antes de que termine mi contrato?",
      respuesta: "Si fue sin causa justificada, le pagan los salarios que faltaban hasta el vencimiento, sin pasar de la cesantía de un contrato indefinido.",
    },
    {
      pregunta: "¿Cuánto puede durar un contrato a plazo fijo?",
      respuesta: "Hasta un año, o cinco años si el trabajo pide preparación técnica especial. Puede prorrogarse; si sigue trabajando sin oposición, se prorroga solo.",
    },
    {
      pregunta: "¿Y si mi trabajo es permanente?",
      respuesta: "Si la labor es permanente en la empresa, el contrato se considera por tiempo indefinido aunque diga un plazo. Le corresponden las prestaciones completas.",
    },
    {
      pregunta: "¿Y si soy yo quien se va antes?",
      respuesta: "Si se va sin causa justificada, el juez puede fijar daños a favor del patrono, sin pasar de 30 días de salario.",
    },
  ],
  glosario: [
    { termino: "Contrato a plazo fijo", definicion: "El que tiene una fecha de vencimiento o termina con una obra determinada." },
    { termino: "Despido injustificado", definicion: "El que se hace sin una de las causas del artículo 112 del Código del Trabajo." },
  ],
});
