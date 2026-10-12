import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.maternidad",
  h1: "Calculadora de licencia por maternidad en Costa Rica",
  title: "Licencia de maternidad Costa Rica: fechas y cuánto le pagan",
  description:
    "Calcule las fechas de su licencia por maternidad (un mes antes y tres después del parto) y cuánto paga la CCSS y cuánto el patrono.",
  intro: [
    "La licencia por maternidad dura cuatro meses: uno antes del parto y tres después. Durante ese tiempo recibe su salario completo.",
    "La mitad la paga la Caja y la otra mitad el patrono. Escriba su salario y la fecha probable de parto para ver las fechas y los montos.",
  ],
  comoSeCalcula: [
    "Inicio: {{cr.maternidad-meses[antes]}} antes de la fecha probable de parto.",
    "Fin: {{cr.maternidad-meses[despues]}} después del parto.",
    "Monto: su salario promedio por cada mes de licencia. La CCSS paga {{cr.maternidad-parte-ccss}} y el patrono el resto.",
  ],
  ejemplo: ["Con un salario de ₡800.000 y parto el 15 de diciembre de 2026, la licencia va del 15 de noviembre al 14 de marzo. Recibe ₡3.200.000 en total."],
  faq: [
    {
      pregunta: "¿Cuánto dura la licencia por maternidad en Costa Rica?",
      respuesta: "Cuatro meses: {{cr.maternidad-meses[antes]}} antes del parto y {{cr.maternidad-meses[despues]}} después. Esos tres meses también cuentan como período mínimo de lactancia.",
    },
    {
      pregunta: "¿Quién paga la licencia?",
      respuesta: "La CCSS paga {{cr.maternidad-parte-ccss}} y el patrono la otra mitad. Entre los dos suman su salario completo.",
    },
    {
      pregunta: "¿Qué necesito para pedirla?",
      respuesta: "Un certificado médico que diga que el parto será probablemente dentro de las cinco semanas siguientes. Se lo entrega a su patrono.",
    },
    {
      pregunta: "¿Cuenta para el aguinaldo y las vacaciones?",
      respuesta: "Sí. La licencia no interrumpe el contrato y el patrono calcula sus derechos con el salario que tenía antes.",
    },
  ],
  glosario: [
    { termino: "Licencia por maternidad", definicion: "Permiso pagado por el parto, que la ley llama descanso pre y posnatal." },
    { termino: "Lactancia", definicion: "Período en que la madre tiene derecho a pausas pagadas para amamantar." },
  ],
});
