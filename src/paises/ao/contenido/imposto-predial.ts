import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.imposto-predial",
  h1: "Calcular o Imposto Predial (IPU)",
  title: "Imposto Predial em Angola: calcule o IPU do imóvel",
  description: "Calcule o Imposto Predial sobre a detenção de casas, apartamentos e terrenos para construção com o quadro de taxas da AGT. Inclui o agravamento por desocupação.",
  intro: [
    "Quem é dono de um prédio urbano paga todos os anos o Imposto Predial sobre a detenção, a que muitos ainda chamam IPU.",
    "Indique o tipo de imóvel e o valor patrimonial que consta da matriz. A calculadora aplica o quadro de taxas do Código do Imposto Predial.",
  ],
  comoSeCalcula: [
    "Até {{ao.ip-detencao[0].hasta}}: {{ao.ip-detencao[0].tasa}} do valor patrimonial.",
    "De {{ao.ip-detencao[1].desde}} a {{ao.ip-detencao[1].hasta}}: um valor fixo de {{ao.ip-detencao[1].cuotaFija}}.",
    "Acima de {{ao.ip-detencao[2].desde}}: {{ao.ip-detencao[2].tasa}} sobre o que passa de {{ao.ip-detencao[1].desde}}.",
    "Terrenos para construção: {{ao.ip-terreno}} do valor. Prédios desocupados há mais de um ano pagam mais {{ao.ip-adicional-desocupado}} do imposto.",
  ],
  ejemplo: ["Um apartamento com valor patrimonial de 20 000 000 Kz paga 0,5 % sobre 15 000 000 Kz, ou seja 75 000 Kz por ano."],
  faq: [
    {
      pregunta: "Até quando se paga o Imposto Predial?",
      respuesta: "Até ao último dia útil de março do ano seguinte. A pedido do contribuinte, pode ser pago em seis prestações seguidas.",
    },
    {
      pregunta: "Qual é o valor patrimonial?",
      respuesta: "É o valor do prédio que resulta da avaliação feita nos termos da lei e que consta da matriz predial.",
    },
    {
      pregunta: "E se a casa estiver arrendada?",
      respuesta: "As rendas recebidas pagam Imposto Predial próprio. Se o inquilino tiver contabilidade, é ele quem o liquida. Para esse cálculo use a calculadora do imposto sobre as rendas.",
    },
  ],
  glosario: [
    { termino: "IPU", definicion: "Imposto Predial Urbano, o nome antigo do Imposto Predial sobre a detenção." },
    { termino: "Matriz predial", definicion: "O registo fiscal dos imóveis, com o seu valor patrimonial." },
  ],
});
