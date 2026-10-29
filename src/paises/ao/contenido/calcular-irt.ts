import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.calcular-irt",
  h1: "Calcular o IRT",
  title: "Calcular o IRT {{anio}}: tabela do Grupo A em Angola",
  description: "Calcule o IRT do seu salário com a tabela de {{anio}}. Isento até {{ao.irt-grupo-a[0].hasta}} por mês, taxas de {{ao.irt-grupo-a[1].tasa}} a {{ao.irt-grupo-a[-1].tasa}}.",
  intro: [
    "O Imposto sobre os Rendimentos do Trabalho (IRT) é o imposto que a entidade empregadora retém todos os meses no seu salário.",
    "Indique o rendimento colectável, que é o salário sujeito a imposto já sem o desconto do INSS. A calculadora usa a tabela do Grupo A em vigor desde {{ao.irt-grupo-a#desde}}.",
  ],
  comoSeCalcula: [
    "Procure o escalão em que cai o rendimento colectável. Até {{ao.irt-grupo-a[0].hasta}} não há imposto.",
    "Acima desse valor, o IRT é a parcela fixa do escalão mais a taxa sobre o que excede o limite inferior.",
    "No escalão mais alto, acima de {{ao.irt-grupo-a[-1].desde}}, a parcela fixa é {{ao.irt-grupo-a[-1].cuotaFija}} e a taxa é {{ao.irt-grupo-a[-1].tasa}}.",
  ],
  ejemplo: [
    "Com um rendimento colectável de 350 000 Kz, cai no escalão de {{ao.irt-grupo-a[3].desde}} a {{ao.irt-grupo-a[3].hasta}}. O IRT é {{ao.irt-grupo-a[3].cuotaFija}} mais {{ao.irt-grupo-a[3].tasa}} sobre 50 000 Kz, ou seja 58 750 Kz.",
  ],
  faq: [
    {
      pregunta: "Até que salário estou isento de IRT em 2026?",
      respuesta: "Até {{ao.irt-grupo-a[0].hasta}} por mês de rendimento colectável. O limite subiu com a Lei n.º 14/25, que aprovou o Orçamento Geral do Estado para 2026.",
    },
    {
      pregunta: "Porque é que o imposto salta logo acima do limite isento?",
      respuesta: "A tabela publicada aplica uma parcela fixa de {{ao.irt-grupo-a[1].cuotaFija}} a quem ganha acima de {{ao.irt-grupo-a[1].desde}}. Um salário com um kwanza a mais já paga essa parcela.",
    },
    {
      pregunta: "O INSS desconta antes do IRT?",
      respuesta: "Sim. O IRT calcula-se sobre o salário depois da contribuição do trabalhador para a segurança social. Para ver as duas coisas juntas use a calculadora de salário líquido.",
    },
    {
      pregunta: "Esta tabela serve para trabalhadores por conta própria?",
      respuesta: "Não. É a tabela do Grupo A, para quem trabalha por conta de outrem. Os Grupos B e C têm regras próprias.",
    },
  ],
  glosario: [
    { termino: "IRT", definicion: "Imposto sobre os Rendimentos do Trabalho, retido na fonte pela entidade empregadora." },
    { termino: "Rendimento colectável", definicion: "A parte do salário sobre a qual se aplica a tabela, depois do desconto do INSS." },
    { termino: "Parcela fixa", definicion: "Valor de imposto que corresponde aos escalões anteriores e que se soma à taxa do escalão." },
  ],
});
