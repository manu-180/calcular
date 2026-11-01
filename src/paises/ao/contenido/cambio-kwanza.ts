import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.cambio-kwanza",
  h1: "Câmbio do kwanza: dólar e euro do BNA",
  title: "Câmbio do dólar e do euro hoje em kwanzas (BNA)",
  description: "Converta dólares e euros em kwanzas com a taxa de câmbio de referência do Banco Nacional de Angola. Dólar a {{ao.usd}} e euro a {{ao.eur}}.",
  intro: [
    "O Banco Nacional de Angola publica todos os dias úteis as taxas de câmbio de referência do kwanza. A taxa de venda do dólar em {{ao.usd#desde}} foi {{ao.usd}} por dólar.",
    "Escolha a moeda e o sentido da conversão. A calculadora usa a última taxa de venda publicada pelo BNA.",
  ],
  comoSeCalcula: [
    "De moeda estrangeira para kwanzas: quantia × taxa de referência.",
    "De kwanzas para moeda estrangeira: quantia / taxa de referência.",
    "A taxa é a de venda publicada pelo BNA, com quatro casas decimais.",
  ],
  ejemplo: ["Se o dólar estiver a 913 Kz, 100 dólares valem 91 300 Kz. Em sentido contrário, 91 300 Kz compram 100 dólares."],
  faq: [
    {
      pregunta: "O banco vai usar esta taxa?",
      respuesta: "Não exactamente. A taxa do BNA é uma referência. Os bancos comerciais e as casas de câmbio aplicam a sua cotação e cobram comissões.",
    },
    {
      pregunta: "Com que frequência muda a taxa?",
      respuesta: "O BNA publica a taxa de referência nos dias úteis. Ao fim de semana e nos feriados vale a última publicada.",
    },
    {
      pregunta: "Uma transferência para o exterior paga mais alguma coisa?",
      respuesta: "Algumas pagam a Contribuição Especial sobre Operações Cambiais, criada pelo Orçamento de 2026. Veja a calculadora dessa contribuição.",
    },
  ],
  glosario: [
    { termino: "BNA", definicion: "Banco Nacional de Angola, o banco central." },
    { termino: "Taxa de referência", definicion: "A taxa de câmbio oficial publicada pelo BNA, que serve de base ao mercado." },
  ],
});
