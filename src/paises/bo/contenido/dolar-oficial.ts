import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.dolar-oficial",
  h1: "Dólar oficial hoy en Bolivia",
  title: "Dólar oficial hoy en Bolivia: tipo de cambio del BCB",
  description: "El Tipo de Cambio Oficial del BCB hoy es {{bo.dolar}} por dólar. Convierta dólares a bolivianos y bolivianos a dólares con el dato del día.",
  intro: [
    "Usamos el Tipo de Cambio Oficial (TCO) que publica el Banco Central de Bolivia. Hoy es {{bo.dolar}} por dólar.",
    "Elija hacia qué moneda quiere convertir y escriba el monto.",
  ],
  comoSeCalcula: [
    "Para pasar de dólares a bolivianos, se multiplica el monto por el TCO.",
    "Para pasar de bolivianos a dólares, se divide el monto por el TCO.",
    "El BCB calcula el TCO cada día hábil con las compras de dólares que hacen los bancos a sus clientes (la mediana ponderada por monto). Lo publica a las 23:30 y rige al día siguiente.",
    "El que se publica el viernes rige el sábado, el domingo y el lunes. En los feriados rige el del último día hábil.",
  ],
  faq: [
    {
      pregunta: "¿Por qué el dólar oficial cambia todos los días?",
      respuesta: "Desde el 29 de junio de 2026 Bolivia tiene un tipo de cambio flexible. Ya no hay un valor fijo: el BCB lo calcula cada día hábil con las operaciones de los bancos.",
    },
    {
      pregunta: "¿Es el mismo precio que me dan en el banco o en una casa de cambio?",
      respuesta: "No siempre. El TCO es una referencia. Cada banco o casa de cambio compra y vende con su propio precio.",
    },
    {
      pregunta: "¿Muestran el dólar paralelo?",
      respuesta: "No. Solo mostramos el tipo de cambio oficial del BCB, que es el que tiene respaldo en una fuente pública.",
    },
    {
      pregunta: "¿Qué tipo de cambio rige el fin de semana?",
      respuesta: "El que el BCB publica el viernes por la noche. Rige el sábado, el domingo y el lunes.",
    },
  ],
  glosario: [
    { termino: "TCO", definicion: "Tipo de Cambio Oficial del boliviano respecto al dólar, que publica el Banco Central de Bolivia." },
    { termino: "BCB", definicion: "Banco Central de Bolivia." },
    { termino: "Mediana ponderada por monto", definicion: "El precio del punto medio de todos los dólares comprados en el día: la mitad del monto se compró más barato y la otra mitad, más caro." },
  ],
});
