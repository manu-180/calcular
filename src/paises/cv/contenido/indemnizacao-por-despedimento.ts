import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.indemnizacao-por-despedimento",
  h1: "Indemnização por despedimento {{anio}} em Cabo Verde",
  title: "Indemnização por despedimento {{anio}}: {{cv.indemnizacao-dias-ano}} por ano",
  description: "Calcule a indemnização do despedimento coletivo ou por justa causa objetiva: {{cv.indemnizacao-dias-ano}} de retribuição por cada ano de serviço.",
  intro: [
    "No despedimento coletivo e no despedimento por justa causa objetiva, a indemnização é de {{cv.indemnizacao-dias-ano}} de retribuição por cada ano de serviço. Com 60 000$00 por mês e cinco anos de casa, são 200 000$00.",
    "Indique a retribuição mensal, os anos e meses de serviço e o tipo de despedimento. A calculadora multiplica os dias devidos pelo valor de um dia de retribuição.",
  ],
  comoSeCalcula: [
    "Os dias devidos são {{cv.indemnizacao-dias-ano}} vezes os anos de serviço. A fração de ano entra em proporção aos meses: seis meses valem meio ano.",
    "A base é a retribuição que o trabalhador recebia na data do despedimento. O valor de um dia é essa retribuição dividida pelos dias do mês. A lei não fixa o divisor, e a calculadora usa 30 por omissão, com a opção de o mudar.",
    "A indemnização é o valor de um dia vezes os dias devidos. No despedimento coletivo o Código fala em vinte dias por cada ano completo, e na justa causa objetiva num valor não inferior a vinte dias.",
    "Aos trabalhadores com contrato a prazo a indemnização é igual às retribuições que faltavam até ao fim do contrato, e essa regra é diferente da que se calcula aqui.",
  ],
  ejemplo: [
    "Uma pessoa com 45 000$00 de retribuição e três anos e seis meses de serviço é despedida por extinção do posto de trabalho. Tem direito a 3,5 × {{cv.indemnizacao-dias-ano}}, ou 70 dias. Com o dia a 1 500$00, a indemnização mínima é 105 000$00.",
  ],
  faq: [
    {
      pregunta: "Quantos dias de indemnização tem um despedimento coletivo?",
      respuesta: "Vinte dias de retribuição por cada ano completo de serviço, segundo o artigo 224.º, n.º 1, do Código Laboral, na redação do Decreto-Legislativo n.º 1/2016.",
    },
    {
      pregunta: "E no despedimento por extinção do posto de trabalho?",
      respuesta: "O artigo 238.º, n.º 1, dá direito a uma indemnização de valor não inferior a {{cv.indemnizacao-dias-ano}} de retribuição por cada ano de serviço.",
    },
    {
      pregunta: "Que retribuição entra na conta?",
      respuesta: "O n.º 3 do artigo 224.º manda tomar como base a retribuição auferida pelo trabalhador na data do despedimento.",
    },
    {
      pregunta: "O trabalhador pode aceitar o despedimento?",
      respuesta: "Presume-se que aceita quando recebe a compensação, segundo o n.º 5 do artigo 224.º. Pode afastar a presunção se devolver ou puser à disposição do empregador o valor recebido.",
    },
  ],
  glosario: [
    { termino: "Despedimento coletivo", definicion: "A cessação de contratos por decisão do empregador, por motivos da empresa, com comunicação aos sindicatos ou aos trabalhadores." },
    { termino: "Justa causa objetiva", definicion: "Despedimento fundado na extinção do posto de trabalho por motivos de mercado, estruturais ou tecnológicos." },
    { termino: "Retribuição", definicion: "O que o trabalhador recebe regularmente pelo seu trabalho, usado como base da indemnização." },
  ],
});
