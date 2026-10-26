import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.jeonwolse-conversion",
  h1: "전월세 전환율 계산기",
  title: "전월세 전환율 계산기 | 보증금을 월세로 바꾸면 얼마",
  description:
    "보증금을 월세로 바꿀 때 법으로 받을 수 있는 월세 상한을 한국은행 기준금리로 계산해요. 월세를 보증금으로 바꾼 금액도 볼 수 있어요.",
  intro: [
    "전세 보증금 일부를 월세로 돌릴 때 집주인이 받을 수 있는 월세에는 법정 상한이 있어요.",
    "상한 전환율은 연 {{kr.rent-conversion[tope]}}, 또는 한국은행 기준금리에 {{kr.rent-conversion[adicional]}}만큼 더한 비율 가운데 낮은 쪽이에요. 지금 쓰는 기준금리는 {{kr.base-rate#desde}}에 공시된 {{kr.base-rate}}만큼이에요.",
  ],
  comoSeCalcula: [
    "전환율 = 연 {{kr.rent-conversion[tope]}}, (기준금리 + {{kr.rent-conversion[adicional]}}) 가운데 낮은 비율",
    "월세 상한 = 월세로 바꿀 보증금 × 전환율 ÷ 12",
    "월세를 보증금으로 바꾼 금액 = 월세 × 12 ÷ 전환율",
  ],
  ejemplo: ["기준금리가 3%일 때 전환율은 5%예요. 보증금 1억원을 월세로 바꾸면 월세는 416,667원까지 받을 수 있어요."],
  faq: [
    {
      pregunta: "전월세 전환율은 언제 적용돼요?",
      respuesta: "보증금의 전부나 일부를 월 단위 차임으로 바꾸는 경우에 적용돼요. 이 비율을 넘는 월세 부분은 받을 수 없어요.",
    },
    {
      pregunta: "기준금리가 바뀌면 전환율도 바뀌나요?",
      respuesta: "네. 기준금리에 일정 이율을 더하는 방식이라 한국은행이 기준금리를 바꾸면 상한 전환율도 함께 바뀌어요. 이 계산기는 한국은행이 공시한 최신 기준금리를 써요.",
    },
    {
      pregunta: "상가 임대차에도 같은 전환율이 적용돼요?",
      respuesta: "아니요. 이 계산기는 주택임대차보호법의 기준이에요. 상가 건물은 상가건물 임대차보호법을 따로 확인하세요.",
    },
  ],
  glosario: [
    { termino: "전월세 전환율", definicion: "보증금을 월세로 바꿀 때 적용하는 연 이율이에요." },
    { termino: "기준금리", definicion: "한국은행 금융통화위원회가 정하는 정책금리예요." },
    { termino: "보증금", definicion: "임대차 계약 때 임차인이 맡기고 계약이 끝나면 돌려받는 돈이에요." },
  ],
});
