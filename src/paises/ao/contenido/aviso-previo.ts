import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.aviso-previo",
  h1: "Calcular o aviso prévio",
  title: "Aviso prévio em Angola: prazo e valor em falta",
  description: "Quem se demite em Angola deve avisar com {{ao.aviso-previo-trabalhador}} de antecedência. Calcule a data de saída e quanto paga se não cumprir o aviso.",
  intro: [
    "Para sair de uma empresa sem justa causa, o trabalhador entrega um aviso prévio escrito com pelo menos {{ao.aviso-previo-trabalhador}} de antecedência.",
    "O empregador que despede por causas objectivas também tem de avisar com {{ao.aviso-previo-empregador}}. Indique a data do aviso para ver a data mais cedo da cessação.",
  ],
  comoSeCalcula: [
    "Data da cessação = data do aviso + {{ao.aviso-previo-trabalhador}} (ou {{ao.aviso-previo-empregador}} no despedimento por causas objectivas).",
    "Se o trabalhador sair antes, paga ao empregador o salário dos dias em falta. Como o aviso é de um mês, cada dia vale o salário mensal / {{ao.aviso-previo-trabalhador}}.",
  ],
  ejemplo: ["Quem entrega o aviso a 1 de outubro e sai a 21 de outubro fica 10 dias aquém. Com 300 000 Kz de salário, deve 100 000 Kz ao empregador."],
  faq: [
    {
      pregunta: "O aviso prévio tem de ser escrito?",
      respuesta: "Sim. A lei exige aviso prévio escrito ao empregador, com a antecedência mínima de {{ao.aviso-previo-trabalhador}}.",
    },
    {
      pregunta: "E se o empregador não quiser que eu trabalhe durante o aviso?",
      respuesta: "Se recusar o trabalho durante o aviso prévio, o empregador paga o salário do período que o trabalhador não pôde cumprir.",
    },
    {
      pregunta: "Faltar ao trabalho conta como demissão?",
      respuesta: "Pode contar como abandono do trabalho, por exemplo com dez dias úteis seguidos de ausência sem informar o empregador. O abandono vale como demissão sem aviso e obriga a pagar a compensação.",
    },
  ],
  glosario: [
    { termino: "Denúncia", definicion: "O fim do contrato por decisão do trabalhador, sem justa causa e com aviso prévio." },
    { termino: "Justa causa", definicion: "Um motivo grave, previsto na lei, que permite terminar o contrato sem aviso." },
  ],
});
