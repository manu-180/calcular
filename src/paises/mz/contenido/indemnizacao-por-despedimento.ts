import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.indemnizacao-por-despedimento",
  h1: "Calcular a indemnização por despedimento",
  title: "Indemnização por despedimento em Moçambique ({{anio}})",
  description: "Calcule a indemnização da Lei do Trabalho por rescisão por motivos económicos: {{mz.indemnizacao-ate-7}}, {{mz.indemnizacao-ate-18}} ou {{mz.indemnizacao-mais-18}} de salário por ano.",
  intro: [
    "Quando o empregador termina o contrato por motivos estruturais, tecnológicos ou de mercado, o trabalhador tem direito a uma indemnização (artigo 141 da Lei n.º 13/2023).",
    "O número de dias por ano depende de quantos salários mínimos do sector vale o salário base com o bónus de antiguidade.",
  ],
  comoSeCalcula: [
    "Divide-se o salário base com o bónus de antiguidade pelo salário mínimo do sector.",
    "Até {{mz.indemnizacao-limite-1}} salários mínimos: {{mz.indemnizacao-ate-7}} de salário por ano de serviço. De mais de {{mz.indemnizacao-limite-1}} até {{mz.indemnizacao-limite-2}}: {{mz.indemnizacao-ate-18}}. Acima de {{mz.indemnizacao-limite-2}}: {{mz.indemnizacao-mais-18}}.",
    "Um dia de salário é o salário mensal dividido por 30. Indemnização = anos completos × dias por ano × dia de salário.",
  ],
  ejemplo: ["Com 20 000 MT de salário num sector com mínimo de 8 400 MT, o salário vale 2,38 salários mínimos. Seis anos de casa dão 6 × 30 dias × 666,67 MT = 120 000 MT."],
  faq: [
    {
      pregunta: "Que parte do salário conta para a indemnização?",
      respuesta: "Só o salário base e o bónus de antiguidade, salvo se as partes acordarem incluir outras prestações.",
    },
    {
      pregunta: "O contrato pode dar mais do que a lei?",
      respuesta: "Sim. O contrato individual e os instrumentos de regulamentação colectiva podem prever critérios mais favoráveis ao trabalhador.",
    },
    {
      pregunta: "Com quanta antecedência o empregador tem de avisar?",
      respuesta: "Pelo menos {{mz.aviso-empregador}} antes da data da cessação, por escrito, ao trabalhador, ao órgão sindical e ao Ministério do Trabalho.",
    },
    {
      pregunta: "E se o contrato for a prazo certo?",
      respuesta: "Nesse caso o empregador paga as remunerações que se venceriam entre a cessação e o fim do prazo combinado.",
    },
  ],
  glosario: [
    { termino: "Bónus de antiguidade", definicion: "Prestação ligada ao tempo de casa, fixada em instrumento de regulamentação colectiva." },
    { termino: "Salário mínimo do sector", definicion: "O mínimo fixado pelo Governo para cada sector de actividade." },
  ],
});
