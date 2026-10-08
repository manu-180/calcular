import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.uma",
  h1: "Valor de la UMA 2026: convierte UMA a pesos",
  title: "UMA 2026: {{mx.uma-diaria}} diarios. Convierte UMA a pesos",
  description:
    "La UMA 2026 vale {{mx.uma-diaria}} diarios y {{mx.uma-mensual}} mensuales. Convierte multas, límites y créditos de UMA a pesos (o al revés) en un paso.",
  intro: [
    "La UMA vale {{mx.uma-diaria}} por día y {{mx.uma-mensual}} por mes desde el {{mx.uma-diaria#desde}}. Es la referencia en pesos que usan las leyes para multas, límites de impuestos y otros montos.",
    "Escribe cuántas UMA dice tu multa o tu norma y te decimos cuánto es en pesos.",
  ],
  comoSeCalcula: [
    "Multiplica la cantidad de UMA por su valor diario, mensual o anual, según lo que diga la norma.",
    "El valor anual es el mensual por 12.",
    "Para pasar de pesos a UMA, divide los pesos entre el valor de la UMA.",
  ],
  ejemplo: [
    "30 UMA diarias (el límite exento del aguinaldo) equivalen a 30 × {{mx.uma-diaria}}. Con el valor de 2026 son 3,519.30 pesos.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto vale la UMA hoy?",
      respuesta: "{{mx.uma-diaria}} diarios y {{mx.uma-mensual}} mensuales. El valor anual es el mensual por 12.",
    },
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
