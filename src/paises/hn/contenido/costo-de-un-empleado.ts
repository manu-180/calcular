import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.costo-de-un-empleado",
  h1: "Cuánto cuesta un empleado en Honduras",
  title: "Costo de un empleado en Honduras: IHSS, RAP y décimos",
  description: "Calcule cuánto le cuesta al patrono un salario con el IHSS, el RAP, la Reserva Laboral y los décimos tercer y cuarto mes.",
  intro: ["Además del salario, el patrono paga cuotas al IHSS y al RAP, deposita la Reserva Laboral y provisiona los dos décimos."],
  comoSeCalcula: [
    "IHSS del patrono: {{hn.ihss-ivm[patrono]}} de IVM y {{hn.ihss-em[patrono]}} de Enfermedad y Maternidad, hasta el techo de {{hn.ihss-techo}}.",
    "RAP: {{hn.rap-aporte[patrono]}} sobre lo que pasa del techo. Reserva Laboral: {{hn.reserva-laboral-tasa}} del salario.",
    "Décimos: dos salarios al año, repartidos en 12 meses.",
  ],
  faq: [],
  glosario: [{ termino: "Costo laboral", definicion: "Todo lo que paga el patrono por un trabajador, además del salario." }],
});
