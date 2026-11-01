import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.acerto-de-contas",
  h1: "Acerto de contas no fim do contrato",
  title: "Acerto de contas {{anio}}: quanto recebe ao sair da empresa",
  description: "Calcule o acerto de contas no fim do contrato: férias e subsídios proporcionais, férias por gozar e compensação por despedimento.",
  intro: [
    "Quando o contrato termina, a empresa tem de pagar o que se venceu e não foi pago: os proporcionais de férias, de subsídio de férias e de subsídio de Natal, as férias por gozar e, em certos casos, a compensação.",
    "Indique a retribuição, as datas do contrato e o motivo da saída para ver cada parcela.",
  ],
  comoSeCalcula: [
    "Proporcionais do ano da cessação: retribuição × dias de serviço no ano / dias do ano, uma vez para as férias, outra para o subsídio de férias e outra para o subsídio de Natal.",
    "Férias vencidas e não gozadas: retribuição × dias por gozar / {{pt.ct-ferias-dias}}, mais o subsídio de férias se ainda não foi pago.",
    "Compensação, quando há: {{pt.ct-compensacao[despedimento]}} por ano no despedimento coletivo, extinção do posto ou inadaptação, e {{pt.ct-compensacao[termo]}} por ano no fim de contrato a termo certo.",
  ],
  ejemplo: ["Quem sai a 30 de junho com 1 200 euros de retribuição recebe 595,07 euros de cada proporcional: 1 785,21 euros no total."],
  faq: [
    {
      pregunta: "Quem se despede também recebe os proporcionais?",
      respuesta: "Sim. Os proporcionais de férias, subsídio de férias e subsídio de Natal são devidos em qualquer cessação do contrato.",
    },
    {
      pregunta: "As férias por gozar contam para a antiguidade?",
      respuesta: "Sim. O período de férias vencidas e não gozadas pago na cessação conta para efeitos de antiguidade.",
    },
    {
      pregunta: "Há compensação quando o trabalhador se demite?",
      respuesta: "Não. A compensação é devida no despedimento coletivo, na extinção do posto de trabalho, na inadaptação e no fim de contrato a termo por iniciativa do empregador, entre outros casos previstos na lei.",
    },
  ],
  glosario: [
    { termino: "Acerto de contas", definicion: "O pagamento final de tudo o que o trabalhador tem a receber quando o contrato termina." },
    { termino: "Proporcionais", definicion: "A parte das férias e dos subsídios que corresponde ao tempo trabalhado no ano da saída." },
  ],
});
