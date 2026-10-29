import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.sueldo-liquido",
  h1: "Calculadora de sueldo líquido {{anio}}",
  title: "Calculadora de sueldo líquido {{anio}}: de bruto a líquido",
  description:
    "Pasa tu sueldo bruto a líquido en segundos: descuento de AFP, salud ({{cl.salud}}), seguro de cesantía e impuesto único del mes, con la UF y UTM del día.",
  intro: [
    "Tu sueldo líquido es el bruto imponible menos AFP ({{cl.cotizacion-afp}} más la comisión), salud ({{cl.salud}} en Fonasa), seguro de cesantía ({{cl.cesantia-trabajador}}) e impuesto único si corresponde. Es lo que te depositan.",
    "Elige tu AFP y tu sistema de salud. Usamos la UF y la UTM del día, así que el resultado se acerca mucho a tu liquidación de sueldo.",
  ],
  comoSeCalcula: [
    "AFP: {{cl.cotizacion-afp}} para tu cuenta más la comisión de tu AFP (por ejemplo, {{cl.comision-afp[uno]}} en AFP Uno y {{cl.comision-afp[provida]}} en AFP ProVida).",
    "Salud: {{cl.salud}} en Fonasa. En Isapre se descuenta el valor de tu plan, si es mayor que ese porcentaje.",
    "Seguro de cesantía: {{cl.cesantia-trabajador}} si tu contrato es indefinido. Con contrato a plazo fijo lo paga todo el empleador.",
    "AFP y salud se calculan hasta un tope de {{cl.tope-imponible}} al mes. El seguro de cesantía, hasta {{cl.tope-imponible-cesantia}}.",
    "Lo que queda después de esos descuentos es la base del impuesto único. Se aplica la tabla mensual del SII en UTM.",
    "Al final se suman la colación y la movilización, que no pagan cotizaciones ni impuesto.",
  ],
  ejemplo: [
    "Con $1.500.000 imponible, AFP Uno, Fonasa y contrato indefinido, en octubre de 2026 te descuentan $156.900 de AFP, $105.000 de salud, $9.000 de seguro de cesantía y $10.202 de impuesto. Tu líquido es $1.218.898.",
    "Con $1.000.000 imponible y los mismos datos, los descuentos suman $180.600 y no pagas impuesto: tu líquido es $819.400.",
  ],
  faq: [
    {
      pregunta: "¿Cómo calculo mi sueldo líquido?",
      respuesta: "Al sueldo imponible le restas AFP, salud y seguro de cesantía, y después el impuesto único si tu base pasa el tramo exento. Luego sumas colación y movilización.",
    },
    {
      pregunta: "¿Qué diferencia hay entre sueldo bruto, imponible y líquido?",
      respuesta: "El bruto es todo lo que gana la persona. El imponible es la parte que paga cotizaciones. El líquido es lo que llega a tu cuenta.",
    },
    {
      pregunta: "¿Desde qué sueldo se paga impuesto único?",
      respuesta: "Desde que la base del impuesto pasa el tramo exento de la tabla del SII. La calculadora de impuesto único te muestra ese límite en pesos para el mes.",
    },
    {
      pregunta: "¿La reforma de pensiones baja mi sueldo líquido?",
      respuesta: "No. La cotización nueva de la reforma la paga el empleador, no sale de tu sueldo.",
    },
    {
      pregunta: "¿Qué pasa si mi plan de Isapre cuesta más que la cotización legal?",
      respuesta: "Se descuenta el plan completo, pero para el impuesto solo se rebaja la cotización legal de salud.",
    },
    {
      pregunta: "¿Por qué el seguro de cesantía me sale en cero?",
      respuesta: "Porque marcaste contrato a plazo fijo. En ese caso todo el seguro lo paga el empleador.",
    },
  ],
  glosario: [
    { termino: "Sueldo imponible", definicion: "La parte del sueldo sobre la que se calculan las cotizaciones." },
    { termino: "AFP", definicion: "Administradora de Fondos de Pensiones. Guarda tu ahorro para la jubilación y cobra una comisión mensual." },
    { termino: "Impuesto único de segunda categoría", definicion: "Impuesto mensual a los sueldos. Lo retiene el empleador y se calcula con una tabla en UTM." },
    { termino: "Tope imponible", definicion: "Monto máximo del sueldo sobre el que se pagan cotizaciones. Se fija en UF cada año." },
  ],
});
