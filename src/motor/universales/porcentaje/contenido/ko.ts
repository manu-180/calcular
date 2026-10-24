import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "퍼센트 계산기",
    title: tituloQueEntre(`퍼센트 계산기 | ${ctx.nombrePais}`, "퍼센트 계산기"),
    description: "어떤 수의 몇 %인지, 한 수가 다른 수의 몇 %인지, 퍼센트를 더하거나 뺀 결과까지 바로 계산해요.",
    intro: [
      "알고 싶은 계산을 고르고 숫자 두 개를 넣으면 바로 답이 나와요.",
      "일상에서 자주 쓰는 퍼센트 계산 네 가지(부분, 비율, 증가, 감소)를 모두 할 수 있어요.",
    ],
    comoSeCalcula: [
      "Y의 X% = X × Y ÷ 100",
      "X가 Y의 몇 %인지 = X ÷ Y × 100",
      "Y에 X% 더하기 = Y × (1 + X ÷ 100), Y에서 X% 빼기 = Y × (1 − X ÷ 100)",
    ],
    ejemplo: ["200의 15%는 30이에요.", "30은 120의 25%예요.", `${m(precio)}짜리 물건이 10% 오르면 ${m(precio * 1.1)}이 돼요.`],
    faq: [
      {
        pregunta: "어떤 수의 몇 %는 어떻게 계산하나요?",
        respuesta: "그 수에 퍼센트를 곱하고 100으로 나눠요. 350의 20%는 350 × 20 ÷ 100 = 70이에요.",
      },
      {
        pregunta: "한 수가 다른 수의 몇 %인지는 어떻게 구하나요?",
        respuesta: "부분을 전체로 나누고 100을 곱해요. 60문제 중 45문제를 맞혔다면 45 ÷ 60 × 100 = 75%예요.",
      },
      {
        pregunta: "가격에 퍼센트를 더하려면 어떻게 하나요?",
        respuesta: `1에 퍼센트를 소수로 바꾼 값을 더해서 곱해요. 10%를 더하려면 ${formatearNumero(ctx, 1.1, 2)}배로 계산하면 돼요.`,
      },
      {
        pregunta: "10% 올랐다가 10% 내리면 원래대로 돌아오나요?",
        respuesta: "아니요. 100에 10%를 더하면 110이고, 110에서 10%를 빼면 99예요. 내릴 때는 더 커진 수가 기준이 되기 때문이에요.",
      },
    ],
    glosario: [
      { termino: "퍼센트(%)", definicion: "전체를 100으로 놓고 양을 나타내는 방법이에요." },
      { termino: "기준 수", definicion: "퍼센트를 구할 때 바탕이 되는 수예요(이 계산기에서는 Y)." },
    ],
  };
};
