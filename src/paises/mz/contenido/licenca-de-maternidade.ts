import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.licenca-de-maternidade",
  h1: "Calcular a licença de maternidade",
  title: "Licença de maternidade em Moçambique: {{mz.licenca-maternidade}}",
  description: "Calcule as datas da licença de maternidade de {{mz.licenca-maternidade}} e da licença de paternidade de {{mz.licenca-paternidade}} pela Lei do Trabalho.",
  intro: [
    "A trabalhadora tem direito a {{mz.licenca-maternidade}} seguidos de licença por maternidade, além das férias normais. O pai tem direito a {{mz.licenca-paternidade}}.",
    "Indique a data provável do parto e quantos dias antes quer começar. A calculadora dá o primeiro e o último dia.",
  ],
  comoSeCalcula: [
    "A licença por maternidade pode começar até {{mz.maternidade-antes-parto}} antes da data provável do parto e dura {{mz.licenca-maternidade}} seguidos.",
    "A licença por paternidade começa no dia seguinte ao nascimento e dura {{mz.licenca-paternidade}}.",
  ],
  ejemplo: ["Com o parto previsto para 1 de Dezembro de 2026 e início 20 dias antes, a licença vai de 11 de Novembro de 2026 a 8 de Fevereiro de 2027."],
  faq: [
    {
      pregunta: "Quem paga a licença de maternidade?",
      respuesta: "A remuneração durante a licença é regulada pelo regime da segurança social obrigatória, gerido pelo INSS.",
    },
    {
      pregunta: "O que acontece se o bebé ou a mãe ficarem internados?",
      respuesta: "A licença suspende-se durante o internamento hospitalar e retoma depois.",
    },
    {
      pregunta: "O pai pode ter uma licença mais longa?",
      respuesta: "Sim, de 60 dias, em caso de morte ou incapacidade da mãe comprovada pela entidade sanitária.",
    },
    {
      pregunta: "Posso ser despedida por estar grávida?",
      respuesta: "Não. A lei proíbe despedir ou prejudicar a trabalhadora por motivo de discriminação ligada à maternidade.",
    },
  ],
  glosario: [{ termino: "Data provável do parto", definicion: "A data indicada pelo médico para o nascimento." }],
});
