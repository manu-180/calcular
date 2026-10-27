import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.periodo-probatorio",
  h1: "Até quando vai o período probatório",
  title: "Período probatório em Moçambique: quanto dura",
  description: "Veja a duração máxima do período probatório pela Lei do Trabalho, de 15 dias a seis meses, e o último dia em que pode terminar.",
  intro: [
    "O período probatório é a fase inicial do contrato em que as duas partes avaliam se querem continuar. A lei fixa a duração máxima.",
    "Escolha o tipo de contrato, a função e a data de início.",
  ],
  comoSeCalcula: [
    "Tempo indeterminado: até {{mz.probatorio-geral}} em regra, {{mz.probatorio-medio}} para técnicos de nível médio e {{mz.probatorio-superior}} para técnicos superiores e chefias.",
    "Prazo certo: {{mz.probatorio-prazo-longo}} se o contrato passa de um ano, {{mz.probatorio-prazo-medio}} entre seis meses e um ano e {{mz.probatorio-prazo-curto}} até seis meses.",
    "Termo incerto com duração prevista de 90 dias ou mais: {{mz.probatorio-prazo-curto}}.",
  ],
  ejemplo: ["Num contrato por tempo indeterminado que começa a 1 de Novembro de 2026, o período probatório vai no máximo até 31 de Dezembro de 2026."],
  faq: [
    {
      pregunta: "O período probatório é obrigatório?",
      respuesta: "Não. Se não ficar escrito no contrato, presume-se que as partes o quiseram excluir.",
    },
    {
      pregunta: "Pode ser mais curto?",
      respuesta: "Sim. O contrato individual ou o instrumento colectivo podem reduzi-lo ou excluí-lo.",
    },
    {
      pregunta: "Durante o período probatório tenho férias?",
      respuesta: "O tempo do período probatório conta como serviço efectivo, por isso conta para as férias do primeiro ano.",
    },
  ],
  glosario: [{ termino: "Período probatório", definicion: "Tempo inicial do contrato em que qualquer das partes o pode terminar com regras mais simples." }],
});
