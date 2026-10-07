import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.bonificacion",
  h1: "Calculadora de bonificación",
  title: "Bonificación en RD: calcula cuánto te puede tocar",
  description:
    "Calcula cuánto es lo máximo que puedes cobrar de bonificación por la participación en los beneficios de tu empresa ({{do.participacion-beneficios}} de las utilidades).",
  intro: [
    "Si tu empresa tuvo ganancias, tiene que repartir {{do.participacion-beneficios}} de sus utilidades netas entre los trabajadores por tiempo indefinido. A ese pago se le llama bonificación.",
    "Cada persona tiene un tope que depende de su salario y de su antigüedad. Esta calculadora te da ese tope.",
  ],
  comoSeCalcula: [
    "Se toma tu salario promedio del año fiscal de la empresa y se divide entre {{do.divisor-salario-diario}} para tener el salario diario.",
    "Con menos de 3 años en la empresa, el tope es de {{do.bonificacion-dias-tope[menos-de-tres-anios]}} de salario.",
    "Con 3 años o más, el tope es de {{do.bonificacion-dias-tope[tres-anios-o-mas]}} de salario.",
    "Si no trabajaste todo el año, el tope baja en proporción a los meses trabajados.",
  ],
  ejemplo: [
    "Con RD$45,000 al mes y 3 años o más en la empresa, tu salario diario es RD$1,888.38. Tu bonificación puede llegar a RD$113,302.56.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se paga la bonificación?",
      respuesta: "Entre 90 y 120 días después del cierre del año fiscal. Si la empresa cierra el 31 de diciembre, entre abril y mayo.",
    },
    {
      pregunta: "¿Siempre cobro el tope?",
      respuesta: "No. Si las utilidades no alcanzan para pagar el tope a todos, se reparte lo que hay en la misma proporción.",
    },
    {
      pregunta: "¿Todas las empresas pagan bonificación?",
      respuesta: "No. Las de zonas francas no la pagan. Tampoco algunas agrícolas, industriales, forestales y mineras en sus primeros 3 años.",
    },
    {
      pregunta: "¿La bonificación cuenta para la regalía pascual?",
      respuesta: "No. La regalía se calcula sin la bonificación.",
    },
  ],
  glosario: [
    { termino: "Bonificación", definicion: "Nombre común de la participación de los trabajadores en los beneficios de la empresa." },
    { termino: "Utilidad neta", definicion: "Lo que gana la empresa en el año después de sus gastos e impuestos." },
    { termino: "Año fiscal", definicion: "El período de 12 meses que la empresa usa para cerrar sus cuentas." },
  ],
});
