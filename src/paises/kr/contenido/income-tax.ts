import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.income-tax",
  h1: "종합소득세 계산기({{anio}}년 세율)",
  title: "종합소득세 계산기 | 세율표로 과세표준·세액 계산",
  description:
    "종합소득금액과 소득공제, 세액공제를 넣으면 과세표준, 산출세액, 결정세액과 지방소득세를 계산해요. 5월 신고 전에 미리 확인해 보세요.",
  intro: [
    "사업소득, 프리랜서 소득, 임대소득처럼 여러 소득을 합친 종합소득에 매기는 소득세를 계산해요.",
    "세율은 과세표준 구간에 따라 {{kr.income-tax-brackets[0].tasa}}부터 {{kr.income-tax-brackets[-1].tasa}}까지 올라가는 누진세율이에요.",
  ],
  comoSeCalcula: [
    "과세표준 = 종합소득금액 − 소득공제",
    "산출세액: 과세표준을 구간별로 나눠 각 구간 세율을 곱해 더해요. {{kr.income-tax-brackets[1].desde}} 이하는 {{kr.income-tax-brackets[0].tasa}}, {{kr.income-tax-brackets[-1].desde}} 초과분은 {{kr.income-tax-brackets[-1].tasa}}만큼이에요.",
    "결정세액 = 산출세액 − 세액공제·감면",
    "지방소득세는 결정세액의 {{kr.local-income-tax-rate}}만큼 따로 내요.",
  ],
  ejemplo: ["2026년에 과세표준이 4,700만원이면 1,400만원까지 6%, 나머지 3,300만원에 15%를 곱해 산출세액은 5,790,000원이에요."],
  faq: [
    {
      pregunta: "종합소득세 세율표는 어떻게 되나요?",
      respuesta:
        "과세표준 {{kr.income-tax-brackets[1].desde}} 이하 {{kr.income-tax-brackets[0].tasa}}, {{kr.income-tax-brackets[2].desde}} 이하 {{kr.income-tax-brackets[1].tasa}}, {{kr.income-tax-brackets[3].desde}} 이하 {{kr.income-tax-brackets[2].tasa}}, {{kr.income-tax-brackets[4].desde}} 이하 {{kr.income-tax-brackets[3].tasa}}, {{kr.income-tax-brackets[5].desde}} 이하 {{kr.income-tax-brackets[4].tasa}}, {{kr.income-tax-brackets[6].desde}} 이하 {{kr.income-tax-brackets[5].tasa}}, {{kr.income-tax-brackets[7].desde}} 이하 {{kr.income-tax-brackets[6].tasa}}, {{kr.income-tax-brackets[-1].desde}} 초과분 {{kr.income-tax-brackets[-1].tasa}}. 각 세율은 그 구간에 해당하는 금액에만 적용돼요.",
    },
    {
      pregunta: "종합소득금액은 어떻게 구하나요?",
      respuesta: "사업소득은 수입금액에서 필요경비를 빼고, 근로소득은 총급여에서 근로소득공제를 뺀 금액이에요. 이런 소득금액을 모두 더한 것이 종합소득금액이에요.",
    },
    {
      pregunta: "지방소득세도 같이 내나요?",
      respuesta: "네. 개인지방소득세는 종합소득세의 10분의 1 수준으로, 국세와 별도로 지방자치단체에 내요.",
    },
  ],
  glosario: [
    { termino: "과세표준", definicion: "소득금액에서 소득공제를 빼고 세율을 곱하는 금액이에요." },
    { termino: "산출세액", definicion: "과세표준에 세율을 곱해 나온 세액이에요." },
    { termino: "결정세액", definicion: "산출세액에서 세액공제와 감면을 뺀, 실제로 내야 할 세액이에요." },
  ],
});
