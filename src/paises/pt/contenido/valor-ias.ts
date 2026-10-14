import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.valor-ias",
  h1: "Valor do IAS (indexante dos apoios sociais)",
  title: "IAS 2026: valor do indexante dos apoios sociais",
  description: "O IAS de 2026 é de {{pt.ias}}. Converta qualquer múltiplo do IAS em euros, por mês e por ano.",
  intro: [
    "O indexante dos apoios sociais (IAS) é o valor de referência usado para fixar prestações, limites e isenções. Em 2026 é de {{pt.ias}}, desde {{pt.ias#desde}}.",
    "Indique quantos IAS quer converter para ver o valor em euros.",
  ],
  comoSeCalcula: [
    "Valor em euros = número de IAS × {{pt.ias}}.",
    "O IAS é atualizado todos os anos por portaria, com base na inflação sem habitação e no crescimento da economia.",
  ],
  ejemplo: ["O máximo do subsídio de desemprego, 2,5 IAS, corresponde a 1 342,83 euros por mês em 2026."],
  faq: [
    {
      pregunta: "Quanto vale o IAS em 2026?",
      respuesta: "{{pt.ias}}, fixado pela Portaria n.º 480-A/2025/1, com efeitos desde 1 de janeiro de 2026.",
    },
    {
      pregunta: "Como é atualizado o IAS?",
      respuesta: "Pela variação média do IPC sem habitação dos últimos 12 meses, acrescida de uma parte do crescimento real do PIB. Para 2026 a atualização foi de 2,80 %.",
    },
    {
      pregunta: "Para que serve o IAS?",
      respuesta: "Serve de referência a apoios e limites: o subsídio de desemprego, por exemplo, não pode passar {{pt.desemprego-limites-ias[maximo]}} IAS, e a dedução específica do IRS é de {{pt.irs-deducao-especifica-ias}} IAS.",
    },
  ],
  glosario: [
    { termino: "IAS", definicion: "Indexante dos apoios sociais, criado pela Lei n.º 53-B/2006." },
    { termino: "Portaria", definicion: "Diploma do Governo que, neste caso, fixa o valor anual do IAS." },
  ],
});
