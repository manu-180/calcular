import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.dolar-bcv",
  h1: "Dólar BCV hoy: conversor de bolívares",
  title: "Dólar BCV hoy: {{ve.tasa-bcv-usd}}. Convierte bolívares",
  description:
    "Tasa oficial del BCV: el dólar a {{ve.tasa-bcv-usd}} y el euro a {{ve.tasa-bcv-eur}}. Convierte bolívares, dólares y euros con la tasa del día.",
  intro: [
    "El dólar BCV es el tipo de cambio oficial que publica el Banco Central de Venezuela. Es el que se usa para pagar en bolívares precios, salarios y bonos fijados en dólares.",
    "La tasa que ves rige desde el {{ve.tasa-bcv-usd#desde}}. Se actualiza sola cada día hábil.",
  ],
  comoSeCalcula: [
    "Dólares a bolívares: dólares por la tasa.",
    "Bolívares a dólares: bolívares divididos entre la tasa.",
    "Con el euro es igual, con la tasa del euro.",
    "El BCV publica cada tarde la tasa del día hábil siguiente (la fecha valor). Los fines de semana y feriados rige la del último día hábil.",
  ],
  ejemplo: ["Si el dólar está a Bs. 874,73, 100 dólares son Bs. 87.473,21."],
  faq: [
    {
      pregunta: "¿Por qué la tasa del BCV es distinta a la del dólar paralelo?",
      respuesta: "Porque el paralelo no es oficial: lo publican terceros y cada uno da un número distinto. Aquí solo mostramos la tasa oficial del BCV.",
    },
    {
      pregunta: "¿Qué es la fecha valor?",
      respuesta: "El día en que empieza a regir la tasa. El BCV la publica la tarde anterior, por eso a veces ves en la página del BCV la tasa de mañana.",
    },
    {
      pregunta: "¿Para qué sirve la tasa del euro?",
      respuesta: "Para contratos, compras y pagos fijados en euros. El BCV la publica el mismo día y con la misma fecha valor que la del dólar.",
    },
  ],
  glosario: [
    { termino: "BCV", definicion: "Banco Central de Venezuela, el que fija el tipo de cambio oficial." },
    { termino: "Fecha valor", definicion: "El día desde el que rige una tasa publicada." },
  ],
});
