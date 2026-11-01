import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.acquisition-tax",
  h1: "주택 취득세 계산기",
  title: "취득세 계산기 {{anio}} | 아파트 취득세·지방교육세",
  description:
    "주택 매매가를 넣으면 1~3% 취득세율에 지방교육세와 농어촌특별세를 더한 금액을 계산해요. 6억원 초과 9억원 이하 구간 세율도 반영해요.",
  intro: [
    "아파트나 단독주택을 살 때 내는 취득세와, 함께 붙는 지방교육세, 농어촌특별세를 계산해요.",
    "개인이 일반세율로 주택을 사는 경우를 계산하고, 다주택자 중과세율은 반영하지 않아요.",
  ],
  comoSeCalcula: [
    "취득가액 {{kr.housing-acquisition-brackets[low]}} 이하: 취득세율 {{kr.housing-acquisition-tax[low]}}",
    "{{kr.housing-acquisition-brackets[low]}} 초과 {{kr.housing-acquisition-brackets[high]}} 이하: (취득가액 × 2 ÷ 3억원 − 3) ÷ 100, 소수점 넷째 자리까지",
    "{{kr.housing-acquisition-brackets[high]}} 초과: 취득세율 {{kr.housing-acquisition-tax[high]}}",
    "지방교육세 = 취득가액 × 취득세율 × {{kr.local-education-tax[rate-factor]}} × {{kr.local-education-tax[rate]}}",
    "농어촌특별세 = 취득가액 × {{kr.rural-special-tax[base-rate]}} × {{kr.rural-special-tax[rate]}}, 전용면적 85제곱미터 이하는 비과세",
  ],
  ejemplo: ["7억원 아파트(전용 85제곱미터 초과)를 사면 취득세율 1.67%로 취득세 11,690,000원, 지방교육세 1,169,000원, 농어촌특별세 1,400,000원이 붙어 합계 14,259,000원이에요."],
  faq: [
    {
      pregunta: "취득세는 언제까지 내야 해요?",
      respuesta: "주택을 취득한 날(보통 잔금을 치른 날)부터 60일 안에 신고하고 내야 해요. 감면 여부는 주택이 있는 시·군·구청에서 확인하세요.",
    },
    {
      pregunta: "6억원과 9억원 사이는 왜 세율이 소수점이에요?",
      respuesta: "6억원에서 9억원 사이는 가격이 올라갈수록 세율이 1%에서 3%까지 조금씩 올라가도록 계산식으로 정해져 있어서예요. 8억원이면 2.33%예요.",
    },
    {
      pregunta: "2주택 이상이면 어떻게 돼요?",
      respuesta: "조정대상지역의 2주택 이상, 그 밖의 지역 3주택 이상, 법인이 사는 주택에는 더 높은 중과세율이 적용돼요. 이 계산기는 그런 경우를 계산하지 않아요.",
    },
  ],
  glosario: [
    { termino: "취득가액", definicion: "주택을 사면서 실제로 낸 매매 가격이에요." },
    { termino: "지방교육세", definicion: "취득세에 덧붙여 내는 지방세예요." },
    { termino: "국민주택 규모", definicion: "주거 전용면적 85제곱미터 이하인 주택이에요." },
  ],
});
