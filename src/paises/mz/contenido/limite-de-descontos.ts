import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.limite-de-descontos",
  h1: "Quanto me podem descontar no salário",
  title: "Limite de descontos no salário em Moçambique",
  description: "A Lei do Trabalho não deixa que os descontos passem de um terço da remuneração mensal. Veja o máximo e a margem que ainda tem.",
  intro: [
    "O salário só pode sofrer descontos autorizados por escrito pelo trabalhador ou ordenados por lei, por decisão judicial ou arbitral.",
    "Mesmo assim, o total dos descontos nunca pode passar de um terço da remuneração mensal (artigo 124 da Lei n.º 13/2023).",
  ],
  comoSeCalcula: [
    "Máximo de descontos = remuneração mensal ÷ {{mz.limite-descontos}}.",
    "Margem disponível = máximo − descontos que já tem.",
    "A parte da remuneração paga em espécie não pode passar de {{mz.limite-especie}} da remuneração global.",
  ],
  ejemplo: ["Com 30 000 MT de remuneração, os descontos podem chegar a 10 000 MT por mês. Se já tem 4 000 MT, sobram 6 000 MT de margem."],
  faq: [
    {
      pregunta: "O IRPS e o INSS contam para o limite?",
      respuesta: "A lei permite os descontos para o Estado e a segurança social sem autorização do trabalhador, e o limite de um terço vale para o total dos descontos.",
    },
    {
      pregunta: "Um adiantamento de salário conta?",
      respuesta: "Não. O valor pago como adiantamento a pedido do trabalhador não é considerado desconto.",
    },
    {
      pregunta: "O empregador pode descontar uma multa?",
      respuesta: "Só a multa por infracção disciplinar prevista na lei, até 20 dias de salário, e sempre dentro do limite de um terço.",
    },
  ],
  glosario: [{ termino: "Remuneração em espécie", definicion: "Parte do pagamento feita em bens ou serviços em vez de dinheiro." }],
});
