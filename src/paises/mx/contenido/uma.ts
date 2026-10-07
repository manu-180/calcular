import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.uma",
  h1: "UMA 2026: convierte UMA a pesos",
  title: "UMA 2026: {{mx.uma-diaria}} diarios. Convierte a pesos",
  description:
    "La UMA 2026 vale {{mx.uma-diaria}} diarios y {{mx.uma-mensual}} mensuales. Convierte multas, límites y créditos de UMA a pesos y de pesos a UMA.",
  intro: [
    "La UMA (Unidad de Medida y Actualización) es la referencia en pesos que usan las leyes para multas, límites de impuestos y otros montos.",
    "Desde el {{mx.uma-diaria#desde}} vale {{mx.uma-diaria}} por día y {{mx.uma-mensual}} por mes.",
  ],
  comoSeCalcula: [
    "Multiplica la cantidad de UMA por su valor diario, mensual o anual, según lo que diga la norma.",
    "El valor anual es el mensual por 12.",
    "Para pasar de pesos a UMA, divide los pesos entre el valor de la UMA.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo cambia la UMA?",
      respuesta: "Cada año. El INEGI publica el nuevo valor en enero y rige desde el 1 de febrero.",
    },
    {
      pregunta: "¿La UMA es lo mismo que el salario mínimo?",
      respuesta: "No. Desde 2016 la UMA reemplaza al salario mínimo como unidad para multas, límites y créditos. El salario mínimo es lo menos que te pueden pagar por día.",
    },
    {
      pregunta: "¿Qué valor uso, el diario o el mensual?",
      respuesta: "El que diga la norma. La mayoría de las multas y de los límites exentos de ISR están en UMA diarias.",
    },
  ],
  glosario: [
    { termino: "UMA", definicion: "Unidad de Medida y Actualización, calculada y publicada por el INEGI." },
    { termino: "INEGI", definicion: "Instituto Nacional de Estadística y Geografía." },
  ],
});
