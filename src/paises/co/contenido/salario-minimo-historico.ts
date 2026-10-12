import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.salario-minimo-historico",
  h1: "Salario mínimo en Colombia por año",
  title: "Salario mínimo histórico en Colombia desde 2020",
  description:
    "Consulta el salario mínimo y el auxilio de transporte de cada año desde 2020, con el aumento frente al año anterior. Cada valor sale de su decreto.",
  intro: [
    "Cada diciembre el Gobierno fija por decreto el salario mínimo y el auxilio de transporte del año siguiente.",
    "Elige un año y te mostramos el salario mínimo, el auxilio, el total y cuánto subió. Para 2026 el mínimo es {{co.smmlv}}.",
  ],
  comoSeCalcula: [
    "Salario mínimo y auxilio: el valor que fijó el decreto de ese año.",
    "Total: salario mínimo más auxilio de transporte.",
    "Aumento: la variación frente al salario mínimo del año anterior.",
  ],
  ejemplo: ["En 2023 el salario mínimo fue de $1.160.000, un 16 % más que en 2022. Con el auxilio de $140.606, el total era $1.300.606."],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo en 2026?",
      respuesta: "{{co.smmlv}} al mes, fijado por el Decreto 1469 de 2025. Con el auxilio de transporte llega a $2.000.000.",
    },
    {
      pregunta: "¿Para qué sirve saber el salario mínimo de años anteriores?",
      respuesta: "Para revisar liquidaciones viejas, demandas, contratos o multas que se fijaron en salarios mínimos de un año pasado.",
    },
    {
      pregunta: "¿Cuándo sale el salario mínimo de 2027?",
      respuesta: "Se fija en diciembre de 2026, por acuerdo en la Comisión de Concertación o por decreto del Gobierno. Lo cargamos apenas sale el decreto.",
    },
  ],
  glosario: [
    { termino: "SMMLV", definicion: "Salario mínimo mensual legal vigente." },
    { termino: "Auxilio de transporte", definicion: "Un pago extra para quienes ganan hasta dos salarios mínimos." },
  ],
});
