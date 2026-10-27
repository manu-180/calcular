import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.imposto-de-renda-anual",
  h1: "Simulador do imposto de renda 2027 (ano-calendário {{anio}})",
  title: "Simulador de imposto de renda: restituição ou a pagar",
  description: "Simule a declaração do IRPF de 2027: compare o modelo completo e o simplificado, aplique a nova redução anual e veja se terá imposto a pagar ou a restituir.",
  intro: [
    "Na declaração anual você acerta as contas com a Receita: soma tudo o que ganhou em 2026, desconta as deduções e compara o imposto devido com o que já foi retido.",
    "Este simulador usa a tabela anual e a redução da Lei nº 15.270/2025, que zera o imposto de quem teve até {{br.reducao-anual-isencao}} de rendimentos tributáveis no ano.",
  ],
  comoSeCalcula: [
    "Declaração completa: some INSS, {{br.irpf-dependente-anual}} por dependente, despesas médicas, instrução (até {{br.irpf-limite-instrucao}} por pessoa), pensão judicial e PGBL (até {{br.previdencia-privada-limite}} dos rendimentos).",
    "Declaração simplificada: desconto de {{br.irpf-desconto-simplificado-percentual}} dos rendimentos, limitado a {{br.irpf-desconto-simplificado-anual}}.",
    "Em cada modelo, aplique a tabela anual sobre os rendimentos menos as deduções e tire a parcela a deduzir da faixa.",
    "Depois entra a redução anual: até {{br.reducao-anual-isencao}} de rendimentos, o imposto zera; entre esse valor e {{br.reducao-anual-limite}}, a redução é {{br.reducao-anual-constante}} menos {{br.reducao-anual-fator}} vezes os rendimentos.",
    "O modelo com menor imposto é o melhor. Tirando o imposto retido, sobra o valor a pagar ou a restituir.",
  ],
  ejemplo: [
    "Quem recebeu R$ 72.000 em 2026, com um dependente, fica melhor no simplificado: desconto de R$ 14.400 e base de R$ 57.600.",
    "A tabela dá R$ 4.935,34 e a redução é de R$ 1.548,33. O imposto devido no ano fica em R$ 3.387,01.",
  ],
  faq: [
    {
      pregunta: "O 13º salário entra nos rendimentos?",
      respuesta: "Não. O 13º tem tributação exclusiva na fonte e vai num campo separado da declaração.",
    },
    {
      pregunta: "Quando escolher a declaração completa?",
      respuesta: "Quando as deduções legais passam do desconto simplificado. Isso costuma acontecer com dependentes, gastos com saúde e escola ou PGBL.",
    },
    {
      pregunta: "Esta simulação vale para a declaração de 2026?",
      respuesta: "Não. A declaração entregue em 2026 é do ano-calendário 2025, com outra tabela e sem a redução nova. Este simulador é para a declaração de 2027.",
    },
  ],
  glosario: [
    { termino: "Ano-calendário", definicion: "O ano em que você recebeu os rendimentos. A declaração é entregue no ano seguinte." },
    { termino: "Restituição", definicion: "Devolução do imposto retido a mais durante o ano." },
  ],
});
