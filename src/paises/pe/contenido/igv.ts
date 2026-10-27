import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.igv",
  h1: "Calculadora de IGV {{anio}}: agrega o quita el 18 %",
  title: "Calculadora de IGV {{anio}} en Perú: agrega o quita el 18 %",
  description:
    "Agrega o quita el IGV de un precio en un clic: {{pe.tasa-igv}} de IGV más {{pe.tasa-ipm}} de promoción municipal. Incluye la tasa especial de restaurantes y hoteles MYPE.",
  intro: [
    "El IGV que pagas en Perú es del 18 % en total. Para agregarlo, multiplica el valor de venta por 1.18; para quitarlo, divide el precio final entre 1.18.",
    "Desde 2026 la Ley 32387 cambia cada año cómo se reparte ese 18 %: hoy son {{pe.tasa-igv}} de IGV y {{pe.tasa-ipm}} de impuesto de promoción municipal (IPM). El total no cambia.",
    "Los restaurantes, hoteles y alojamientos turísticos que son micro o pequeña empresa pagan una tasa especial: {{pe.tasa-igv-restaurantes}} de IGV más el IPM.",
  ],
  comoSeCalcula: [
    "Para agregar el impuesto: multiplica el valor de venta por la tasa total. Sobre S/ 100 sin impuesto, el precio final es S/ 118.",
    "Para quitarlo: divide el precio final entre 1.18. De S/ 118 queda un valor de venta de S/ 100.",
    "El impuesto se separa en IGV e IPM según sus tasas del año.",
  ],
  ejemplo: [
    "En 2026 vendes un producto a S/ 250 sin impuesto. El IGV es S/ 38.75, el IPM S/ 6.25 y el precio final, S/ 295.",
  ],
  faq: [
    {
      pregunta: "¿Cómo le quito el IGV a un precio?",
      respuesta: "Divide el precio final entre 1.18. Por ejemplo, de S/ 590 queda un valor de venta de S/ 500 y S/ 90 de impuesto.",
    },
    {
      pregunta: "¿El IGV sigue siendo 18 %?",
      respuesta: "Sí, para quien compra la tasa total sigue en 18 %. Lo que cambió es cómo se reparte: {{pe.tasa-igv}} de IGV y {{pe.tasa-ipm}} de IPM en 2026.",
    },
    {
      pregunta: "¿Qué cambia en 2027?",
      respuesta: "El IGV baja a 15 % y el IPM sube a 3 %. El total se mantiene en 18 %. Para restaurantes y hoteles MYPE la tasa especial pasa a 12 % de IGV.",
    },
    {
      pregunta: "¿Quién puede usar la tasa especial de restaurantes?",
      respuesta: "Las micro y pequeñas empresas de restaurantes, hoteles y alojamientos turísticos que cumplen los límites de ventas de la ley. Si dejan de cumplirlos, vuelven al 18 %.",
    },
  ],
  glosario: [
    { termino: "IGV", definicion: "Impuesto general a las ventas: el impuesto al consumo del Perú." },
    { termino: "IPM", definicion: "Impuesto de promoción municipal: se cobra junto con el IGV y va a las municipalidades." },
    { termino: "Valor de venta", definicion: "El precio sin impuestos." },
  ],
});
