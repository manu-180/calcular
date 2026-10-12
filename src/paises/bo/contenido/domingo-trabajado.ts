import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.domingo-trabajado",
  h1: "Calculadora de domingo trabajado",
  title: "Domingo trabajado en Bolivia: calcule el pago triple",
  description: "Calcule cuánto le deben por trabajar un domingo. La Ley General del Trabajo manda pagarlo {{bo.domingo-trabajado-factor}} veces el salario del día.",
  intro: [
    "En Bolivia el trabajo en domingo está prohibido salvo en tareas que no se pueden suspender. Cuando se trabaja, la Ley General del Trabajo manda pagar ese día triple.",
    "Escriba su haber básico y cuántos domingos trabajó en el mes.",
  ],
  comoSeCalcula: [
    "El salario de un día es el haber básico dividido 30.",
    "El domingo trabajado vale {{bo.domingo-trabajado-factor}} veces ese salario.",
    "Su sueldo mensual ya paga el domingo una vez. Por eso, a su boleta se suma la diferencia: dos salarios diarios más por cada domingo.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga por trabajar un domingo?",
      respuesta: "El triple del salario de un día (artículo 55 de la Ley General del Trabajo).",
    },
    {
      pregunta: "¿Qué es el salario dominical?",
      respuesta: "Es otra cosa: el pago del domingo no trabajado a los obreros que cumplieron toda la semana. El domingo trabajado se paga triple.",
    },
    {
      pregunta: "¿Por qué dice que se suman dos días y no tres?",
      respuesta: "Porque el sueldo mensual ya incluye el domingo. Si a usted le pagan por día o por semana y el domingo no estaba en su paga, le corresponde el pago total que mostramos.",
    },
  ],
  glosario: [
    { termino: "Pago triple", definicion: "Tres veces el salario de un día por cada domingo trabajado." },
    { termino: "Salario dominical", definicion: "Pago del domingo no trabajado para obreros que cumplieron su horario semanal completo." },
  ],
});
