import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.seguranca-social-independentes",
  h1: "Segurança Social dos trabalhadores independentes",
  title: "Segurança Social a recibos verdes: simulador {{anio}}",
  description: "Calcule a contribuição mensal do trabalhador independente: {{pt.ss-independente-taxa}} sobre o rendimento relevante da declaração trimestral, com o limite máximo.",
  intro: [
    "Quem trabalha a recibos verdes declara à Segurança Social, de três em três meses, o que faturou. Com isso calcula-se a contribuição a pagar nos três meses seguintes.",
    "Indique o total faturado no trimestre, o tipo de rendimento e o ajuste que escolheu na declaração.",
  ],
  comoSeCalcula: [
    "Rendimento relevante: {{pt.ss-independente-rendimento-relevante[servicos]}} do valor das prestações de serviços, ou {{pt.ss-independente-rendimento-relevante[bens]}} da produção e venda de bens.",
    "Base de incidência mensal: um terço do rendimento relevante do trimestre. Na declaração pode subir ou baixar esse valor até 25 %, em saltos de 5 %.",
    "A base mensal não passa de {{pt.ss-independente-teto-ias}} vezes o IAS ({{pt.ias}}).",
    "Contribuição mensal = base × {{pt.ss-independente-taxa}}.",
  ],
  ejemplo: ["Quem faturou 1 200, 1 000 e 1 300 euros em serviços tem uma base de 816,67 euros e paga 174,77 euros por mês."],
  faq: [
    {
      pregunta: "Qual é a taxa da Segurança Social para independentes?",
      respuesta: "{{pt.ss-independente-taxa}}. Para empresários em nome individual e titulares de EIRL é de 25,2 %.",
    },
    {
      pregunta: "Quem tem contabilidade organizada também usa este cálculo?",
      respuesta: "Não. Nesse caso o rendimento relevante é o lucro tributável do ano anterior e a base mensal é um duodécimo desse valor, com um mínimo de 1,5 IAS.",
    },
    {
      pregunta: "Os clientes também pagam Segurança Social?",
      respuesta: "As entidades contratantes pagam 10 % quando a dependência económica passa de 80 % e 7 % nas restantes situações previstas na lei.",
    },
    {
      pregunta: "E se não tiver rendimentos num trimestre?",
      respuesta: "Paga a contribuição mínima mensal que a lei fixa e atualiza com o IAS.",
    },
  ],
  glosario: [
    { termino: "Rendimento relevante", definicion: "A parte da faturação que conta para a Segurança Social." },
    { termino: "Declaração trimestral", definicion: "A declaração dos rendimentos dos três meses anteriores, entregue à Segurança Social." },
  ],
});
