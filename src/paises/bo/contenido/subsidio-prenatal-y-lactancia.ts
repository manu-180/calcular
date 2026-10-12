import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.subsidio-prenatal-y-lactancia",
  h1: "Calculadora de subsidio prenatal, natalidad y lactancia",
  title: "Subsidio prenatal y de lactancia Bolivia: calcúlelo",
  description: "Calcule los subsidios que paga su empleador por embarazo y nacimiento: prenatal, natalidad y lactancia de {{bo.asignaciones-familiares[lactancia]}} cada uno.",
  intro: [
    "Las asignaciones familiares son subsidios que paga el empleador a la trabajadora asegurada (o a la esposa o conviviente del trabajador asegurado) por el embarazo y el nacimiento de cada hijo.",
    "Indique cuántos meses de embarazo cubre desde el quinto mes y cuántos hijos nacen.",
  ],
  comoSeCalcula: [
    "Subsidio prenatal: {{bo.asignaciones-familiares[prenatal]}} por mes desde el primer día del quinto mes de embarazo hasta el nacimiento.",
    "Subsidio de natalidad: un pago único de {{bo.asignaciones-familiares[natalidad]}} por cada hijo.",
    "Subsidio de lactancia: {{bo.asignaciones-familiares[lactancia]}} por mes durante el primer año de cada hijo.",
  ],
  faq: [
    {
      pregunta: "¿Quién paga el subsidio de lactancia?",
      respuesta: "El empleador, a su cargo y costo, sea del sector público o privado. La caja de salud autoriza el beneficio.",
    },
    {
      pregunta: "¿Me lo pueden pagar en dinero?",
      respuesta: "El de natalidad, sí: es un pago único en dinero. El prenatal y el de lactancia se entregan en productos alimenticios de origen nacional; el prenatal se paga en dinero solo de forma excepcional.",
    },
    {
      pregunta: "¿Cuánto es el subsidio de sepelio?",
      respuesta: "{{bo.asignaciones-familiares[sepelio]}}, un pago único por el fallecimiento de un hijo menor de 19 años. Se presenta el certificado de defunción.",
    },
  ],
  glosario: [
    { termino: "Asignaciones familiares", definicion: "Subsidios prenatal, de natalidad, de lactancia y de sepelio que paga el empleador." },
    { termino: "Subsidio de lactancia", definicion: "Productos alimenticios que recibe la madre cada mes durante el primer año del bebé." },
  ],
});
