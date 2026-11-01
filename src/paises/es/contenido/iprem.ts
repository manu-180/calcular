import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.iprem",
  h1: "IPREM {{anio}}: calculadora de cuantías",
  title: "IPREM {{anio}}: cuánto es al mes, al año y en veces el IPREM",
  description:
    "El IPREM de {{anio}} es de {{es.iprem-mensual}} al mes. Calcula cuánto son 1,5, 2 o cualquier número de veces el IPREM, al mes, al año y al día.",
  intro: [
    "El IPREM (Indicador Público de Renta de Efectos Múltiples) es la referencia que usan muchas ayudas, becas, subsidios y alquileres sociales para fijar sus límites de ingresos.",
    "En 2026 sigue en {{es.iprem-mensual}} al mes, porque los Presupuestos de 2023 están prorrogados.",
  ],
  comoSeCalcula: [
    "Multiplica el IPREM mensual ({{es.iprem-mensual}}) por las veces que pide la ayuda.",
    "Para el anual, multiplica por 12. Algunas normas lo cuentan con 14 pagas: entonces multiplica por 14.",
    "El IPREM diario es el mensual entre 30.",
  ],
  ejemplo: ["Si una ayuda exige ingresos de hasta 1,5 veces el IPREM, el límite es de 900 euros al mes: 10.800 euros al año en 12 pagas o 12.600 en 14."],
  faq: [
    {
      pregunta: "¿Cuánto es el IPREM en 2026?",
      respuesta: "{{es.iprem-mensual}} al mes. Al año, 7.200 euros en 12 pagas o 8.400 euros si la norma cuenta 14 pagas.",
    },
    {
      pregunta: "¿Cuándo se usa el IPREM con 12 o con 14 pagas?",
      respuesta: "Lo dice cada ayuda en sus bases. Revisa si habla del IPREM anual en 12 o en 14 pagas, porque la diferencia es de dos mensualidades.",
    },
    {
      pregunta: "¿En qué se diferencia del salario mínimo?",
      respuesta: "El salario mínimo es lo menos que se puede pagar por trabajar. El IPREM es solo una referencia para calcular ayudas y prestaciones, y es más bajo.",
    },
  ],
  glosario: [
    { termino: "IPREM", definicion: "Indicador Público de Renta de Efectos Múltiples, que fija cada año la Ley de Presupuestos." },
    { termino: "Prórroga presupuestaria", definicion: "Cuando no se aprueban nuevos Presupuestos, siguen vigentes los del último año aprobado." },
  ],
});
