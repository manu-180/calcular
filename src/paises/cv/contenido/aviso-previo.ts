import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.aviso-previo",
  h1: "Aviso prévio {{anio}} em Cabo Verde: prazos e data de saída",
  title: "Aviso prévio {{anio}}: {{cv.aviso-rescisao-dias-ano}} por ano de serviço",
  description: "Veja o aviso prévio de quem rescinde o contrato ({{cv.aviso-rescisao-dias-ano}} por ano, até {{cv.aviso-rescisao-maximo}}) e nos despedimentos.",
  intro: [
    "Quem rescinde o contrato sem o prazo estar escrito deve avisar com {{cv.aviso-rescisao-dias-ano}} por cada ano de serviço, até ao máximo de {{cv.aviso-rescisao-maximo}}. Com três anos de casa, são 45 dias.",
    "Escolha a situação e a data da comunicação. A calculadora dá os dias de aviso e a data mais cedo em que o contrato pode terminar.",
  ],
  comoSeCalcula: [
    "Na rescisão pelo trabalhador, o contrato pode fixar o aviso prévio. Se não o fizer, o prazo é de {{cv.aviso-rescisao-dias-ano}} por cada ano de serviço, sem passar de {{cv.aviso-rescisao-maximo}}. A calculadora usa o mais curto dos dois.",
    "No despedimento por justa causa objetiva, o empregador comunica a intenção com {{cv.aviso-objetiva-comunicacao}} de antecedência. O trabalhador pode responder, e a decisão final tem de ser comunicada por escrito com {{cv.aviso-objetiva-decisao}} de antecedência.",
    "No despedimento coletivo, a decisão comunica-se a cada trabalhador por escrito com {{cv.aviso-coletivo}} de antecedência da data de cessação.",
    "A data de saída é a data da comunicação mais esses dias. Quem não cumpre o aviso deve a retribuição do período em falta.",
  ],
  ejemplo: [
    "Uma pessoa com três anos de serviço comunica a rescisão a 1 de março. São 3 × {{cv.aviso-rescisao-dias-ano}}, ou 45 dias, e o contrato pode terminar a 15 de abril. Com seis anos, a conta daria 90 dias, mas o limite de {{cv.aviso-rescisao-maximo}} leva a saída para 1 de maio, 61 dias depois.",
  ],
  faq: [
    {
      pregunta: "Quanto aviso prévio dá o trabalhador que se despede?",
      respuesta: "O contrato pode fixar o prazo. Na falta disso, não pode ser inferior a {{cv.aviso-rescisao-dias-ano}} por ano de serviço, até ao máximo de {{cv.aviso-rescisao-maximo}}, segundo o artigo 243.º do Código Laboral.",
    },
    {
      pregunta: "O que acontece se não cumprir o aviso?",
      respuesta: "O trabalhador fica obrigado a indemnizar a empresa pelo valor da retribuição do período em falta, sem prejuízo de outros danos, nos termos do n.º 3 do artigo 243.º.",
    },
    {
      pregunta: "Que aviso exige o despedimento por extinção do posto de trabalho?",
      respuesta: "Comunicação da intenção com {{cv.aviso-objetiva-comunicacao}} de antecedência e decisão final com {{cv.aviso-objetiva-decisao}}, segundo o artigo 237.º, na redação do Decreto-Legislativo n.º 1/2016.",
    },
    {
      pregunta: "E no despedimento coletivo?",
      respuesta: "A decisão é comunicada a cada trabalhador com a antecedência mínima de {{cv.aviso-coletivo}}, pelo n.º 2 do artigo 222.º. Sem esse prazo, o contrato cessa depois do período em falta e o empregador paga a retribuição correspondente.",
    },
  ],
  glosario: [
    { termino: "Aviso prévio", definicion: "O tempo de antecedência com que se comunica o fim do contrato antes de ele terminar." },
    { termino: "Rescisão", definicion: "O fim do contrato por decisão do trabalhador, com ou sem justa causa." },
    { termino: "Justa causa objetiva", definicion: "Fundamento de despedimento ligado à empresa, como a extinção do posto de trabalho." },
  ],
});
