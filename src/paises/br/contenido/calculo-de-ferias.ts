import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.calculo-de-ferias",
  h1: "Cálculo de férias 2026",
  title: "Cálculo de férias 2026: valor com 1/3 e descontos",
  description: "Calcule suas férias com o terço constitucional, a venda de 10 dias (abono pecuniário) e os descontos de INSS e IRRF de 2026.",
  intro: [
    "Depois de 12 meses de trabalho, você tem direito a {{br.ferias-dias}} de férias pagas com um terço a mais do salário.",
    "Informe o salário, as faltas sem justificativa e se vai vender parte das férias. A calculadora mostra o valor bruto e o que cai na conta.",
  ],
  comoSeCalcula: [
    "O valor do dia é o salário mais a média de adicionais, dividido por 30.",
    "Os dias de férias dependem das faltas sem justificativa no período aquisitivo: até 5 faltas, {{br.ferias-dias}}; de 6 a 14, 24 dias; de 15 a 23, 18 dias; de 24 a 32, 12 dias.",
    "Sobre o valor dos dias de descanso entra o terço constitucional.",
    "Se você vender um terço das férias, recebe esses dias como abono pecuniário, também com o terço. O abono não paga INSS nem imposto de renda.",
    "INSS e IRRF são calculados sobre as férias e o terço, com as tabelas de 2026.",
  ],
  ejemplo: [
    "Com salário de R$ 3.000 e sem faltas, as férias valem R$ 3.000 e o terço R$ 1.000. O INSS fica em R$ 368,60 e não há imposto de renda. Caem R$ 3.631,40.",
    "Vendendo 10 dias, você descansa 20 dias e recebe R$ 4.000 no total, com R$ 215,69 de INSS.",
  ],
  faq: [
    {
      pregunta: "Quando as férias precisam ser pagas?",
      respuesta: "Até 2 dias antes do início do descanso, junto com o terço e o abono, se você vender dias.",
    },
    {
      pregunta: "Posso vender 10 dias de férias?",
      respuesta: "Pode vender um terço dos dias a que tem direito. O pedido tem que ser feito até 15 dias antes de terminar o período aquisitivo.",
    },
    {
      pregunta: "As férias podem ser divididas?",
      respuesta: "Sim, em até três períodos, se você concordar. Um deles precisa ter pelo menos 14 dias e os outros pelo menos 5 dias cada.",
    },
    {
      pregunta: "Faltas por atestado médico contam?",
      respuesta: "Não. Só as faltas sem justificativa reduzem os dias de férias.",
    },
  ],
  glosario: [
    { termino: "Período aquisitivo", definicion: "Os 12 meses de trabalho que dão direito às férias." },
    { termino: "Terço constitucional", definicion: "Acréscimo de um terço sobre o valor das férias garantido pela Constituição." },
    { termino: "Abono pecuniário", definicion: "Venda de até um terço dos dias de férias em troca de dinheiro." },
  ],
});
