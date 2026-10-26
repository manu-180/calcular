import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.compensacao-por-despedimento",
  h1: "Calcular a indemnização por despedimento",
  title: "Indemnização por despedimento em Angola: LGT 2023",
  description: "Calcule a compensação por despedimento por causas objectivas, caducidade ou despedimento ilícito com as regras da Lei Geral do Trabalho (Lei n.º 12/23).",
  intro: [
    "Quando o contrato termina por motivos do empregador, o trabalhador recebe uma compensação calculada sobre o salário base e os anos de antiguidade.",
    "Escolha o motivo da cessação e indique o salário base e as datas de admissão e de saída. A antiguidade conta uma fracção de {{ao.antiguidade-fraccao}} ou mais como ano inteiro.",
  ],
  comoSeCalcula: [
    "Causas objectivas (despedimento individual ou colectivo): um salário base por ano de antiguidade até {{ao.compensacao-anos-inteiros}}, e {{ao.compensacao-acima}} do salário base por cada ano acima disso.",
    "Caducidade do contrato, insolvência ou extinção do empregador: {{ao.compensacao-caducidade}} do salário base por ano de serviço.",
    "Despedimento disciplinar declarado ilícito pelo tribunal, sem reintegração: um salário base por ano de antiguidade, com um mínimo de {{ao.indemnizacao-ilicito-minimo}} de salário.",
    "Indemnização por não reintegração: {{ao.indemnizacao-nao-reintegracao}} do salário base por ano de serviço.",
  ],
  ejemplo: [
    "Com 350 000 Kz de salário base e 8 anos e 7 meses de casa, contam 9 anos. Num despedimento por causas objectivas a compensação é 5 × 350 000 + 4 × 175 000 = 2 450 000 Kz.",
  ],
  faq: [
    {
      pregunta: "Como se contam os anos de antiguidade?",
      respuesta: "Conta-se cada ano completo, e a fracção final de {{ao.antiguidade-fraccao}} ou mais vale como um ano inteiro. Com 4 anos e 2 meses contam 4 anos; com 4 anos e 3 meses contam 5.",
    },
    {
      pregunta: "Que salário entra na conta?",
      respuesta: "O salário base praticado na data da cessação ou do despedimento. Subsídios e prémios não entram.",
    },
    {
      pregunta: "A compensação inclui as férias e os subsídios?",
      respuesta: "Não. Os créditos vencidos, como férias não gozadas e os subsídios de férias e de Natal proporcionais, pagam-se à parte.",
    },
    {
      pregunta: "Há prazo para reclamar?",
      respuesta: "Sim. Os créditos resultantes do contrato, incluindo compensações e indemnizações, prescrevem um ano depois do dia seguinte ao fim do contrato.",
    },
  ],
  glosario: [
    { termino: "Causas objectivas", definicion: "Motivos ligados à empresa, e não ao comportamento do trabalhador, que levam a extinguir ou transformar postos de trabalho." },
    { termino: "Reintegração", definicion: "O regresso do trabalhador ao posto de trabalho depois de o despedimento ser declarado ilícito." },
    { termino: "Antiguidade", definicion: "O tempo de serviço do trabalhador na mesma entidade empregadora." },
  ],
});
