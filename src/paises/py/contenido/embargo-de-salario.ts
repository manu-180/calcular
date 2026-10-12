import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.embargo-de-salario",
  h1: "Calculadora de embargo de salario",
  title: "Embargo de salario en Paraguay: cuánto te pueden retener",
  description: "Calculá cuánto te pueden embargar del salario: hasta {{py.embargo-salario[alimentos]}} por alimentos, {{py.embargo-salario[vivienda]}} por vivienda y {{py.embargo-salario[otros]}} por otras deudas.",
  intro: [
    "El Código del Trabajo pone un límite a lo que te pueden embargar del salario. Depende del tipo de deuda.",
    "Si tenés varios embargos, entre todos no pueden pasar el {{py.embargo-tope}} de tu salario básico.",
  ],
  comoSeCalcula: [
    "Pensión alimenticia: hasta el {{py.embargo-salario[alimentos]}}.",
    "Alquiler de tu vivienda o alimentos comprados para tu familia: hasta el {{py.embargo-salario[vivienda]}}.",
    "Cualquier otra deuda: hasta el {{py.embargo-salario[otros]}}.",
    "Sumados todos los embargos, el tope es el {{py.embargo-tope}} del salario básico.",
  ],
  ejemplo: ["Con un salario de Gs. 4.000.000, por una deuda común te pueden embargar hasta Gs. 1.000.000. Por pensión alimenticia, hasta Gs. 2.000.000."],
  faq: [
    {
      pregunta: "¿Cuánto me pueden embargar del sueldo?",
      respuesta: "Hasta el {{py.embargo-salario[otros]}} por deudas comunes, el {{py.embargo-salario[vivienda]}} por alquiler o alimentos de tu familia y el {{py.embargo-salario[alimentos]}} por pensión alimenticia.",
    },
    {
      pregunta: "¿Me pueden embargar el aguinaldo?",
      respuesta: "No. El aguinaldo es inembargable, igual que la bonificación familiar y las herramientas de trabajo.",
    },
    {
      pregunta: "¿Y si tengo varios embargos?",
      respuesta: "Entre todos no pueden superar el {{py.embargo-tope}} de tu salario básico.",
    },
  ],
  glosario: [
    { termino: "Embargo", definicion: "La retención que ordena un juez sobre tu salario para pagar una deuda." },
    { termino: "Salario básico", definicion: "Tu salario sin extras ni bonificaciones." },
  ],
});
