import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.calcular-iva",
  h1: "Calcular o IVA {{anio}} em Cabo Verde",
  title: "Calcular o IVA {{anio}} em Cabo Verde: {{cv.iva-taxa-normal}}",
  description: "A taxa normal do IVA é {{cv.iva-taxa-normal}}. Acrescente ou retire o imposto de um valor, com a taxa reduzida da eletricidade e da água.",
  intro: [
    "A taxa normal do IVA em Cabo Verde é de {{cv.iva-taxa-normal}}. Um produto de 10 000$00 sem imposto custa 11 500$00 com IVA.",
    "Indique o valor, diga se já inclui IVA e escolha a taxa. A calculadora separa o valor sem imposto, o IVA e o total. A eletricidade e a água para consumo final têm uma taxa própria de {{cv.iva-eletricidade-agua}}.",
  ],
  comoSeCalcula: [
    "Para acrescentar o IVA, multiplica-se o valor sem imposto pela taxa. Com {{cv.iva-taxa-normal}}, o IVA de 10 000$00 é 1 500$00.",
    "Para retirar o IVA de um valor que já o inclui, divide-se esse valor por 1 mais a taxa. Com {{cv.iva-taxa-normal}}, divide-se por 1,15. O IVA é a diferença entre o valor com imposto e o valor sem imposto.",
    "O artigo 17.º do Código do IVA fixa a taxa normal e diz que se aplica a que estiver em vigor quando o imposto se torna exigível. Há bens e serviços isentos, listados em anexo ao código, que não pagam IVA.",
  ],
  ejemplo: [
    "Uma fatura de 11 500$00 com IVA de {{cv.iva-taxa-normal}} corresponde a 10 000$00 de base e 1 500$00 de imposto. Numa fatura de eletricidade de 5 400$00 com a taxa de {{cv.iva-eletricidade-agua}}, a base é 5 000$00 e o IVA é 400$00.",
  ],
  faq: [
    {
      pregunta: "Qual é a taxa do IVA em Cabo Verde?",
      respuesta: "É {{cv.iva-taxa-normal}}, nos termos do artigo 17.º, n.º 1, do Código do IVA, na redação republicada no Boletim Oficial de 8 de janeiro de 2015.",
    },
    {
      pregunta: "A eletricidade e a água pagam a taxa normal?",
      respuesta: "Não. O artigo 84.º da Lei n.º 69/X/2025 fixa em {{cv.iva-eletricidade-agua}} a taxa do IVA na transmissão de eletricidade e no fornecimento de água aos consumidores finais.",
    },
    {
      pregunta: "Como se retira o IVA de um preço final?",
      respuesta: "Divide-se o preço por 1 mais a taxa, em decimais. Com a taxa normal de {{cv.iva-taxa-normal}}, o preço final dividido por 1,15 dá o valor sem imposto.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Imposto sobre o Valor Acrescentado, cobrado sobre a venda de bens e a prestação de serviços e sobre as importações." },
    { termino: "Base", definicion: "O valor da operação antes de acrescentar o imposto." },
    { termino: "Isenção", definicion: "Operação que não paga IVA por estar na lista anexa ao código ou noutra norma." },
  ],
});
