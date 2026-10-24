import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.take-home-pay",
  h1: "연봉 실수령액 계산기(2026년)",
  title: "연봉 실수령액 계산기 2026 | 4대보험·세금 뺀 월급",
  description:
    "연봉을 넣으면 국민연금, 건강보험, 고용보험과 소득세, 지방소득세를 뺀 월 실수령액을 바로 계산해요. 2026년 보험료율과 세율을 써요.",
  intro: [
    "연봉에서 4대보험과 세금을 빼고 실제로 통장에 들어오는 월급을 계산해요.",
    "부양가족과 자녀 수를 넣으면 기본공제와 자녀세액공제까지 반영해요. 식대처럼 비과세인 금액은 보험료와 세금 계산에서 빠져요.",
  ],
  comoSeCalcula: [
    "월 보수는 연봉을 12로 나눈 뒤 비과세액을 뺀 금액이에요.",
    "국민연금은 기준소득월액의 {{kr.national-pension-rate}}, 건강보험은 보수월액에 {{kr.health-insurance-rate}}의 절반, 고용보험은 {{kr.employment-insurance-rate}}의 절반을 곱해요. 장기요양보험은 건강보험료에 비례해서 붙어요.",
    "국민연금 기준소득월액은 {{kr.pension-income-limits[min]}}부터 {{kr.pension-income-limits[max]}}까지만 반영해요.",
    "소득세는 총급여에서 근로소득공제, 1명당 {{kr.basic-deduction}}의 기본공제, 국민연금과 건강·고용보험료를 빼고 기본세율({{kr.income-tax-brackets[0].tasa}}부터 {{kr.income-tax-brackets[-1].tasa}}까지)을 적용해요. 근로소득세액공제, 자녀세액공제, 표준세액공제({{kr.standard-tax-credit}})를 뺀 뒤 소득세의 {{kr.local-income-tax-rate}}만큼 지방소득세를 더해요.",
  ],
  ejemplo: [
    "연봉 4,000만원, 식대 20만원, 본인 1명이면 4대보험이 월 304,470원, 소득세와 지방소득세가 월 평균 104,523원이에요. 월 실수령액은 약 292만원이에요.",
  ],
  faq: [
    {
      pregunta: "월급명세서 금액과 조금 다른 이유가 뭐예요?",
      respuesta:
        "회사는 매달 간이세액표로 소득세를 떼고, 다음 해 2월 연말정산에서 1년 치를 정산해요. 이 계산기는 연말정산 기준의 1년 세액을 12로 나눠 보여 줘서 매달 떼는 금액과 몇만원 차이가 날 수 있어요. 카드 사용액, 보험료, 의료비 같은 특별공제도 넣지 않았어요.",
    },
    {
      pregunta: "식대 비과세는 얼마까지예요?",
      respuesta: "식사를 따로 제공받지 않는 근로자가 받는 식대는 월 {{kr.meal-allowance-exempt}}까지 비과세예요. 비과세 금액에는 4대보험료와 소득세가 붙지 않아요.",
    },
    {
      pregunta: "국민연금 보험료율은 얼마예요?",
      respuesta:
        "2026년부터 연금보험료율이 해마다 0.5%포인트씩 올라요. 올해 직장가입자 본인 부담은 기준소득월액의 {{kr.national-pension-rate}}만큼이에요. 회사도 같은 금액을 내요.",
    },
    {
      pregunta: "부양가족은 어떻게 세나요?",
      respuesta: "본인을 포함해 기본공제를 받는 사람 수를 넣으세요. 소득이 연 100만원 이하인 배우자, 20세 이하 자녀, 60세 이상 부모 등이 해당해요. 자녀세액공제는 8세 이상 자녀만 받을 수 있어요.",
    },
  ],
  glosario: [
    { termino: "실수령액", definicion: "4대보험료와 세금을 뺀 뒤 실제로 받는 금액이에요." },
    { termino: "비과세 소득", definicion: "식대처럼 세금과 보험료를 매기지 않는 급여예요." },
    { termino: "과세표준", definicion: "소득에서 각종 공제를 빼고 세율을 곱하는 금액이에요." },
  ],
});
