import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.trabalho-em-feriado",
  h1: "Pagamento do trabalho em feriado ou dia de descanso {{anio}}",
  title: "Trabalho em feriado {{anio}}: acréscimo de {{cv.descanso-feriado-adicional}}",
  description: "Calcule o acréscimo mínimo de {{cv.descanso-feriado-adicional}} pelo trabalho num feriado ou no dia de descanso semanal em Cabo Verde.",
  intro: [
    "Quem trabalha num feriado ou no dia de descanso semanal recebe um acréscimo de, no mínimo, {{cv.descanso-feriado-adicional}} sobre a retribuição normal. Oito horas de quem ganha 100 000$00 por mês rendem um acréscimo de 4 195,80$00.",
    "Indique o salário base, o horário semanal e as horas trabalhadas. A calculadora mostra o acréscimo e o valor total das horas, somando a retribuição normal.",
  ],
  comoSeCalcula: [
    "A hora normal é o salário mensal vezes 12, a dividir por {{cv.semanas-ano}} semanas e pelas horas do período normal semanal, com o máximo normal de {{cv.horas-semanais}}.",
    "O artigo 208.º do Código Laboral manda pagar o trabalho em dia de descanso semanal com um acréscimo de, no mínimo, {{cv.descanso-feriado-adicional}} da retribuição normal. Os feriados fixados por lei equiparam-se ao descanso semanal.",
    "O acréscimo é a hora normal vezes a percentagem, vezes as horas trabalhadas. O valor total das horas soma a retribuição normal dessas horas.",
    "O acréscimo do trabalho em dia de descanso ou feriado não se soma ao do trabalho extraordinário. O do trabalho noturno pode somar-se a qualquer um deles.",
  ],
  ejemplo: [
    "Com 100 000$00 de salário e 44 horas por semana, a hora normal vale 524,48$00. Em oito horas de trabalho num feriado, o acréscimo de {{cv.descanso-feriado-adicional}} dá 4 195,80$00. Contando também a retribuição normal, as oito horas valem 8 391,61$00.",
  ],
  faq: [
    {
      pregunta: "Quanto se recebe por trabalhar num feriado?",
      respuesta: "Um acréscimo de, no mínimo, {{cv.descanso-feriado-adicional}} sobre a retribuição normal, segundo o artigo 208.º, n.º 1, do Código Laboral.",
    },
    {
      pregunta: "Os feriados contam como dia de descanso?",
      respuesta: "Para efeitos de pagamento, sim. O n.º 2 do artigo 208.º equipara o trabalho em dias feriados fixados por lei ao trabalho em dia de descanso semanal.",
    },
    {
      pregunta: "Posso receber este acréscimo e o das horas extraordinárias?",
      respuesta: "Não. O artigo 209.º, n.º 2, diz que os acréscimos do trabalho extraordinário e do trabalho em dia de descanso semanal ou feriado não são cumuláveis.",
    },
    {
      pregunta: "Tenho direito a folgar noutro dia?",
      respuesta: "Sim. Se trabalhou no dia de descanso obrigatório, o descanso passa para um dos três dias seguintes, sem prejuízo da remuneração, segundo o artigo 65.º, n.º 2.",
    },
  ],
  glosario: [
    { termino: "Descanso semanal", definicion: "O dia por semana em que o trabalhador tem direito a não trabalhar." },
    { termino: "Acréscimo", definicion: "A parte paga a mais sobre a retribuição normal por trabalhar em condições especiais." },
    { termino: "Retribuição horária", definicion: "O valor da hora normal de trabalho, calculado a partir do salário mensal." },
  ],
});
