import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.bonificacion",
  h1: "Calculadora de bonificación en República Dominicana",
  title: "Bonificación en RD: calcula tu tope de {{do.bonificacion-dias-tope[menos-de-tres-anios]}} o {{do.bonificacion-dias-tope[tres-anios-o-mas]}}",
  description:
    "Calcula tu bonificación por la participación en los beneficios de tu empresa: hasta {{do.bonificacion-dias-tope[menos-de-tres-anios]}} de salario con menos de 3 años y {{do.bonificacion-dias-tope[tres-anios-o-mas]}} desde los 3 años.",
  intro: [
    "La bonificación en República Dominicana es tu parte del {{do.participacion-beneficios}} de las utilidades netas de la empresa. Tiene un tope de {{do.bonificacion-dias-tope[menos-de-tres-anios]}} de salario si llevas menos de 3 años y de {{do.bonificacion-dias-tope[tres-anios-o-mas]}} si llevas 3 años o más.",
    "La reparten las empresas que tuvieron ganancias entre sus trabajadores por tiempo indefinido. Esta calculadora te da tu tope.",
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
      pregunta: "¿Cómo se calcula la bonificación?",
      respuesta: "Divides tu salario promedio del año fiscal entre {{do.divisor-salario-diario}} y lo multiplicas por {{do.bonificacion-dias-tope[menos-de-tres-anios]}} o {{do.bonificacion-dias-tope[tres-anios-o-mas]}}, según tu antigüedad. Si no trabajaste todo el año, el tope baja en proporción.",
    },
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
