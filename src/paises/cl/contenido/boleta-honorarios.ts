import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.boleta-honorarios",
  h1: "Calculadora de boleta de honorarios",
  title: "Boleta de honorarios 2026: calcula bruto y líquido",
  description:
    "Calcula el líquido de tu boleta de honorarios con la retención de {{cl.retencion-honorarios}} que rige este año, o el bruto que debes emitir para recibir un monto.",
  intro: [
    "Cuando emites una boleta de honorarios, quien te paga retiene un porcentaje y lo entrega al SII. Este año la retención es de {{cl.retencion-honorarios}}.",
    "Esa retención se usa en la Operación Renta de abril para pagar tus cotizaciones y tu impuesto del año.",
  ],
  comoSeCalcula: [
    "Del bruto al líquido: se calcula {{cl.retencion-honorarios}} del bruto (redondeado al peso) y se resta.",
    "Del líquido al bruto: se divide el líquido que quieres recibir por 1 menos la tasa de retención.",
    "La tasa sube cada año por la Ley 21.133 hasta llegar a 17 % en 2028.",
  ],
  ejemplo: ["Con una boleta de $500.000 bruto y retención de 15,25 % (2026), la retención es $76.250 y recibes $423.750."],
  faq: [
    {
      pregunta: "¿Cuánto es la retención este año?",
      respuesta: "{{cl.retencion-honorarios}}, vigente desde el {{cl.retencion-honorarios#desde}}.",
    },
    {
      pregunta: "¿Por qué sube cada año?",
      respuesta: "Porque la Ley 21.133 incorporó de a poco a quienes emiten boletas a la seguridad social. La retención financia esas cotizaciones.",
    },
    {
      pregunta: "¿Qué tasa rige en 2027?",
      respuesta: "16 %, según el calendario de la Ley 21.133 que informó el SII. En 2028 llega a 17 %.",
    },
    {
      pregunta: "¿Esta retención es lo mismo que el impuesto único?",
      respuesta: "No. El impuesto único es para sueldos con contrato. Las boletas de honorarios tienen esta retención y se ajustan una vez al año.",
    },
  ],
  glosario: [
    { termino: "Boleta de honorarios", definicion: "Documento que emite quien presta servicios de forma independiente." },
    { termino: "Retención", definicion: "Parte del bruto que se descuenta y se entrega al SII a tu nombre." },
  ],
});
