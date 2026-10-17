import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.calculo-fgts",
  h1: "Cálculo do FGTS",
  title: "Cálculo do FGTS: depósito mensal e saldo do período",
  description: "Veja quanto a empresa deposita de FGTS por mês ({{br.fgts-aliquota}} do salário), o total no período com 13º e férias e a multa na demissão.",
  intro: [
    "Todo mês a empresa deposita {{br.fgts-aliquota}} do seu salário numa conta do FGTS em seu nome, na Caixa. O valor não sai do seu salário.",
    "Informe o salário e os meses de trabalho para ver os depósitos e a multa que a empresa paga se demitir sem justa causa.",
  ],
  comoSeCalcula: [
    "O depósito mensal é {{br.fgts-aliquota}} da remuneração do mês. No contrato de aprendiz, é {{br.fgts-aliquota-aprendiz}}.",
    "O FGTS também incide sobre o 13º salário e sobre o terço constitucional das férias.",
    "Na demissão sem justa causa, a empresa deposita uma multa de {{br.fgts-multa}} sobre tudo o que foi depositado no contrato.",
  ],
  ejemplo: [
    "Com salário de R$ 3.000, o depósito é de R$ 240 por mês. Em um ano, somando o 13º e o terço das férias, são R$ 3.200, e a multa de 40 % seria de R$ 1.280.",
  ],
  faq: [
    {
      pregunta: "O FGTS é descontado do meu salário?",
      respuesta: "Não. É um custo da empresa, pago além do salário. Por isso não aparece como desconto no holerite.",
    },
    {
      pregunta: "Quando posso sacar o FGTS?",
      respuesta: "Na demissão sem justa causa, na aposentadoria, na compra da casa própria, em doenças graves e em outros casos da lei. Quem escolhe o saque-aniversário saca uma parte todo ano.",
    },
    {
      pregunta: "Como confiro se a empresa está depositando?",
      respuesta: "Pelo aplicativo FGTS, da Caixa, que mostra cada depósito mês a mês.",
    },
  ],
  glosario: [
    { termino: "FGTS", definicion: "Fundo de Garantia do Tempo de Serviço, criado para proteger quem perde o emprego." },
    { termino: "Multa rescisória", definicion: "Valor que a empresa deposita na conta do FGTS quando demite sem justa causa." },
  ],
});
