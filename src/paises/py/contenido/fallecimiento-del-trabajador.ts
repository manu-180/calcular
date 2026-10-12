import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.fallecimiento-del-trabajador",
  h1: "Calculadora de indemnización por fallecimiento del trabajador",
  title: "Muerte del trabajador en Paraguay: qué cobra la familia",
  description: "Calculá lo que el empleador debe a los herederos si fallece un trabajador: el {{py.indemnizacion-fallecimiento}} de la indemnización, aguinaldo y vacaciones.",
  intro: [
    "Si una persona fallece mientras trabaja en relación de dependencia, su familia tiene derecho a cobrar del empleador una indemnización. Es el {{py.indemnizacion-fallecimiento}} de la que correspondería por un despido sin causa.",
    "Además se pagan el aguinaldo proporcional y las vacaciones que ganó y no tomó.",
  ],
  comoSeCalcula: [
    "Se cuentan los años trabajados. Una fracción de más de seis meses vale un año.",
    "La indemnización completa sería de {{py.indemnizacion-dias-por-anio}} de salario por año, con el promedio de los últimos seis meses dividido {{py.divisor-salario-diario}}.",
    "A los herederos les corresponde el {{py.indemnizacion-fallecimiento}} de ese monto.",
    "Se suman el aguinaldo proporcional y las vacaciones pendientes.",
  ],
  ejemplo: [
    "Con tres años y medio de trabajo y un salario promedio de Gs. 4.500.000, la indemnización para los herederos es de Gs. 3.375.000, más el aguinaldo proporcional.",
  ],
  faq: [
    {
      pregunta: "¿Quiénes cobran la indemnización por fallecimiento?",
      respuesta: "Los herederos, que solo tienen que acreditar el vínculo. La pareja que vivió públicamente con la persona al menos dos años cuenta como viuda o viudo.",
    },
    {
      pregunta: "¿Cuánto es la indemnización por muerte del trabajador?",
      respuesta: "El {{py.indemnizacion-fallecimiento}} de la indemnización por despido: {{py.indemnizacion-dias-por-anio}} de salario por año trabajado, a la mitad.",
    },
    {
      pregunta: "¿El IPS paga algo aparte?",
      respuesta: "Sí, según los aportes. Puede haber una pensión para la familia o un subsidio por fallecimiento. Eso se tramita en el IPS.",
    },
  ],
  glosario: [
    { termino: "Herederos", definicion: "Las personas con derecho a recibir lo que dejó quien falleció." },
    { termino: "Artículo 91", definicion: "El artículo del Código del Trabajo que fija la indemnización por despido y por fallecimiento." },
  ],
});
