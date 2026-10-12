import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.embargo-de-salario",
  h1: "Calculadora de embargo de salario en Honduras",
  title: "Embargo de salario en Honduras: cuánto le pueden quitar",
  description: "Calcule cuánto le pueden embargar del salario: hasta el {{hn.embargo-salario[pension-alimenticia]}} por pensión alimenticia y una cuarta parte del excedente del mínimo por otras deudas.",
  intro: [
    "El Código del Trabajo protege el salario. Por deudas comunes no se puede embargar el salario mínimo, y del resto solo una parte.",
    "Para la pensión alimenticia el límite es más alto: se puede embargar hasta el {{hn.embargo-salario[pension-alimenticia]}} de cualquier salario.",
  ],
  comoSeCalcula: [
    "Pensión alimenticia: salario × {{hn.embargo-salario[pension-alimenticia]}}.",
    "Alquiler de la vivienda o alimentos comprados para la familia: salario × {{hn.embargo-salario[vivienda-alimentos]}}.",
    "Otras deudas: {{hn.embargo-salario[general]}} de lo que pasa de {{hn.embargo-minimo-libre}}, sin tocar el salario mínimo de su rama.",
  ],
  ejemplo: ["Gana L20,000 en un comercio pequeño y tiene una deuda común. Le pueden embargar hasta L4,975 por mes."],
  faq: [
    {
      pregunta: "¿Cuánto me pueden embargar del salario en Honduras?",
      respuesta: "Por deudas comunes, el {{hn.embargo-salario[general]}} de lo que pasa de {{hn.embargo-minimo-libre}}, sin tocar el salario mínimo. Por pensión alimenticia, hasta el {{hn.embargo-salario[pension-alimenticia]}}.",
    },
    {
      pregunta: "¿Me pueden embargar las prestaciones?",
      respuesta: "El preaviso, la cesantía y las indemnizaciones no se embargan, salvo hasta la mitad por pensiones alimenticias.",
    },
    {
      pregunta: "¿Se pueden embargar las vacaciones?",
      respuesta: "No. El pago de vacaciones no es embargable por deudas comunes.",
    },
    {
      pregunta: "¿Qué pasa si tengo dos embargos?",
      respuesta: "El segundo embargo solo puede tomar su porcentaje de la parte del salario que el primero dejó libre.",
    },
  ],
  glosario: [
    { termino: "Embargo", definicion: "La orden de un juez para retener parte del salario y pagar una deuda." },
    { termino: "Pensión alimenticia", definicion: "El pago que fija un juez para los gastos de hijos u otros familiares." },
  ],
});
