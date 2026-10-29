import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.compensacao-por-despedimento",
  h1: "Compensação por despedimento",
  title: "Compensação por despedimento {{anio}}: calculadora",
  description: "Calcule a compensação por despedimento coletivo, extinção do posto de trabalho ou fim de contrato a termo, com os limites do Código do Trabalho.",
  intro: [
    "Quando o contrato termina por despedimento coletivo, extinção do posto de trabalho, inadaptação ou fim de um contrato a termo, o trabalhador tem direito a uma compensação calculada pela antiguidade.",
    "Indique o motivo, a retribuição base com diuturnidades e as datas do contrato para ver o valor e os limites aplicados.",
  ],
  comoSeCalcula: [
    "No despedimento coletivo, na extinção do posto de trabalho e na inadaptação contam {{pt.ct-compensacao[despedimento]}} de retribuição base e diuturnidades por cada ano de antiguidade.",
    "No fim de um contrato a termo certo contam {{pt.ct-compensacao[termo]}} por ano, salvo se foi o trabalhador a não querer renovar.",
    "O valor diário é a retribuição mensal a dividir por 30. A fração de ano conta de forma proporcional.",
    "A retribuição considerada não passa de 20 salários mínimos ({{pt.rmmg}} cada) e a compensação não passa de 12 retribuições, ou de 240 salários mínimos quando a retribuição foi limitada.",
  ],
  ejemplo: ["Com 1 500 euros por mês e 5 anos de casa, um despedimento coletivo dá 50 euros por dia × 14 dias × 5 anos: 3 500 euros."],
  faq: [
    {
      pregunta: "Quantos dias por ano dá a compensação por despedimento?",
      respuesta: "{{pt.ct-compensacao[despedimento]}} de retribuição base e diuturnidades por ano completo no despedimento coletivo, na extinção do posto de trabalho e na inadaptação.",
    },
    {
      pregunta: "Quem paga a compensação?",
      respuesta: "O empregador paga a totalidade. O trabalhador pode recorrer ao Fundo de Garantia de Compensação do Trabalho (FGCT), nos termos da legislação própria.",
    },
    {
      pregunta: "Receber a compensação significa aceitar o despedimento?",
      respuesta: "A lei presume que sim. Para afastar essa presunção, o trabalhador tem de devolver ou pôr à disposição do empregador a totalidade da compensação.",
    },
    {
      pregunta: "Há compensação no fim de um contrato a termo?",
      respuesta: "Sim, de {{pt.ct-compensacao[termo]}} por ano, quando o contrato a termo certo caduca no fim do prazo. Não há se foi o trabalhador a comunicar que não queria renovar.",
    },
  ],
  glosario: [
    { termino: "Diuturnidades", definicion: "Acréscimos à retribuição base que se ganham com a antiguidade, quando previstos." },
    { termino: "Antiguidade", definicion: "Tempo de duração do contrato com o mesmo empregador." },
    { termino: "FGCT", definicion: "Fundo de Garantia de Compensação do Trabalho." },
  ],
});
