import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.calcular-sisa",
  h1: "Calcular a Sisa na compra de um imóvel",
  title: "Sisa em Moçambique: imposto na compra de casa",
  description: "Calcule a Sisa de {{mz.sisa}} sobre a compra de um prédio urbano, com base no maior valor entre o preço e o valor patrimonial.",
  intro: [
    "A Sisa é o imposto que se paga quando se compra um imóvel. Incide sobre as transmissões a título oneroso do direito de propriedade.",
    "Indique o preço da compra e, se souber, o valor patrimonial do prédio.",
  ],
  comoSeCalcula: [
    "Base = o maior valor entre o preço declarado e o valor patrimonial do prédio urbano.",
    "Sisa = base × {{mz.sisa}}.",
    "Se o comprador ou os seus sócios residem num território de regime fiscal mais favorável, a taxa é {{mz.sisa-agravada}}, sem isenções.",
  ],
  ejemplo: ["Uma casa comprada por 3 000 000 MT, com valor patrimonial de 2 500 000 MT, paga 60 000 MT de Sisa."],
  faq: [
    {
      pregunta: "Quem paga a Sisa?",
      respuesta: "O comprador. Numa troca, paga quem recebe o bem de maior valor, pela diferença.",
    },
    {
      pregunta: "Porque se usa o valor patrimonial?",
      respuesta: "O Código da Sisa manda aplicar o imposto ao maior valor entre o preço declarado e o valor patrimonial, para evitar escrituras com preços abaixo do real.",
    },
    {
      pregunta: "Há compras isentas de Sisa?",
      respuesta: "Sim. O Código da Sisa prevê isenções, por exemplo a favor do Estado e de outras entidades. Algumas são automáticas e outras têm de ser pedidas à Autoridade Tributária antes da escritura.",
    },
  ],
  glosario: [
    { termino: "Sisa", definicion: "Imposto sobre a transmissão onerosa de imóveis, regulado pelo Decreto n.º 46/2004." },
    { termino: "Valor patrimonial", definicion: "O valor do prédio inscrito na matriz para efeitos fiscais." },
  ],
});
