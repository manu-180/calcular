import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.impuesto-unico",
  h1: "Calculadora del impuesto único de segunda categoría",
  title: "Impuesto único 2026: calcula cuánto te retienen",
  description:
    "Calcula el impuesto único de segunda categoría de tu sueldo con la tabla mensual del SII y la UTM del mes ({{cl.utm}}). Ves tu tramo y tu tasa efectiva.",
  intro: [
    "El impuesto único de segunda categoría es el impuesto mensual a los sueldos. Lo retiene tu empleador antes de pagarte.",
    "Escribe tu sueldo tributable del mes y te mostramos cuánto pagas, en qué tramo quedas y qué porcentaje real de tu sueldo se va en impuesto.",
  ],
  comoSeCalcula: [
    "Tu sueldo tributable es el imponible menos AFP, salud (hasta la cotización legal) y seguro de cesantía.",
    "Ese monto se pasa a UTM con la UTM del mes ({{cl.utm}}).",
    "Se busca el tramo en la tabla del SII. El primer tramo está exento.",
    "En cada tramo se multiplica la renta por la tasa y se resta la cantidad a rebajar. El resultado se redondea al peso.",
  ],
  faq: [
    {
      pregunta: "¿Qué es la tasa efectiva?",
      respuesta: "Es el impuesto dividido por tu sueldo tributable. Siempre es menor que la tasa del tramo, porque la parte baja de tu sueldo paga menos.",
    },
    {
      pregunta: "¿Por qué el límite exento cambia cada mes?",
      respuesta: "Porque la tabla está en UTM y la UTM cambia todos los meses. En pesos, los tramos se mueven un poco.",
    },
    {
      pregunta: "¿Las boletas de honorarios pagan este impuesto?",
      respuesta: "No. Las boletas tienen una retención aparte y se ajustan en la declaración anual de abril.",
    },
    {
      pregunta: "¿Tengo que pagar este impuesto yo?",
      respuesta: "No. Tu empleador lo descuenta de tu sueldo y lo paga al SII cada mes.",
    },
  ],
  glosario: [
    { termino: "Sueldo tributable", definicion: "La parte del sueldo sobre la que se calcula el impuesto, después de las cotizaciones obligatorias." },
    { termino: "Cantidad a rebajar", definicion: "Monto fijo que se resta en cada tramo para que el impuesto sea progresivo." },
    { termino: "UTM", definicion: "Unidad Tributaria Mensual. La fija el SII cada mes." },
  ],
});
