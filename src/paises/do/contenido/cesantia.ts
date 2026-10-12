import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.cesantia",
  h1: "Calculadora de auxilio de cesantía en República Dominicana",
  title: "Cesantía en RD 2026: calcula tu auxilio de cesantía",
  description: "Calcula tu auxilio de cesantía según tus años de trabajo y tu salario promedio, con la tabla del artículo 80 del Código de Trabajo dominicano.",
  intro: [
    "El auxilio de cesantía es el pago que te toca cuando el empleador termina tu contrato sin causa justa. Se cuenta en días de salario según el tiempo que trabajaste.",
    "Pon tu fecha de entrada, tu último día y tu salario promedio. Ves los días de cesantía y el monto.",
  ],
  comoSeCalcula: [
    "Tu salario diario es el promedio mensual del último año dividido entre {{do.divisor-salario-diario}}.",
    "De 3 a 6 meses de trabajo te tocan {{do.cesantia-dias[tres-a-seis-meses]}}. De 6 meses a un año, {{do.cesantia-dias[seis-a-doce-meses]}}.",
    "Desde el primer año son {{do.cesantia-dias[uno-a-cinco-anios]}} por cada año. Con 5 años o más, {{do.cesantia-dias[cinco-anios-o-mas]}} por cada año.",
    "Si el último año pasa de 3 meses, esa fracción suma los días del primer tramo que le corresponda.",
  ],
  ejemplo: [
    "Si trabajaste del 1 de marzo de 2021 al 30 de septiembre de 2026 con un promedio de RD$40,000 al mes, te tocan 128 días de cesantía: RD$214,855.68.",
  ],
  faq: [
    { pregunta: "¿Cuántos días de cesantía me tocan por año?", respuesta: "{{do.cesantia-dias[uno-a-cinco-anios]}} por año si trabajaste de 1 a 5 años, y {{do.cesantia-dias[cinco-anios-o-mas]}} por año si trabajaste 5 años o más." },
    { pregunta: "¿Me toca cesantía si renuncio?", respuesta: "No. La cesantía se paga cuando el empleador te desahucia o te despide sin causa justa, o cuando dimites por una falta del empleador y el tribunal te da la razón." },
    { pregunta: "¿La cesantía paga ISR?", respuesta: "No. El preaviso, la cesantía y la asistencia económica no pagan impuesto sobre la renta." },
    { pregunta: "¿Qué salario se usa para la cesantía?", respuesta: "El promedio de lo que ganaste en el último año, solo con horas ordinarias. Las horas extra y la regalía no cuentan." },
  ],
  glosario: [
    { termino: "Auxilio de cesantía", definicion: "Pago por el tiempo trabajado cuando el empleador termina el contrato sin causa justa." },
    { termino: "Desahucio", definicion: "Terminar el contrato sin alegar una causa." },
    { termino: "Salario promedio", definicion: "Lo ganado en el último año dividido entre los meses trabajados." },
  ],
});
