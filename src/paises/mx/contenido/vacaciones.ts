import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.vacaciones",
  h1: "Calculadora de vacaciones y prima vacacional",
  title: "Vacaciones dignas 2026: días y prima vacacional",
  description:
    "Calcula cuántos días de vacaciones te tocan por antigüedad y tu prima vacacional del {{mx.prima-vacacional}}, con la reforma de vacaciones dignas.",
  intro: [
    "Desde 2023 rige la reforma de vacaciones dignas: al cumplir tu primer año te tocan {{mx.vacaciones-primer-anio}} de vacaciones pagadas.",
    "Además de tu salario normal en esos días, cobras una prima vacacional de al menos {{mx.prima-vacacional}}.",
  ],
  comoSeCalcula: [
    "Primer año: {{mx.vacaciones-primer-anio}}. Cada año siguiente suma dos días hasta llegar a 20 en el quinto año.",
    "Del sexto año en adelante se suman dos días por cada cinco años de servicio: 22 del sexto al décimo, 24 del undécimo al decimoquinto, y así.",
    "El pago de vacaciones es tu salario diario por los días que te tocan.",
    "La prima vacacional es al menos el {{mx.prima-vacacional}} de ese pago.",
    "Hasta {{mx.exencion-prima-vacacional}} de prima vacacional al año no pagan ISR.",
  ],
  ejemplo: [
    "Con 3 años en la empresa te tocan 16 días. Si tu salario diario es de 500 pesos, el pago es de 8,000 pesos y la prima vacacional mínima de 2,000.",
  ],
  faq: [
    {
      pregunta: "¿Puedo tomar las vacaciones en partes?",
      respuesta: "Sí, pero al menos {{mx.vacaciones-primer-anio}} tienen que ser seguidos. El resto lo repartes como acuerdes con tu empresa.",
    },
    {
      pregunta: "¿Me pueden pagar las vacaciones en lugar de dármelas?",
      respuesta: "No. La ley prohíbe cambiar las vacaciones por dinero. Solo se pagan sin tomarlas cuando termina la relación de trabajo, en el finiquito.",
    },
    {
      pregunta: "¿Qué pasa si renuncio antes de cumplir el año?",
      respuesta: "Te pagan la parte proporcional de las vacaciones y de la prima vacacional en tu finiquito.",
    },
  ],
  glosario: [
    { termino: "Vacaciones dignas", definicion: "Reforma a la Ley Federal del Trabajo publicada en el DOF el 27 de diciembre de 2022 que subió los días de vacaciones desde el primer año." },
    { termino: "Prima vacacional", definicion: "Pago extra sobre el salario de tus días de vacaciones (artículo 80 de la ley)." },
  ],
});
