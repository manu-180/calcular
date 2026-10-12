import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.isr-rentas-de-capital",
  h1: "Calculadora del ISR sobre rentas de capital",
  title: "ISR de alquileres, intereses y dividendos en Guatemala",
  description:
    "Calcule el ISR de un alquiler, de intereses, de dividendos o de la ganancia por vender un bien, con las tarifas de rentas de capital.",
  intro: [
    "Las rentas de capital son lo que gana con su dinero o sus bienes: alquileres, intereses, dividendos y la ganancia al vender algo por más de lo que le costó.",
    "La tarifa general es del {{gt.isr-rentas-capital}}. Los dividendos pagan {{gt.isr-dividendos}}. En los alquileres de inmuebles se resta antes un {{gt.isr-gastos-arrendamiento}} de gastos, sin comprobarlos.",
  ],
  comoSeCalcula: [
    "Alquiler: (alquiler menos {{gt.isr-gastos-arrendamiento}}) × {{gt.isr-rentas-capital}}.",
    "Intereses y ganancia por venta: monto × {{gt.isr-rentas-capital}}.",
    "Dividendos: monto × {{gt.isr-dividendos}}.",
  ],
  ejemplo: ["Alquila un apartamento en Q5,000 al mes: la base es Q3,500 y el ISR del mes es de Q350."],
  faq: [
    {
      pregunta: "¿Cuánto ISR paga un alquiler en Guatemala?",
      respuesta: "Se resta el {{gt.isr-gastos-arrendamiento}} del alquiler y al resto se le aplica el {{gt.isr-rentas-capital}}. Si su inquilino es agente de retención, él se lo retiene. Si no, usted lo paga a la SAT el mes siguiente.",
    },
    {
      pregunta: "¿Los intereses de mi plazo fijo pagan ISR?",
      respuesta: "Sí. El banco retiene el {{gt.isr-rentas-capital}} de los intereses al pagarlos. Usted no tiene que hacer nada más.",
    },
    {
      pregunta: "¿Cómo se calcula la ganancia al vender un bien?",
      respuesta: "Es el precio de venta menos lo que le costó el bien, con las mejoras que pueda comprobar. Sobre esa ganancia se paga el {{gt.isr-rentas-capital}}.",
    },
  ],
  glosario: [
    { termino: "Renta de capital", definicion: "Ingreso que proviene de sus bienes o de su dinero, no de su trabajo ni de un negocio." },
    { termino: "Dividendo", definicion: "Parte de las utilidades que una empresa reparte a sus socios o accionistas." },
  ],
});
