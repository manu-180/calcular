import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.jubilacion",
  h1: "Calculadora de jubilación de la Caja de Seguro Social en Panamá",
  title: "Jubilación en Panamá: calcula tu pensión de la CSS",
  description:
    "Calcula tu pensión de vejez de la CSS con la reforma de 2025: edad de {{pa.jubilacion-edad-referencia[mujeres]}} para mujeres y {{pa.jubilacion-edad-referencia[hombres]}} para hombres, con {{pa.jubilacion-cuotas[referencia]}} cuotas.",
  intro: [
    "Para la pensión completa de vejez necesitas {{pa.jubilacion-cuotas[referencia]}} cuotas y la edad de referencia: {{pa.jubilacion-edad-referencia[mujeres]}} las mujeres y {{pa.jubilacion-edad-referencia[hombres]}} los hombres. Con al menos {{pa.jubilacion-cuotas[minimo]}} cuotas tienes una pensión proporcional, y puedes retirarte hasta dos años antes con una reducción.",
    "Esta calculadora sirve si estás en el Subsistema Exclusivamente de Beneficio Definido (en general, si empezaste a cotizar antes de 2006 y no pasaste al Sistema Mixto). Escribe tus datos y te mostramos la pensión estimada.",
  ],
  comoSeCalcula: [
    "Salario base: el promedio mensual de tus diez mejores años de salario.",
    "Tasa básica: {{pa.jubilacion-tasa-reemplazo[basica]}} del salario base con la edad y las cuotas de referencia.",
    "Suma {{pa.jubilacion-tasa-reemplazo[por-12-cuotas-antes]}} por cada 12 cuotas de más aportadas antes de la edad de referencia y {{pa.jubilacion-tasa-reemplazo[por-12-cuotas-despues]}} por cada 12 aportadas después.",
    "Con menos de {{pa.jubilacion-cuotas[referencia]}} cuotas, la tasa básica se multiplica por tus cuotas y se divide entre {{pa.jubilacion-cuotas[referencia]}}.",
    "Si te retiras uno o dos años antes, el monto se multiplica por {{pa.jubilacion-factor-anticipada[1]}} o {{pa.jubilacion-factor-anticipada[2]}}.",
  ],
  ejemplo: [
    "Una mujer de 57 años con 300 cuotas y un salario base de B/. 1,000: 60 cuotas de más suman 6.25%. Tasa 66.25%: pensión de B/. 662.50 al mes.",
  ],
  faq: [
    {
      pregunta: "¿A qué edad me jubilo en Panamá?",
      respuesta: "A los {{pa.jubilacion-edad-referencia[mujeres]}} años las mujeres y a los {{pa.jubilacion-edad-referencia[hombres]}} los hombres. La reforma de 2025 no cambió esas edades.",
    },
    {
      pregunta: "¿Cuántas cuotas necesito para jubilarme?",
      respuesta: "{{pa.jubilacion-cuotas[referencia]}} para la pensión completa. Con {{pa.jubilacion-cuotas[minimo]}} o más tienes una pensión proporcional.",
    },
    {
      pregunta: "¿Puedo jubilarme antes?",
      respuesta: "Sí, hasta dos años antes de la edad de referencia, con un factor de reducción sobre el monto.",
    },
    {
      pregunta: "¿Por qué la Caja me puede dar otro monto?",
      respuesta: "Porque aplica un mínimo y un máximo de pensión, y revisa tu historial de salarios y cuotas. Pide tu estado de cuenta en la Caja de Seguro Social.",
    },
    {
      pregunta: "¿Y si estoy en el Sistema Mixto?",
      respuesta: "Tu pensión tiene otras partes (beneficio definido hasta cierto salario y cuenta individual). Esta calculadora no las cubre.",
    },
  ],
  glosario: [
    { termino: "Cuota", definicion: "Cada mes aportado a la Caja de Seguro Social." },
    { termino: "Tasa de reemplazo", definicion: "El porcentaje de tu salario base que recibes como pensión." },
  ],
});
