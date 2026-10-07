import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.sueldo-neto",
  h1: "Calculadora de sueldo neto",
  title: "Sueldo neto en Perú: calcula cuánto recibes",
  description: "Calcula tu sueldo neto con el descuento de AFP u ONP ({{pe.aporte-onp}}) y la retención de renta de quinta categoría con la UIT de {{pe.uit}}.",
  intro: [
    "Tu sueldo neto es lo que te depositan después de los descuentos de ley: el aporte a tu sistema de pensiones y, si ganas lo suficiente, la retención de quinta categoría.",
  ],
  comoSeCalcula: [
    "En la ONP se descuenta el {{pe.aporte-onp}} de tu sueldo.",
    "En una AFP se descuenta el {{pe.aporte-afp}} para tu fondo, la prima de seguro ({{pe.prima-seguro-afp}}, con un tope) y la comisión de tu AFP.",
    "La retención de quinta categoría se calcula con la proyección de tus ingresos del año.",
  ],
  faq: [],
  glosario: [{ termino: "Sueldo neto", definicion: "Lo que recibes en tu cuenta después de los descuentos de ley." }],
});
