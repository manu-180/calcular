import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.estabilidad-laboral",
  h1: "Calculadora de estabilidad laboral",
  title: "Estabilidad laboral Paraguay: 10 años e indemnización doble",
  description: "Calculá cuándo cumplís {{py.estabilidad-anios}} en la empresa y cuánto sería la indemnización doble del trabajador estable. Según el Código del Trabajo.",
  intro: [
    "Con {{py.estabilidad-anios}} seguidos con el mismo empleador ganás estabilidad. Desde ahí solo te pueden despedir por una causa justa probada ante el juez.",
    "Si el juez ordena reintegrarte y no es posible, o si cierra el lugar donde trabajás, la indemnización se multiplica por {{py.estabilidad-factor}}.",
  ],
  comoSeCalcula: [
    "La estabilidad se gana al cumplir {{py.estabilidad-anios}} de servicio continuo.",
    "La indemnización normal es de {{py.indemnizacion-dias-por-anio}} de salario por año trabajado o fracción de más de seis meses.",
    "El salario diario es el promedio de los últimos seis meses dividido {{py.divisor-salario-diario}}.",
    "Para el trabajador estable se paga {{py.estabilidad-factor}} veces ese monto.",
  ],
  ejemplo: ["Con doce años y siete meses en la empresa y Gs. 6.000.000 de salario, la indemnización es de Gs. 39.000.000 y la doble, de Gs. 78.000.000."],
  faq: [
    {
      pregunta: "¿Cuántos años necesito para tener estabilidad laboral?",
      respuesta: "{{py.estabilidad-anios}} seguidos con el mismo empleador. Vacaciones, licencias y reposos no cortan la continuidad.",
    },
    {
      pregunta: "¿Me pueden despedir antes de cumplir los 10 años para evitar la estabilidad?",
      respuesta: "Si te despiden en los seis meses anteriores con ese fin, es abuso de derecho y el juez puede ordenar que te repongan.",
    },
    {
      pregunta: "¿Cuándo se paga la indemnización doble?",
      respuesta: "Cuando el juez ordena tu reintegro y no es posible, cuando preferís la indemnización en vez de volver, o cuando cierra la empresa o el local donde trabajás.",
    },
    {
      pregunta: "¿Qué pasa si renuncio teniendo estabilidad?",
      respuesta: "Si te vas sin causa justificada perdés la indemnización, y la ley te obliga a pagarle al empleador una suma igual a la indemnización por despido.",
    },
  ],
  glosario: [
    { termino: "Estabilidad", definicion: "La protección contra el despido sin causa que da el artículo 94 del Código del Trabajo." },
    { termino: "Reintegro", definicion: "Volver al puesto de trabajo por orden del juez." },
  ],
});
