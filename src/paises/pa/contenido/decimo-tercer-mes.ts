import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.decimo-tercer-mes",
  h1: "Calculadora del décimo tercer mes en Panamá",
  title: "Décimo tercer mes en Panamá 2026: calcula tu partida",
  description:
    "Calcula tu décimo tercer mes de abril, agosto o diciembre: lo ganado en la partida entre {{pa.decimo-divisor}}, menos el {{pa.css-decimo-trabajador}} de la CSS. Gratis y al instante.",
  intro: [
    "El décimo tercer mes en Panamá es lo que ganaste en la partida de cuatro meses dividido entre {{pa.decimo-divisor}}, menos el {{pa.css-decimo-trabajador}} de Seguro Social. Se paga el 15 de abril, el 15 de agosto y el 15 de diciembre.",
    "Le toca a todo trabajador y en la calle se le dice «el décimo». Escribe lo que ganaste en la partida y te mostramos cuánto recibes.",
  ],
  comoSeCalcula: [
    "Suma todo lo que ganaste en la partida: salario, horas extra, comisiones, vacaciones y permisos pagados.",
    "Divide ese total entre {{pa.decimo-divisor}}. Ese es tu décimo tercer mes bruto.",
    "Réstale el {{pa.css-decimo-trabajador}} de Seguro Social. El décimo no lleva seguro educativo.",
    "Primera partida: del 16 de diciembre al 15 de abril. Segunda: del 16 de abril al 15 de agosto. Tercera: del 16 de agosto al 15 de diciembre.",
  ],
  ejemplo: [
    "Si ganas B/. 900 al mes y trabajaste los cuatro meses completos, sumas B/. 3,600. Dividido entre 12 son B/. 300 de décimo. Con el descuento de la CSS recibes B/. 278.25.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el décimo tercer mes en Panamá?",
      respuesta: "Sumas lo que ganaste en los cuatro meses de la partida y lo divides entre {{pa.decimo-divisor}}. A ese monto le restas el {{pa.css-decimo-trabajador}} de Seguro Social y eso es lo que recibes.",
    },
    {
      pregunta: "¿Cuándo se paga el décimo tercer mes?",
      respuesta: "El 15 de abril, el 15 de agosto y el 15 de diciembre. Cada pago cubre los cuatro meses anteriores.",
    },
    {
      pregunta: "¿Cuánto me descuentan del décimo?",
      respuesta: "El {{pa.css-decimo-trabajador}} de Seguro Social. Si tu salario del año pasa el monto exento, también te retienen impuesto sobre la renta.",
    },
    {
      pregunta: "¿Si entré a trabajar a mitad del período me toca décimo?",
      respuesta: "Sí, en proporción. Sumas solo lo que ganaste desde que entraste y lo divides entre {{pa.decimo-divisor}}.",
    },
    {
      pregunta: "¿Si me voy de la empresa pierdo el décimo?",
      respuesta: "No. Te lo pagan en la liquidación, proporcional a lo que ganaste desde el inicio de la partida en curso.",
    },
    {
      pregunta: "¿El décimo tercer mes paga seguro educativo?",
      respuesta: "No. Solo lleva el descuento de Seguro Social y, si corresponde, el impuesto sobre la renta.",
    },
  ],
  glosario: [
    { termino: "Partida", definicion: "Cada uno de los tres pagos del décimo en el año." },
    { termino: "Salario devengado", definicion: "Todo lo que ganaste en el período, aunque te lo paguen después." },
  ],
});
