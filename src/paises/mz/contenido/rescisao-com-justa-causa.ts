import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.rescisao-com-justa-causa",
  h1: "Indemnização por rescisão com justa causa",
  title: "Rescisão com justa causa pelo trabalhador: indemnização",
  description: "Quanto recebe quem rescinde o contrato com justa causa em Moçambique: {{mz.indemnizacao-justa-causa}} de salário por cada ano de serviço.",
  intro: [
    "O trabalhador pode rescindir o contrato com justa causa quando o empregador viola de forma culposa os seus direitos e garantias.",
    "Num contrato por tempo indeterminado isso dá direito a {{mz.indemnizacao-justa-causa}} de salário por cada ano de serviço, com a fracção de ano paga em proporção.",
  ],
  comoSeCalcula: [
    "Tempo de serviço em anos, com os meses completos como fracção.",
    "Indemnização = anos × {{mz.indemnizacao-justa-causa}} × (salário ÷ 30).",
    "Se não comunicou a rescisão com {{mz.aviso-justa-causa}} de antecedência, desconta-se uma multa de sete dias de salário.",
  ],
  ejemplo: ["Com 30 000 MT de salário e três anos e meio de casa: 3,5 × 45 × 1 000 MT = 157 500 MT."],
  faq: [
    {
      pregunta: "O que é justa causa para o trabalhador?",
      respuesta: "Um comportamento do empregador que viola culposamente os direitos do trabalhador, ou a necessidade de cumprir uma obrigação legal incompatível com o trabalho. Neste segundo caso não há indemnização.",
    },
    {
      pregunta: "Como se comunica a rescisão?",
      respuesta: "Por escrito, com pelo menos {{mz.aviso-justa-causa}} de antecedência, indicando os factos que a fundamentam.",
    },
    {
      pregunta: "E se o tribunal disser que não havia justa causa?",
      respuesta: "O trabalhador fica obrigado a pagar ao empregador metade da indemnização prevista.",
    },
  ],
  glosario: [{ termino: "Justa causa", definicion: "Factos graves que tornam impossível manter a relação de trabalho." }],
});
