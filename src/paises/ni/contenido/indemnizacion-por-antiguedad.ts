import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.indemnizacion-por-antiguedad",
  h1: "Calculadora de indemnización por antigüedad en Nicaragua",
  title: "Indemnización por antigüedad en Nicaragua (artículo 45)",
  description: "Calculá tu indemnización por antigüedad en Nicaragua: {{ni.indemnizacion-meses-por-anio}} de salario por año los tres primeros años y {{ni.indemnizacion-dias-desde-cuarto-anio}} desde el cuarto, hasta {{ni.indemnizacion-tope-meses}}.",
  intro: [
    "En Nicaragua la indemnización por antigüedad es {{ni.indemnizacion-meses-por-anio}} de salario por cada uno de los tres primeros años y {{ni.indemnizacion-dias-desde-cuarto-anio}} por cada año desde el cuarto. Nunca pasa de {{ni.indemnizacion-tope-meses}} de salario.",
    "La fija el artículo 45 del Código del Trabajo. Poné tus fechas, cómo terminó el contrato y tu salario. Te mostramos la antigüedad, los meses de salario que te tocan y el monto.",
  ],
  comoSeCalcula: [
    "Por cada uno de los tres primeros años te toca {{ni.indemnizacion-meses-por-anio}} de salario.",
    "Desde el cuarto año, {{ni.indemnizacion-dias-desde-cuarto-anio}} de salario por año.",
    "Las fracciones de año se pagan proporcionales.",
    "Nunca puede ser menos de {{ni.indemnizacion-minimo-meses}} ni más de {{ni.indemnizacion-tope-meses}} de salario.",
    "Se usa tu último salario ordinario. Si varía, el promedio de los últimos seis meses.",
  ],
  ejemplo: ["Con 5 años y un salario de C$15,000: 3 meses por los tres primeros años y 2 × 20 días por los otros dos. Son 4.33 meses, o sea C$65,000."],
  faq: [
    {
      pregunta: "¿Cómo se calcula la indemnización por antigüedad?",
      respuesta: "Sumás {{ni.indemnizacion-meses-por-anio}} de salario por cada uno de los tres primeros años y {{ni.indemnizacion-dias-desde-cuarto-anio}} por cada año siguiente, con las fracciones en proporción. El total no pasa de {{ni.indemnizacion-tope-meses}}.",
    },
    {
      pregunta: "¿Si renuncio me pagan antigüedad?",
      respuesta: "La ley dice que la renuncia o el mutuo acuerdo no te quitan lo ganado por antigüedad. Lo calculamos por el tiempo trabajado, sin el mínimo de un mes.",
    },
    {
      pregunta: "¿Cuánto es lo máximo que me pueden pagar?",
      respuesta: "{{ni.indemnizacion-tope-meses}} de salario. Se llega a ese tope a los seis años de trabajo.",
    },
    {
      pregunta: "¿Qué salario se usa?",
      respuesta: "Tu último salario ordinario. Si tu salario varía, el promedio de los últimos seis meses.",
    },
    {
      pregunta: "¿Y si me despiden con causa justificada?",
      respuesta: "Si el despido es por una de las causas del artículo 48 y lo autorizó el inspector del trabajo, no hay indemnización. Igual te pagan las vacaciones y el aguinaldo proporcionales.",
    },
    {
      pregunta: "¿La indemnización paga IR?",
      respuesta: "No. La indemnización que fija el Código del Trabajo está exenta del IR (Ley 822, artículo 19).",
    },
  ],
  glosario: [
    { termino: "Antigüedad", definicion: "El tiempo que trabajaste para el mismo empleador, contado desde tu fecha de ingreso." },
    { termino: "Causa justificada", definicion: "Una falta grave del trabajador de las que lista el artículo 48 del Código del Trabajo." },
  ],
});
