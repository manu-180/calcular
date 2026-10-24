import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.atualizar-valor-inflacao",
  h1: "Actualizar um valor pela inflação",
  title: "Inflação em Angola: actualize valores com o IPCN do INE",
  description: "Actualize uma renda, um salário ou uma dívida em kwanzas com o Índice de Preços no Consumidor Nacional (IPCN) do INE.",
  intro: [
    "Quanto valem hoje 100 000 Kz de há cinco anos? A resposta está no Índice de Preços no Consumidor Nacional (IPCN), que o INE publica todos os meses.",
    "Indique o valor e os dois meses. A calculadora usa a série do IPCN desde janeiro de 2015. Se o mês final ainda não tiver índice, usa o último publicado.",
  ],
  comoSeCalcula: [
    "Factor = IPCN do mês final / IPCN do mês inicial.",
    "Valor actualizado = valor × factor. A inflação acumulada é (factor − 1) × 100.",
  ],
  ejemplo: ["Com o IPCN de dezembro de 2020 a 100 e o de setembro de 2026 a 270,17, um valor de 100 000 Kz corresponde a 270 171 Kz."],
  faq: [
    {
      pregunta: "Qual é a inflação em Angola?",
      respuesta: "A calculadora mostra a inflação homóloga do mês final, ou seja a variação do IPCN face ao mesmo mês do ano anterior. Com a data de hoje como mês final, é a do último índice publicado.",
    },
    {
      pregunta: "O que é o IPCN?",
      respuesta: "O Índice de Preços no Consumidor Nacional mede a evolução dos preços de um cabaz de bens e serviços comprados pelas famílias angolanas. A base é dezembro de 2020 = 100.",
    },
    {
      pregunta: "Quando sai o índice de cada mês?",
      respuesta: "O INE publica o IPCN de cada mês ao longo do mês seguinte. Até lá, a calculadora usa o último índice disponível.",
    },
  ],
  glosario: [
    { termino: "INE", definicion: "Instituto Nacional de Estatística de Angola." },
    { termino: "Inflação homóloga", definicion: "A variação dos preços face ao mesmo mês do ano anterior." },
  ],
});
