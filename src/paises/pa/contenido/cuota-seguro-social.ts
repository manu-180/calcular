import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.cuota-seguro-social",
  h1: "Calculadora de cuotas del Seguro Social en Panamá",
  title: "Cuota del Seguro Social en Panamá: empleado y empleador",
  description:
    "Calcula las cuotas a la Caja de Seguro Social: {{pa.css-trabajador}} del empleado y {{pa.css-empleador}} del empleador, más el seguro educativo y lo que se paga sobre el décimo.",
  intro: [
    "Cada mes, al empleado se le descuenta el {{pa.css-trabajador}} de Seguro Social y el {{pa.seguro-educativo-trabajador}} de seguro educativo. El empleador aporta el {{pa.css-empleador}} y el {{pa.seguro-educativo-empleador}}.",
    "Sobre cada partida del décimo hay una contribución especial: {{pa.css-decimo-trabajador}} del empleado y {{pa.css-decimo-empleador}} del empleador. Escribe el salario y te mostramos cada cuota.",
  ],
  comoSeCalcula: [
    "Empleado: {{pa.css-trabajador}} de Seguro Social y {{pa.seguro-educativo-trabajador}} de seguro educativo sobre el salario bruto.",
    "Empleador: {{pa.css-empleador}} de Seguro Social y {{pa.seguro-educativo-empleador}} de seguro educativo.",
    "Décimo: {{pa.css-decimo-trabajador}} a cargo del empleado y {{pa.css-decimo-empleador}} del empleador. No lleva seguro educativo.",
  ],
  ejemplo: [
    "Con un salario de B/. 1,000 en 2026: al empleado le descuentan B/. 110 y el empleador aporta B/. 147.50. La Caja recibe B/. 257.50.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es la cuota obrero patronal en Panamá?",
      respuesta: "El empleado aporta {{pa.css-trabajador}} y el empleador {{pa.css-empleador}} de Seguro Social. A eso se suma el seguro educativo: {{pa.seguro-educativo-trabajador}} y {{pa.seguro-educativo-empleador}}.",
    },
    {
      pregunta: "¿Sube la cuota del empleador?",
      respuesta: "Sí. Con la reforma de la Ley 462 de 2025 pasa al 14.25% desde el 1 de marzo de 2027 y al 15.25% desde el 1 de marzo de 2029. La calculadora usa la cuota de cada fecha.",
    },
    {
      pregunta: "¿Al décimo le descuentan seguro educativo?",
      respuesta: "No. Al décimo solo se le aplica la contribución especial de Seguro Social.",
    },
    {
      pregunta: "¿Qué es la cuota de riesgos profesionales?",
      respuesta: "La paga solo el empleador para cubrir accidentes y enfermedades de trabajo. La tasa depende de la actividad de la empresa.",
    },
  ],
  glosario: [
    { termino: "CSS", definicion: "Caja de Seguro Social." },
    { termino: "Seguro educativo", definicion: "Aporte que financia programas de educación y capacitación." },
  ],
});
