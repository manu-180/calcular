import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.trabalho-nocturno",
  h1: "Calcular o adicional de trabalho nocturno",
  title: "Trabalho nocturno em Angola: adicional de {{ao.nocturno-adicional}}",
  description: "O trabalho entre as 20h00 e as 6h00 dá direito a um adicional de {{ao.nocturno-adicional}} do salário de base. Calcule o valor do mês.",
  intro: [
    "Na Lei Geral do Trabalho, trabalho nocturno é o que se presta entre as 20h00 de um dia e as 6h00 do dia seguinte.",
    "Quem trabalha nesse período tem direito a uma remuneração adicional de {{ao.nocturno-adicional}} do salário de base. Escolha se todo o horário é nocturno ou indique as horas do mês.",
  ],
  comoSeCalcula: [
    "Todo o horário nocturno: adicional = salário base × {{ao.nocturno-adicional}}.",
    "Só algumas horas: valor da hora normal = salário base × 12 / (52 × horas semanais). Cada hora nocturna paga mais {{ao.nocturno-adicional}} desse valor.",
  ],
  ejemplo: ["Com 350 000 Kz de salário base e o horário todo nocturno, o adicional é 70 000 Kz por mês."],
  faq: [
    {
      pregunta: "Que horas contam como trabalho nocturno?",
      respuesta: "As que vão das 20h00 de um dia às 6h00 do dia seguinte.",
    },
    {
      pregunta: "O adicional pode ser trocado por menos horas?",
      respuesta: "Sim, por convenção colectiva. O adicional pode ser substituído por uma redução equivalente do tempo de trabalho nocturno, se isso não prejudicar a actividade.",
    },
    {
      pregunta: "Horas extra de noite somam os dois adicionais?",
      respuesta: "Sim. Os adicionais do trabalho extraordinário acrescem ao adicional nocturno.",
    },
    {
      pregunta: "Quantas horas pode ter o dia de um trabalhador nocturno?",
      respuesta: "O período normal de trabalho do trabalhador nocturno não pode passar de oito horas por dia, salvo as excepções previstas na lei.",
    },
  ],
  glosario: [
    { termino: "Salário de base", definicion: "A parte fixa do salário, sobre a qual se calcula o adicional." },
    { termino: "Adicional", definicion: "Valor pago por cima da remuneração normal." },
  ],
});
