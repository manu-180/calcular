import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.embargo-de-salario",
  h1: "Calculadora de embargo de salario en Guatemala",
  title: "Embargo de salario en Guatemala: cuánto le pueden quitar",
  description:
    "Calcule el máximo que le pueden embargar del salario por pensión alimenticia o por otras deudas, según el Código de Trabajo.",
  intro: [
    "El Código de Trabajo protege una parte de su salario para que no se la puedan embargar. Cuánto queda protegido depende de por qué es el embargo.",
    "Por pensión alimenticia le pueden embargar hasta el {{gt.embargo-alimentos}} del salario. Por otras deudas, el {{gt.embargo-inembargable}} del salario queda protegido y el salario mínimo no se puede embargar.",
  ],
  comoSeCalcula: [
    "Pensión alimenticia: máximo = salario × {{gt.embargo-alimentos}}. El juez fija el monto exacto.",
    "Otras deudas con salario mayor al mínimo: máximo = salario menos el {{gt.embargo-inembargable}} que queda protegido.",
    "Otras deudas con salario mínimo o menor: no se puede embargar.",
  ],
  ejemplo: ["Gana Q6,000 y tiene una deuda con un banco: le pueden embargar hasta Q2,100 al mes y le quedan Q3,900."],
  faq: [
    {
      pregunta: "¿Me pueden embargar el salario mínimo?",
      respuesta: "Por deudas comunes, no: el salario mínimo es inembargable. La excepción es la pensión alimenticia, que se puede cobrar de cualquier salario.",
    },
    {
      pregunta: "¿Qué pasa si tengo dos embargos?",
      respuesta: "El de alimentos va primero. Si ya le embargan la mitad por alimentos, por otras deudas solo se puede embargar hasta un 10 % más del salario.",
    },
    {
      pregunta: "¿Mi patrono puede descontarme un embargo sin orden de un juez?",
      respuesta: "No. El patrono descuenta el embargo solo cuando recibe la orden del juzgado, y esa orden tiene que dejarle libre la parte que la ley protege.",
    },
    {
      pregunta: "¿Se pueden embargar mis herramientas de trabajo?",
      respuesta: "No, salvo que la deuda sea justamente por haberlas comprado al crédito.",
    },
  ],
  glosario: [
    { termino: "Embargo", definicion: "Orden de un juez para retener parte de su salario y pagar una deuda." },
    { termino: "Inembargable", definicion: "La parte del salario que la ley protege y no se puede retener." },
  ],
});
