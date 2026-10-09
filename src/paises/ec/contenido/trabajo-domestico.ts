import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.trabajo-domestico",
  h1: "Calculadora de trabajo doméstico: sueldo, IESS y décimos",
  title: "Trabajadora del hogar en Ecuador: sueldo, IESS y décimos",
  description:
    "Calcula el sueldo de una trabajadora remunerada del hogar con el SBU de {{ec.sbu}}: aportes al IESS, décimos, fondos de reserva y costo mensual.",
  intro: [
    "Si contratas a una trabajadora remunerada del hogar, acá ves cuánto recibe en el mes, cuánto pagas al IESS y cuánto te cuesta en total con los décimos y los fondos de reserva.",
    "Tiene los mismos derechos que cualquier trabajador: el salario básico unificado, afiliación al IESS desde el primer día, décimo tercero, décimo cuarto, fondos de reserva y vacaciones.",
  ],
  comoSeCalcula: [
    "El mínimo es el salario básico unificado ({{ec.sbu}}) por 40 horas semanales. Si trabaja menos horas, se paga en proporción.",
    "Del sueldo se descuenta el aporte personal al IESS ({{ec.aporte-personal-iess}}). Tú pagas además el aporte patronal ({{ec.aporte-patronal-iess}}).",
    "El décimo tercero es la doceava parte de lo que gana en el año. El décimo cuarto es un salario básico por año, en proporción a la jornada.",
    "Desde el segundo año contigo le corresponden fondos de reserva: {{ec.fondo-reserva}} del sueldo cada mes.",
  ],
  ejemplo: [
    "Jornada completa con el básico de USD 482, más de un año y décimos cada mes: recibe USD 556,94 y te cuesta USD 656,23 por mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el sueldo mínimo de una trabajadora del hogar?",
      respuesta: "El salario básico unificado: {{ec.sbu}} por mes desde el {{ec.sbu#desde}}, por jornada completa. El acuerdo del Ministerio del Trabajo la incluye expresamente.",
    },
    {
      pregunta: "¿Hay que afiliarla al IESS?",
      respuesta: "Sí, desde el primer día de trabajo, aunque sea a medio tiempo. Se aporta sobre el sueldo que cobra.",
    },
    {
      pregunta: "¿Puedo pagarle los décimos cada mes?",
      respuesta: "Sí, si ella lo pide. Si no, el décimo tercero se paga hasta el 24 de diciembre y el décimo cuarto en marzo en la Costa y Galápagos o en agosto en la Sierra y la Amazonía.",
    },
    {
      pregunta: "¿Desde cuándo se pagan los fondos de reserva?",
      respuesta: "Desde que cumple un año de trabajo contigo. Se pagan cada mes en el rol o se depositan en el IESS si ella lo pide.",
    },
    {
      pregunta: "¿Y las vacaciones?",
      respuesta: "Le corresponden vacaciones pagadas cada año, igual que a cualquier trabajador. Ya están dentro del sueldo mensual, así que no suman al costo de cada mes.",
    },
  ],
  glosario: [
    { termino: "SBU", definicion: "Salario básico unificado: el sueldo mínimo mensual por jornada completa." },
    { termino: "IESS", definicion: "Instituto Ecuatoriano de Seguridad Social." },
    { termino: "Décimos", definicion: "Décimo tercero y décimo cuarto: los dos sueldos adicionales que se pagan cada año." },
    { termino: "Fondos de reserva", definicion: "Pago adicional de {{ec.fondo-reserva}} del sueldo desde el segundo año con el mismo empleador." },
  ],
});
