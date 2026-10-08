import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.prima-de-antiguedad",
  h1: "Calculadora de prima de antigüedad en Panamá",
  title: "Prima de antigüedad en Panamá: calcula cuánto te toca",
  description:
    "Calcula tu prima de antigüedad en Panamá: {{pa.prima-antiguedad-semanas}} semana de salario por año trabajado (artículo 224), con la parte proporcional. Te toca si renuncias o te despiden.",
  intro: [
    "La prima de antigüedad en Panamá es {{pa.prima-antiguedad-semanas}} semana de salario por cada año trabajado, más la parte proporcional del año incompleto. Te la pagan al terminar un contrato por tiempo indefinido, sin importar si renunciaste o te despidieron.",
    "Escribe tu salario promedio y tus fechas de ingreso y salida. Te mostramos el tiempo trabajado, las semanas que te tocan y el monto.",
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
      pregunta: "¿Cómo se calcula la prima de antigüedad en Panamá?",
      respuesta: "Pasas tu salario promedio mensual a semanal (por 12 y entre 52) y lo multiplicas por tus años trabajados, con la fracción del último año.",
    },
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
