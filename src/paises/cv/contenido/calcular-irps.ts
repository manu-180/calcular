import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.calcular-irps",
  h1: "Calcular o IRPS {{anio}}: retenção sobre o salário",
  title: "Calcular o IRPS {{anio}}: retenção mensal sobre o salário",
  description: "Calcule o IRPS retido todos os meses com a fórmula em vigor. Não há retenção até {{cv.irps-limite-retencao}} por mês.",
  intro: [
    "O IRPS retido sobre um salário de 120 000$00 por mês é 14 475$00. A entidade empregadora calcula esse valor com uma fórmula de três escalões e entrega-o à administração fiscal.",
    "Indique a remuneração bruta mensal. Não há retenção até {{cv.irps-limite-retencao}}, e acima disso aplica-se a fórmula do artigo 71.º do Código do IRPS.",
  ],
  comoSeCalcula: [
    "A retenção da categoria A, que reúne os rendimentos do trabalho dependente, usa a remuneração bruta do mês. Se ela não passar de {{cv.irps-limite-retencao}}, a retenção é zero.",
    "Acima desse limite, escolhe-se o escalão. Até {{cv.irps-limites[escalao1]}} a fórmula é {{cv.irps-taxas[escalao1]}} do bruto menos {{cv.irps-parcelas[escalao1]}}. De {{cv.irps-limites[escalao1]}} até {{cv.irps-limites[escalao2]}} é {{cv.irps-taxas[escalao2]}} do bruto menos {{cv.irps-parcelas[escalao2]}}. Acima disso é {{cv.irps-taxas[escalao3]}} do bruto menos {{cv.irps-parcelas[escalao3]}}.",
    "Quando o resultado é inferior a {{cv.irps-retencao-minima}}, considera-se devido esse mínimo. O valor final arredonda-se ao escudo.",
  ],
  ejemplo: [
    "Com 120 000$00 de bruto, o segundo escalão dá 0,21 × 120 000 = 25 200. Abatendo a parcela de 10 725$00, a retenção do mês é 14 475$00, o que corresponde a uma taxa efetiva de 12,06 %. Em doze meses são 173 700$00.",
  ],
  faq: [
    {
      pregunta: "A partir de que rendimento há retenção de IRPS?",
      respuesta: "A retenção ocorre a partir de {{cv.irps-limite-retencao}} por mês, ou 439 284$00 por ano, nos termos do artigo 71.º, n.º 7, do Código do IRPS na redação republicada em 2021.",
    },
    {
      pregunta: "O que é a retenção mínima?",
      respuesta: "Se da aplicação da fórmula resultar um valor inferior a {{cv.irps-retencao-minima}}, esse é o montante devido. Está no artigo 71.º, n.º 8, do Código do IRPS.",
    },
    {
      pregunta: "A fórmula usa o bruto ou o líquido do INPS?",
      respuesta: "Usa a remuneração bruta mensal, designada Rm na fórmula do artigo 71.º, n.º 4. A Direção Nacional das Receitas do Estado confirma que o argumento é o rendimento bruto mensal.",
    },
    {
      pregunta: "Os subsídios entram na fórmula do mês?",
      respuesta: "Não. Os subsídios de férias e de Natal e os prémios de produtividade têm retenção autónoma e não se adicionam ao rendimento dos meses em que são pagos, segundo o n.º 9 do mesmo artigo.",
    },
  ],
  glosario: [
    { termino: "Categoria A", definicion: "Grupo do IRPS que reúne os rendimentos do trabalho dependente e as pensões." },
    { termino: "Escalão", definicion: "Faixa de remuneração a que corresponde uma taxa e uma parcela a abater na fórmula." },
    { termino: "Parcela a abater", definicion: "Valor subtraído depois de multiplicar o bruto pela taxa, para que o imposto não salte de um escalão para o outro." },
    { termino: "Taxa efetiva", definicion: "O IRPS retido a dividir pelo bruto, sempre menor do que a taxa do escalão." },
  ],
});
