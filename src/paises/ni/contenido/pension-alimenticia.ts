import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.pension-alimenticia",
  h1: "Calculadora de pensión alimenticia en Nicaragua",
  title: "Pensión alimenticia en Nicaragua: calculá cuánto corresponde",
  description: "Pensión alimenticia en Nicaragua según el Código de Familia: {{ni.pension-alimenticia[un-hijo]}} de los ingresos netos por un hijo, {{ni.pension-alimenticia[dos-hijos]}} por dos y {{ni.pension-alimenticia[tres-o-mas]}} por tres o más.",
  intro: [
    "El Código de Familia fija cuánto de sus ingresos netos tiene que pasar como pensión quien tiene trabajo estable. Si no lo tiene, fija un mínimo en base al salario mínimo.",
    "Poné cuántos hijos son y los ingresos de quien paga. Te mostramos el monto orientativo.",
  ],
  comoSeCalcula: [
    "Con trabajo estable: {{ni.pension-alimenticia[un-hijo]}} de los ingresos netos por un hijo, {{ni.pension-alimenticia[dos-hijos]}} por dos y {{ni.pension-alimenticia[tres-o-mas]}} por tres o más.",
    "Si además reclaman otras personas, se suma un {{ni.pension-alimenticia[otros]}}, con un máximo de {{ni.pension-alimenticia[maximo]}} en total.",
    "Sin trabajo estable: al menos el {{ni.pension-alimenticia-minimo}} del salario mínimo de su sector por cada hijo.",
    "Cada mes de atraso suma un {{ni.pension-alimenticia-mora}} a la cuota.",
  ],
  ejemplo: ["Si el padre gana C$10,000 netos y tiene un hijo, la pensión es de C$2,500 al mes."],
  faq: [
    {
      pregunta: "¿Cuánto es la pensión alimenticia en Nicaragua?",
      respuesta: "Con trabajo estable, {{ni.pension-alimenticia[un-hijo]}} de los ingresos netos por un hijo, {{ni.pension-alimenticia[dos-hijos]}} por dos y {{ni.pension-alimenticia[tres-o-mas]}} por tres o más.",
    },
    {
      pregunta: "¿Y si el padre o la madre no tiene trabajo fijo?",
      respuesta: "La pensión no puede ser menor del {{ni.pension-alimenticia-minimo}} del salario mínimo del sector de su oficio, por cada hijo. El juez puede revisar sus bienes y fijar más.",
    },
    {
      pregunta: "¿Qué pasa si no paga a tiempo?",
      respuesta: "Cada mes de atraso sin causa justificada suma un {{ni.pension-alimenticia-mora}} adicional (artículo 325 del Código de Familia).",
    },
    {
      pregunta: "¿Se puede embargar el aguinaldo para la pensión?",
      respuesta: "Sí. El aguinaldo no se puede embargar, salvo para cumplir con una pensión de alimentos.",
    },
    {
      pregunta: "¿Qué son los ingresos netos?",
      respuesta: "Lo que cobra después de los descuentos de ley, como el INSS y el IR.",
    },
  ],
  glosario: [
    { termino: "Alimentante", definicion: "La persona que tiene que pagar la pensión." },
    { termino: "Alimentista", definicion: "Quien recibe la pensión, por ejemplo los hijos." },
  ],
});
