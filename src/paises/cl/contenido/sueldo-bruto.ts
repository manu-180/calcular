import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.sueldo-bruto",
  h1: "Calculadora de sueldo bruto desde el líquido",
  title: "Sueldo bruto desde el líquido: calcúlalo en {{anio}}",
  description:
    "¿Te ofrecen un líquido y quieres saber el bruto? Calcula el sueldo bruto con AFP, salud ({{cl.salud}}), seguro de cesantía e impuesto único del mes.",
  intro: [
    "En Chile muchas ofertas de trabajo hablan del sueldo líquido, pero el contrato dice el bruto. Esta calculadora hace el camino inverso: le das el líquido y te dice qué bruto imponible lo produce.",
    "Usa las mismas reglas que la liquidación de sueldo: AFP ({{cl.cotizacion-afp}} más la comisión), salud, seguro de cesantía e impuesto único con la UTM del mes.",
  ],
  comoSeCalcula: [
    "Probamos sueldos brutos hasta encontrar el menor que, después de descuentos, deja el líquido que pediste.",
    "En cada prueba se descuenta AFP, salud ({{cl.salud}} en Fonasa o tu plan de Isapre), seguro de cesantía ({{cl.cesantia-trabajador}} si el contrato es indefinido) e impuesto único.",
    "La colación y la movilización se suman al líquido sin descuentos, así que no suben el bruto.",
  ],
  ejemplo: ["Para recibir $1.218.898 líquidos con AFP Uno, Fonasa y contrato indefinido, en octubre de 2026 necesitas un bruto imponible de $1.500.000."],
  faq: [
    {
      pregunta: "¿Cómo paso de sueldo líquido a bruto?",
      respuesta: "No basta con sumar un porcentaje fijo, porque el impuesto sube por tramos. Lo correcto es buscar el bruto que, con todos los descuentos, deja tu líquido. Eso hace la calculadora.",
    },
    {
      pregunta: "¿Qué porcentaje se descuenta del bruto?",
      respuesta: "Sin impuesto, cerca de un 18 % a 19 % según tu AFP y contrato. Si pagas impuesto único, el porcentaje sube.",
    },
    {
      pregunta: "¿La gratificación está incluida en el bruto?",
      respuesta: "El resultado es el total imponible del mes. Si tu empleador paga la gratificación mes a mes, ya va dentro de ese monto.",
    },
  ],
  glosario: [
    { termino: "Sueldo bruto imponible", definicion: "Lo que ganas antes de descuentos y sobre lo que se pagan cotizaciones." },
    { termino: "Sueldo líquido", definicion: "Lo que te depositan después de AFP, salud, seguro de cesantía e impuesto." },
  ],
});
