import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.empleada-domestica",
  h1: "Calculadora de empleada doméstica: salario, aportes y prestaciones",
  title: "Empleada doméstica 2026: cuánto pagar y aportes",
  description:
    "Calcula lo que recibe una empleada doméstica y cuánto te cuesta al mes: salud, pensión, ARL, caja de compensación, prima, cesantías y vacaciones.",
  intro: [
    "Si contratas a una trabajadora del servicio doméstico por el mes completo, aquí ves cuánto recibe y cuánto te cuesta de verdad, con aportes y prestaciones.",
    "Por un mes completo no puede ganar menos de un salario mínimo: {{co.smmlv}}. Si gana hasta dos salarios mínimos, le pagas además el auxilio de transporte de {{co.auxilio-transporte}}.",
  ],
  comoSeCalcula: [
    "A ella se le descuenta {{co.salud-trabajador}} para salud y su parte de la pensión.",
    "Tú pagas salud ({{co.salud-empleador}}), la parte de la pensión del empleador, riesgos laborales clase I ({{co.arl[i]}}) y caja de compensación ({{co.parafiscales[caja]}}). Todo sobre un ingreso base que no baja de un salario mínimo.",
    "Si tienes dos o más trabajadores y ella gana menos de {{co.exoneracion-tope}}, no pagas la salud del empleador.",
    "Cada mes se van causando las prestaciones: prima de servicios ({{co.prima-dias}} de salario por año), cesantías (un mes por año), intereses a las cesantías ({{co.intereses-cesantias}} al año) y vacaciones ({{co.vacaciones-dias}} hábiles por año). La prima y las cesantías incluyen el auxilio de transporte.",
  ],
  ejemplo: [
    "Con el salario mínimo de 2026 y auxilio de transporte, ella recibe 1.859.928 pesos al mes. A ti te cuesta 2.864.400 pesos, contando aportes y prestaciones.",
  ],
  faq: [
    {
      pregunta: "¿Una empleada doméstica tiene derecho a prima?",
      respuesta: "Sí. Desde la Ley 1788 de 2016 el servicio doméstico recibe prima de servicios: la mitad hasta el 30 de junio y la otra mitad en los primeros 20 días de diciembre.",
    },
    {
      pregunta: "¿Tengo que afiliarla a una caja de compensación?",
      respuesta: "Sí. Quien contrata servicio doméstico debe afiliarse a una caja de compensación familiar y afiliarla a ella. Se paga por la PILA junto con salud, pensión y riesgos laborales.",
    },
    {
      pregunta: "¿Y si trabaja solo unos días a la semana?",
      respuesta: "Entonces los aportes se pagan por semanas cotizadas, con reglas propias. Esta calculadora es para el mes completo.",
    },
    {
      pregunta: "¿Qué es el valor de las prestaciones del mes?",
      respuesta: "Es lo que conviene apartar cada mes para pagar la prima, las cesantías, sus intereses y las vacaciones cuando llegue el momento.",
    },
  ],
  glosario: [
    { termino: "PILA", definicion: "Planilla Integrada de Liquidación de Aportes. Por ahí se pagan salud, pensión, ARL y caja cada mes." },
    { termino: "ARL", definicion: "Administradora de riesgos laborales. Cubre los accidentes y enfermedades del trabajo." },
    { termino: "Cesantías", definicion: "Un mes de salario por cada año trabajado, que se consigna en un fondo de cesantías." },
  ],
});
