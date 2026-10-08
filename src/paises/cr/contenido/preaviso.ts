import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.preaviso",
  h1: "Cálculo de preaviso en Costa Rica",
  title: "Preaviso en Costa Rica: cuántos días y cuánto se paga",
  description:
    "Calcule su preaviso según el artículo 28: {{cr.preaviso-dias[3-a-6-meses]}}, {{cr.preaviso-dias[6-a-12-meses]}} o {{cr.preaviso-dias[mas-de-un-anio]}} según su antigüedad, y cuánto se paga en dinero si no se dio. Para despido o renuncia.",
  intro: [
    "El preaviso en Costa Rica es de {{cr.preaviso-dias[3-a-6-meses]}} con 3 a 6 meses de trabajo, {{cr.preaviso-dias[6-a-12-meses]}} hasta un año y {{cr.preaviso-dias[mas-de-un-anio]}} con más de un año. Lo debe dar quien termina el contrato, sea el patrono o la persona trabajadora.",
    "Si no se da el aviso, se paga en dinero el salario de esos días. Escriba su salario promedio y su antigüedad para ver el monto.",
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
      pregunta: "¿Tengo que dar preaviso si renuncio?",
      respuesta: "Sí, con los mismos plazos. Si no lo da, el patrono puede rebajar ese monto de la liquidación.",
    },
    {
      pregunta: "¿Cuándo me pagan el preaviso en dinero?",
      respuesta: "Cuando el patrono termina el contrato sin avisarle con la anticipación de ley. Ahí le debe el salario de esos días.",
    },
    {
      pregunta: "¿Durante el preaviso tengo días libres para buscar trabajo?",
      respuesta: "Sí. Mientras corre el preaviso que da el patrono, debe concederle un día libre por semana para buscar empleo.",
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
