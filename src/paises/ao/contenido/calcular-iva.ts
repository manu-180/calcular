import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.calcular-iva",
  h1: "Calcular o IVA em Angola",
  title: "Calcular o IVA de {{ao.iva-geral}} em Angola",
  description: "Some ou retire o IVA de {{ao.iva-geral}} de um preço em kwanzas. Veja o valor sem imposto, o IVA e o total da factura.",
  intro: [
    "A taxa geral do Imposto sobre o Valor Acrescentado (IVA) em Angola é {{ao.iva-geral}}. Aplica-se às vendas de bens, às prestações de serviços e às importações.",
    "Escolha se quer somar o IVA a um preço sem imposto ou retirá-lo de um preço que já o inclui.",
  ],
  comoSeCalcula: [
    "Somar: IVA = preço sem imposto × {{ao.iva-geral}}. Preço final = preço + IVA.",
    "Retirar: preço sem imposto = preço com IVA / (1 + {{ao.iva-geral}}). O IVA é a diferença.",
  ],
  ejemplo: ["Um serviço de 100 000 Kz sem imposto fica em 114 000 Kz com IVA. De uma factura de 57 000 Kz, 7 000 Kz são IVA."],
  faq: [
    {
      pregunta: "Qual é a taxa do IVA em Angola?",
      respuesta: "A taxa geral é {{ao.iva-geral}}, segundo a Administração Geral Tributária. Há regimes e taxas especiais, como o da província de Cabinda, que esta calculadora não cobre.",
    },
    {
      pregunta: "Como se tira o IVA de um preço?",
      respuesta: "Divide-se o preço com IVA por 1 mais a taxa ({{ao.iva-geral}}). O resultado é o preço sem imposto e a diferença é o IVA.",
    },
    {
      pregunta: "O que é a cativação do IVA?",
      respuesta: "É a retenção do IVA pelo cliente. O Estado e as sociedades petrolíferas cativam 100 % do IVA das facturas dos fornecedores. Bancos, seguradoras e operadoras de telecomunicações cativam 50 %.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Imposto sobre o Valor Acrescentado, cobrado em cada venda e em cada serviço." },
    { termino: "Cativação", definicion: "Retenção do IVA pelo adquirente, que o entrega ao Estado em vez do fornecedor." },
  ],
});
