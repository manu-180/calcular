import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.custo-do-trabalhador",
  h1: "Quanto custa um trabalhador à empresa",
  title: "Custo de um trabalhador em Angola: salário e INSS",
  description: "Some ao salário os {{ao.inss-empregador}} de INSS da entidade empregadora e os subsídios de férias e de Natal para ver o custo anual de um trabalhador.",
  intro: [
    "Contratar custa mais do que o salário. A empresa paga a sua parte do INSS e os dois subsídios anuais obrigatórios.",
    "Indique o salário base e os subsídios pagos todos os meses. A calculadora devolve o custo de um mês normal e o custo do ano.",
  ],
  comoSeCalcula: [
    "Cada mês: salário base mais subsídios, mais {{ao.inss-empregador}} de contribuição da entidade empregadora.",
    "Uma vez por ano: subsídio de férias de pelo menos {{ao.gratificacao-ferias}} do salário base, que não paga INSS, e subsídio de Natal de pelo menos {{ao.subsidio-natal}}, que paga.",
    "Custo anual = 12 meses + subsídio de férias + subsídio de Natal com o seu INSS.",
  ],
  ejemplo: ["Um salário base de 350 000 Kz custa 378 000 Kz por mês. Com os dois subsídios, o ano fica em 4 900 000 Kz."],
  faq: [
    {
      pregunta: "O desconto do trabalhador para o INSS entra no custo da empresa?",
      respuesta: "Não. Sai do salário do trabalhador. A empresa só o retém e entrega ao INSS junto com a sua parte.",
    },
    {
      pregunta: "Os subsídios de férias e de Natal são obrigatórios?",
      respuesta: "Sim. A Lei Geral do Trabalho garante pelo menos {{ao.gratificacao-ferias}} do salário base de subsídio de férias e {{ao.subsidio-natal}} de subsídio de Natal por ano de serviço.",
    },
    {
      pregunta: "Há outros custos que a calculadora não inclui?",
      respuesta: "Sim. O seguro de acidentes de trabalho, a formação e os benefícios dados por contrato ou convenção colectiva variam de empresa para empresa e não entram na conta.",
    },
  ],
  glosario: [
    { termino: "Entidade empregadora", definicion: "A empresa ou pessoa que contrata e paga o trabalhador." },
    { termino: "Salário base", definicion: "A parte fixa do salário, sem subsídios nem prémios." },
  ],
});
