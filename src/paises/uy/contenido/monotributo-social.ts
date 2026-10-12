import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.monotributo-social",
  h1: "Calculadora del Monotributo Social Mides",
  title: "Monotributo Social Mides 2026: cuánto se paga",
  description:
    "Calculá cuánto pagás de Monotributo Social Mides por mes: {{uy.monotributo-social-sin-snis[1]}} el primer año sin Fonasa, con los aportes que suben de a poco hasta el mes 37.",
  intro: [
    "El Monotributo Social Mides es un pago único y reducido para emprendimientos de hogares de bajos ingresos. Lo habilita el Mides y se paga al BPS.",
    "El aporte arranca en una cuarta parte y sube cada año. Elegí en qué etapa estás y tu cobertura de salud.",
  ],
  comoSeCalcula: [
    "El aporte jubilatorio se calcula sobre 5 BFC y se paga en forma gradual: {{uy.monotributo-social-gradualidad[1]}} los primeros 12 meses, {{uy.monotributo-social-gradualidad[2]}} los 12 siguientes, {{uy.monotributo-social-gradualidad[3]}} el tercer año y {{uy.monotributo-social-gradualidad[4]}} desde el mes 37.",
    "Sin Fonasa se paga además un seguro de enfermedad (8 % de una BPC), que también es gradual.",
    "Con Fonasa, la parte de salud se paga entera desde el primer mes: {{uy.monotributo-salud[snis]}} sin cónyuge ni hijos a cargo.",
  ],
  ejemplo: ["El primer año, sin Fonasa, pagás $ 659 por mes. Desde el mes 37, $ 2.637."],
  faq: [
    {
      pregunta: "¿Cuánto se paga de Monotributo Social Mides en 2026?",
      respuesta: "Sin Fonasa, {{uy.monotributo-social-sin-snis[1]}} el primer año, {{uy.monotributo-social-sin-snis[2]}} el segundo, {{uy.monotributo-social-sin-snis[3]}} el tercero y {{uy.monotributo-social-sin-snis[4]}} desde el mes 37.",
    },
    {
      pregunta: "¿Quién puede ser monotributista social?",
      respuesta: "Emprendimientos personales o de hasta cinco socios, sin empleados, de hogares bajo la línea de pobreza o en situación de vulnerabilidad. Lo califica el Mides.",
    },
    {
      pregunta: "¿Me conviene sumar el Fonasa?",
      respuesta: "Si no tenés mutualista por otro lado, sí: te da cobertura a vos y, según el caso, a tu familia. La parte de salud no tiene descuento por etapas.",
    },
    {
      pregunta: "¿Qué cubre el pago?",
      respuesta: "Reemplaza tus aportes al BPS y los impuestos nacionales, salvo los de importación. Te da derecho a jubilación y prestaciones del BPS.",
    },
  ],
  glosario: [
    { termino: "BFC", definicion: "Base Ficta de Contribución. Una unidad del BPS para calcular aportes de empresas." },
    { termino: "Mides", definicion: "Ministerio de Desarrollo Social. Habilita el monotributo social." },
  ],
});
