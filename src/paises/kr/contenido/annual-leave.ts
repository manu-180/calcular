import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.annual-leave",
  h1: "연차 계산기(연차 일수와 연차수당)",
  title: "연차 계산기 2026 | 연차 일수·미사용 연차수당",
  description:
    "입사일을 넣으면 올해 생기는 연차 일수를 계산하고, 쓰지 못한 연차의 수당까지 알려 줘요. 근로기준법 제60조 기준이에요.",
  intro: [
    "1년간 80% 이상 출근하면 연차 유급휴가가 {{kr.annual-leave[base]}} 생기고, 근속 3년부터 2년마다 하루씩 늘어요.",
    "쓰지 못한 연차는 1일 통상임금으로 계산한 연차수당으로 받을 수 있어요.",
  ],
  comoSeCalcula: [
    "입사 1년 미만: 1개월 개근할 때마다 {{kr.annual-leave[mensual]}}, 최대 11일.",
    "1년 이상: {{kr.annual-leave[base]}} + (근속연수 − 1) ÷ 2의 정수 부분, 합계 {{kr.annual-leave[max]}}까지.",
    "1일 통상임금 = 월 통상임금 ÷ {{kr.minimum-wage-monthly-hours}} × 8시간",
    "미사용 연차수당 = 1일 통상임금 × 쓰지 못한 연차 일수",
  ],
  ejemplo: ["2020년 3월 2일에 입사해 2026년 10월에 근속 6년이면 연차는 17일이에요. 월 통상임금 300만원이고 5일을 못 썼다면 연차수당은 약 574,163원이에요."],
  faq: [
    {
      pregunta: "연차는 최대 며칠까지 생겨요?",
      respuesta: "가산휴가를 합쳐 {{kr.annual-leave[max]}}까지예요. 근속 21년이 되면 한도에 닿아요.",
    },
    {
      pregunta: "연차를 안 쓰면 사라지나요?",
      respuesta: "1년 안에 쓰지 않으면 소멸해요. 회사 사정으로 쓰지 못했다면 소멸하지 않고, 쓰지 못한 날만큼 수당을 받을 수 있어요.",
    },
    {
      pregunta: "5명 미만 회사도 연차가 있나요?",
      respuesta: "상시 근로자가 4명 이하인 사업장에는 연차 유급휴가 규정이 적용되지 않아요. 회사가 취업규칙으로 따로 정했다면 그 규칙을 따라요.",
    },
    {
      pregunta: "육아휴직 기간도 출근한 것으로 봐요?",
      respuesta: "네. 업무상 부상이나 질병으로 쉰 기간, 출산전후휴가, 육아휴직 기간은 연차를 계산할 때 출근한 것으로 봐요.",
    },
  ],
  glosario: [
    { termino: "연차 유급휴가", definicion: "임금을 받으면서 쉴 수 있는 법정 휴가예요." },
    { termino: "통상임금", definicion: "소정근로에 대해 정기적, 일률적으로 주기로 한 임금이에요. 기본급과 고정수당이 들어가요." },
    { termino: "가산휴가", definicion: "근속 3년째부터 2년마다 하루씩 더해지는 연차예요." },
  ],
});
