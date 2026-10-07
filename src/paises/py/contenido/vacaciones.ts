import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.vacaciones",
  h1: "Calculadora de vacaciones",
  title: "Vacaciones en Paraguay: cuántos días y cuánto cobrás",
  description: "Calculá cuántos días de vacaciones te tocan según tu antigüedad ({{py.vacaciones-dias[hasta-5]}}, {{py.vacaciones-dias[hasta-10]}} o {{py.vacaciones-dias[mas-10]}}) y cuánto te tienen que pagar.",
  intro: [
    "Después de cada año de trabajo con el mismo empleador tenés vacaciones pagas. Cuantos más años llevás, más días te tocan.",
    "Poné tu salario, tu fecha de ingreso y cuándo salís de vacaciones.",
  ],
  comoSeCalcula: [
    "Hasta cinco años de antigüedad te tocan {{py.vacaciones-dias[hasta-5]}} corridos.",
    "Con más de cinco y hasta diez años, {{py.vacaciones-dias[hasta-10]}}. Con más de diez, {{py.vacaciones-dias[mas-10]}}.",
    "Cada día se paga con tu salario mensual dividido {{py.divisor-salario-diario}}. Si tu salario es menor al mínimo, se usa el mínimo ({{py.salario-minimo}}).",
    "El pago se hace por adelantado, antes de que empiecen las vacaciones.",
  ],
  ejemplo: ["Con 6 años en la empresa y un salario de Gs. 4.500.000 te tocan {{py.vacaciones-dias[hasta-10]}}. Cada día vale Gs. 150.000, así que cobrás Gs. 2.700.000."],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me corresponden en Paraguay?",
      respuesta: "{{py.vacaciones-dias[hasta-5]}} hasta los cinco años de antigüedad, {{py.vacaciones-dias[hasta-10]}} hasta los diez y {{py.vacaciones-dias[mas-10]}} desde ahí.",
    },
    {
      pregunta: "¿Cuándo tienen que empezar las vacaciones?",
      respuesta: "Un lunes, o el día hábil siguiente si ese lunes es feriado. El empleador te avisa la fecha por escrito con 15 días de anticipación.",
    },
    {
      pregunta: "¿Puedo juntar las vacaciones de dos años?",
      respuesta: "Sí, si lo pedís vos y no perjudica a la empresa. Se pueden acumular hasta dos años.",
    },
    {
      pregunta: "¿Qué pasa si el empleador no me da las vacaciones a tiempo?",
      respuesta: "Tiene seis meses desde que las ganaste para dártelas. Si te las da después, te paga el doble, y además descansás.",
    },
  ],
  glosario: [
    { termino: "Días corridos", definicion: "Se cuentan todos los días seguidos, desde el primero de las vacaciones." },
    { termino: "Antigüedad", definicion: "El tiempo que llevás trabajando sin interrupción para el mismo empleador." },
  ],
});
