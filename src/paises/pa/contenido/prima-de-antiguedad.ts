import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.prima-de-antiguedad",
  h1: "Calculadora de prima de antigüedad en Panamá",
  title: "Prima de antigüedad en Panamá: calcula cuánto te toca",
  description:
    "Calcula tu prima de antigüedad: una semana de salario por cada año trabajado, como manda el artículo 224 del Código de Trabajo, con la parte proporcional.",
  intro: [
    "Cuando termina un contrato por tiempo indefinido, el empleador te paga la prima de antigüedad. No importa si renunciaste o te despidieron.",
    "Te toca {{pa.prima-antiguedad-semanas}} semana de salario por cada año trabajado, y la parte proporcional del año incompleto.",
  ],
  comoSeCalcula: [
    "Se toma tu salario promedio de los últimos cinco años (artículo 226).",
    "El salario semanal es ese promedio mensual por 12 y dividido entre 52.",
    "Se multiplica por los años trabajados, contando los meses y días del último año en proporción.",
  ],
  ejemplo: [
    "Con un promedio de B/. 1,300 al mes y 8 años justos de trabajo, el salario semanal es B/. 300. La prima es B/. 2,400.",
  ],
  faq: [
    {
      pregunta: "¿Me pagan prima de antigüedad si renuncio?",
      respuesta: "Sí. La prima se paga al terminar todo contrato por tiempo indefinido, cualquiera sea la causa.",
    },
    {
      pregunta: "¿Qué salario se usa para la prima?",
      respuesta: "El promedio de lo que ganaste en los últimos cinco años, con horas extra y comisiones. Si trabajaste menos, el promedio de todo el tiempo.",
    },
    {
      pregunta: "¿La prima de antigüedad es lo mismo que la indemnización?",
      respuesta: "No. La indemnización se paga solo por despido injustificado y se suma a la prima.",
    },
    {
      pregunta: "¿Hay prima en un contrato por obra o por tiempo definido?",
      respuesta: "No. El artículo 224 la da solo en los contratos por tiempo indefinido.",
    },
  ],
  glosario: [
    { termino: "Contrato por tiempo indefinido", definicion: "El que no tiene fecha de fin pactada." },
    { termino: "Fondo de cesantía", definicion: "Fondo donde el empleador va depositando la prima y parte de la indemnización durante la relación." },
  ],
});
