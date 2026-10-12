import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.garantia-prestaciones",
  h1: "Calculadora de garantía trimestral de prestaciones",
  title: "Garantía de prestaciones sociales: depósito trimestral",
  description:
    "Calcula cuánto te tiene que depositar la empresa cada trimestre como garantía de prestaciones: {{ve.prestaciones-garantia-dias}} de salario integral, más días adicionales.",
  intro: [
    "Cada trimestre la empresa tiene que depositar a tu nombre {{ve.prestaciones-garantia-dias}} de salario integral. Es la garantía de tus prestaciones sociales.",
    "Desde el segundo año se suman días adicionales una vez al año. Con esta calculadora puedes revisar si el depósito que ves en tu fideicomiso está bien.",
  ],
  comoSeCalcula: [
    "Salario integral diario: tu salario del último mes del trimestre entre {{ve.dias-mes-salario}}, más la parte diaria de utilidades y bono vacacional.",
    "Depósito trimestral: {{ve.prestaciones-garantia-dias}} por el salario integral diario.",
    "Días adicionales: {{ve.prestaciones-dias-adicionales}} por cada año de servicio después del primero, acumulativos, hasta {{ve.prestaciones-dias-adicionales-tope}}.",
  ],
  ejemplo: ["Con $300 al mes y menos de un año, el salario integral diario es $11,25 y el depósito del trimestre es $168,75."],
  faq: [
    {
      pregunta: "¿Cuánto me depositan de prestaciones cada trimestre?",
      respuesta: "{{ve.prestaciones-garantia-dias}} de salario integral, calculado con el salario del último mes del trimestre.",
    },
    {
      pregunta: "¿Qué son los días adicionales?",
      respuesta: "Después del primer año te depositan {{ve.prestaciones-dias-adicionales}} más por cada año de servicio: 2 al cumplir el segundo, 4 al tercero y así hasta {{ve.prestaciones-dias-adicionales-tope}}.",
    },
    {
      pregunta: "¿Dónde se deposita la garantía?",
      respuesta: "En un fideicomiso a tu nombre, en el Fondo Nacional de Prestaciones Sociales o, si lo autorizas por escrito, en la contabilidad de la empresa.",
    },
    {
      pregunta: "¿Qué pasa si la empresa no deposita?",
      respuesta: "La garantía no depositada genera intereses a la tasa activa del BCV, que es más alta. Puedes calcularlos en la calculadora de intereses de prestaciones.",
    },
  ],
  glosario: [
    { termino: "Garantía", definicion: "Depósito trimestral de prestaciones a tu nombre (art. 142 de la LOTTT)." },
    { termino: "Fideicomiso", definicion: "Cuenta en un banco donde la empresa deposita tu garantía." },
  ],
});
