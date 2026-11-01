import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.embargo-de-salario",
  h1: "Calculadora de embargo de salario",
  title: "Embargo de salario {{anio}}: cuánto te pueden quitar",
  description:
    "Calcula cuánto te pueden embargar del salario: el mínimo no se toca por deudas comunes y del resto solo una quinta parte. Para alimentos, hasta el 50 %.",
  intro: [
    "Tu salario tiene protección. Por una deuda común (un banco, una tarjeta) no te pueden embargar el salario mínimo, y de lo que ganes por encima solo una quinta parte.",
    "La excepción son las cuotas de alimentos y las deudas con cooperativas: ahí te pueden embargar hasta el {{co.embargo[alimentos-cooperativas]}} de todo el salario.",
  ],
  comoSeCalcula: [
    "Deudas comunes: (salario − salario mínimo de {{co.smmlv}}) × {{co.embargo[excedente]}}.",
    "Alimentos o cooperativas: salario × {{co.embargo[alimentos-cooperativas]}}.",
  ],
  ejemplo: [
    "Con un salario de $3.000.000, por una deuda común te pueden embargar hasta $249.819 al mes. Por una cuota de alimentos, hasta $1.500.000.",
  ],
  faq: [
    {
      pregunta: "¿Me pueden embargar el salario mínimo?",
      respuesta: "Por deudas comunes, no. Solo por cuotas de alimentos o deudas con cooperativas, hasta el {{co.embargo[alimentos-cooperativas]}}.",
    },
    {
      pregunta: "¿Cuánto me embargan si gano más del mínimo?",
      respuesta: "Una quinta parte de lo que pasa del salario mínimo, si es una deuda común.",
    },
    {
      pregunta: "¿Cómo se fija una cuota de alimentos?",
      respuesta: "La fija un juez o un acuerdo conciliado. La ley pone el tope: nunca más del {{co.embargo[alimentos-cooperativas]}} del salario.",
    },
  ],
  glosario: [
    { termino: "Embargo", definicion: "Una orden judicial para descontar parte de tu salario y pagar una deuda." },
    { termino: "Cuota alimentaria", definicion: "Lo que un padre o madre tiene que aportar para los gastos de sus hijos." },
  ],
});
