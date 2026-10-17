import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.abono-salarial",
  h1: "Calculadora do abono salarial PIS/Pasep 2026",
  title: "Abono salarial PIS 2026: tem direito e quanto recebe",
  description: "Veja se você tem direito ao abono salarial do calendário 2026 (média de até {{br.abono-limite}} no ano-base 2024) e o valor pelos meses trabalhados.",
  intro: [
    "O abono salarial é um pagamento anual de até um salário mínimo para quem trabalhou com carteira e ganhou pouco no ano-base.",
    "No calendário de 2026, o ano-base é 2024. Informe a média mensal daquele ano e os meses trabalhados.",
  ],
  comoSeCalcula: [
    "Tem direito quem teve remuneração média de até {{br.abono-limite}} no ano-base, trabalhou pelo menos 30 dias e está no PIS/Pasep há 5 anos ou mais.",
    "O valor é proporcional aos meses trabalhados no ano-base: cada mês vale cerca de 1/12 do salário mínimo de 2026.",
    "Com 12 meses, o abono é {{br.abono-valor[12]}}. Com 6 meses, {{br.abono-valor[6]}}.",
  ],
  ejemplo: ["Quem ganhou em média R$ 2.000 por mês em 2024 e trabalhou os 12 meses recebe {{br.abono-valor[12]}} em 2026. Com 5 meses, recebe {{br.abono-valor[5]}}."],
  faq: [
    {
      pregunta: "Quando o abono de 2026 é pago?",
      respuesta: "Pelo mês de nascimento, a partir de fevereiro de 2026. O dinheiro fica disponível até 30 de dezembro de 2026.",
    },
    {
      pregunta: "Como consulto se tenho direito?",
      respuesta: "Pela Carteira de Trabalho Digital ou pelo portal gov.br, que mostram o valor e a data do pagamento.",
    },
    {
      pregunta: "O limite de renda vai mudar?",
      respuesta: "Sim. A Emenda Constitucional nº 135/2024 corrige o limite só pelo INPC, e não pelo salário mínimo. Com o tempo, ele vale cada vez menos salários mínimos.",
    },
  ],
  glosario: [
    { termino: "Ano-base", definicion: "O ano trabalhado que conta para o abono. O pagamento acontece dois anos depois." },
    { termino: "PIS/Pasep", definicion: "Cadastro de quem trabalha na iniciativa privada (PIS) ou no serviço público (Pasep)." },
  ],
});
