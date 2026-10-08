import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.quincena-25",
  h1: "Calculadora de la Quincena 25 en El Salvador",
  title: "Quincena 25 en El Salvador: calcule cuánto recibe en enero",
  description:
    "Calcule su Quincena 25: el {{sv.quincena25-porcentaje}} de su salario mensual si gana hasta {{sv.quincena25-salario-maximo}}, o el proporcional. Se paga en enero, sin descuentos.",
  intro: [
    "La Quincena 25 en El Salvador es el {{sv.quincena25-porcentaje}} de su salario mensual, para quienes ganan hasta {{sv.quincena25-salario-maximo}}. Se paga cada enero, entre el 15 y el 25, sin descuentos de renta, ISSS ni AFP.",
    "Ponga su salario mensual. Si tiene menos de un año con su patrono, indique los días trabajados y le calculamos la parte proporcional.",
  ],
  comoSeCalcula: [
    "Si su salario mensual es de {{sv.quincena25-salario-maximo}} o menos, le corresponde el {{sv.quincena25-porcentaje}} de ese salario.",
    "Con menos de un año se paga la parte proporcional, con las mismas reglas del aguinaldo: el monto completo por los días trabajados, dividido por 365.",
    "Si su salario pasa de {{sv.quincena25-salario-maximo}}, no le corresponde.",
  ],
  ejemplo: ["Si gana $1,000 al mes, recibe $500 de Quincena 25, sin ninguna retención."],
  faq: [
    {
      pregunta: "¿Cuánto es la Quincena 25?",
      respuesta: "El {{sv.quincena25-porcentaje}} de su salario mensual nominal. Si tiene menos de un año con su patrono, la parte proporcional.",
    },
    {
      pregunta: "¿Quién recibe la Quincena 25?",
      respuesta: "Las personas del sector público y del privado con un salario de hasta {{sv.quincena25-salario-maximo}} al mes, que cumplan los mismos requisitos que para el aguinaldo.",
    },
    {
      pregunta: "¿Cuándo se paga la Quincena 25?",
      respuesta: "Cada año en enero, entre el 15 y el 25.",
    },
    {
      pregunta: "¿Es obligatoria para las empresas privadas?",
      respuesta: "Sí, desde enero de 2027. En 2026 fue voluntaria para el sector privado y las empresas que la pagaron tienen un crédito en el impuesto sobre la renta.",
    },
    {
      pregunta: "¿Me descuentan algo de la Quincena 25?",
      respuesta: "No. No paga renta ni lleva cotización al ISSS ni a la AFP. Tampoco se puede embargar.",
    },
    {
      pregunta: "¿Reemplaza al aguinaldo?",
      respuesta: "No. Es un beneficio aparte y no cambia ninguna otra prestación.",
    },
  ],
  glosario: [
    { termino: "Quincena 25", definicion: "Ingreso extra del {{sv.quincena25-porcentaje}} del salario mensual que se paga entre el 15 y el 25 de enero." },
    { termino: "Salario nominal", definicion: "El salario mensual antes de cualquier descuento." },
  ],
});
