import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.tope-imponible",
  h1: "Tope imponible {{anio}} en pesos",
  title: "Tope imponible {{anio}}: {{cl.tope-imponible}} en pesos de hoy",
  description:
    "El tope imponible {{anio}} es {{cl.tope-imponible}} para AFP y salud y {{cl.tope-imponible-cesantia}} para el seguro de cesantía. Míralos en pesos con la UF de hoy.",
  intro: [
    "El tope imponible es el sueldo máximo sobre el que se pagan cotizaciones. Si ganas más, AFP y salud se calculan solo hasta ese monto.",
    "En 2026 el tope es de {{cl.tope-imponible}} para AFP, salud y accidentes del trabajo, y de {{cl.tope-imponible-cesantia}} para el seguro de cesantía. Como están en UF, en pesos cambian todos los días.",
  ],
  comoSeCalcula: [
    "Multiplicamos {{cl.tope-imponible}} por el valor de la UF del día. Ese es el tope para AFP y salud.",
    "Hacemos lo mismo con {{cl.tope-imponible-cesantia}} para el seguro de cesantía.",
    "También te mostramos el tope de {{cl.tope-indemnizacion}} que se usa en las indemnizaciones por despido.",
  ],
  ejemplo: [
    "Con la UF del 7 de octubre de 2026 ($41.114,54), el tope para AFP y salud es de $3.700.309. Si ganas $4.000.000, tus cotizaciones se calculan sobre $3.700.309.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo cambia el tope imponible?",
      respuesta: "Una vez al año. La Superintendencia de Pensiones lo reajusta según la variación de las remuneraciones reales y rige desde las remuneraciones de febrero.",
    },
    {
      pregunta: "¿El tope afecta mi sueldo líquido?",
      respuesta: "Sí. Si ganas sobre el tope, pagas menos AFP y salud en proporción a tu sueldo. El impuesto se calcula igual sobre todo lo demás.",
    },
    {
      pregunta: "¿Por qué el seguro de cesantía tiene otro tope?",
      respuesta: "Porque la ley del seguro de cesantía fija su propio límite, más alto que el de AFP y salud.",
    },
  ],
  glosario: [
    { termino: "Remuneración imponible", definicion: "Parte del sueldo sobre la que se pagan cotizaciones." },
    { termino: "UF", definicion: "Unidad de Fomento. Cambia cada día según la inflación; el SII publica su valor." },
  ],
});
