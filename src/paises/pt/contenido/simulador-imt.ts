import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.simulador-imt",
  h1: "Simulador de IMT e Imposto do Selo",
  title: "Simulador de IMT {{anio}} e Imposto do Selo na compra de casa",
  description: "Calcule o IMT e o Imposto do Selo na compra de casa com os escalões de {{anio}}, incluindo o IMT Jovem e o selo do crédito à habitação.",
  intro: [
    "Na compra de um imóvel pagam-se dois impostos: o IMT e o Imposto do Selo. O IMT depende do valor e da finalidade do imóvel.",
    "Indique o valor, a finalidade e, se quiser, o valor do crédito para ver quanto tem de reservar para impostos.",
  ],
  comoSeCalcula: [
    "O IMT incide sobre o valor do contrato ou sobre o valor patrimonial tributário, o que for maior.",
    "Na habitação própria e permanente e nas outras habitações, o IMT é progressivo até ao escalão da taxa única: a parte até ao limite do escalão anterior paga a taxa média e o excedente a taxa marginal. Acima, aplica-se 6 % ou 7,5 % a todo o valor.",
    "Outros prédios urbanos pagam {{pt.imt-outros[urbano]}} e os rústicos {{pt.imt-outros[rustico]}}.",
    "O Imposto do Selo é {{pt.imposto-selo[aquisicao]}} do valor da compra, mais {{pt.imposto-selo[credito-5-anos]}} do crédito quando o prazo é de cinco anos ou mais.",
  ],
  ejemplo: ["Uma casa para habitação própria e permanente de 200 000 euros paga 3 542,04 euros de IMT e 1 600 euros de Imposto do Selo."],
  faq: [
    {
      pregunta: "O que é o IMT Jovem?",
      respuesta: "É a isenção de IMT na primeira compra de habitação própria e permanente por quem tem até 35 anos, não é dependente para o IRS e não teve casa nos três anos anteriores. Até 330 539 euros não paga IMT; acima, paga 8 % sobre a parte que excede esse valor, até 660 982 euros.",
    },
    {
      pregunta: "Até que valor a habitação própria e permanente está isenta?",
      respuesta: "Em 2026, até 106 346 euros não se paga IMT na compra de habitação própria e permanente.",
    },
    {
      pregunta: "O Imposto do Selo também se paga no crédito?",
      respuesta: "Sim. A utilização de crédito com prazo de cinco anos ou mais paga {{pt.imposto-selo[credito-5-anos]}} sobre o valor emprestado.",
    },
  ],
  glosario: [
    { termino: "IMT", definicion: "Imposto Municipal sobre as Transmissões Onerosas de Imóveis." },
    { termino: "VPT", definicion: "Valor patrimonial tributário, o valor do imóvel registado nas Finanças." },
    { termino: "Habitação própria e permanente", definicion: "A casa onde o comprador vai morar com o seu agregado de forma permanente." },
  ],
});
