import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.costo-patronal",
  h1: "Calculadora del costo de un trabajador en Guatemala",
  title: "Costo patronal en Guatemala: cuánto cuesta un empleado",
  description:
    "Calcule cuánto le cuesta al mes un trabajador: salario, bonificación, cuotas del IGSS, IRTRA, INTECAP y lo que conviene apartar para prestaciones.",
  intro: [
    "Contratar a alguien cuesta más que su salario. Además de la bonificación incentivo, el patrono paga cuotas al IGSS, al IRTRA y al INTECAP, y tiene que reservar dinero para el aguinaldo, el Bono 14, las vacaciones y una posible indemnización.",
    "Escriba el salario mensual y le mostramos el costo total del mes y cuánto representa por encima del salario.",
  ],
  comoSeCalcula: [
    "Cuota patronal del IGSS: salario × ({{gt.igss-patronal-ivs}} de IVS + {{gt.igss-patronal-ema}} de enfermedad, maternidad y accidentes).",
    "IRTRA: salario × {{gt.irtra}}. INTECAP: salario × {{gt.intecap}}.",
    "Aguinaldo y Bono 14: un salario por año cada uno, o sea un doceavo del salario por mes.",
    "Vacaciones: {{gt.vacaciones-dias-habiles}} de salario por año, divididos entre 12.",
    "Indemnización: un salario por año más la parte del aguinaldo y del Bono 14, dividido entre 12.",
  ],
  ejemplo: [
    "Con un salario de Q10,000 sin bonificación ni reserva de indemnización, el costo del mes es de Q13,350.33: un 33.5 % por encima del salario.",
  ],
  faq: [
    {
      pregunta: "¿La bonificación incentivo paga cuotas del IGSS?",
      respuesta: "No. La bonificación incentivo de {{gt.bonificacion-incentivo}} no paga IGSS, IRTRA ni INTECAP. Las cuotas se calculan solo sobre el salario.",
    },
    {
      pregunta: "¿Cuánto paga el patrono al IGSS?",
      respuesta: "La cuota patronal es la suma de {{gt.igss-patronal-ivs}} y {{gt.igss-patronal-ema}} del salario. Aparte paga {{gt.irtra}} al IRTRA y {{gt.intecap}} al INTECAP.",
    },
    {
      pregunta: "¿Por qué se aparta dinero para la indemnización?",
      respuesta: "Si despide sin causa justificada, tiene que pagar un salario por cada año trabajado. Apartar un doceavo cada mes evita que ese pago lo tome por sorpresa. Si el trabajador renuncia, esa reserva no se paga.",
    },
    {
      pregunta: "¿El costo cambia si el trabajador gana el salario mínimo?",
      respuesta: "La cuenta es la misma. Lo único que cambia es la base: nunca puede pagar menos que el salario mínimo de la actividad.",
    },
  ],
  glosario: [
    { termino: "IRTRA", definicion: "Instituto de Recreación de los Trabajadores. El patrono aporta un porcentaje del salario." },
    { termino: "INTECAP", definicion: "Instituto Técnico de Capacitación y Productividad. También lo financia el patrono con un porcentaje del salario." },
  ],
});
