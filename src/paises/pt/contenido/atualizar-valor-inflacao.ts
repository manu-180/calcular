import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.atualizar-valor-inflacao",
  h1: "Atualizar um valor pela inflação",
  title: "Atualizar valores pela inflação com o IPC do INE",
  description: "Atualize qualquer valor pela inflação entre dois meses com o índice de preços no consumidor (IPC) do INE, desde 2010 até ao último mês publicado.",
  intro: [
    "Com a inflação, o mesmo dinheiro compra menos com o passar do tempo. Para comparar valores de anos diferentes é preciso atualizá-los pelo índice de preços no consumidor.",
    "Indique o valor e os dois meses. O cálculo usa o IPC total do INE, que o Banco de Portugal difunde no BPstat e que se atualiza todos os meses.",
  ],
  comoSeCalcula: [
    "Fator de atualização = IPC do mês final / IPC do mês inicial.",
    "Valor atualizado = valor original × fator.",
    "Se o mês final ainda não tiver índice publicado, o cálculo vai até ao último mês disponível.",
  ],
  ejemplo: ["1 000 euros de janeiro de 2020 equivalem a cerca de 1 240 euros em agosto de 2026."],
  faq: [
    {
      pregunta: "Que índice é usado?",
      respuesta: "O índice de preços no consumidor (IPC) total de Portugal, publicado pelo INE.",
    },
    {
      pregunta: "Quando entra um novo mês?",
      respuesta: "Quando o INE publica o IPC de um novo mês, o valor entra na série e o cálculo passa a usá-lo.",
    },
    {
      pregunta: "O que é a variação homóloga?",
      respuesta: "A variação do IPC face ao mesmo mês do ano anterior.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de preços no consumidor, que mede a evolução dos preços de um cabaz de bens e serviços." },
    { termino: "Fator de atualização", definicion: "Número pelo qual se multiplica o valor original." },
  ],
});
