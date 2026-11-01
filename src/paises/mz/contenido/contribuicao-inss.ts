import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.contribuicao-inss",
  h1: "Calcular a contribuição para o INSS",
  title: "Contribuição para o INSS em Moçambique: TCO e TCP",
  description: "Quanto se paga ao INSS por mês: {{mz.inss-trabalhador}} do trabalhador e {{mz.inss-empregador}} da empresa, ou {{mz.inss-tcp}} no regime por conta própria.",
  intro: [
    "A segurança social obrigatória em Moçambique é gerida pelo Instituto Nacional de Segurança Social (INSS). A contribuição é uma percentagem da remuneração mensal.",
    "Escolha o regime. Por conta de outrem pagam o trabalhador e a empresa; por conta própria paga o próprio trabalhador.",
  ],
  comoSeCalcula: [
    "Trabalhador por conta de outrem (TCO): {{mz.inss-trabalhador}} descontados no salário mais {{mz.inss-empregador}} pagos pela entidade empregadora.",
    "Trabalhador por conta própria (TCP): {{mz.inss-tcp}} do rendimento, pagos na totalidade pelo próprio.",
  ],
  ejemplo: ["Com 30 000 MT de salário, o trabalhador desconta 900 MT e a empresa paga 1 200 MT. Ao INSS chegam 2 100 MT por mês."],
  faq: [
    {
      pregunta: "Quem entrega as contribuições ao INSS?",
      respuesta: "A entidade empregadora. Desconta a parte do trabalhador no salário, junta a sua parte e entrega o total todos os meses.",
    },
    {
      pregunta: "Quanto paga um trabalhador por conta própria?",
      respuesta: "{{mz.inss-tcp}} do rendimento, sem parte de empresa. É o regime dos TCP.",
    },
    {
      pregunta: "A contribuição da empresa sai do meu salário?",
      respuesta: "Não. Os {{mz.inss-empregador}} da empresa são pagos por cima do salário. Do seu salário só saem os {{mz.inss-trabalhador}}.",
    },
  ],
  glosario: [
    { termino: "TCO", definicion: "Trabalhador por conta de outrem: quem trabalha para uma entidade empregadora." },
    { termino: "TCP", definicion: "Trabalhador por conta própria: quem trabalha para si." },
    { termino: "Contribuinte", definicion: "Para o INSS, a entidade empregadora que paga contribuições." },
  ],
});
