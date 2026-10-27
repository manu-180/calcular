import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.cambio-metical",
  h1: "Câmbio do metical hoje",
  title: "Câmbio do metical: dólar, rand e euro hoje",
  description: "Converta dólares, randes e euros em meticais com as taxas de compra e de venda do Banco de Moçambique. Dólar: {{mz.usd-venda}} na venda.",
  intro: [
    "O Banco de Moçambique publica todos os dias úteis as taxas de câmbio do metical. A calculadora usa a taxa de compra quando entrega moeda estrangeira e a de venda quando a compra.",
    "Hoje o dólar está a {{mz.usd-compra}} na compra e {{mz.usd-venda}} na venda, segundo os dados de {{mz.usd-venda#desde}}.",
  ],
  comoSeCalcula: [
    "Da moeda estrangeira para meticais: quantia × taxa de compra.",
    "De meticais para a moeda estrangeira: quantia ÷ taxa de venda.",
  ],
  ejemplo: ["Com o dólar a 63,27 MT na compra, 100 USD dão 6 327 MT. Com 64,54 MT na venda, 10 000 MT compram 154,94 USD."],
  faq: [
    {
      pregunta: "Qual é o câmbio do rand hoje?",
      respuesta: "O rand sul-africano está a {{mz.zar-compra}} na compra e {{mz.zar-venda}} na venda.",
    },
    {
      pregunta: "Porque o banco me dá outro valor?",
      respuesta: "Cada banco e casa de câmbio fixa a sua cotação e cobra comissões. As taxas do Banco de Moçambique são uma referência.",
    },
    {
      pregunta: "Quando se actualizam as taxas?",
      respuesta: "Todos os dias úteis. O Banco de Moçambique fixa taxas às 9h30, 12h30 e 15h30; a calculadora usa a última do dia.",
    },
  ],
  glosario: [
    { termino: "Taxa de compra", definicion: "Quantos meticais o banco paga por uma unidade de moeda estrangeira." },
    { termino: "Taxa de venda", definicion: "Quantos meticais o banco cobra por uma unidade de moeda estrangeira." },
  ],
});
