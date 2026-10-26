import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.retirement-income-tax",
  h1: "퇴직소득세 계산기",
  title: "퇴직소득세 계산기 2026 | 퇴직금 세금 계산",
  description:
    "퇴직금과 근속연수를 넣으면 근속연수공제, 환산급여공제를 거쳐 퇴직소득세와 지방소득세, 세후 퇴직금을 계산해요.",
  intro: [
    "퇴직금에는 다른 소득과 합치지 않고 따로 계산하는 퇴직소득세가 붙어요.",
    "근속연수가 길수록 공제가 커지고, 1년치로 환산해 세율을 매긴 뒤 다시 근속연수만큼 곱해서 세금이 줄어요.",
  ],
  comoSeCalcula: [
    "근속연수공제: 5년 이하는 1년당 {{kr.retirement-years-deduction[hasta5]}}, 그 뒤 구간마다 정해진 금액을 더해요.",
    "환산급여 = (퇴직금 − 근속연수공제) × 12 ÷ 근속연수",
    "과세표준 = 환산급여 − 환산급여공제({{kr.retirement-converted-deduction[1].desde}}까지 전액, 그 위로는 구간별 비율)",
    "퇴직소득세 = 과세표준에 기본세율을 곱한 환산산출세액 ÷ 12 × 근속연수",
    "지방소득세는 퇴직소득세의 {{kr.local-income-tax-rate}}만큼이에요.",
  ],
  ejemplo: ["근속 10년에 퇴직금 5,000만원이면 퇴직소득세 680,000원, 지방소득세 68,000원으로 세금은 748,000원이에요."],
  faq: [
    {
      pregunta: "퇴직소득세는 언제 내나요?",
      respuesta: "회사가 퇴직금을 줄 때 원천징수해요. 따로 신고할 일은 보통 없어요.",
    },
    {
      pregunta: "근속연수는 어떻게 세나요?",
      respuesta: "입사일부터 퇴사일까지의 기간이에요. 1년 미만의 기간은 1년으로 봐요.",
    },
    {
      pregunta: "퇴직금을 IRP로 받으면 세금이 달라져요?",
      respuesta: "퇴직일 현재 개인형퇴직연금(IRP) 같은 연금계좌로 받으면, 연금이 아닌 방식으로 찾기 전까지 퇴직소득세를 떼지 않아요. 이 계산기는 일시금으로 바로 받는 경우를 계산해요.",
    },
  ],
  glosario: [
    { termino: "근속연수공제", definicion: "일한 햇수에 따라 퇴직금에서 빼 주는 금액이에요." },
    { termino: "환산급여", definicion: "퇴직금을 1년치 소득으로 바꾼 금액이에요." },
    { termino: "환산산출세액", definicion: "환산급여 기준 과세표준에 기본세율을 곱한 세액이에요." },
  ],
});
