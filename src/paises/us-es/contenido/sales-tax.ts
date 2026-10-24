import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.sales-tax",
  h1: "Calculadora del impuesto sobre las ventas",
  title: "Calculadora de sales tax: sumar o quitar el impuesto",
  description: "Sume el impuesto sobre las ventas a un precio o quítelo de un total con su tasa combinada estatal y local. Sirve para cualquier estado, condado o ciudad.",
  intro: [
    "En Estados Unidos no hay un impuesto nacional sobre las ventas. Cada estado fija su propia tasa, y los condados, las ciudades y los distritos especiales pueden sumar más.",
    "Indique el precio y su tasa combinada para ver el impuesto y el total, o calcule hacia atrás desde un recibo.",
  ],
  comoSeCalcula: [
    "Para sumar el impuesto, multiplique el precio por la tasa y sume el resultado al precio.",
    "Para quitar el impuesto de un total, divida el total entre uno más la tasa. La diferencia es el impuesto.",
    "El impuesto se redondea al centavo, como lo hacen la mayoría de las cajas registradoras.",
  ],
  ejemplo: [
    "Un artículo de $49.99 con una tasa combinada de 8.25% tiene $4.12 de impuesto, en total $54.11.",
  ],
  faq: [
    { pregunta: "¿Qué estados no tienen impuesto sobre las ventas?", respuesta: "Alaska, Delaware, Montana, New Hampshire y Oregon no tienen impuesto estatal sobre las ventas. Algunos gobiernos locales de esos estados, sobre todo en Alaska, cobran el suyo." },
    { pregunta: "¿Dónde encuentro mi tasa exacta?", respuesta: "El departamento de impuestos de su estado publica la tasa estatal y casi siempre un buscador por dirección para las tasas locales. Su recibo también muestra la tasa cobrada." },
    { pregunta: "¿Se cobra impuesto en las compras por internet?", respuesta: "En la mayoría de los estados, sí. Los grandes vendedores en línea cobran el impuesto según la dirección donde se entrega el pedido." },
  ],
  glosario: [
    { termino: "Tasa combinada", definicion: "La tasa del estado más todas las tasas locales que se aplican donde ocurre la venta." },
    { termino: "Impuesto sobre el uso (use tax)", definicion: "Un impuesto que debe a su estado por compras en las que no se cobró impuesto sobre las ventas." },
  ],
});
