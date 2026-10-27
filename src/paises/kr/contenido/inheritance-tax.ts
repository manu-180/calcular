import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.inheritance-tax",
  h1: "상속세 계산기",
  title: "상속세 계산기 {{anio}} | 일괄공제·배우자공제 반영",
  description:
    "상속재산과 채무, 배우자와 자녀 수를 넣으면 일괄공제와 배우자 상속공제를 반영해 상속세를 계산해요. 신고세액공제도 넣었어요.",
  intro: [
    "돌아가신 분의 재산을 물려받을 때 내는 상속세를 계산해요.",
    "자녀가 있으면 보통 일괄공제({{kr.inheritance-deductions[lump]}})를 받고, 배우자가 있으면 최소 {{kr.inheritance-deductions[spouse-min]}}의 배우자 상속공제가 더해져요.",
  ],
  comoSeCalcula: [
    "과세가액 = 상속재산 − 채무와 장례비용",
    "공제 = 일괄공제({{kr.inheritance-deductions[lump]}}) 또는 기초공제({{kr.inheritance-deductions[basic]}}) + 자녀 1명당 {{kr.inheritance-deductions[child]}} 중 큰 금액 + 배우자 상속공제",
    "배우자 상속공제는 실제 상속받은 금액을 법정상속분과 {{kr.inheritance-deductions[spouse-max]}} 안에서 공제하고, 적어도 {{kr.inheritance-deductions[spouse-min]}}까지 공제해요.",
    "산출세액은 {{kr.gift-inheritance-tax-brackets[0].tasa}}부터 {{kr.gift-inheritance-tax-brackets[-1].tasa}}까지 누진세율이고, 기한 안에 신고하면 {{kr.filing-tax-credit}}만큼 공제해요.",
  ],
  ejemplo: ["상속재산 20억원을 배우자와 자녀 2명이 물려받으면 일괄공제 5억원과 배우자공제 5억원을 빼 과세표준은 10억원, 상속세는 신고세액공제 후 232,800,000원이에요."],
  faq: [
    {
      pregunta: "상속세는 언제까지 신고해요?",
      respuesta: "상속이 시작된 날이 속하는 달의 말일부터 6개월 안에 신고해야 해요.",
    },
    {
      pregunta: "상속재산이 10억원이면 상속세가 있나요?",
      respuesta: "배우자와 자녀가 함께 상속하면 일괄공제와 배우자공제 최소액을 합쳐 10억원까지 공제돼서 보통 상속세가 없어요. 배우자가 없으면 일괄공제만 받아요.",
    },
    {
      pregunta: "배우자 혼자 상속하면 일괄공제를 못 받아요?",
      respuesta: "배우자가 단독으로 상속받으면 일괄공제 대신 기초공제와 그 밖의 인적공제만 받아요. 배우자 상속공제는 따로 받아요.",
    },
  ],
  glosario: [
    { termino: "일괄공제", definicion: "기초공제와 인적공제 대신 한꺼번에 빼 주는 공제예요." },
    { termino: "배우자 상속공제", definicion: "배우자가 실제 상속받은 금액을 한도 안에서 빼 주는 공제예요." },
    { termino: "법정상속분", definicion: "민법이 정한 상속인별 몫이에요. 배우자는 자녀 몫의 1.5배예요." },
  ],
});
