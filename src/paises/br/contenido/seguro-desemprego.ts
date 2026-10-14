import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.seguro-desemprego",
  h1: "Calculadora de seguro-desemprego 2026",
  title: "Seguro-desemprego 2026: valor e número de parcelas",
  description: "Calcule o valor da parcela do seguro-desemprego com a tabela de 2026 (teto de {{br.sd-teto}}) e quantas parcelas você recebe.",
  intro: [
    "Quem é demitido sem justa causa pode receber de 3 a 5 parcelas do seguro-desemprego. O valor depende da média dos últimos salários.",
    "Informe os três últimos salários, qual pedido é este e quantos meses você trabalhou com carteira nos últimos três anos.",
  ],
  comoSeCalcula: [
    "Faça a média dos três últimos salários antes da dispensa (ou dos dois, ou do último, se não houver três).",
    "Média até {{br.sd-limite-faixa-1}}: a parcela é a média vezes {{br.sd-fator-faixa-1}}.",
    "Média até {{br.sd-limite-faixa-2}}: {{br.sd-base-faixa-2}} mais metade do que passar de {{br.sd-limite-faixa-1}}.",
    "Média acima disso: a parcela é o teto de {{br.sd-teto}}. Nenhuma parcela fica abaixo do salário mínimo de {{br.salario-minimo}}.",
    "O número de parcelas depende dos meses trabalhados nos últimos 36 meses: de 6 a 11 dão 3, de 12 a 23 dão 4 e 24 ou mais dão 5, respeitando a carência de cada pedido.",
  ],
  ejemplo: ["Com média de R$ 3.000, a parcela é R$ 1.777,74 mais metade de R$ 777,83, ou R$ 2.166,66. Com 24 meses trabalhados, são 5 parcelas."],
  faq: [
    {
      pregunta: "Como peço o seguro-desemprego?",
      respuesta: "Com o número do requerimento que a empresa entrega na demissão, pela Carteira de Trabalho Digital, pelo portal gov.br ou pelo telefone 158.",
    },
    {
      pregunta: "Quem pediu demissão ou fez acordo tem direito?",
      respuesta: "Não. O benefício é só para quem foi dispensado sem justa causa, inclusive na rescisão indireta.",
    },
    {
      pregunta: "Posso receber o seguro e trabalhar?",
      respuesta: "Não. Se você conseguir outro emprego com carteira, as parcelas seguintes são suspensas.",
    },
  ],
  glosario: [
    { termino: "Carência", definicion: "Número mínimo de salários recebidos antes da dispensa para ter direito ao benefício." },
    { termino: "Rescisão indireta", definicion: "Quando o empregado encerra o contrato por falta grave da empresa." },
  ],
});
