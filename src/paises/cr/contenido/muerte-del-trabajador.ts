import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.muerte-del-trabajador",
  h1: "Prestaciones por muerte del trabajador",
  title: "Prestaciones por fallecimiento del trabajador en Costa Rica",
  description:
    "Calcule lo que el patrono debe pagar a la familia cuando muere una persona trabajadora: cesantía, vacaciones y aguinaldo proporcional.",
  intro: [
    "Cuando muere una persona trabajadora, el contrato termina sin responsabilidad para ella y sus derechos pasan a su familia. El patrono debe pagar la cesantía, las vacaciones pendientes y el aguinaldo proporcional.",
    "Escriba el salario promedio y las fechas para ver el monto.",
  ],
  comoSeCalcula: [
    "Salario diario: el promedio de los últimos seis meses entre {{cr.dias-mes-planilla}}.",
    "Cesantía: los días de la tabla del artículo 29 según la antigüedad, con un máximo de {{cr.cesantia-tope-anios}}.",
    "Vacaciones: el salario diario por los días que no disfrutó.",
    "Aguinaldo: los salarios desde el 1 de diciembre entre 12.",
  ],
  ejemplo: ["Con un salario de ₡900.000 y diez años y medio de trabajo, la familia recibe ₡5.160.000 de cesantía y ₡525.000 de aguinaldo."],
  faq: [
    {
      pregunta: "¿Quién cobra las prestaciones de una persona fallecida?",
      respuesta: "Primero el cónyuge y los hijos menores de edad o con discapacidad. Si no hay, los hijos mayores y los padres, incluidos los de crianza. Después, los demás herederos.",
    },
    {
      pregunta: "¿Hace falta un juicio sucesorio?",
      respuesta: "No. Se reclaman ante el juzgado de trabajo, que entrega el dinero a quienes tienen derecho, sin juicio sucesorio ni impuestos.",
    },
    {
      pregunta: "¿Se paga preaviso?",
      respuesta: "No. El preaviso es un aviso anticipado y no aplica en caso de fallecimiento.",
    },
  ],
  glosario: [
    { termino: "Causahabientes", definicion: "Las personas que reciben los derechos de quien falleció." },
    { termino: "Cesantía", definicion: "Indemnización por los años trabajados, según la tabla del artículo 29." },
  ],
});
