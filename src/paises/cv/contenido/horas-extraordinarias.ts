import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.horas-extraordinarias",
  h1: "Calcular as horas extraordinárias {{anio}} em Cabo Verde",
  title: "Horas extraordinárias {{anio}}: acréscimo de {{cv.he-adicional}}",
  description: "Calcule o pagamento do trabalho extraordinário com o acréscimo mínimo de {{cv.he-adicional}} previsto no Código Laboral.",
  intro: [
    "Cada hora extraordinária paga pelo menos {{cv.he-adicional}} a mais do que a hora normal. Com 100 000$00 de salário, a hora normal vale cerca de 524,48$00 e a extraordinária cerca de 708,04$00.",
    "Indique o salário base, o horário semanal e as horas feitas além do período normal. Se parte delas foi entre as 22 horas e as 6 horas, o acréscimo do trabalho noturno soma-se.",
  ],
  comoSeCalcula: [
    "O Código Laboral define o valor da hora normal como o salário mensal vezes 12, a dividir por {{cv.semanas-ano}} semanas e pelas horas do período normal semanal.",
    "A hora extraordinária é a hora normal com um acréscimo de, no mínimo, {{cv.he-adicional}}. O valor das horas é o número de horas vezes essa hora.",
    "Nas horas feitas à noite, o acréscimo do trabalho noturno soma-se ao do trabalho extraordinário. A calculadora aplica {{cv.subsidio-noturno}} sobre a hora normal a cada hora noturna.",
    "Os limites legais são {{cv.he-limite-dia}} extraordinárias por dia e {{cv.he-limite-ano}} por ano, que podem subir até {{cv.he-limite-ano-consentimento}} com o consentimento escrito do trabalhador.",
  ],
  ejemplo: [
    "Com 100 000$00 de salário e 44 horas por semana, a hora normal é 100 000 × 12 / (52 × 44), ou 524,48$00. Dez horas extraordinárias de dia valem 10 × 524,48 × 1,35, ou 7 080,42$00. Se quatro dessas horas foram à noite, soma-se mais 524,48$00 e o total sobe para 7 604,90$00.",
  ],
  faq: [
    {
      pregunta: "Quanto se paga a mais pelo trabalho extraordinário?",
      respuesta: "Pelo menos {{cv.he-adicional}} sobre a retribuição normal. A regra está no artigo 207.º do Código Laboral, na redação do Decreto-Legislativo n.º 1/2016.",
    },
    {
      pregunta: "Qual é o limite de horas extraordinárias?",
      respuesta: "Duas horas por dia, até {{cv.he-limite-ano}} por ano. Com consentimento escrito do trabalhador o limite anual sobe até {{cv.he-limite-ano-consentimento}}, segundo o artigo 161.º.",
    },
    {
      pregunta: "O trabalho noturno e o extraordinário acumulam?",
      respuesta: "O acréscimo noturno pode somar-se ao do trabalho extraordinário, como diz o artigo 209.º, n.º 1. O acréscimo do trabalho extraordinário não se soma ao do trabalho em dia de descanso ou feriado.",
    },
    {
      pregunta: "Quando prescrevem os créditos de horas extraordinárias?",
      respuesta: "O Código Laboral manda que os créditos relativos a férias e a trabalho extraordinário prescrevam no prazo de três anos.",
    },
  ],
  glosario: [
    { termino: "Trabalho extraordinário", definicion: "O trabalho prestado fora do período normal de trabalho a que o trabalhador está obrigado." },
    { termino: "Retribuição horária", definicion: "O valor da hora normal, calculado a partir do salário mensal e do horário semanal." },
    { termino: "Período normal de trabalho", definicion: "O horário que o trabalhador cumpre, com o máximo de {{cv.horas-semanais}} por semana." },
  ],
});
