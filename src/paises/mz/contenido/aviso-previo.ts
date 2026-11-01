import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.aviso-previo",
  h1: "Calcular o aviso prévio",
  title: "Aviso prévio em Moçambique: prazos da Lei do Trabalho",
  description: "Quantos dias de aviso prévio tem de dar ao sair do emprego: {{mz.aviso-trabalhador-curto}} até três anos de casa e {{mz.aviso-trabalhador-longo}} depois disso.",
  intro: [
    "Quem se despede sem justa causa tem de avisar o empregador por escrito com antecedência. O prazo depende do tempo de serviço e do tipo de contrato.",
    "Indique a data do aviso e, se quiser sair antes, o último dia de trabalho. A calculadora mostra a data da cessação e o valor dos dias em falta.",
  ],
  comoSeCalcula: [
    "Contrato por tempo indeterminado: {{mz.aviso-trabalhador-curto}} com mais de seis meses e até três anos de serviço; {{mz.aviso-trabalhador-longo}} com mais de três anos.",
    "Contrato a prazo certo: {{mz.aviso-prazo-certo}}, salvo outro prazo no contrato.",
    "Rescisão pelo empregador por motivos económicos: comunicação com pelo menos {{mz.aviso-empregador}}.",
    "Dias em falta × (salário ÷ 30) é o que o trabalhador paga ao empregador por não cumprir o aviso.",
  ],
  ejemplo: ["Quem tem cinco anos de casa e entrega o aviso a 1 de Outubro só pode sair a 31 de Outubro. Se sair a 11 de Outubro, faltam 20 dias."],
  faq: [
    {
      pregunta: "Os dias de aviso são úteis ou seguidos?",
      respuesta: "Seguidos. A lei manda contar os prazos de aviso prévio em dias consecutivos de calendário.",
    },
    {
      pregunta: "O que acontece se não der o aviso?",
      respuesta: "Paga ao empregador a remuneração que receberia no período de aviso em falta. No contrato a prazo certo, o empregador pode pedir até um mês de remuneração.",
    },
    {
      pregunta: "Preciso de dizer porque saio?",
      respuesta: "Não. A denúncia com aviso prévio não precisa de justa causa; basta comunicar a decisão por escrito.",
    },
  ],
  glosario: [
    { termino: "Denúncia", definicion: "Fim do contrato por decisão de uma das partes, com aviso prévio e sem precisar de justa causa." },
    { termino: "Aviso prévio", definicion: "A antecedência mínima com que se comunica o fim do contrato." },
  ],
});
