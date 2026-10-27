import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kr.brokerage-fee",
  h1: "부동산 중개수수료 계산기(복비)",
  title: "중개수수료 계산기 {{anio}} | 매매·전세·월세 복비",
  description:
    "매매가나 보증금, 월세를 넣으면 공인중개사법 시행규칙의 상한요율과 한도액으로 부동산 중개수수료(복비) 상한을 계산해요.",
  intro: [
    "부동산 중개수수료(중개보수)는 거래금액에 상한요율을 곱한 금액 안에서 중개사와 협의해 정해요.",
    "매매와 임대차의 요율이 다르고, 월세는 보증금에 월세를 일정 배수로 더한 금액을 거래금액으로 봐요.",
  ],
  comoSeCalcula: [
    "주택 매매: {{kr.brokerage-sale[0].tasa}}부터 {{kr.brokerage-sale[-1].tasa}}까지, 거래금액 구간별 상한요율",
    "주택 임대차: {{kr.brokerage-lease[0].tasa}}부터 {{kr.brokerage-lease[-1].tasa}}까지",
    "월세 거래금액 = 보증금 + 월세 × {{kr.brokerage-rent-multipliers[normal]}}. 그 합이 {{kr.brokerage-rent-multipliers[limite]}}보다 적으면 월세 × {{kr.brokerage-rent-multipliers[small]}}",
    "낮은 금액 구간에는 한도액이 있어요. 매매 5천만원 미만은 {{kr.brokerage-caps[sale0]}}, 임대차 5천만원 미만은 {{kr.brokerage-caps[lease0]}}까지예요.",
  ],
  ejemplo: ["5억원 아파트를 사면 상한요율 0.4%로 중개수수료는 200만원까지이고, 부가가치세를 더하면 220만원이에요."],
  faq: [
    {
      pregunta: "중개수수료는 누가 내나요?",
      respuesta: "매도인과 매수인, 임대인과 임차인이 각각 내요. 이 계산기의 금액은 한쪽이 내는 상한이에요.",
    },
    {
      pregunta: "지역마다 요율이 다른가요?",
      respuesta: "주택 중개보수는 시·도 조례로 정하는 요율 한도 안에서 협의해요. 중개대상물과 중개사무소가 있는 곳이 다르면 사무소가 있는 시·도의 조례를 따라요.",
    },
    {
      pregunta: "오피스텔은 요율이 따로 있나요?",
      respuesta: "전용 85제곱미터 이하이고 부엌, 화장실, 목욕시설을 갖춘 주거용 오피스텔은 매매 {{kr.officetel-brokerage[sale]}}, 임대차 {{kr.officetel-brokerage[lease]}}까지예요.",
    },
  ],
  glosario: [
    { termino: "중개보수", definicion: "공인중개사에게 내는 수수료예요. 흔히 복비라고 해요." },
    { termino: "상한요율", definicion: "거래금액에 곱할 수 있는 최고 비율이에요." },
    { termino: "한도액", definicion: "요율로 계산해도 넘을 수 없는 최고 금액이에요." },
  ],
});
