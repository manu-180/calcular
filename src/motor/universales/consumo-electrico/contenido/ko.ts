import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "전기요금 계산기",
    title: tituloQueEntre(`전기요금 계산기 | ${ctx.nombrePais}`, "전기요금 계산기"),
    description: "가전제품의 소비전력, 사용 시간, kWh당 요금으로 전력 사용량과 전기요금을 하루, 한 달, 1년 단위로 계산해요.",
    intro: [
      "제품의 소비전력, 사용 시간, 고지서에 적힌 kWh당 요금을 넣으면 사용량과 요금이 나와요.",
      "에어컨, 난방기, 냉장고, 컴퓨터 중 어떤 제품이 요금에 가장 큰 영향을 주는지 알아볼 때 쓰면 좋아요.",
    ],
    comoSeCalcula: [
      "하루 사용량(kWh) = 소비전력(W) × 사용 시간 ÷ 1000",
      "한 달 사용량 = 하루 사용량 × 사용 일수. 1년은 한 달 사용량의 12배예요.",
      "요금 = 사용량(kWh) × kWh당 요금",
    ],
    ejemplo: [`1000W 제품을 하루 4시간 쓰면 하루 4kWh, 한 달 ${formatearNumero(ctx, kwhMes)}kWh를 써요.`, `kWh당 ${m(precio)}이면 한 달 요금은 ${m(kwhMes * precio)}이에요.`],
    faq: [
      {
        pregunta: "kWh가 뭔가요?",
        respuesta: "킬로와트시는 1000W 제품을 한 시간 켰을 때 쓰는 전력량이에요. 전기요금 고지서에 쓰이는 단위예요.",
      },
      {
        pregunta: "냉장고는 하루 종일 최대 전력으로 돌아가나요?",
        respuesta: "아니요. 컴프레서가 켜졌다 꺼졌다 해요. 이런 제품은 24시간 대신 하루 8~10시간 정도로 계산하세요.",
      },
      {
        pregunta: "고지서 금액과 딱 맞지 않는 이유는요?",
        respuesta: "고지서에는 기본요금, 세금, 누진 요금 등이 더해지기 때문이에요. 이 계산기는 그 제품이 쓰는 몫만 보여 줘요.",
      },
    ],
    glosario: [
      { termino: "와트(W)", definicion: "제품이 1초마다 쓰는 에너지의 크기를 나타내는 단위예요." },
      { termino: "킬로와트시(kWh)", definicion: "1000W를 한 시간 쓴 전력량이에요. 전기요금은 이 단위로 매겨요." },
    ],
  };
};
