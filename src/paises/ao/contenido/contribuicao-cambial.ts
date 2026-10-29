import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.contribuicao-cambial",
  h1: "Contribuição sobre transferências para o exterior",
  title: "CEOC {{anio}}: contribuição sobre transferências em Angola",
  description: "As transferências para o exterior por serviços, capitais e transferências unilaterais pagam a CEOC: {{ao.ceoc[singular]}} para particulares e {{ao.ceoc[colectiva]}} para empresas.",
  intro: [
    "A Contribuição Especial sobre Operações Cambiais (CEOC) foi criada pela Lei do Orçamento Geral do Estado para 2026. O banco cobra-a no momento em que processa a transferência para o exterior.",
    "Escolha quem pede a transferência e indique o valor em kwanzas. A taxa é {{ao.ceoc[singular]}} para pessoas singulares e {{ao.ceoc[colectiva]}} para pessoas colectivas.",
  ],
  comoSeCalcula: [
    "Base: o valor em kwanzas que se transfere, seja qual for a taxa de câmbio usada.",
    "Contribuição = valor × {{ao.ceoc[singular]}} (pessoas singulares) ou × {{ao.ceoc[colectiva]}} (pessoas colectivas).",
  ],
  ejemplo: ["Um particular que transfere 1 000 000 Kz para pagar um serviço no estrangeiro paga 25 000 Kz de contribuição."],
  faq: [
    {
      pregunta: "Que transferências pagam a contribuição?",
      respuesta: "As feitas no âmbito de contratos de prestação de serviços, assistência técnica, consultoria e gestão, as operações de capitais e as transferências unilaterais.",
    },
    {
      pregunta: "As propinas e as despesas de saúde no estrangeiro pagam?",
      respuesta: "Não, se forem transferidas directamente para a conta da escola, da universidade ou da instituição de saúde. Também ficam de fora os dividendos e o reembolso de empréstimos com os respectivos juros.",
    },
    {
      pregunta: "Quem entrega a contribuição à AGT?",
      respuesta: "O banco ou a instituição financeira que faz a transferência. Liquida a contribuição no momento da operação e entrega-a à Administração Geral Tributária.",
    },
  ],
  glosario: [
    { termino: "CEOC", definicion: "Contribuição Especial sobre Operações Cambiais." },
    { termino: "Transferência unilateral", definicion: "Envio de dinheiro sem contrapartida, como uma ajuda à família no estrangeiro." },
  ],
});
