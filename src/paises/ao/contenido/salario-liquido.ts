import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.salario-liquido",
  h1: "Calcular o salário líquido em Angola",
  title: "Salário líquido 2026 em Angola: INSS e IRT",
  description: "Do salário bruto ao líquido com os {{ao.inss-trabalhador}} de INSS e a tabela do IRT de 2026. Inclui os subsídios de alimentação e de transporte.",
  intro: [
    "O salário líquido é o que recebe depois de a entidade empregadora descontar a segurança social e reter o IRT.",
    "Indique o salário base e os subsídios do mês. A calculadora aplica os {{ao.inss-trabalhador}} do INSS e a tabela do Grupo A em vigor desde {{ao.irt-grupo-a#desde}}.",
  ],
  comoSeCalcula: [
    "Somam-se o salário base e todos os subsídios do mês. Sobre esse total desconta-se {{ao.inss-trabalhador}} para o INSS.",
    "Para o IRT, tira-se a contribuição do INSS e a parte não sujeita dos subsídios: até {{ao.irt-subsidio-alimentacao}} de alimentação e até {{ao.irt-subsidio-transporte}} de transporte por mês.",
    "Ao valor que sobra (o rendimento colectável) aplica-se a tabela do IRT: isento até {{ao.irt-grupo-a[0].hasta}}, e acima disso a parcela fixa do escalão mais a taxa sobre o excesso.",
    "Líquido = remuneração bruta − INSS − IRT.",
  ],
  ejemplo: [
    "Com 350 000 Kz de salário base e sem subsídios, o INSS é 10 500 Kz. O rendimento colectável fica em 339 500 Kz e o IRT em 56 755 Kz. O líquido é 282 745 Kz.",
  ],
  faq: [
    {
      pregunta: "Quanto se desconta para a segurança social?",
      respuesta: "O trabalhador desconta {{ao.inss-trabalhador}} da remuneração ilíquida. A contribuição da entidade empregadora é paga por cima do salário e não sai do líquido.",
    },
    {
      pregunta: "Os subsídios de alimentação e de transporte pagam IRT?",
      respuesta: "Até {{ao.irt-subsidio-alimentacao}} por mês de alimentação e {{ao.irt-subsidio-transporte}} de transporte não estão sujeitos a IRT. O que passar desses limites entra no rendimento colectável. Para o INSS contam por inteiro.",
    },
    {
      pregunta: "Até que valor não se paga IRT?",
      respuesta: "Até {{ao.irt-grupo-a[0].hasta}} de rendimento colectável por mês, já sem o INSS. É o limite isento fixado pelo Orçamento Geral do Estado para 2026.",
    },
    {
      pregunta: "O subsídio de férias desconta INSS?",
      respuesta: "Não. O Decreto Presidencial n.º 227/18 tira o subsídio de férias da base de incidência das contribuições. O subsídio de Natal entra na base.",
    },
  ],
  glosario: [
    { termino: "INSS", definicion: "Instituto Nacional de Segurança Social, que gere a protecção social obrigatória." },
    { termino: "IRT", definicion: "Imposto sobre os Rendimentos do Trabalho, retido todos os meses pela entidade empregadora." },
    { termino: "Rendimento colectável", definicion: "A parte da remuneração sobre a qual se aplica a tabela do IRT." },
  ],
});
