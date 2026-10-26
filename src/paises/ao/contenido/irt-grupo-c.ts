import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.irt-grupo-c",
  h1: "Calcular o IRT do Grupo C",
  title: "IRT Grupo C 2026: imposto de {{ao.irt-grupo-c-taxa}} sobre as vendas",
  description: "Comerciantes e prestadores do Grupo C com facturação até {{ao.irt-grupo-c-limite}} pagam IRT de {{ao.irt-grupo-c-taxa}} sobre as vendas. Calcule o imposto de 2026.",
  intro: [
    "O Grupo C do IRT abrange quem exerce por conta própria actividades comerciais e industriais, como o pequeno comércio.",
    "Para 2026, quem facturou até {{ao.irt-grupo-c-limite}} em 2025 paga {{ao.irt-grupo-c-taxa}} sobre o volume de vendas e serviços. Indique a facturação de 2025 e as vendas a declarar.",
  ],
  comoSeCalcula: [
    "Facturação de 2025 até {{ao.irt-grupo-c-limite}}: imposto = vendas não sujeitas a retenção na fonte × {{ao.irt-grupo-c-taxa}}.",
    "Actividades agrícolas, silvícolas, pecuárias e piscatórias acima desse limite: taxa de {{ao.irt-grupo-c-agricola}}.",
    "Os outros contribuintes acima do limite apuram o rendimento pela tabela de lucros mínimos ou pela contabilidade.",
  ],
  ejemplo: ["Uma loja que facturou 6 000 000 Kz em 2025 e vende o mesmo em 2026 paga 390 000 Kz de IRT."],
  faq: [
    {
      pregunta: "Porque se tiram as vendas sujeitas a retenção na fonte?",
      respuesta: "Porque nesses serviços o imposto já foi retido pelo cliente. A taxa de {{ao.irt-grupo-c-taxa}} aplica-se às vendas e serviços que não sofreram retenção.",
    },
    {
      pregunta: "Quem tem contabilidade também paga sobre as vendas?",
      respuesta: "Não. Quem tem contabilidade organizada segue as regras do Imposto Industrial (regime geral), seja qual for o volume de facturação.",
    },
    {
      pregunta: "Esta taxa vale todos os anos?",
      respuesta: "A regra está na Lei do Orçamento Geral do Estado para 2026 (Lei n.º 14/25). Cada orçamento pode mudá-la.",
    },
  ],
  glosario: [
    { termino: "Grupo C", definicion: "Os rendimentos de actividades comerciais e industriais por conta própria que constam da tabela de lucros mínimos." },
    { termino: "Retenção na fonte", definicion: "Imposto descontado pelo cliente no momento do pagamento e entregue por ele ao Estado." },
  ],
});
