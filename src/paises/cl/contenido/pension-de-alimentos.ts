import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.pension-de-alimentos",
  h1: "Calculadora de pensión de alimentos 2026",
  title: "Pensión de alimentos 2026: mínimo legal por hijo",
  description:
    "Calcula la pensión de alimentos mínima: {{cl.alimentos-minimo-un-hijo}} del ingreso mínimo por un hijo y {{cl.alimentos-minimo-varios}} por cada uno si son dos o más.",
  intro: [
    "La ley fija un piso para la pensión de alimentos de hijos e hijas: el {{cl.alimentos-minimo-un-hijo}} del ingreso mínimo si es uno, y el {{cl.alimentos-minimo-varios}} por cada uno si son dos o más.",
    "Esta calculadora te da ese mínimo legal y el máximo general (la mitad de los ingresos de quien paga). El monto final lo fija el tribunal de familia según cada caso.",
  ],
  comoSeCalcula: [
    "Se toma el ingreso mínimo que corresponde a la edad de quien paga: {{cl.imm}} entre 18 y 65 años, o {{cl.imm-menores-mayores}} si es menor de 18 o mayor de 65.",
    "Con un hijo, el mínimo es el {{cl.alimentos-minimo-un-hijo}} de ese monto. Con dos o más, el {{cl.alimentos-minimo-varios}} por cada uno.",
    "El máximo general es el {{cl.alimentos-maximo}} de las rentas de quien paga. El juez puede pasarlo solo con razones fundadas.",
  ],
  ejemplo: ["Para un hijo, con el ingreso mínimo de {{cl.imm}}, la pensión mínima es de $221.421 al mes. Para tres hijos, $166.066 por cada uno: $498.198 en total."],
  faq: [
    {
      pregunta: "¿Cuál es la pensión de alimentos mínima en 2026?",
      respuesta: "Con el ingreso mínimo vigente, unos $221.421 al mes para un hijo y unos $166.066 por cada hijo si son dos o más. Sube cada vez que sube el ingreso mínimo.",
    },
    {
      pregunta: "¿Se puede pagar menos que el mínimo?",
      respuesta: "Solo si quien paga prueba ante el tribunal que no tiene medios para pagarlo. En ese caso el juez puede rebajarlo.",
    },
    {
      pregunta: "¿La asignación familiar cuenta como ingreso?",
      respuesta: "No. Para el máximo del 50 % no se consideran las asignaciones por carga familiar.",
    },
    {
      pregunta: "¿En qué unidad se fija la pensión?",
      respuesta: "La resolución del juez la expresa en UTM, así se reajusta sola cada mes.",
    },
  ],
  glosario: [
    { termino: "Alimentante", definicion: "Persona que paga la pensión de alimentos." },
    { termino: "Alimentario", definicion: "Persona que recibe la pensión, por ejemplo un hijo o una hija." },
    { termino: "Ingreso mínimo remuneracional", definicion: "El sueldo mínimo legal. Cambia según la edad de la persona." },
  ],
});
