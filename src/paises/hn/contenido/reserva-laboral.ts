import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.reserva-laboral",
  h1: "Calculadora de la Reserva Laboral del RAP en Honduras",
  title: "Reserva Laboral del RAP: cuánto aporta el patrono",
  description: "Calcule el aporte mensual del {{hn.reserva-laboral-tasa}} que el patrono deposita en el RAP a su nombre para la cesantía, con un techo de {{hn.reserva-laboral-techo-salarios}} salarios mínimos.",
  intro: [
    "La Reserva Laboral de Capitalización Individual es una cuenta a su nombre en el RAP. El patrono deposita cada mes el {{hn.reserva-laboral-tasa}} de su salario ordinario.",
    "Ese dinero sirve para pagar su cesantía o una prima de antigüedad cuando termine el trabajo.",
  ],
  comoSeCalcula: [
    "Techo = {{hn.reserva-laboral-techo-salarios}} veces el salario mínimo más alto de la tabla vigente.",
    "Aporte mensual = el menor entre su salario y el techo × {{hn.reserva-laboral-tasa}}.",
    "Acumulado = aporte mensual × meses, sin contar la rentabilidad.",
  ],
  ejemplo: ["Gana L15,000. Su patrono deposita L600 por mes en el RAP: L7,200 en un año."],
  faq: [
    {
      pregunta: "¿Qué pasa con la reserva si me despiden?",
      respuesta: "Lo acumulado se descuenta de la cesantía que le debe el patrono. Si la reserva es mayor que la cesantía, la diferencia también es suya.",
    },
    {
      pregunta: "¿Y si renuncio?",
      respuesta: "Recibe el saldo como prima de antigüedad. Si tiene los años que dan derecho a cesantía por renuncia y el saldo no alcanza esa parte, el patrono completa la diferencia.",
    },
    {
      pregunta: "¿Me descuentan este aporte del salario?",
      respuesta: "No. Lo paga el patrono. Lo que sí se le descuenta es su aporte al RAP sobre lo que pasa del techo del IHSS.",
    },
    {
      pregunta: "¿Todos los trabajadores tienen reserva laboral?",
      respuesta: "No la tienen quienes cotizan al INJUPEMP, INPREMA, IPM o INPREUNAH, ni los patronos que ya pagan la cesantía cada año por acuerdo.",
    },
  ],
  glosario: [
    { termino: "RAP", definicion: "El Régimen de Aportaciones Privadas, que administra cuentas individuales de ahorro de los trabajadores." },
    { termino: "Prima de antigüedad", definicion: "El pago del saldo de la reserva cuando el trabajo termina por una causa distinta al despido injustificado." },
  ],
});
