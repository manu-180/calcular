import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.calcular-sisa",
  h1: "Calcular a SISA na compra de um imóvel",
  title: "SISA em Angola 2026: imposto na compra de casa",
  description: "Na compra de um imóvel paga-se {{ao.ip-transmissao}} de Imposto Predial (a que muitos chamam SISA). Em 2026 a habitação até {{ao.ip-habitacao-isencao}} está isenta.",
  intro: [
    "O imposto que muitos ainda chamam SISA é hoje o Imposto Predial sobre a transmissão de imóveis. Quem compra paga {{ao.ip-transmissao}} do valor.",
    "Para 2026, o Orçamento Geral do Estado isenta a compra de habitação até {{ao.ip-habitacao-isencao}} e reduz a taxa a metade até {{ao.ip-habitacao-reducao-limite}}.",
  ],
  comoSeCalcula: [
    "Valor tributável: o maior entre o valor patrimonial da matriz e o valor declarado na escritura.",
    "Taxa geral: {{ao.ip-transmissao}} do valor tributável.",
    "Habitação até {{ao.ip-habitacao-isencao}}: isenta. Habitação acima disso e até {{ao.ip-habitacao-reducao-limite}}: taxa reduzida em {{ao.ip-habitacao-reducao}}.",
  ],
  ejemplo: ["Um apartamento de 80 000 000 Kz para habitação paga 1 % em 2026: 800 000 Kz. Uma loja do mesmo valor pagaria 1 600 000 Kz."],
  faq: [
    {
      pregunta: "A SISA e o Imposto Predial são a mesma coisa?",
      respuesta: "Na compra de imóveis, sim na prática: o imposto que se paga é o Imposto Predial sobre a transmissão, à taxa de {{ao.ip-transmissao}}, regulado pelo Código do Imposto Predial (Lei n.º 20/20). Muita gente continua a chamar-lhe SISA.",
    },
    {
      pregunta: "Sobre que valor se paga?",
      respuesta: "Sobre o maior entre o valor patrimonial que consta da matriz, o valor da avaliação no caso de prédio omisso e o valor declarado.",
    },
    {
      pregunta: "Até quando se paga?",
      respuesta: "Nas compras, o imposto é liquidado até ao último dia útil do mês seguinte ao acto da transmissão.",
    },
    {
      pregunta: "A isenção da habitação vale para sempre?",
      respuesta: "Está no Orçamento Geral do Estado para 2026 (Lei n.º 14/25). Para os anos seguintes depende do novo orçamento.",
    },
  ],
  glosario: [
    { termino: "SISA", definicion: "O nome pelo qual muitos ainda conhecem o imposto pago na compra de imóveis." },
    { termino: "Prédio omisso", definicion: "Imóvel que ainda não está inscrito na matriz predial." },
  ],
});
