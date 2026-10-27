import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.regalia-pascual",
  h1: "Calculadora de regalía pascual {{anio}}",
  title: "Regalía pascual {{anio}}: calcula tu salario de Navidad",
  description:
    "Calcula tu regalía pascual o doble sueldo: lo que ganaste en el año entre 12, con el tope de {{do.tope-regalia}} salarios mínimos. También si entraste o saliste este año.",
  intro: [
    "La regalía pascual es lo que ganaste de salario ordinario en el año dividido entre 12. Te la tienen que pagar a más tardar el 20 de diciembre.",
    "En el Código de Trabajo se llama salario de Navidad, y mucha gente le dice doble sueldo. Te toca aunque no hayas trabajado el año completo o ya hayas salido de la empresa. En ese caso cobras la parte proporcional.",
  ],
  comoSeCalcula: [
    "Se suma el salario ordinario que ganaste en el año, de enero a diciembre.",
    "Ese total se divide entre 12. El resultado es tu regalía.",
    "Las horas extra y la bonificación no cuentan para esta suma.",
    "La regalía no puede pasar de {{do.tope-regalia}} salarios mínimos. En una empresa grande hoy son {{do.salario-minimo[grande]}} por mes.",
    "Si entraste o saliste durante el año, se cuentan solo los meses y días que trabajaste.",
  ],
  ejemplo: [
    "Si ganas RD$30,000 al mes y trabajaste todo 2026, tu regalía es RD$30,000. Si entraste el 16 de julio con RD$25,000, trabajaste 5 meses y 16 días, así que te tocan RD$11,527.78.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula la regalía pascual?",
      respuesta: "Sumas el salario ordinario que ganaste en el año y lo divides entre 12. Si trabajaste el año completo con el mismo salario, tu regalía es un mes de sueldo.",
    },
    {
      pregunta: "¿Cuándo tienen que pagarme la regalía?",
      respuesta: "A más tardar el 20 de diciembre. Si saliste de la empresa antes, igual te la deben en proporción al tiempo trabajado.",
    },
    {
      pregunta: "¿La regalía paga ISR?",
      respuesta: "No. El Código de Trabajo la deja fuera del impuesto sobre la renta, aunque pase el tope legal.",
    },
    {
      pregunta: "¿Las horas extra cuentan para la regalía?",
      respuesta: "No. Solo cuenta el salario ordinario. Las horas extra y la bonificación quedan afuera.",
    },
    {
      pregunta: "¿Cuál es el tope de la regalía?",
      respuesta: "{{do.tope-regalia}} salarios mínimos. El Código no dice cuál salario mínimo se toma; aquí usamos el del tamaño de tu empresa. Tu empresa puede pagarte más si quiere.",
    },
    {
      pregunta: "¿Qué pasa si me despidieron en octubre?",
      respuesta: "Te toca la regalía de enero a octubre. Pon la fecha de salida y el cálculo te da esa parte.",
    },
  ],
  glosario: [
    { termino: "Regalía pascual", definicion: "Nombre común del salario de Navidad: la doceava parte de lo que ganaste en el año." },
    { termino: "Salario ordinario", definicion: "Lo que te pagan por tu jornada normal, sin horas extra ni bonificación." },
    { termino: "Proporcional", definicion: "La parte que corresponde al tiempo que de verdad trabajaste." },
  ],
});
