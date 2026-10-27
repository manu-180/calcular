import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.salario-minimo",
  h1: "Salário mínimo nacional",
  title: "Salário mínimo nacional {{anio}}: valor mensal, anual e à hora",
  description: "O salário mínimo nacional é de {{pt.rmmg}} por mês. Veja o valor anual com os subsídios, o valor por hora e o mínimo em tempo parcial.",
  intro: [
    "A retribuição mínima mensal garantida, conhecida como salário mínimo nacional, é de {{pt.rmmg}} desde {{pt.rmmg#desde}}.",
    "Indique as horas semanais para ver o mínimo em tempo parcial, o total do ano e o valor de uma hora de trabalho.",
  ],
  comoSeCalcula: [
    "Em tempo completo (40 horas por semana) o mínimo é {{pt.rmmg}} por mês. Em tempo parcial, é proporcional às horas.",
    "No ano recebem-se 14 salários: os 12 meses mais o subsídio de férias e o subsídio de Natal.",
    "O valor por hora segue a fórmula do artigo 271.º do Código do Trabalho: salário mensal × 12 a dividir por 52 semanas × 40 horas.",
  ],
  ejemplo: ["Com 20 horas por semana, o mínimo é metade do valor mensal: 460 euros, e 6 440 euros no ano."],
  faq: [
    {
      pregunta: "Quanto é o salário mínimo em 2026?",
      respuesta: "{{pt.rmmg}} por mês, fixado pelo Decreto-Lei n.º 139/2025, com efeitos desde 1 de janeiro de 2026.",
    },
    {
      pregunta: "O salário mínimo inclui o subsídio de alimentação?",
      respuesta: "Não. Segundo o artigo 274.º do Código do Trabalho, o mínimo não inclui subsídios, prémios ou gratificações pagos de forma acidental ou por período superior a um mês.",
    },
    {
      pregunta: "Quem trabalha em tempo parcial recebe o mínimo inteiro?",
      respuesta: "Não. O mínimo é proporcional às horas trabalhadas. Com 30 horas por semana corresponde a três quartos do valor mensal.",
    },
    {
      pregunta: "Há casos em que o mínimo é mais baixo?",
      respuesta: "Sim. O artigo 275.º do Código do Trabalho admite uma redução de 20 % para praticantes, aprendizes, estagiários e formandos em formação certificada.",
    },
  ],
  glosario: [
    { termino: "RMMG", definicion: "Retribuição mínima mensal garantida, o nome legal do salário mínimo nacional." },
    { termino: "Tempo parcial", definicion: "Horário inferior ao tempo completo praticado em situação comparável." },
  ],
});
