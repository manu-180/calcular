import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.preaviso",
  h1: "Calculadora de preaviso en Costa Rica",
  title: "Preaviso en Costa Rica: calcule días y monto",
  description:
    "Calcule cuántos días de preaviso corresponden según el artículo 28 del Código de Trabajo y cuánto se paga si no se dio.",
  intro: [
    "El preaviso es el aviso anticipado que debe dar quien termina un contrato por tiempo indefinido. Vale para el patrono y para la persona trabajadora.",
    "Si no se da el aviso, se paga en dinero el salario de esos días.",
  ],
  comoSeCalcula: [
    "De 3 a 6 meses de trabajo: {{cr.preaviso-dias[3-a-6-meses]}} (una semana).",
    "Más de 6 meses y hasta un año: {{cr.preaviso-dias[6-a-12-meses]}}.",
    "Más de un año: {{cr.preaviso-dias[mas-de-un-anio]}} (un mes).",
    "El monto es su salario promedio de los últimos seis meses, dividido entre {{cr.dias-mes-planilla}}, por esos días.",
  ],
  ejemplo: ["Con más de un año de trabajo y un salario promedio de ₡600.000, el preaviso es de un mes: ₡600.000."],
  faq: [
    {
      pregunta: "¿Durante el preaviso tengo días libres para buscar trabajo?",
      respuesta: "Sí. Mientras corre el preaviso que da el patrono, debe concederle un día libre por semana para buscar empleo.",
    },
    {
      pregunta: "¿Tengo que dar preaviso si renuncio?",
      respuesta: "Sí, con los mismos plazos. Si no lo da, el patrono puede rebajar ese monto de la liquidación.",
    },
    {
      pregunta: "¿Con menos de tres meses hay preaviso?",
      respuesta: "No. El artículo 28 empieza a contar a partir de tres meses de trabajo continuo.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "Aviso anticipado del fin del contrato, que se da por escrito." },
    { termino: "Contrato por tiempo indefinido", definicion: "El contrato sin fecha de finalización." },
  ],
});
