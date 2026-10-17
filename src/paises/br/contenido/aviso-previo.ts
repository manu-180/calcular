import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.aviso-previo",
  h1: "Calculadora de aviso prévio proporcional",
  title: "Aviso prévio proporcional: dias e valor",
  description: "Calcule quantos dias de aviso prévio você tem pelos anos de casa (até {{br.aviso-previo-maximo}}) e quanto vale o aviso indenizado.",
  intro: [
    "Quem é demitido sem justa causa tem direito a um aviso prévio de {{br.aviso-previo-base}}, mais {{br.aviso-previo-por-ano}} por ano completo de trabalho na mesma empresa.",
    "Informe a data de admissão, a data do aviso e o salário. A calculadora conta os anos e mostra os dias e o valor.",
  ],
  comoSeCalcula: [
    "Contam só os anos completos de casa até a data do aviso.",
    "O aviso é de {{br.aviso-previo-base}} mais {{br.aviso-previo-por-ano}} por ano completo, com limite de {{br.aviso-previo-maximo}}.",
    "Se a empresa dispensar o cumprimento, paga o aviso indenizado: salário dividido por 30, vezes os dias.",
    "Quando a pessoa pede demissão, o aviso é de {{br.aviso-previo-base}}.",
  ],
  ejemplo: [
    "Com cinco anos completos de casa, o aviso é de 30 + 15 = 45 dias. Com salário de R$ 3.000, o aviso indenizado vale R$ 4.500.",
  ],
  faq: [
    {
      pregunta: "Com um ano de empresa, o aviso já é de 33 dias?",
      respuesta: "Sim. É assim que o Ministério do Trabalho aplica a Lei nº 12.506/2011: cada ano completo soma 3 dias, a partir do primeiro.",
    },
    {
      pregunta: "Os dias a mais valem quando eu peço demissão?",
      respuesta: "Não. A proporcionalidade é um direito de quem é demitido. Quem pede demissão cumpre {{br.aviso-previo-base}}.",
    },
    {
      pregunta: "O aviso indenizado conta como tempo de serviço?",
      respuesta: "Sim. Os dias do aviso entram no contrato e aumentam o 13º e as férias proporcionais da rescisão.",
    },
    {
      pregunta: "Posso trabalhar menos durante o aviso?",
      respuesta: "No aviso dado pela empresa, sim: você escolhe sair 2 horas mais cedo todo dia ou faltar 7 dias corridos, sem perder salário.",
    },
  ],
  glosario: [
    { termino: "Aviso prévio", definicion: "Prazo que uma parte dá à outra antes de encerrar o contrato de trabalho." },
    { termino: "Aviso indenizado", definicion: "Quando a empresa paga os dias do aviso em vez de pedir que você trabalhe." },
  ],
});
