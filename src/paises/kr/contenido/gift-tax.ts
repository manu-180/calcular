import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.gift-tax",
  h1: "증여세 계산기",
  title: "증여세 계산기 2026 | 부모·배우자 증여 공제",
  description:
    "증여받는 금액과 증여하는 사람을 고르면 증여재산 공제, 세율, 신고세액공제를 반영해 낼 증여세를 계산해요. 10년 합산 공제도 넣을 수 있어요.",
  intro: [
    "재산을 대가 없이 받으면 받은 사람이 증여세를 내요. 관계에 따라 10년 동안 공제받을 수 있는 금액이 정해져 있어요.",
    "배우자에게 받으면 {{kr.gift-deductions[spouse]}}, 성인이 부모에게 받으면 {{kr.gift-deductions[lineal]}}, 미성년자는 {{kr.gift-deductions[minor]}}까지 공제돼요.",
  ],
  comoSeCalcula: [
    "과세표준 = 증여재산 가액 − 증여재산 공제(10년 동안 같은 관계에서 받은 공제를 합쳐 한도까지)",
    "산출세액: {{kr.gift-inheritance-tax-brackets[1].desde}} 이하 {{kr.gift-inheritance-tax-brackets[0].tasa}}부터 {{kr.gift-inheritance-tax-brackets[-1].desde}} 초과분 {{kr.gift-inheritance-tax-brackets[-1].tasa}}까지 누진세율",
    "기한 안에 신고하면 산출세액의 {{kr.filing-tax-credit}}만큼 신고세액공제를 받아요.",
    "과세표준이 {{kr.gift-inheritance-minimum}} 미만이면 증여세가 없어요.",
  ],
  ejemplo: ["성인 자녀가 부모에게 1억원을 받으면 5천만원을 공제하고 남은 5천만원에 10%를 매겨 500만원, 신고하면 4,850,000원을 내요."],
  faq: [
    {
      pregunta: "증여세는 언제까지 신고해요?",
      respuesta: "증여받은 날이 속하는 달의 말일부터 3개월 안에 신고해야 해요.",
    },
    {
      pregunta: "부모님과 조부모님에게 따로 받으면 공제도 따로예요?",
      respuesta: "직계존속에게 받은 증여는 함께 묶어서 10년 동안 한도를 따져요. 아버지와 할머니에게 받은 공제를 합쳐서 한도를 넘으면 넘는 부분은 공제되지 않아요.",
    },
    {
      pregunta: "그 밖의 친족에게 받으면 공제는 얼마예요?",
      respuesta: "4촌 이내 혈족과 3촌 이내 인척에게 받으면 10년 동안 {{kr.gift-deductions[other]}}까지 공제돼요.",
    },
  ],
  glosario: [
    { termino: "증여재산 공제", definicion: "관계에 따라 증여받은 재산에서 빼 주는 금액이에요. 10년 단위로 합산해요." },
    { termino: "신고세액공제", definicion: "기한 안에 신고하면 세금에서 빼 주는 금액이에요." },
    { termino: "직계존속", definicion: "부모, 조부모처럼 위 세대의 혈족이에요." },
  ],
});
