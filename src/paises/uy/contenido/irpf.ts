import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.irpf",
  h1: "Calculadora de IRPF 2026 sobre el sueldo",
  title: "IRPF Uruguay 2026: calculá tu retención por franjas",
  description:
    "Calculá cuánto IRPF te retienen por mes con las franjas 2026, la BPC de {{uy.bpc}} y tus deducciones por aportes e hijos. Cada paso a la vista, gratis.",
  intro: [
    "El IRPF de tu sueldo se calcula con una escala por franjas medidas en BPC, de 0 % a 36 %, menos una parte de tus deducciones. En 2026 la BPC es {{uy.bpc}} y tu empleador te lo retiene todos los meses.",
    "Acá ves cada paso: la renta del mes, el impuesto por franjas, cuánto bajan tus deducciones y lo que te retienen al final.",
  ],
  comoSeCalcula: [
    "Se parte del nominal del mes, sin aguinaldo ni salario vacacional. Si pasa {{uy.irpf-incremento-umbral}}, se le suma un {{uy.irpf-incremento}}.",
    "A esa renta se le aplica la escala mensual: cada porción paga la tasa de su franja, desde 0 % hasta 36 %.",
    "Las deducciones son tus aportes (montepío, Fonasa y FRL), {{uy.irpf-deduccion-hijo}} por año por cada hijo menor a cargo y {{uy.irpf-deduccion-hijo-discapacidad}} por hijo con discapacidad.",
    "Al total de deducciones se le aplica {{uy.irpf-deducciones-tasa-baja}} si tu nominal es de hasta {{uy.irpf-deducciones-umbral}}, o {{uy.irpf-deducciones-tasa-alta}} si es mayor.",
    "La retención es el impuesto por franjas menos ese descuento. Si da negativo, no te retienen nada.",
  ],
  ejemplo: [
    "Con $ 100.000 nominales y sin hijos, en 2026 la renta del mes es $ 106.000. Por franjas da $ 7.936,80. Tus aportes suman $ 19.600 y el 14 % es $ 2.744. Te retienen $ 5.192,80.",
  ],
  faq: [
    {
      pregunta: "¿Cuáles son las franjas del IRPF en 2026?",
      respuesta: "Son ocho, medidas en BPC por mes. La primera, hasta 7 BPC, no paga, y la más alta paga 36 %. La calculadora te muestra cuánto de tu renta cae en cada una.",
    },
    {
      pregunta: "¿Cuál es el mínimo no imponible del IRPF en 2026?",
      respuesta: "7 BPC por mes. Con la BPC de {{uy.bpc}}, la primera parte de la renta hasta ese monto no paga impuesto.",
    },
    {
      pregunta: "¿Puedo compartir la deducción por hijos?",
      respuesta: "Sí. Si los dos progenitores están de acuerdo, cada uno puede deducir la mitad. Si no hay acuerdo, la ley fija un orden para ver quién la usa.",
    },
    {
      pregunta: "¿Por qué lo que me retienen no coincide con lo que pago en el año?",
      respuesta: "Porque la retención mensual es un adelanto. Al cerrar el año se hace la liquidación anual y puede haber devolución o un saldo a pagar.",
    },
    {
      pregunta: "¿El aguinaldo paga IRPF?",
      respuesta: "Sí, pero aparte: no entra en la escala del mes. Paga una tasa fija igual a la de tu franja más alta.",
    },
  ],
  glosario: [
    { termino: "Franja", definicion: "Tramo de la escala del IRPF. Cada parte de tu renta paga la tasa del tramo en el que cae." },
    { termino: "Deducciones", definicion: "Gastos que la ley te deja restar, como tus aportes y los hijos a cargo. No se restan enteros: se resta un porcentaje." },
    { termino: "BPC", definicion: "Base de Prestaciones y Contribuciones. Las franjas del IRPF se miden en BPC." },
  ],
});
