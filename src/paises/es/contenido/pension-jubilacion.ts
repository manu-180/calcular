import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.jubilacion",
  h1: "Calculadora de la pensión de jubilación",
  title: "Pensión de jubilación {{anio}}: porcentaje y cuantía",
  description:
    "Calcula tu pensión de jubilación según tu base reguladora y los años cotizados: porcentaje, edad ordinaria en {{anio}} y tope de la pensión máxima.",
  intro: [
    "La pensión de jubilación contributiva se calcula en dos pasos: tu base reguladora (la media de lo que cotizaste) y un porcentaje que depende de los años cotizados.",
    "Esta calculadora aplica los porcentajes que rigen de 2023 a 2026 y el tope de la pensión máxima de 2026.",
  ],
  comoSeCalcula: [
    "Con {{es.jubilacion-porcentajes[anios-base]}} años cotizados te corresponde el {{es.jubilacion-porcentajes[base]}} % de la base reguladora.",
    "Cada mes adicional suma: los primeros {{es.jubilacion-porcentajes[meses-1]}} meses, un {{es.jubilacion-porcentajes[coeficiente-1]}} % cada uno, y los {{es.jubilacion-porcentajes[meses-2]}} siguientes, un {{es.jubilacion-porcentajes[coeficiente-2]}} %. Así se llega al 100 % con 36 años y 6 meses.",
    "La pensión es la base reguladora por ese porcentaje, con un máximo de {{es.pension-maxima}} al mes en 14 pagas.",
    "La edad ordinaria en 2026 es de 65 años si tienes al menos 38 años y 3 meses cotizados. Si no, 66 años y 10 meses.",
  ],
  ejemplo: ["Con una base reguladora de 1.500 euros y 25 años cotizados te corresponde el 73,78 %: una pensión de 1.106,70 euros al mes en 14 pagas."],
  faq: [
    {
      pregunta: "¿Cuántos años hay que cotizar para cobrar la jubilación?",
      respuesta: "Al menos 15 años, y dos de ellos dentro de los últimos 15. Para el 100 % de la base reguladora hacen falta 36 años y 6 meses.",
    },
    {
      pregunta: "¿Cuál es la pensión máxima en 2026?",
      respuesta: "{{es.pension-maxima}} al mes en 14 pagas.",
    },
    {
      pregunta: "¿Cómo sé mi base reguladora?",
      respuesta: "Puedes pedir un informe de tu vida laboral y de tus bases de cotización en la sede electrónica de la Seguridad Social, que también tiene un simulador de jubilación.",
    },
    {
      pregunta: "¿Y si mi pensión sale muy baja?",
      respuesta: "Si no llegas a la pensión mínima y tus ingresos no superan cierto límite, la Seguridad Social te paga un complemento a mínimos.",
    },
  ],
  glosario: [
    { termino: "Base reguladora", definicion: "Media de tus bases de cotización de los años anteriores a la jubilación, actualizadas con el IPC." },
    { termino: "Jubilación ordinaria", definicion: "La que se cobra al llegar a la edad legal, sin reducción por adelantarla." },
    { termino: "Complemento a mínimos", definicion: "Cantidad que se suma a las pensiones bajas para llegar a la mínima, si no se superan ciertos ingresos." },
  ],
});
