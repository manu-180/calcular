import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.impuesto-herencias",
  h1: "Calculadora del impuesto a las herencias en Ecuador",
  title: "Impuesto a la herencia Ecuador {{anio}}: cuánto se paga",
  description: "Calcula el impuesto a la renta sobre herencias, legados y donaciones con la tabla {{anio}} del SRI. Padres e hijos pagan la mitad y los hijos menores no pagan.",
  intro: [
    "En Ecuador lo que recibes por herencia, legado o donación paga impuesto a la renta con una tabla propia. Hasta la fracción básica no se paga nada.",
    "Si heredas de tu padre, madre, hijo o hija, las tarifas se reducen a la mitad. Pon el valor neto que recibes y te decimos cuánto pagas.",
  ],
  comoSeCalcula: [
    "Al valor de lo que recibes se le restan las deudas del fallecido, los gastos de la última enfermedad y del funeral, y los de abrir la sucesión.",
    "A ese valor neto se le aplica la tabla de herencias del año: un impuesto fijo por tramo más un porcentaje sobre el excedente.",
    "Padres e hijos (primer grado) pagan con las tarifas reducidas en un {{ec.herencias-reduccion-primer-grado}}.",
    "Las donaciones pagan con la tabla completa.",
  ],
  ejemplo: ["Si heredas $200.000 de tu padre en 2026, el impuesto según la tabla es $8.220,70. Con la reducción a la mitad pagas $4.110,35."],
  faq: [
    {
      pregunta: "¿Desde qué monto se paga el impuesto a la herencia?",
      respuesta: "Desde lo que pase el primer tramo de la tabla del año, que no paga nada. El SRI actualiza ese tramo cada diciembre con la inflación, y la calculadora usa el vigente.",
    },
    {
      pregunta: "¿Los hijos pagan impuesto a la herencia?",
      respuesta: "Sí, pero con las tarifas reducidas a la mitad. Los hijos menores de edad no pagan.",
    },
    {
      pregunta: "¿Cuándo se declara?",
      respuesta: "Las herencias y legados, dentro de los seis meses desde que se acepta la herencia. Las donaciones, antes de inscribir la escritura.",
    },
    {
      pregunta: "¿El seguro de vida paga este impuesto?",
      respuesta: "No. Lo que recibes como beneficiario de un seguro de vida no está sujeto a este impuesto.",
    },
  ],
  glosario: [
    { termino: "Legado", definicion: "Un bien concreto que el fallecido deja a alguien en su testamento." },
    { termino: "Primer grado de consanguinidad", definicion: "Padres e hijos." },
    { termino: "Fracción básica", definicion: "El tramo de la tabla que no paga impuesto." },
  ],
});
