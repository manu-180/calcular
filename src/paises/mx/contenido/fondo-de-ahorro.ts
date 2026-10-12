import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.fondo-de-ahorro",
  h1: "Calculadora de fondo de ahorro 2026",
  title: "Fondo de ahorro 2026: tope exento y cuánto juntas",
  description:
    "Calcula cuánto juntas en tu fondo de ahorro y qué parte de lo que pone tu empresa no paga ISR, con los topes de {{mx.tope-fondo-ahorro-porcentaje}} y {{mx.tope-fondo-ahorro-uma}} anuales.",
  intro: [
    "En un fondo de ahorro tú y tu empresa aportan lo mismo cada quincena o cada mes, y al final del año te entregan todo junto.",
    "La aportación de tu empresa no paga ISR si no pasa del {{mx.tope-fondo-ahorro-porcentaje}} de tu salario ni de {{mx.tope-fondo-ahorro-uma}} anuales. Lo que pasa de ahí sí paga.",
  ],
  comoSeCalcula: [
    "Aportación de cada parte: tu sueldo por el porcentaje pactado.",
    "Tope exento al año: lo menor entre el {{mx.tope-fondo-ahorro-porcentaje}} de tu salario anual y {{mx.tope-fondo-ahorro-uma}} anuales (la UMA mensual de {{mx.uma-mensual}} por 12).",
    "La aportación de la empresa que pasa el tope se suma a tus ingresos gravados.",
  ],
  ejemplo: ["Con 20,000 pesos al mes y 13 %, tú y tu empresa ponen 2,600 cada uno al mes: 62,400 pesos al año, y la parte de tu empresa no paga ISR."],
  faq: [
    {
      pregunta: "¿Cuánto es lo máximo que puede aportar mi empresa al fondo de ahorro?",
      respuesta: "Puede aportar lo que quiera, pero solo es exento hasta el {{mx.tope-fondo-ahorro-porcentaje}} de tu salario y {{mx.tope-fondo-ahorro-uma}} anuales.",
    },
    {
      pregunta: "¿El fondo de ahorro integra al salario del IMSS?",
      respuesta: "No, si tú y tu empresa aportan lo mismo con la misma frecuencia y no lo retiras más de dos veces al año (Ley del Seguro Social, artículo 27).",
    },
    {
      pregunta: "¿Cuándo me lo entregan?",
      respuesta: "Normalmente una vez al año, en la fecha que fije tu empresa. Si dejas de trabajar ahí, te lo entregan en el finiquito.",
    },
  ],
  glosario: [{ termino: "Fondo de ahorro", definicion: "Prestación de previsión social en la que trabajador y empresa ahorran la misma cantidad." }],
});
