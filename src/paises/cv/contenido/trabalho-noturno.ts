import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.trabalho-noturno",
  h1: "Subsídio de trabalho noturno {{anio}} em Cabo Verde",
  title: "Trabalho noturno {{anio}}: subsídio mínimo de {{cv.subsidio-noturno}}",
  description: "Calcule o subsídio do trabalho noturno, devido entre as {{cv.noturno-inicio}} e as {{cv.noturno-fim}}, com o mínimo de {{cv.subsidio-noturno}}.",
  intro: [
    "Quem trabalha à noite recebe um subsídio de, no mínimo, {{cv.subsidio-noturno}}. Com 120 000$00 de salário e 80 horas noturnas no mês, o subsídio é de cerca de 12 587,41$00.",
    "Indique o salário base, o horário semanal e as horas noturnas do mês. A calculadora dá o valor da hora, o acréscimo por hora noturna e o total mensal.",
  ],
  comoSeCalcula: [
    "Considera-se noturno o trabalho feito entre as {{cv.noturno-inicio}} de um dia e as {{cv.noturno-fim}} do dia seguinte.",
    "A hora normal é o salário mensal vezes 12, a dividir por {{cv.semanas-ano}} semanas e pelas horas do período normal semanal, com o máximo normal de {{cv.horas-semanais}}.",
    "A calculadora aplica {{cv.subsidio-noturno}} a cada hora noturna e multiplica pelo número de horas feitas no mês. O resultado soma-se ao salário base.",
    "A lei fala em subsídio não inferior a essa percentagem do salário base. Um contrato ou uma convenção coletiva pode fixar um valor maior, que deve usar no lugar do mínimo.",
  ],
  ejemplo: [
    "Com 120 000$00 de salário e 44 horas por semana, a hora normal vale 629,37$00. O acréscimo de {{cv.subsidio-noturno}} dá 157,34$00 por hora noturna. Em 80 horas noturnas, o subsídio é 12 587,41$00 e o total do mês chega a 132 587,41$00.",
  ],
  faq: [
    {
      pregunta: "Quando começa e acaba o trabalho noturno?",
      respuesta: "Começa às {{cv.noturno-inicio}} e termina às {{cv.noturno-fim}} do dia seguinte, segundo o artigo 174.º do Código Laboral.",
    },
    {
      pregunta: "Qual é o subsídio mínimo?",
      respuesta: "Não inferior a {{cv.subsidio-noturno}} do salário base, nos termos do artigo 169.º, n.º 1, do Código Laboral. Quem trabalha por turnos recebe o subsídio que for acordado.",
    },
    {
      pregunta: "O subsídio noturno soma-se às horas extraordinárias?",
      respuesta: "Sim. O artigo 209.º, n.º 1, diz que o acréscimo do trabalho noturno é cumulável com os acréscimos do trabalho extraordinário e do trabalho em dia de descanso ou feriado.",
    },
    {
      pregunta: "O subsídio conta nas férias e na doença?",
      respuesta: "O artigo 169.º, n.º 2, diz que o subsídio também é devido durante as férias e em situação de baixa por doença ou acidente de trabalho.",
    },
  ],
  glosario: [
    { termino: "Trabalho noturno", definicion: "O que é prestado entre as {{cv.noturno-inicio}} de um dia e as {{cv.noturno-fim}} do seguinte." },
    { termino: "Subsídio noturno", definicion: "O acréscimo pago a quem trabalha de noite, de pelo menos {{cv.subsidio-noturno}}." },
    { termino: "Trabalho por turnos", definicion: "Horário em que grupos de trabalhadores se substituem no mesmo posto, com subsídio de valor acordado." },
  ],
});
