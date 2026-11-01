import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.capital-gains-tax",
  h1: "양도소득세 계산기(주택, 토지)",
  title: "양도소득세 계산기 {{anio}} | 1세대 1주택 비과세·장특공제",
  description:
    "판 가격과 산 가격, 보유기간을 넣으면 장기보유 특별공제와 1세대 1주택 비과세, 고가주택 기준을 반영해 양도소득세를 계산해요.",
  intro: [
    "부동산을 팔아 남은 차익에 매기는 양도소득세와 지방소득세를 계산해요.",
    "1세대 1주택은 양도가액 {{kr.luxury-house-threshold}}까지 비과세이고, 그보다 비싸면 넘는 부분의 비율만큼만 세금을 매겨요.",
  ],
  comoSeCalcula: [
    "양도차익 = 양도가액 − 취득가액 − 필요경비",
    "장기보유 특별공제: 3년 이상 보유하면 차익의 {{kr.long-term-holding-general[3]}}부터 {{kr.long-term-holding-general[15]}}까지 빼요. 1세대 1주택에 2년 이상 살았다면 보유 최대 {{kr.long-term-holding-one-house[10]}}, 거주 최대 {{kr.long-term-residence-one-house[10]}}까지 합쳐 빼요.",
    "과세표준 = 양도차익 − 장기보유 특별공제 − 기본공제({{kr.capital-gains-basic-deduction}})",
    "세율: 2년 이상 보유하면 기본세율, 주택을 1년 미만 보유하면 {{kr.capital-gains-short-rates[housing1]}}, 1년 이상 2년 미만이면 {{kr.capital-gains-short-rates[housing2]}}만큼이에요.",
  ],
  ejemplo: ["1세대 1주택을 7억원에 사서 10년 동안 살다가 15억원에 팔면, 과세 대상 차익은 1억6천만원이고 장기보유 특별공제 80%를 빼서 세금은 지방소득세까지 3,481,500원이에요."],
  faq: [
    {
      pregunta: "1세대 1주택 비과세 기준은 얼마예요?",
      respuesta: "양도가액이 {{kr.luxury-house-threshold}} 이하이면 양도소득세가 없어요. 이를 넘는 고가주택은 (양도가액 − 기준금액) ÷ 양도가액의 비율만큼만 과세해요.",
    },
    {
      pregunta: "장기보유 특별공제는 최대 몇 %예요?",
      respuesta: "일반 자산은 15년 이상 보유하면 {{kr.long-term-holding-general[15]}}, 1세대 1주택은 보유와 거주를 합쳐 최대 80%예요.",
    },
    {
      pregunta: "필요경비에는 무엇이 들어가요?",
      respuesta: "취득세, 중개보수, 법무사 비용처럼 사고팔 때 든 비용과 자산 가치를 높인 수리비가 들어가요.",
    },
  ],
  glosario: [
    { termino: "양도차익", definicion: "판 가격에서 산 가격과 필요경비를 뺀 금액이에요." },
    { termino: "장기보유 특별공제", definicion: "오래 보유한 부동산의 차익 일부를 빼 주는 공제예요." },
    { termino: "고가주택", definicion: "1세대 1주택 비과세 기준 금액을 넘는 주택이에요." },
  ],
});
