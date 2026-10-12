import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.jubilacion-patronal",
  h1: "Calculadora de jubilación patronal en Ecuador",
  title: "Jubilación patronal Ecuador: cuánto te corresponde",
  description: "Si trabajaste {{ec.jubilacion-patronal-anios}} o más con el mismo empleador, calcula tu haber de jubilación patronal, el mínimo del fondo global y los topes de la pensión.",
  intro: [
    "La jubilación patronal la paga tu empleador, aparte de la del IESS, si trabajaste con él {{ec.jubilacion-patronal-anios}} o más, seguidos o no.",
    "Puedes cobrarla como pensión mensual o pedir un fondo global de una sola vez. Te mostramos los valores que fija el Código del Trabajo.",
  ],
  comoSeCalcula: [
    "El haber individual es el {{ec.jubilacion-patronal-haber}} de tu remuneración anual promedio de los últimos cinco años, por cada año de servicio.",
    "Si pides el fondo global, no puede ser menor al {{ec.jubilacion-patronal-global}} del salario básico de tu puesto por cada año de servicio.",
    "La pensión mensual no puede ser menor a {{ec.jubilacion-patronal-minima}} (o {{ec.jubilacion-patronal-minima-doble}} si también tienes jubilación del IESS) ni mayor a un salario básico.",
    "La pensión exacta sale de dividir el haber para un coeficiente actuarial según tu edad.",
  ],
  ejemplo: ["Con 25 años de servicio y un promedio de $12.000 al año, el haber es $15.000. El fondo global no puede bajar de $6.025."],
  faq: [
    {
      pregunta: "¿Quién tiene derecho a la jubilación patronal?",
      respuesta: "Quien trabajó {{ec.jubilacion-patronal-anios}} o más para el mismo empleador, de forma continua o con interrupciones.",
    },
    {
      pregunta: "¿Puedo cobrar la jubilación patronal y la del IESS?",
      respuesta: "Sí. Son dos jubilaciones distintas. En ese caso, la pensión patronal mínima es de {{ec.jubilacion-patronal-minima-doble}} al mes.",
    },
    {
      pregunta: "¿Qué pasa si me despiden antes de los 25 años?",
      respuesta: "Si tenías entre 20 y 25 años de servicio, además de la indemnización por despido cobras la parte proporcional de la jubilación patronal.",
    },
    {
      pregunta: "¿Cómo cobro el fondo global?",
      respuesta: "Con un acuerdo con tu empleador firmado ante notario o una autoridad judicial o administrativa. Con eso se extingue la obligación.",
    },
  ],
  glosario: [
    { termino: "Haber individual", definicion: "El capital que sirve de base para calcular tu jubilación patronal." },
    { termino: "Fondo global", definicion: "La jubilación patronal cobrada en un solo pago, en lugar de una pensión mensual." },
  ],
});
