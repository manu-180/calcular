import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.subsidio-de-ferias",
  h1: "Calcular o subsídio de férias",
  title: "Subsídio de férias em Angola: quanto vai receber",
  description: "O subsídio de férias é de pelo menos {{ao.gratificacao-ferias}} do salário base por ano de serviço. Calcule o valor, também no ano de admissão.",
  intro: [
    "Além do salário normal durante as férias, o trabalhador recebe uma gratificação de férias, a que quase todos chamam subsídio de férias.",
    "A Lei Geral do Trabalho garante pelo menos {{ao.gratificacao-ferias}} do salário base por cada ano de serviço efectivo. Indique o salário base e os meses completos de serviço.",
  ],
  comoSeCalcula: [
    "Com um ano completo: salário base × {{ao.gratificacao-ferias}}, ou a percentagem maior do contrato ou da convenção colectiva.",
    "Com menos de um ano (admissão, suspensão ou fim do contrato): o mesmo valor × meses completos / 12.",
    "O subsídio de férias não desconta para o INSS.",
  ],
  ejemplo: ["Com 350 000 Kz de salário base e um ano de serviço, o subsídio de férias mínimo é 175 000 Kz."],
  faq: [
    {
      pregunta: "Quando se paga o subsídio de férias?",
      respuesta: "Até 15 dias antes do início das férias, salvo se o contrato individual ou a convenção colectiva marcarem outra data.",
    },
    {
      pregunta: "Quem entrou este ano também recebe?",
      respuesta: "Sim, em proporção aos meses completos trabalhados. Quem tem cinco meses recebe cinco doze avos do valor anual.",
    },
    {
      pregunta: "A empresa pode pagar mais de {{ao.gratificacao-ferias}}?",
      respuesta: "Pode. A percentagem da lei é um mínimo, que a convenção colectiva ou o contrato individual podem subir.",
    },
    {
      pregunta: "O subsídio de férias desconta para o INSS?",
      respuesta: "Não. O Decreto Presidencial n.º 227/18 tira o subsídio de férias da base de incidência das contribuições.",
    },
  ],
  glosario: [
    { termino: "Gratificação de férias", definicion: "O nome que a Lei Geral do Trabalho dá ao subsídio de férias." },
    { termino: "Salário base", definicion: "A parte fixa do salário, sem subsídios nem prémios." },
  ],
});
