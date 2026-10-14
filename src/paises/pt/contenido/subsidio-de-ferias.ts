import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.subsidio-de-ferias",
  h1: "Calcular o subsídio de férias",
  title: "Subsídio de férias 2026: quanto vai receber",
  description: "Calcule o subsídio de férias com a retribuição base e os dias de férias, incluindo o ano de admissão, em que o valor é proporcional.",
  intro: [
    "Além da retribuição normal durante as férias, o trabalhador recebe um subsídio de férias. Com o ano completo vale um mês de retribuição base.",
    "Indique a retribuição base e os dias úteis de férias a que tem direito. No ano de admissão são menos dias, e o subsídio baixa na mesma proporção.",
  ],
  comoSeCalcula: [
    "O subsídio de férias inclui a retribuição base e as outras prestações pagas pelo modo específico de fazer o trabalho, correspondentes à duração mínima das férias: {{pt.ct-ferias-dias}} úteis.",
    "Subsídio = retribuição × dias de férias / {{pt.ct-ferias-dias}}. Com o período completo, é um mês de retribuição.",
  ],
  ejemplo: ["No ano em que entrou, quem tem direito a 12 dias de férias e ganha 1 100 euros recebe 600 euros de subsídio."],
  faq: [
    {
      pregunta: "Quando se paga o subsídio de férias?",
      respuesta: "Salvo acordo escrito em contrário, antes do início das férias. Se as férias forem gozadas em vários períodos, paga-se em proporção.",
    },
    {
      pregunta: "Quantos dias de férias tenho no primeiro ano?",
      respuesta: "Dois dias úteis por cada mês de contrato, até 20, que podem ser gozados depois de seis meses completos de contrato.",
    },
    {
      pregunta: "O subsídio de férias inclui o subsídio de alimentação?",
      respuesta: "O artigo 264.º do Código do Trabalho fala da retribuição base e das prestações ligadas ao modo específico de fazer o trabalho. O subsídio de alimentação não aparece nessa lista.",
    },
  ],
  glosario: [
    { termino: "Dias úteis", definicion: "Para as férias, os dias de segunda a sexta-feira que não são feriados." },
    { termino: "Retribuição base", definicion: "O valor fixo pago em contrapartida do trabalho no período normal." },
  ],
});
