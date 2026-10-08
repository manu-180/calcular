import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.iva",
  h1: "Calculadora de IVA",
  title: "IVA en Venezuela ({{ve.iva-general}}): súmalo o quítalo",
  description:
    "Suma o quita el IVA de un precio con la alícuota general de {{ve.iva-general}} o la reducida de {{ve.iva-reducida}}. Sirve para montos en bolívares o en dólares.",
  intro: [
    "El IVA es el impuesto que se suma al precio de casi todo lo que compras. La alícuota general es {{ve.iva-general}}.",
    "Algunos alimentos y productos que fija la ley pagan la alícuota reducida de {{ve.iva-reducida}}.",
  ],
  comoSeCalcula: [
    "Para sumar el IVA: precio sin IVA por la alícuota.",
    "Para quitarlo: precio con IVA dividido entre 1 más la alícuota.",
    "La cuenta es igual en bolívares o en dólares.",
  ],
  ejemplo: ["Un producto de 100 sin IVA cuesta 116 con la alícuota general."],
  faq: [
    {
      pregunta: "¿Qué productos pagan la alícuota reducida?",
      respuesta: "Los que lista la Ley del IVA, por ejemplo algunos tipos de ganado para matadero o cría. Si tienes dudas, revisa la factura: debe decir qué alícuota se aplicó.",
    },
    {
      pregunta: "¿Si pago en dólares cambia el IVA?",
      respuesta: "El IVA es el mismo. Pero si pagas en divisas o criptoactivos se puede cobrar además el IGTF, que esta calculadora no incluye.",
    },
    {
      pregunta: "¿Cómo debe verse en la factura una venta en dólares?",
      respuesta: "La factura tiene que mostrar el monto en la moneda en que pagaste y su equivalente en bolívares, con el tipo de cambio usado.",
    },
  ],
  glosario: [
    { termino: "Alícuota", definicion: "El porcentaje del impuesto." },
    { termino: "IGTF", definicion: "Impuesto a las grandes transacciones financieras, que se cobra en algunos pagos en divisas." },
  ],
});
