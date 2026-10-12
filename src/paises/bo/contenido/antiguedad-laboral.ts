import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.antiguedad-laboral",
  h1: "Calculadora de antigüedad laboral",
  title: "Antigüedad laboral en Bolivia: calcule años, meses y días",
  description: "Calcule su antigüedad en años, meses y días como el Ministerio de Trabajo, y vea su bono de antigüedad, sus días de vacación y sus quinquenios.",
  intro: [
    "Su antigüedad define el bono de antigüedad, los días de vacación, los quinquenios y la indemnización. Aquí la calcula con el mismo método que usa el Ministerio de Trabajo.",
    "Escriba su fecha de ingreso. Si quiere la antigüedad a otra fecha, cámbiela.",
  ],
  comoSeCalcula: [
    "Se cuentan los años completos, después los meses completos y por último los días, sin contar el día final.",
    "El bono de antigüedad sale de la escala del D.S. N° 21060 según los años cumplidos.",
    "Los días de vacación dependen del año de trabajo: de 1 a 5 años, {{bo.vacaciones-dias[hasta-5]}}; de 5 a 10, {{bo.vacaciones-dias[hasta-10]}}; desde 10, {{bo.vacaciones-dias[mas-10]}}.",
    "Cada {{bo.quinquenio-anios}} de trabajo continuo se consolida un quinquenio.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula la antigüedad laboral?",
      respuesta: "Desde la fecha de ingreso se cuentan años, meses y días completos hasta la fecha que elija. Es el método del ejercicio de beneficios sociales del Ministerio de Trabajo.",
    },
    {
      pregunta: "¿Desde cuándo cobro bono de antigüedad?",
      respuesta: "Cuando supera los dos años de trabajo continuo. Después sube por tramos según la escala del D.S. N° 21060: la calculadora le muestra su porcentaje.",
    },
    {
      pregunta: "¿Si cambio de empleador pierdo la antigüedad?",
      respuesta: "Sí, la antigüedad cuenta con el mismo empleador. Al irse, se la pagan en el finiquito con la indemnización por tiempo de servicios.",
    },
  ],
  glosario: [
    { termino: "Antigüedad", definicion: "El tiempo de trabajo continuo con el mismo empleador." },
    { termino: "Quinquenio", definicion: "Cada {{bo.quinquenio-anios}} de trabajo continuo, que se pueden cobrar por adelantado." },
  ],
});
