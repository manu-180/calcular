import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.salario-liquido",
  h1: "Salário líquido {{anio}} em Cabo Verde: INPS e IRPS",
  title: "Salário líquido {{anio}} em Cabo Verde: INPS e IRPS",
  description: "Veja quanto recebe depois do INPS de {{cv.inps-trabalhador}} e da retenção de IRPS em vigor. Indique o bruto mensal e obtenha o líquido.",
  intro: [
    "Quem ganha 100 000$00 brutos por mês recebe cerca de 81 225$00 depois do INPS de {{cv.inps-trabalhador}} e da retenção de IRPS. O líquido é sempre o bruto menos esses dois descontos.",
    "Indique a remuneração bruta mensal. A calculadora aplica a quotização do INPS e a fórmula de retenção do IRPS para trabalhadores dependentes, que só começa acima de {{cv.irps-limite-retencao}} por mês.",
  ],
  comoSeCalcula: [
    "Primeiro, o INPS: a entidade empregadora desconta {{cv.inps-trabalhador}} da remuneração ilíquida e entrega ao instituto até ao dia 15 do mês seguinte.",
    "Depois, o IRPS. Até {{cv.irps-limite-retencao}} de remuneração bruta mensal não há retenção. Acima disso a fórmula tem três escalões. Até {{cv.irps-limites[escalao1]}} paga {{cv.irps-taxas[escalao1]}} da remuneração menos {{cv.irps-parcelas[escalao1]}}. Até {{cv.irps-limites[escalao2]}} paga {{cv.irps-taxas[escalao2]}} menos {{cv.irps-parcelas[escalao2]}}. Acima, {{cv.irps-taxas[escalao3]}} menos {{cv.irps-parcelas[escalao3]}}.",
    "Se a fórmula der menos de {{cv.irps-retencao-minima}}, retém-se esse mínimo. A taxa do escalão incide sobre a remuneração bruta inteira, não sobre a diferença entre escalões, e a parcela a abater corrige o resultado.",
    "O líquido é o bruto menos o INPS e menos o IRPS. Os valores são arredondados ao escudo, como pede a Direção Nacional das Receitas do Estado nas retenções.",
  ],
  ejemplo: [
    "Com 100 000$00 de bruto, o INPS é 8 500$00. A remuneração está no segundo escalão, por isso o IRPS é 0,21 × 100 000 − 10 725 = 10 275$00. O líquido é 100 000 − 8 500 − 10 275 = 81 225$00.",
    "Com 17 000$00, o valor do salário mínimo, não há IRPS e só se desconta o INPS de 1 445$00. O líquido é 15 555$00.",
  ],
  faq: [
    {
      pregunta: "Quanto se desconta para o INPS?",
      respuesta: "O trabalhador paga {{cv.inps-trabalhador}} da remuneração ilíquida, e a entidade empregadora paga mais {{cv.inps-empregador}} por conta própria. A taxa global de 24,5 % está na Portaria Conjunta n.º 28/2024.",
    },
    {
      pregunta: "A partir de que salário se paga IRPS?",
      respuesta: "A retenção ocorre a partir de {{cv.irps-limite-retencao}} de remuneração bruta mensal, o equivalente a 439 284$00 por ano, segundo o artigo 71.º, n.º 7, do Código do IRPS.",
    },
    {
      pregunta: "O que acontece ao subsídio de férias e ao de Natal?",
      respuesta: "Têm retenção autónoma de IRPS e não se somam ao rendimento do mês em que são pagos. O artigo 71.º, n.º 9, do Código do IRPS aplica a mesma regra aos prémios de produtividade.",
    },
    {
      pregunta: "O IRPS retido é o imposto final do ano?",
      respuesta: "A retenção da categoria A tem carácter liberatório e progressivo. Se o trabalhador optar pelo englobamento dos rendimentos, passa a ser retenção por conta do imposto devido a final.",
    },
  ],
  glosario: [
    { termino: "INPS", definicion: "Instituto Nacional de Previdência Social, a que se pagam as contribuições da proteção social obrigatória." },
    { termino: "IRPS", definicion: "Imposto sobre o Rendimento das Pessoas Singulares, retido todos os meses sobre os salários." },
    { termino: "Retenção na fonte", definicion: "Imposto que a entidade empregadora desconta ao pagar o salário e entrega ao Estado." },
    { termino: "Remuneração ilíquida", definicion: "O salário antes de qualquer desconto, também chamado bruto." },
  ],
});
