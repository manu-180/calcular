import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.indemnizacion-por-anos-de-servicio",
  h1: "Calculadora de indemnización por años de servicio",
  title: "Indemnización por años de servicio {{anio}}: calcúlala",
  description:
    "Calcula tu indemnización por años de servicio: {{cl.indemnizacion-dias-por-anio}} de remuneración por año, tope de {{cl.indemnizacion-tope-dias}} y base máxima de {{cl.tope-indemnizacion}}.",
  intro: [
    "Si te despiden por necesidades de la empresa (o por desahucio) y llevas al menos un año, te corresponde una indemnización de {{cl.indemnizacion-dias-por-anio}} de tu última remuneración por cada año trabajado.",
    "Ingresa tus fechas y tu última remuneración. Te mostramos la indemnización por años de servicio y, si no te avisaron con 30 días, la indemnización sustitutiva del aviso previo.",
  ],
  comoSeCalcula: [
    "Se cuentan los años completos de contrato. Una fracción de más de seis meses suma un año más.",
    "Cada año vale {{cl.indemnizacion-dias-por-anio}} de remuneración, con un tope de {{cl.indemnizacion-tope-dias}} (11 años).",
    "La remuneración que se usa tiene un tope de {{cl.tope-indemnizacion}}. Lo pasamos a pesos con la UF del día.",
    "Si no te avisaron con 30 días de anticipación, se suma una remuneración más (con el mismo tope).",
  ],
  ejemplo: [
    "Entraste el 1 de marzo de 2021 y te despidieron el 5 de octubre de 2026, con una remuneración de $1.200.000. Son 5 años y 7 meses: se pagan 6 años, es decir $7.200.000. Sin aviso previo se suman $1.200.000, en total $8.400.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo me corresponde indemnización por años de servicio?",
      respuesta: "Cuando el contrato termina por necesidades de la empresa o por desahucio del empleador y tienes un año o más de antigüedad. Si renuncias o te despiden por una causal de tu responsabilidad, no corresponde.",
    },
    {
      pregunta: "¿Qué pasa si trabajé más de 11 años?",
      respuesta: "La indemnización legal se paga hasta 11 años. Si tu contrato empezó antes del 14 de agosto de 1981, ese tope no se aplica.",
    },
    {
      pregunta: "¿Qué incluye la última remuneración?",
      respuesta: "Todo lo que recibes de forma fija cada mes: sueldo, colación, movilización y cotizaciones que paga el empleador por ti. Quedan fuera las horas extra y los bonos esporádicos.",
    },
    {
      pregunta: "¿La indemnización paga impuesto?",
      respuesta: "La indemnización legal por años de servicio y la del aviso previo no pagan impuesto ni cotizaciones.",
    },
    {
      pregunta: "¿Y si el despido fue injustificado?",
      respuesta: "Si un tribunal declara el despido injustificado, la indemnización por años de servicio sube con un recargo. Esta calculadora muestra el monto base, sin recargo.",
    },
  ],
  glosario: [
    { termino: "Indemnización por años de servicio", definicion: "Pago que recibes al ser despedido por necesidades de la empresa, según los años que trabajaste." },
    { termino: "Aviso previo", definicion: "Comunicación del despido con 30 días de anticipación. Si no se da, el empleador paga una remuneración más." },
    { termino: "UF", definicion: "Unidad de Fomento. Unidad que sube con la inflación y se usa para fijar topes legales." },
  ],
});
