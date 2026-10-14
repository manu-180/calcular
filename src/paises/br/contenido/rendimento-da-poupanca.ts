import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.rendimento-poupanca",
  h1: "Simulador de rendimento da poupança",
  title: "Rendimento da poupança hoje: simule com Selic e TR",
  description: "Simule quanto rende a poupança com a Selic e a TR atuais do Banco Central, com valor inicial e depósitos mensais. Sem imposto de renda.",
  intro: [
    "A poupança rende todo mês no aniversário do depósito. A regra depende da meta Selic definida pelo Copom.",
    "Informe quanto vai depositar e por quanto tempo. Usamos a Selic e a TR mais recentes divulgadas pelo Banco Central.",
  ],
  comoSeCalcula: [
    "Com a meta Selic acima de {{br.poupanca-limite-selic}}, a poupança paga {{br.poupanca-juros}} ao mês mais a TR.",
    "Com a Selic em {{br.poupanca-limite-selic}} ou menos, paga {{br.poupanca-fracao-selic}} da Selic ao ano, mensalizada, mais a TR.",
    "Juros e TR se aplicam juntos, de forma composta, mês a mês. Os depósitos mensais entram no fim de cada mês.",
  ],
  ejemplo: ["Com Selic de 13,75 % e TR de 0,1616 %, a poupança rende 0,6624 % ao mês. R$ 10.000 viram R$ 10.824,50 em um ano."],
  faq: [
    {
      pregunta: "A poupança paga imposto de renda?",
      respuesta: "Não, para pessoa física o rendimento é isento. Também não há IOF nem taxa de administração.",
    },
    {
      pregunta: "Se eu sacar antes do aniversário, perco o rendimento?",
      respuesta: "Sim. O dinheiro sacado antes da data de aniversário do depósito não recebe o rendimento daquele mês.",
    },
    {
      pregunta: "A poupança rende mais que o CDI?",
      respuesta: "Com a Selic alta, costuma render menos que aplicações atreladas ao CDI, mesmo depois do imposto. Compare antes de decidir.",
    },
  ],
  glosario: [
    { termino: "Meta Selic", definicion: "Taxa básica de juros definida pelo Copom, do Banco Central." },
    { termino: "TR", definicion: "Taxa Referencial, calculada pelo Banco Central e somada ao rendimento da poupança." },
    { termino: "Aniversário", definicion: "Dia do mês em que o depósito recebe o rendimento." },
  ],
});
