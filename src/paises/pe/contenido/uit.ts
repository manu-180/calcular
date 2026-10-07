import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.conversor-uit",
  h1: "Conversor de UIT a soles",
  title: "UIT 2026: convierte UIT a soles y al revés",
  description: "La UIT 2026 vale {{pe.uit}}. Convierte cualquier cantidad de UIT a soles, o soles a UIT, con el valor oficial del decreto supremo.",
  intro: [
    "La UIT (unidad impositiva tributaria) es un valor de referencia que el Estado fija cada año. Se usa para impuestos, multas, topes de deducciones y requisitos de muchos trámites.",
    "Para 2026 vale {{pe.uit}}, desde el {{pe.uit#desde}}.",
  ],
  comoSeCalcula: [
    "UIT a soles: multiplica la cantidad de UIT por el valor de la UIT del año.",
    "Soles a UIT: divide el monto en soles entre el valor de la UIT.",
  ],
  ejemplo: ["Una multa de media UIT en 2026 equivale a S/ 2,750. Siete UIT (la deducción del impuesto a la renta de trabajo) son S/ 38,500."],
  faq: [
    {
      pregunta: "¿Cuánto vale la UIT en 2026?",
      respuesta: "{{pe.uit}}, según el Decreto Supremo 301-2025-EF.",
    },
    {
      pregunta: "¿Cuándo cambia la UIT?",
      respuesta: "Cada año, por decreto supremo del Ministerio de Economía. El valor de 2026 se publicó el 17 de diciembre de 2025 y rige todo el año.",
    },
    {
      pregunta: "¿Para qué se usa la UIT?",
      respuesta: "Para calcular el impuesto a la renta, los topes de deducciones, las multas de SUNAT y de otras entidades, y los límites de algunos regímenes tributarios.",
    },
  ],
  glosario: [{ termino: "UIT", definicion: "Unidad impositiva tributaria: valor de referencia en soles que se actualiza cada año por decreto supremo." }],
});
