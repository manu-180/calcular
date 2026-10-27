import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.calcular-iva",
  h1: "Calcular o IVA em Moçambique",
  title: "Calcular o IVA de {{mz.iva-geral}} em Moçambique",
  description: "Some ou retire o IVA de {{mz.iva-geral}} de um preço em meticais. Veja o valor sem imposto, o IVA e o total da factura.",
  intro: [
    "O Imposto sobre o Valor Acrescentado (IVA) em Moçambique é de {{mz.iva-geral}}. Aplica-se às vendas de bens, às prestações de serviços e às importações.",
    "Escolha se quer somar o IVA a um preço sem imposto ou retirá-lo de um preço que já o inclui.",
  ],
  comoSeCalcula: [
    "Somar: IVA = preço sem imposto × {{mz.iva-geral}}. Preço final = preço + IVA.",
    "Retirar: o artigo 34 do Código do IVA manda dividir o preço com imposto por 116 e multiplicar por 100. O resultado é o preço sem IVA e a diferença é o imposto.",
  ],
  ejemplo: ["Um serviço de 10 000 MT sem imposto fica em 11 600 MT com IVA. De uma factura de 5 800 MT, 800 MT são IVA."],
  faq: [
    {
      pregunta: "Qual é a taxa do IVA em Moçambique?",
      respuesta: "É {{mz.iva-geral}}. O artigo 34 do Código do IVA, na redacção da Lei n.º 10/2025, apura o preço sem imposto dividindo o valor com IVA por 116.",
    },
    {
      pregunta: "Quem está no ISPC cobra IVA?",
      respuesta: "Não. Quem optou pelo Imposto Simplificado para Pequenos Contribuintes não liquida IVA, e a factura que emite não deve incluir IVA.",
    },
    {
      pregunta: "Os serviços digitais do estrangeiro pagam IVA?",
      respuesta: "Desde 2026 a lei trata os bens e serviços digitais fornecidos a partir do estrangeiro como operações tributáveis em Moçambique. Quando o cliente é uma empresa, é ela que cumpre as obrigações do imposto.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Imposto sobre o Valor Acrescentado, cobrado em cada venda e em cada serviço." },
    { termino: "Base tributável", definicion: "O preço sem imposto, sobre o qual se aplica a taxa." },
  ],
});
