import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.social-insurance",
  h1: "4대보험 계산기({{anio}}년 요율)",
  title: "4대보험 계산기 {{anio}} | 근로자·사업주 부담금",
  description:
    "월 보수를 넣으면 국민연금, 건강보험, 장기요양보험, 고용보험의 근로자 부담과 회사 부담을 나눠서 계산해요. {{anio}}년 보험료율을 써요.",
  intro: [
    "직장가입자의 4대보험료를 근로자 몫과 회사 몫으로 나눠 보여 줘요.",
    "회사 규모에 따라 달라지는 고용안정·직업능력개발 보험료와, 알고 있다면 산재보험료도 회사 부담에 넣을 수 있어요.",
  ],
  comoSeCalcula: [
    "국민연금: 기준소득월액({{kr.pension-income-limits[min]}}부터 {{kr.pension-income-limits[max]}}까지)에 근로자와 회사가 각각 {{kr.national-pension-rate}}씩 내요.",
    "건강보험: 보수월액에 건강보험료율({{kr.health-insurance-rate}})을 곱한 금액을 근로자와 회사가 절반씩 내요.",
    "장기요양보험: 건강보험료에 장기요양보험료율({{kr.long-term-care-rate}})과 건강보험료율의 비율을 곱해요.",
    "고용보험: 실업급여 보험료 {{kr.employment-insurance-rate}}의 절반씩, 회사는 규모에 따라 고용안정·직업능력개발 보험료({{kr.employment-stability-rate[u150]}}부터 {{kr.employment-stability-rate[o1000]}}까지)를 더 내요.",
    "각 보험료는 10원 미만을 버려요.",
  ],
  ejemplo: [
    "월 보수 300만원, 150명 미만 회사라면 근로자는 국민연금 142,500원, 건강보험 107,850원, 장기요양보험 14,170원, 고용보험 27,000원으로 월 291,520원을 내요. 회사 부담은 299,020원이에요.",
  ],
  faq: [
    {
      pregunta: "4대보험료는 세전 월급 전체에 붙나요?",
      respuesta: "식대처럼 비과세인 금액은 빼고 계산해요. 그래서 이 계산기에는 비과세를 뺀 월 보수를 넣어야 해요.",
    },
    {
      pregunta: "국민연금 보험료에 상한이 있나요?",
      respuesta:
        "있어요. 기준소득월액은 {{kr.pension-income-limits[max]}}까지만 반영돼서 월 보수가 그보다 많아도 보험료는 같아요. 상한액과 하한액은 해마다 7월에 바뀌어요.",
    },
    {
      pregunta: "산재보험료는 누가 내나요?",
      respuesta: "산재보험료는 회사가 전액 내요. 요율은 업종에 따라 달라서 기본값은 0으로 두었어요.",
    },
    {
      pregunta: "장기요양보험료는 왜 건강보험료에 비례해요?",
      respuesta:
        "법에서 장기요양보험료를 건강보험료에 두 요율의 비율(소수점 다섯째 자리에서 반올림)을 곱해 정하도록 하고 있어요. 결과는 보수월액에 장기요양보험료율을 곱한 값과 거의 같아요.",
    },
  ],
  glosario: [
    { termino: "보수월액", definicion: "건강보험과 고용보험료를 매기는 기준이 되는 월 급여예요. 비과세 소득은 빠져요." },
    { termino: "기준소득월액", definicion: "국민연금 보험료를 매기는 월 소득이에요. 하한액과 상한액 사이에서 정해져요." },
    { termino: "직장가입자", definicion: "회사에 다니며 회사와 보험료를 나눠 내는 가입자예요." },
  ],
});
