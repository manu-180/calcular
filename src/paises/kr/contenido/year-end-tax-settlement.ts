import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.year-end-tax-settlement",
  h1: "연말정산 계산기(환급액 미리 계산)",
  title: "연말정산 계산기 2026 | 환급·추가 납부 미리 계산",
  description:
    "총급여와 이미 낸 소득세, 부양가족, 공제 금액을 넣으면 연말정산 결정세액과 환급받을 돈 또는 더 낼 돈을 미리 계산해요.",
  intro: [
    "회사는 매달 간이세액표로 소득세를 떼고, 다음 해 초 연말정산에서 1년 치 세금을 다시 계산해요.",
    "결정세액이 이미 낸 세금보다 적으면 차액을 돌려받고, 많으면 더 내요. 이 계산기로 미리 짐작해 보세요.",
  ],
  comoSeCalcula: [
    "근로소득금액 = 총급여 − 근로소득공제(한도 {{kr.earned-income-deduction-cap}})",
    "과세표준 = 근로소득금액 − 기본공제(1명당 {{kr.basic-deduction}}) − 국민연금·건강·고용보험료 − 그 밖의 소득공제",
    "결정세액 = 산출세액 − 근로소득세액공제 − 자녀세액공제 − 특별세액공제 또는 표준세액공제({{kr.standard-tax-credit}})",
    "차감징수세액 = 결정세액 − 이미 낸 소득세. 지방소득세는 소득세의 {{kr.local-income-tax-rate}}만큼 같은 방식으로 정산해요.",
  ],
  ejemplo: ["총급여 5,000만원, 1년간 원천징수 소득세 200만원, 다른 공제가 없으면 결정세액은 2,658,710원이에요. 지방소득세까지 약 72만원을 더 내야 해요."],
  faq: [
    {
      pregunta: "자녀세액공제는 얼마예요?",
      respuesta: "8세 이상 자녀가 1명이면 {{kr.child-tax-credit[uno]}}, 2명이면 {{kr.child-tax-credit[dos]}}, 3명째부터는 1명당 {{kr.child-tax-credit[adicional]}}씩 더해요.",
    },
    {
      pregunta: "표준세액공제는 언제 받아요?",
      respuesta: "보험료, 의료비, 교육비, 기부금 같은 특별세액공제를 신청하지 않은 근로자는 {{kr.standard-tax-credit}}의 표준세액공제를 받아요. 이 계산기는 둘 중 큰 금액을 써요.",
    },
    {
      pregunta: "신용카드 소득공제 금액은 어떻게 넣나요?",
      respuesta: "홈택스 연말정산 간소화 서비스나 회사가 준 공제 내역에서 소득공제 금액(사용액이 아니라 공제액)을 확인해 ‘그 밖의 소득공제’에 넣으세요.",
    },
  ],
  glosario: [
    { termino: "연말정산", definicion: "1년 동안 원천징수한 근로소득세를 실제 세액과 맞춰 정산하는 절차예요." },
    { termino: "결정세액", definicion: "공제를 모두 반영한 뒤 1년 동안 실제로 내야 할 세금이에요." },
    { termino: "차감징수세액", definicion: "결정세액에서 이미 낸 세금을 뺀 금액이에요. 마이너스면 환급이에요." },
  ],
});
