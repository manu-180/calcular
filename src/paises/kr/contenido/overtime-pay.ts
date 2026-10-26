import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.overtime-pay",
  h1: "연장근로수당 계산기(야근·휴일수당)",
  title: "연장근로수당 계산기 | 야근수당·휴일수당 계산",
  description:
    "통상시급과 연장, 야간, 휴일 근로시간을 넣으면 근로기준법의 가산율을 적용한 수당을 계산해요. 5명 미만 사업장도 구분해요.",
  intro: [
    "연장근로와 야간근로에는 통상임금의 {{kr.overtime-premiums[extension]}} 이상을 더 줘야 해요.",
    "휴일근로는 하루 8시간까지 {{kr.overtime-premiums[holiday]}}, 8시간을 넘는 부분은 {{kr.overtime-premiums[holiday-over8]}}만큼 가산해요.",
  ],
  comoSeCalcula: [
    "연장근로수당 = 통상시급 × 연장근로시간 × 1.5",
    "휴일근로수당 = 통상시급 × 8시간 이내 휴일근로시간 × 1.5 + 통상시급 × 8시간 초과분 × 2",
    "야간근로(오후 10시부터 오전 6시까지)는 연장이나 휴일근로와 겹쳐도 통상시급의 {{kr.overtime-premiums[night]}}만큼 따로 더해요.",
    "상시 4명 이하 사업장은 가산율이 적용되지 않아서 일한 시간만큼만 계산해요.",
  ],
  ejemplo: ["통상시급 15,000원으로 연장 10시간, 휴일 10시간(그중 2시간은 8시간 초과), 야간 4시간을 일했다면 수당은 495,000원이에요."],
  faq: [
    {
      pregunta: "통상시급은 어떻게 구하나요?",
      respuesta: "주 40시간 근무라면 월 통상임금(기본급과 매달 고정으로 받는 수당)을 209시간으로 나눠요.",
    },
    {
      pregunta: "휴일에 8시간 넘게 일하면 얼마를 받나요?",
      respuesta: "8시간까지는 통상임금에 {{kr.overtime-premiums[holiday]}}, 8시간을 넘는 시간은 {{kr.overtime-premiums[holiday-over8]}}만큼 더 받아요. 오후 10시 이후라면 야간근로 가산 {{kr.overtime-premiums[night]}}도 붙어요.",
    },
    {
      pregunta: "5명 미만 회사에서도 야근수당을 받을 수 있어요?",
      respuesta: "상시 4명 이하 사업장에는 가산수당 규정이 적용되지 않아요. 일한 시간에 대한 임금은 받아야 하지만 가산수당은 의무가 아니에요.",
    },
  ],
  glosario: [
    { termino: "연장근로", definicion: "1주 40시간, 1일 8시간을 넘겨 일한 시간이에요." },
    { termino: "야간근로", definicion: "오후 10시부터 다음 날 오전 6시 사이에 일한 시간이에요." },
    { termino: "통상임금", definicion: "소정근로에 대해 정기적, 일률적으로 주기로 한 임금이에요." },
  ],
});
