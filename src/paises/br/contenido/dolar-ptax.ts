import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.dolar-ptax",
  h1: "Dólar PTAX hoje: converter dólar e real",
  title: "Dólar PTAX hoje: cotação oficial do Banco Central",
  description: "Veja o dólar PTAX de venda divulgado pelo Banco Central e converta dólares em reais ou reais em dólares pela cotação oficial.",
  intro: [
    "A PTAX é a taxa de câmbio oficial calculada pelo Banco Central a partir das operações do dia no mercado.",
    "Ela é a referência de contratos, faturas de cartão em dólar e declarações. Informe a quantia e o sentido da conversão.",
  ],
  comoSeCalcula: [
    "Usamos a PTAX de venda do último dia útil divulgado pelo Banco Central.",
    "Dólares para reais: multiplique a quantia pela PTAX. Reais para dólares: divida pela PTAX.",
    "Em fins de semana e feriados não há PTAX nova: vale a do último dia útil.",
  ],
  ejemplo: ["Com a PTAX de R$ 5,0096 de 13 de outubro de 2026, US$ 100 equivalem a R$ 500,96."],
  faq: [
    {
      pregunta: "Por que o dólar do banco é diferente da PTAX?",
      respuesta: "Bancos e casas de câmbio somam a margem deles (spread) e, em várias operações, o IOF. A PTAX é só a referência oficial.",
    },
    {
      pregunta: "Qual PTAX vale para a fatura do cartão?",
      respuesta: "Desde 2020 as compras no exterior são convertidas pela cotação do dia de cada compra, que o banco informa na fatura.",
    },
    {
      pregunta: "A que horas sai a PTAX?",
      respuesta: "O Banco Central divulga a taxa do dia depois das quatro consultas ao mercado, no começo da tarde.",
    },
  ],
  glosario: [
    { termino: "PTAX", definicion: "Taxa média de câmbio calculada e divulgada diariamente pelo Banco Central do Brasil." },
    { termino: "Spread", definicion: "Diferença entre a cotação oficial e a que a instituição cobra." },
  ],
});
