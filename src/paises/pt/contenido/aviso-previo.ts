import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.aviso-previo",
  h1: "Aviso prévio para se despedir",
  title: "Aviso prévio do trabalhador: quantos dias tem de dar",
  description: "Saiba com quantos dias de antecedência tem de avisar a empresa quando se despede, num contrato sem termo ou a termo, e em que dia termina o contrato.",
  intro: [
    "Quem se despede sem justa causa tem de avisar o empregador por escrito com uma antecedência mínima. O prazo depende do tipo de contrato e da antiguidade.",
    "Indique o tipo de contrato, os meses de antiguidade e a data da carta para ver o prazo e o último dia de contrato.",
  ],
  comoSeCalcula: [
    "Contrato sem termo: {{pt.ct-aviso-previo-trabalhador[ate-2-anos]}} até dois anos de antiguidade e {{pt.ct-aviso-previo-trabalhador[mais-2-anos]}} com mais de dois anos.",
    "Contrato a termo: {{pt.ct-aviso-previo-trabalhador[termo-6-meses]}} se o contrato durar seis meses ou mais e {{pt.ct-aviso-previo-trabalhador[termo-menos-6-meses]}} se durar menos. No termo incerto conta a duração já decorrida.",
    "A calculadora conta os dias seguidos a partir da data da comunicação para indicar o último dia de contrato.",
  ],
  ejemplo: ["Quem tem cinco anos de casa e entrega a carta a 14 de outubro deve trabalhar até 13 de dezembro."],
  faq: [
    {
      pregunta: "O aviso prévio pode ser maior?",
      respuesta: "Sim. Para quem ocupa cargos de administração, direção ou com funções de representação ou responsabilidade, o contrato ou a convenção coletiva podem alargá-lo até seis meses.",
    },
    {
      pregunta: "Como se comunica a saída?",
      respuesta: "Por escrito, ao empregador, com a antecedência mínima que corresponde ao contrato.",
    },
    {
      pregunta: "Há casos em que não é preciso dar aviso prévio?",
      respuesta: "Sim. O trabalhador com estatuto de vítima de violência doméstica fica dispensado do aviso prévio.",
    },
  ],
  glosario: [
    { termino: "Denúncia", definicion: "A decisão do trabalhador de terminar o contrato sem invocar justa causa." },
    { termino: "Contrato a termo incerto", definicion: "Contrato que acaba quando termina a situação que o justificou, sem data fixa." },
  ],
});
