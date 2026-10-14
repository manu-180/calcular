import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.simulador-irs",
  h1: "Simulador de IRS 2026",
  title: "Simulador de IRS 2026: escalões, deduções e reembolso",
  description:
    "Simule o IRS de 2026 sobre salários com os novos escalões, a dedução específica, o mínimo de existência de {{pt.irs-minimo-existencia}} e as deduções à coleta.",
  intro: [
    "O IRS de um ano apura-se na declaração entregue no ano seguinte. Este simulador faz as contas para rendimentos do trabalho dependente recebidos em 2026.",
    "Indique o rendimento bruto anual, os dependentes e as despesas gerais familiares. Se souber o IRS retido, vê também se terá reembolso.",
  ],
  comoSeCalcula: [
    "Ao rendimento bruto tira-se a dedução específica: {{pt.irs-deducao-especifica-ias}} vezes o IAS de {{pt.ias}}, ou as contribuições para a Segurança Social, se forem maiores.",
    "Nos rendimentos mais baixos aplica-se o mínimo de existência, um abatimento ao rendimento que se calcula com o valor de referência de {{pt.irs-minimo-existencia}} e vai diminuindo à medida que o rendimento sobe.",
    "Ao rendimento coletável aplicam-se os escalões do artigo 68.º: cada parte do rendimento paga a taxa do seu escalão. Na declaração conjunta divide-se o rendimento por dois, aplica-se a tabela e multiplica-se por dois.",
    "À coleta subtraem-se as deduções: {{pt.irs-deducao-dependentes[dependente]}} por dependente, {{pt.irs-despesas-gerais-percentagem}} das despesas gerais familiares até {{pt.irs-despesas-gerais-limite}} por sujeito passivo e as restantes deduções.",
  ],
  ejemplo: [
    "Com 20 000 euros brutos por ano, sem dependentes, o rendimento coletável é de 15 412,91 euros. A coleta dá 2 308,31 euros e, com 250 euros de despesas gerais, o IRS fica em 2 058,31 euros.",
  ],
  faq: [
    {
      pregunta: "Quais são os escalões do IRS em 2026?",
      respuesta: "São nove, de 12,5 % até 8 342 euros de rendimento coletável a 48 % acima de 86 634 euros. Cada taxa aplica-se só à parte do rendimento dentro do escalão.",
    },
    {
      pregunta: "O que é o mínimo de existência?",
      respuesta: "É um abatimento ao rendimento de quem vive sobretudo de salários ou pensões. Com rendimentos até {{pt.irs-minimo-existencia}} por ano, e a dedução de despesas gerais familiares completa, o IRS fica a zero. Acima desse valor o abatimento vai diminuindo.",
    },
    {
      pregunta: "Quanto se deduz por cada filho?",
      respuesta: "{{pt.irs-deducao-dependentes[dependente]}} por dependente. Soma {{pt.irs-deducao-dependentes[ate-3-anos]}} se tiver até 3 anos, ou {{pt.irs-deducao-dependentes[segundo-ate-6-anos]}} a partir do segundo dependente com até 6 anos. Os dois acréscimos não se acumulam.",
    },
    {
      pregunta: "Como funciona a declaração conjunta?",
      respuesta: "O rendimento coletável do casal divide-se por dois, aplicam-se as taxas do artigo 68.º a essa metade e o resultado multiplica-se por dois (artigo 69.º do Código do IRS). Vale a pena simular a declaração conjunta e a separada.",
    },
  ],
  glosario: [
    { termino: "Rendimento coletável", definicion: "O rendimento sobre o qual se aplicam as taxas, depois da dedução específica e do mínimo de existência." },
    { termino: "Coleta", definicion: "O imposto que resulta de aplicar os escalões ao rendimento coletável." },
    { termino: "Dedução específica", definicion: "Valor que se tira ao rendimento bruto do trabalho antes de calcular o imposto." },
  ],
});
