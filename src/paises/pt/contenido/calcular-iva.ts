import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.calcular-iva",
  h1: "Calcular IVA",
  title: "Calcular IVA: acrescentar ou retirar o IVA de um valor",
  description:
    "Acrescente ou retire o IVA de qualquer valor com as taxas em vigor no continente, nos Açores e na Madeira: normal, intermédia e reduzida.",
  intro: [
    "O IVA é o imposto que se soma ao preço da maior parte dos bens e serviços. Em Portugal há três taxas, e as Regiões Autónomas têm taxas próprias, mais baixas.",
    "Indique o valor, a taxa e a região para passar de um preço sem IVA para um preço com IVA, ou ao contrário.",
  ],
  comoSeCalcula: [
    "Para acrescentar o IVA, multiplica-se o valor sem IVA pela taxa. No continente a taxa normal é de {{pt.iva-taxas[normal]@continente}}, a intermédia de {{pt.iva-taxas[intermedia]@continente}} e a reduzida de {{pt.iva-taxas[reduzida]@continente}}.",
    "Nos Açores as taxas são {{pt.iva-taxas[normal]@acores}}, {{pt.iva-taxas[intermedia]@acores}} e {{pt.iva-taxas[reduzida]@acores}}. Na Madeira são {{pt.iva-taxas[normal]@madeira}}, {{pt.iva-taxas[intermedia]@madeira}} e {{pt.iva-taxas[reduzida]@madeira}}.",
    "Para retirar o IVA, divide-se o valor com IVA por 1 mais a taxa. Com a taxa normal do continente, divide-se por 1,23.",
  ],
  ejemplo: [
    "Um serviço de 100 euros sem IVA custa 123 euros no continente com a taxa normal. Nos Açores, o mesmo serviço fica em 116 euros.",
  ],
  faq: [
    {
      pregunta: "Que taxa de IVA se aplica a cada produto?",
      respuesta: "A taxa reduzida aplica-se aos bens e serviços da lista I anexa ao Código do IVA e a intermédia aos da lista II. Tudo o resto paga a taxa normal.",
    },
    {
      pregunta: "Porque é que o IVA é diferente nos Açores e na Madeira?",
      respuesta: "O Código do IVA permite que as Assembleias Legislativas das Regiões Autónomas fixem taxas mais baixas para as operações feitas nessas regiões.",
    },
    {
      pregunta: "Como se retira o IVA de um preço?",
      respuesta: "Divide-se o preço final por 1,23 se a taxa for a normal do continente. O resultado é a base e a diferença é o IVA. Tirar 23 % ao preço final dá um valor errado.",
    },
    {
      pregunta: "Quem está isento de IVA?",
      respuesta: "Entre outros casos, quem não ultrapassou {{pt.iva-limite-isencao}} de volume de negócios no ano anterior pode usar o regime de isenção do artigo 53.º do Código do IVA.",
    },
  ],
  glosario: [
    { termino: "Base tributável", definicion: "Valor sobre o qual se calcula o IVA, antes de o somar." },
    { termino: "Taxa normal", definicion: "A taxa que se aplica a todos os bens e serviços que não estão nas listas das taxas reduzida e intermédia." },
  ],
});
