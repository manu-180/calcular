import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.parental-leave-benefit",
  h1: "육아휴직 급여 계산기",
  title: "육아휴직 급여 계산기 {{anio}} | 월별 지급액·총액",
  description:
    "월 통상임금과 휴직 개월 수를 넣으면 1~3개월, 4~6개월, 7개월째부터의 육아휴직 급여와 총액을 계산해요. 고용보험법 시행령 기준이에요.",
  intro: [
    "육아휴직 급여는 휴직을 시작한 날의 월 통상임금을 기준으로 고용보험에서 매달 받아요.",
    "처음 6개월은 통상임금의 100%를 받되 구간마다 상한이 있고, 7개월째부터는 {{kr.parental-leave-late-rate}}만큼 받아요.",
  ],
  comoSeCalcula: [
    "1~3개월: 월 통상임금, 상한 {{kr.parental-leave-caps[m1]}}",
    "4~6개월: 월 통상임금, 상한 {{kr.parental-leave-caps[m4]}}",
    "7개월째부터: 월 통상임금 × {{kr.parental-leave-late-rate}}, 상한 {{kr.parental-leave-caps[m7]}}",
    "모든 구간에 하한({{kr.parental-leave-caps[piso]}})이 있고, 한 달을 다 채우지 못한 달은 휴직한 날수만큼 나눠서 줘요.",
  ],
  ejemplo: ["월 통상임금 300만원으로 12개월 쉬면 250만원 3개월, 200만원 3개월, 160만원 6개월을 받아 총 2,310만원이에요."],
  faq: [
    {
      pregunta: "육아휴직 급여는 어떻게 받나요?",
      respuesta: "시행령은 육아휴직 급여를 월별 지급액으로 정하고 있어요. 계산한 금액을 휴직 기간 동안 매달 받아요.",
    },
    {
      pregunta: "육아휴직을 나눠서 쓰면 어떻게 계산해요?",
      respuesta: "나눠 쓴 기간을 모두 합친 기간을 기준으로 1~3개월, 4~6개월, 7개월째부터를 구분해요.",
    },
    {
      pregunta: "통상임금에는 무엇이 들어가요?",
      respuesta: "기본급과 매달 고정으로 받는 수당이 들어가요. 연장근로수당처럼 일한 만큼 달라지는 돈은 빠져요.",
    },
  ],
  glosario: [
    { termino: "육아휴직", definicion: "자녀를 키우기 위해 쓰는 휴직이에요. 기간은 1년 이내이고, 조건을 갖추면 6개월을 더 쓸 수 있어요." },
    { termino: "통상임금", definicion: "소정근로에 대해 정기적, 일률적으로 주기로 한 임금이에요." },
  ],
});
