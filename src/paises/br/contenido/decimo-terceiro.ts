import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.decimo-terceiro",
  h1: "Calculadora de 13º salário {{anio}}",
  title: "13º salário {{anio}}: calcule as duas parcelas",
  description: "Calcule o 13º salário integral ou proporcional, a primeira e a segunda parcela, com o INSS e o imposto de renda de {{anio}}.",
  intro: [
    "O 13º salário é a gratificação de Natal que toda pessoa com carteira assinada recebe no fim do ano. Vale um salário inteiro para quem trabalhou o ano todo.",
    "Informe o salário, os meses trabalhados e a média de horas extras ou comissões. A calculadora mostra quanto cai em cada parcela.",
  ],
  comoSeCalcula: [
    "O 13º é 1/12 da remuneração por mês trabalhado no ano. Conta como mês inteiro aquele em que você trabalhou {{br.fracao-mes}} ou mais.",
    "Horas extras, comissões e adicionais habituais entram pela média do ano.",
    "A primeira parcela é metade do valor, sem descontos, e sai entre fevereiro e 30 de novembro.",
    "Na segunda parcela, até 20 de dezembro, saem o INSS e o IRRF calculados sobre o 13º inteiro, à parte do salário do mês.",
    "No imposto vale o que for maior entre as deduções legais e o desconto simplificado de {{br.irrf-desconto-simplificado}}, e também vale a redução da Lei nº 15.270/2025.",
  ],
  ejemplo: [
    "Com salário de R$ 3.000 e o ano completo, o 13º bruto é R$ 3.000. A primeira parcela é R$ 1.500.",
    "Na segunda, saem R$ 248,60 de INSS e não há imposto de renda. Caem R$ 1.251,40.",
  ],
  faq: [
    {
      pregunta: "Quem foi demitido recebe 13º?",
      respuesta: "Sim, o proporcional aos meses trabalhados no ano. Só quem é demitido por justa causa perde o 13º proporcional.",
    },
    {
      pregunta: "Faltas diminuem o 13º?",
      respuesta: "Faltas justificadas, não. Faltas sem justificativa podem fazer um mês ficar com menos de {{br.fracao-mes}} trabalhados, e esse mês deixa de contar.",
    },
    {
      pregunta: "O imposto do 13º se soma ao salário de dezembro?",
      respuesta: "Não. O 13º tem tributação exclusiva na fonte: o imposto é calculado só sobre ele, com a tabela mensal.",
    },
    {
      pregunta: "Posso pedir a primeira parcela nas férias?",
      respuesta: "Sim, se você pedir em janeiro. Aí a empresa paga o adiantamento junto com as férias.",
    },
  ],
  glosario: [
    { termino: "Gratificação de Natal", definicion: "Nome do 13º salário na Lei nº 4.090/1962." },
    { termino: "Avos", definicion: "Cada mês trabalhado vale 1/12 do 13º. Doze avos são o salário inteiro." },
  ],
});
