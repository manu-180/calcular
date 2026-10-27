import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.unemployment-benefit",
  h1: "실업급여 계산기(구직급여)",
  title: "실업급여 계산기 {{anio}} | 구직급여 하루 금액·받는 기간",
  description:
    "퇴직 전 3개월 임금과 고용보험 가입 기간, 나이를 넣으면 실업급여 하루 금액과 받는 날수, 총액을 계산해요. {{anio}}년 상한액과 하한액을 써요.",
  intro: [
    "실업급여(구직급여)는 퇴직 전 평균임금의 {{kr.unemployment-rate}}만큼을 하루 단위로 받아요.",
    "하루 금액에는 상한과 하한이 있고, 받는 날수는 고용보험 가입 기간과 퇴직 당시 나이로 정해져요.",
  ],
  comoSeCalcula: [
    "1일 평균임금 = 퇴직 전 3개월 임금 총액 ÷ 그 기간의 총일수",
    "1일 구직급여액 = 1일 평균임금(상한 {{kr.unemployment-base-cap}}) × {{kr.unemployment-rate}}",
    "하한액 = 시간급 최저임금 × 1일 소정근로시간 × {{kr.unemployment-min-rate}}",
    "총액 = 1일 구직급여액 × 소정급여일수({{kr.unemployment-days[u50-0]}}부터 {{kr.unemployment-days[o50-10]}}까지)",
  ],
  ejemplo: ["52세에 고용보험 가입 10년 이상이고 3개월 임금이 1,500만원이면 상한액 68,100원을 270일 동안 받아 총 18,387,000원이에요."],
  faq: [
    {
      pregunta: "실업급여는 누가 받을 수 있어요?",
      respuesta: "퇴직 전 18개월 동안 고용보험 피보험 단위기간이 180일 이상이고, 일할 의사와 능력이 있는데도 취업하지 못한 상태여야 해요. 스스로 그만둔 경우처럼 수급이 제한되는 사유도 있어요.",
    },
    {
      pregunta: "하루 상한액과 하한액은 얼마예요?",
      respuesta: "2026년 1월 1일 이후 퇴직한 사람은 하루 상한액이 68,100원이에요. 하한액은 최저임금의 {{kr.unemployment-min-rate}}에 1일 소정근로시간을 곱한 금액이라서 하루 8시간 근무라면 66,048원이에요.",
    },
    {
      pregunta: "50세 이상이면 더 오래 받나요?",
      respuesta: "네. 가입 기간이 1년 이상이면 50세 미만보다 30일 더 받아요. 장애인도 50세 이상과 같은 날수를 받아요.",
    },
  ],
  glosario: [
    { termino: "구직급여", definicion: "실업 상태에서 재취업 활동을 하는 동안 받는 실업급여의 기본 급여예요." },
    { termino: "소정급여일수", definicion: "구직급여를 받을 수 있는 최대 날수예요." },
    { termino: "피보험 단위기간", definicion: "고용보험에 가입해 보수를 받은 날을 센 기간이에요." },
  ],
});
