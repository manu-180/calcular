import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.imposto-predial-rendas",
  h1: "Imposto Predial sobre as rendas",
  title: "Imposto sobre rendas de casas em Angola: {{ao.ip-renda}}",
  description: "As rendas de um imóvel arrendado pagam {{ao.ip-renda}} de Imposto Predial depois de uma dedução de {{ao.ip-renda-deducao}}. Calcule o imposto e a renda líquida.",
  intro: [
    "Quem arrenda uma casa, um apartamento ou uma loja paga Imposto Predial sobre as rendas que recebe.",
    "Indique a renda recebida, de um mês ou do ano. A calculadora tira a dedução para conservação e manutenção e aplica a taxa.",
  ],
  comoSeCalcula: [
    "Rendimento colectável = renda recebida − {{ao.ip-renda-deducao}} para despesas de conservação e manutenção.",
    "Imposto = rendimento colectável × {{ao.ip-renda}}.",
  ],
  ejemplo: ["Uma renda de 500 000 Kz tem uma dedução de 200 000 Kz. O imposto é {{ao.ip-renda}} de 300 000 Kz: 75 000 Kz."],
  faq: [
    {
      pregunta: "Quem paga o imposto sobre a renda, o senhorio ou o inquilino?",
      respuesta: "O imposto é do senhorio. Se o inquilino tiver contabilidade, é ele quem liquida e entrega o imposto até ao último dia útil do mês seguinte ao pagamento da renda. Se não tiver, liquida o senhorio.",
    },
    {
      pregunta: "A dedução depende das despesas que tive?",
      respuesta: "Não. A dedução de {{ao.ip-renda-deducao}} é uma percentagem fixa da renda, que a lei atribui às despesas de conservação e manutenção.",
    },
    {
      pregunta: "Conta a renda recebida ou a renda do contrato?",
      respuesta: "A renda efectivamente recebida, seja qual for o período a que respeite.",
    },
  ],
  glosario: [
    { termino: "Senhorio", definicion: "O dono do imóvel que o dá de arrendamento." },
    { termino: "Arrendatário", definicion: "O inquilino, que paga a renda." },
  ],
});
