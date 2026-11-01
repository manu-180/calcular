import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.sueldo-neto",
  h1: "Calculadora de sueldo neto {{anio}} en Perú",
  title: "Calculadora de sueldo neto {{anio}} en Perú: AFP u ONP",
  description:
    "Calcula tu sueldo neto en Perú: descuento de AFP ({{pe.aporte-afp}} más prima y comisión) u ONP ({{pe.aporte-onp}}) y la retención de quinta categoría. Escribe tu sueldo bruto y listo.",
  intro: [
    "Tu sueldo neto es tu sueldo bruto menos el aporte de pensión (ONP {{pe.aporte-onp}}, o AFP con {{pe.aporte-afp}} más la prima de seguro) y, si ganas lo suficiente, la retención de renta de quinta categoría.",
    "La gratificación no paga estos aportes, así que este cálculo es para un mes normal.",
  ],
  comoSeCalcula: [
    "En la ONP se descuenta el {{pe.aporte-onp}} de tu sueldo bruto.",
    "En una AFP se descuenta el {{pe.aporte-afp}} para tu fondo y la prima de seguro del {{pe.prima-seguro-afp}}. La prima tiene un tope: se calcula como máximo sobre {{pe.rma-afp}}.",
    "Si tu AFP te cobra comisión sobre el sueldo (por flujo), se descuenta también: Habitat {{pe.comision-afp[habitat]}}, Integra {{pe.comision-afp[integra]}}, Prima {{pe.comision-afp[prima]}} y Profuturo {{pe.comision-afp[profuturo]}}. Con comisión sobre el saldo, del sueldo no se descuenta nada.",
    "La retención de quinta categoría se calcula con lo que vas a ganar en el año, menos {{pe.deduccion-renta-trabajo}}, y se reparte en 12 meses.",
  ],
  ejemplo: [
    "Ganas S/ 5,000 y estás en una AFP con comisión sobre el saldo. Te descuentan S/ 500 para tu fondo, S/ 68.50 de prima de seguro y unos S/ 240.50 de quinta. Recibes S/ 4,191.",
    "Con S/ 3,000 en la ONP, en 2026 te descuentan S/ 390 de pensión y unos S/ 26.93 de quinta: recibes S/ 2,583.07.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me descuentan por AFP?",
      respuesta: "El {{pe.aporte-afp}} para tu fondo más la prima de seguro del {{pe.prima-seguro-afp}}. Si tienes comisión por flujo, se suma la comisión de tu AFP.",
    },
    {
      pregunta: "¿Cuánto recibo si gano el sueldo mínimo?",
      respuesta: "Con la RMV que rige desde octubre de 2026 (S/ 1,230) y la ONP, te descuentan S/ 159.90 y recibes S/ 1,070.10. Con ese sueldo no hay retención de quinta categoría.",
    },
    {
      pregunta: "¿Qué me conviene, AFP u ONP?",
      respuesta: "Depende de tu edad, tus años de aporte y cuánto ganas. En la ONP el descuento es fijo ({{pe.aporte-onp}}) y la pensión depende de los años aportados. En la AFP el dinero va a una cuenta a tu nombre.",
    },
    {
      pregunta: "¿Cómo sé qué tipo de comisión tengo?",
      respuesta: "Mira tu boleta de pago o tu estado de cuenta de la AFP. Si entraste al sistema privado desde 2013, tienes comisión sobre el saldo.",
    },
    {
      pregunta: "¿Qué es la remuneración máxima asegurable?",
      respuesta: "Es el tope sobre el que se cobra la prima de seguro de la AFP. Hoy es {{pe.rma-afp}} y la SBS la actualiza cada trimestre.",
    },
  ],
  glosario: [
    { termino: "Sueldo neto", definicion: "Lo que recibes en tu cuenta después de los descuentos de ley." },
    { termino: "Prima de seguro", definicion: "Lo que pagas en la AFP para cubrir invalidez, sobrevivencia y gastos de sepelio." },
    { termino: "Comisión por flujo", definicion: "Comisión que algunas personas afiliadas antes de 2013 pagan sobre el sueldo." },
  ],
});
