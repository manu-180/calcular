import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.calculo-rescisao",
  h1: "Cálculo de rescisão trabalhista {{anio}}",
  title: "Cálculo de rescisão {{anio}}: quanto você recebe",
  description: "Simule a rescisão do contrato: saldo de salário, aviso prévio, 13º, férias com 1/3 e multa do FGTS, para demissão, pedido de demissão ou acordo.",
  intro: [
    "Quando o contrato com carteira assinada termina, a empresa paga as verbas rescisórias. O que entra depende do motivo da saída e de como foi o aviso prévio.",
    "Informe as datas, o salário e o motivo. A calculadora mostra cada verba e a multa do FGTS que vai para a sua conta.",
  ],
  comoSeCalcula: [
    "Saldo de salário: os dias trabalhados no mês da saída, com o salário dividido por 30.",
    "Aviso prévio indenizado: {{br.aviso-previo-base}} mais {{br.aviso-previo-por-ano}} por ano completo de casa, até {{br.aviso-previo-maximo}}. No acordo, a empresa paga a metade. Esses dias projetam o fim do contrato.",
    "13º proporcional: 1/12 do salário por mês do ano com {{br.fracao-mes}} ou mais de trabalho, contando a projeção do aviso.",
    "Férias proporcionais: 1/12 do salário por mês do período aquisitivo em curso, mais o terço. Férias vencidas entram inteiras, também com o terço.",
    "Multa do FGTS: {{br.fgts-multa}} do saldo na demissão sem justa causa e {{br.fgts-multa-acordo}} no acordo. O saldo inclui o depósito de {{br.fgts-aliquota}} sobre as verbas do mês da rescisão.",
  ],
  ejemplo: [
    "Quem entrou em 1º de março de 2024, ganha R$ 3.000 e foi demitido sem justa causa em 14 de outubro de 2026 recebe R$ 1.400 de saldo, 36 dias de aviso (R$ 3.600), R$ 2.750 de 13º e R$ 3.000 de férias proporcionais com o terço.",
    "São R$ 10.750 de verbas. Com R$ 6.000 no FGTS, a multa de 40 % fica em R$ 2.648.",
  ],
  faq: [
    {
      pregunta: "Qual é o prazo para pagar a rescisão?",
      respuesta: "Até 10 dias corridos depois do fim do contrato, seja qual for o tipo de aviso. Atrasar gera multa de um salário a favor da pessoa demitida.",
    },
    {
      pregunta: "Quem pede demissão perde o quê?",
      respuesta: "A multa do FGTS, o saque do saldo e o seguro-desemprego. Saldo de salário, 13º e férias proporcionais com o terço continuam.",
    },
    {
      pregunta: "Como funciona a demissão por acordo?",
      respuesta: "Desde a reforma de 2017, empresa e empregado podem encerrar o contrato juntos. O aviso indenizado e a multa do FGTS caem pela metade, o saque fica em {{br.fgts-saque-acordo}} do saldo e não há seguro-desemprego.",
    },
    {
      pregunta: "A rescisão tem desconto de INSS e imposto de renda?",
      respuesta: "Saldo de salário, aviso indenizado e 13º podem ter. Férias indenizadas com o terço e a multa do FGTS não pagam imposto de renda. A calculadora mostra os valores brutos.",
    },
  ],
  glosario: [
    { termino: "Verbas rescisórias", definicion: "Os valores que a empresa paga quando o contrato termina." },
    { termino: "Projeção do aviso", definicion: "Os dias do aviso indenizado contam como tempo de serviço, como se o contrato durasse até o fim do aviso." },
    { termino: "Férias vencidas", definicion: "Período aquisitivo completo cujas férias você ainda não tirou." },
  ],
});
