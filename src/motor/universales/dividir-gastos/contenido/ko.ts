import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "더치페이 계산기",
    title: tituloQueEntre(`더치페이 계산기 | ${ctx.nombrePais}`, "더치페이 계산기"),
    description: "최대 8명이 함께 쓴 비용을 나눠요. 1인당 부담액과 누가 누구에게 얼마를 보내면 되는지 송금 횟수를 최소로 계산해요.",
    intro: [
      "여행, 회식, 파티, 함께 빌린 숙소처럼 각자 낸 금액이 다를 때 쓰면 좋아요.",
      "각자 낸 금액을 넣으면 1인당 부담액과 정산에 필요한 송금이 나와요.",
    ],
    comoSeCalcula: [
      "1인당 부담액 = 총비용 ÷ 인원",
      "부담액보다 적게 낸 사람은 차액을 보내고, 많이 낸 사람은 차액을 돌려받아요.",
      "가장 많이 보내야 하는 사람부터 가장 많이 받아야 하는 사람에게 연결해서 불필요한 송금이 생기지 않아요.",
    ],
    ejemplo: [
      `A가 ${m(a)}, B가 ${m(b)}을 냈고 C는 내지 않았어요. 총비용이 ${m(a + b)}이니 1인당 ${m(cuota)}이에요.`,
      `C는 A에게 ${m(cuota)}, B는 A에게 ${m(cuota - b)}을 보내면 돼요.`,
    ],
    faq: [
      {
        pregunta: "각자 낸 금액이 다를 때는 어떻게 나누나요?",
        respuesta: "전부 더해서 인원으로 나누고, 각자 낸 금액과 비교해요. 그 차이가 보내거나 받을 금액이에요.",
      },
      {
        pregunta: "아무것도 안 낸 사람이 있으면요?",
        respuesta: "그 사람 칸에 0을 넣으면 나누는 인원에 들어가요. 칸을 비워 두면 계산에서 빠져요.",
      },
      {
        pregunta: "송금 횟수가 인원보다 적은 이유는 뭔가요?",
        respuesta: "빚을 묶어서 정리하기 때문이에요. 가장 많이 보내야 하는 사람이 가장 많이 낸 사람에게 보내는 식이라, 송금은 인원보다 한 번 적은 횟수를 넘지 않아요.",
      },
    ],
    glosario: [
      { termino: "부담액", definicion: "총비용 중 한 사람이 내야 할 금액이에요." },
      { termino: "차액", definicion: "실제로 낸 금액과 부담액의 차이예요." },
    ],
  };
};
