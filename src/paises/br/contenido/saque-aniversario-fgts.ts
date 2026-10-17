import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.saque-aniversario-fgts",
  h1: "Simulador do saque-aniversário do FGTS",
  title: "Saque-aniversário do FGTS: quanto você pode sacar",
  description: "Calcule o valor do saque-aniversário do FGTS pelo saldo da conta, com a alíquota e a parcela adicional de cada faixa da lei.",
  intro: [
    "No saque-aniversário você retira uma parte do FGTS todo ano, no mês do seu aniversário. O valor depende do saldo somado de todas as suas contas.",
    "Informe o saldo e veja quanto sai e quanto fica na conta.",
  ],
  comoSeCalcula: [
    "O saldo cai numa das sete faixas da tabela da Lei nº 8.036/1990.",
    "Sobre o saldo se aplica a alíquota da faixa, de 50 % nos saldos pequenos até 5 % acima de R$ 20.000.",
    "Ao resultado se soma a parcela adicional da faixa, que vai de zero a R$ 2.900.",
  ],
  ejemplo: ["Com R$ 3.000 de saldo, a faixa é de 30 % mais R$ 150. O saque é de R$ 1.050 e ficam R$ 1.950 na conta."],
  faq: [
    {
      pregunta: "Vale a pena aderir ao saque-aniversário?",
      respuesta: "Depende. Você ganha um dinheiro por ano, mas se for demitido sem justa causa só saca a multa rescisória. O resto do saldo fica preso.",
    },
    {
      pregunta: "Quando o dinheiro fica disponível?",
      respuesta: "No mês do seu aniversário. O app FGTS mostra a data de liberação e o prazo para retirar.",
    },
    {
      pregunta: "Posso desistir do saque-aniversário?",
      respuesta: "Pode, pelo app FGTS. A volta para o saque-rescisão só vale no primeiro dia do 25º mês depois do pedido.",
    },
  ],
  glosario: [
    { termino: "Saque-rescisão", definicion: "A regra padrão do FGTS: o saldo inteiro só é liberado na demissão sem justa causa e nos outros casos da lei." },
    { termino: "Parcela adicional", definicion: "Valor fixo de cada faixa que se soma ao resultado da alíquota." },
  ],
});
