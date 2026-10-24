import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.deposit-interest",
  h1: "예금·적금 이자 계산기",
  title: "적금 이자 계산기 | 예금 이자·세후 만기 금액",
  description:
    "예치금이나 월 납입액, 연 이율, 기간을 넣으면 단리와 월복리로 이자를 계산하고 이자소득세 15.4%를 뺀 세후 만기 금액을 보여 줘요.",
  intro: [
    "정기예금은 처음에 한 번 맡기고, 정기적금은 매달 같은 금액을 넣어요. 같은 이율이라도 적금 이자가 더 적은 이유는 돈이 은행에 있는 기간이 다르기 때문이에요.",
    "이자에는 소득세({{kr.interest-withholding-rate}})와 그 10분의 1인 지방소득세가 붙어서 일반과세라면 이자의 15.4%가 빠져요.",
  ],
  comoSeCalcula: [
    "예금 단리: 원금 × 연 이율 × 개월 수 ÷ 12",
    "적금 단리: 월 납입액 × 연 이율 ÷ 12 × (개월 수 × (개월 수 + 1) ÷ 2)",
    "월복리는 매달 이자가 원금에 더해져서 다음 달 이자를 다시 만들어요.",
    "이자소득세 = 이자 × {{kr.interest-withholding-rate}}, 지방소득세 = 이자소득세 × {{kr.local-income-tax-rate}}",
  ],
  ejemplo: ["정기예금 1,000만원을 연 3.5%로 1년 맡기면 세전 이자는 35만원, 세금 53,900원을 빼면 296,100원을 받아요."],
  faq: [
    {
      pregunta: "적금 이율 4%면 이자를 4% 받나요?",
      respuesta: "아니요. 첫 달에 넣은 돈만 12개월 내내 이자가 붙고 마지막 달에 넣은 돈은 1개월만 붙어서, 실제 이자는 연 4%로 1년 맡긴 예금 이자의 절반 정도예요.",
    },
    {
      pregunta: "이자소득세는 얼마예요?",
      respuesta: "일반 이자에는 소득세({{kr.interest-withholding-rate}})를 원천징수하고, 지방소득세가 그 {{kr.local-income-tax-rate}}만큼 더 붙어요. 합치면 이자의 15.4%예요.",
    },
    {
      pregunta: "비과세 상품은 무엇이에요?",
      respuesta: "법에서 정한 조건을 갖춘 일부 상품은 이자에 세금을 매기지 않아요. 가입한 상품이 비과세인지는 은행 안내를 확인하세요.",
    },
  ],
  glosario: [
    { termino: "단리", definicion: "원금에만 이자를 매기는 방식이에요." },
    { termino: "월복리", definicion: "매달 생긴 이자를 원금에 더해 다음 달 이자를 계산하는 방식이에요." },
    { termino: "원천징수", definicion: "이자를 줄 때 은행이 세금을 미리 떼어 내는 것이에요." },
  ],
});
