import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.dias-de-ferias",
  h1: "Quantos dias de férias tenho em Moçambique",
  title: "Dias de férias em Moçambique pela Lei do Trabalho",
  description: "Calcule os dias de férias pela Lei n.º 13/2023: {{mz.ferias-primeiro-ano}} no primeiro ano de trabalho e {{mz.ferias-anos-seguintes}} nos seguintes.",
  intro: [
    "A Lei do Trabalho (Lei n.º 13/2023) dá direito a férias remuneradas a todos os trabalhadores. O número de dias depende do tempo de serviço e do tipo de contrato.",
    "Indique a data de admissão e a data a que quer fazer a conta.",
  ],
  comoSeCalcula: [
    "No primeiro ano de trabalho efectivo: {{mz.ferias-primeiro-ano}}.",
    "A partir do segundo ano: {{mz.ferias-anos-seguintes}} por ano.",
    "Contrato a prazo certo de mais de três meses e menos de um ano: {{mz.ferias-prazo-mes}} por cada mês completo de serviço efectivo.",
    "As férias contam em dias de calendário. Os feriados no meio das férias não contam.",
  ],
  ejemplo: ["Quem entrou a 10 de Janeiro de 2023 tem hoje mais de três anos de casa e direito a 30 dias de férias por ano."],
  faq: [
    {
      pregunta: "As férias podem ser trocadas por dinheiro?",
      respuesta: "Só excepcionalmente e por acordo entre as partes. Mesmo assim, o trabalhador tem de gozar pelo menos {{mz.ferias-gozo-minimo}} úteis.",
    },
    {
      pregunta: "Posso dividir as férias?",
      respuesta: "Sim, por acordo com o empregador, em períodos de pelo menos seis dias.",
    },
    {
      pregunta: "Quantos dias de férias posso acumular?",
      respuesta: "Por acordo escrito, até 15 dias por cada 12 meses de serviço, sem passar de 60 dias acumulados no mesmo ano.",
    },
    {
      pregunta: "E se ficar doente durante as férias?",
      respuesta: "Os dias de doença certificada não contam como férias, desde que informe o empregador em até 10 dias.",
    },
  ],
  glosario: [
    { termino: "Serviço efectivo", definicion: "O período normal de trabalho mais feriados, descanso semanal, férias, faltas justificadas e tolerâncias de ponto." },
    { termino: "Plano de férias", definicion: "O calendário de férias que o empregador faz com o órgão sindical." },
  ],
});
