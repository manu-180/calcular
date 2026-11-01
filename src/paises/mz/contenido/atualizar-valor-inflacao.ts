import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.atualizar-valor-inflacao",
  h1: "Actualizar um valor pela inflação",
  title: "Actualizar valores pela inflação em Moçambique",
  description: "Quanto vale hoje um valor em meticais de outro mês, com a inflação mensal publicada pelo Banco de Moçambique. Último mês: {{mz.inflacao-mensal#desde}}.",
  intro: [
    "A inflação faz com que o mesmo dinheiro compre menos com o passar do tempo. Para comparar uma renda, um salário ou um preço antigo com os de hoje, é preciso actualizá-lo.",
    "A calculadora usa a variação mensal dos preços no consumidor publicada pelo Banco de Moçambique. A última disponível é a de {{mz.inflacao-mensal#desde}}: {{mz.inflacao-mensal}}.",
  ],
  comoSeCalcula: [
    "Para cada mês depois do mês inicial, até ao mês final, multiplica-se (1 + inflação do mês).",
    "Valor actualizado = valor original × esse factor.",
    "Inflação acumulada = (factor − 1) × 100.",
  ],
  ejemplo: ["10 000 MT de Dezembro de 2025 valiam 10 484,38 MT em Agosto de 2026, com 4,84 % de inflação acumulada."],
  faq: [
    {
      pregunta: "De onde vêm os dados?",
      respuesta: "Da taxa de inflação mensal publicada pelo Banco de Moçambique, que se baseia no índice de preços no consumidor do Instituto Nacional de Estatística.",
    },
    {
      pregunta: "Porque não dá para usar Novembro de 2023?",
      respuesta: "Os dados do Banco de Moçambique não trazem a inflação desse mês. Um período que passe por ele não tem como ser calculado; escolha datas antes ou depois.",
    },
    {
      pregunta: "Posso usar isto para actualizar uma renda?",
      respuesta: "Serve de referência. O contrato de arrendamento é que diz como e quando a renda é actualizada.",
    },
  ],
  glosario: [
    { termino: "Inflação mensal", definicion: "Variação dos preços no consumidor de um mês para o seguinte." },
    { termino: "Factor de actualização", definicion: "Número pelo qual se multiplica o valor original para o trazer para o mês final." },
  ],
});
