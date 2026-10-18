import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionKo } from "../../dias-entre-fechas/textos/ko";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "만 나이 계산기",
    title: tituloQueEntre(`만 나이 계산기 | ${ctx.nombrePais}`, "만 나이 계산기"),
    description: "생년월일로 만 나이를 년, 개월, 일까지 정확하게 계산해요. 태어난 지 며칠인지, 다음 생일까지 며칠 남았는지도 알려 줘요.",
    intro: [
      "생년월일을 넣으면 오늘 기준 정확한 나이를 개월, 주, 일과 함께 보여 줘요.",
      "기준일을 바꾸면 특정한 날의 나이나 앞으로 그날 몇 살이 되는지도 알 수 있어요.",
    ],
    comoSeCalcula: [
      "태어난 날부터 기준일까지 꽉 찬 개월 수를 세요. 12개월이 1년이에요.",
      "마지막으로 꽉 찬 달 이후 남은 날이 나이의 ‘일’이 돼요.",
      "윤년은 366일로 세요.",
    ],
    ejemplo: [
      `${fechaLarga(ctx.locale, nac)}에 태어난 사람은 ${fechaLarga(ctx.locale, ref)} 기준으로 만 ${duracionKo(Math.floor(meses / 12), meses % 12, dias)}이에요.`,
      `일수로는 ${formatearNumero(ctx, total)}일이에요.`,
    ],
    faq: [
      {
        pregunta: "만 나이는 어떻게 계산하나요?",
        respuesta: "먼저 꽉 찬 햇수를 세고, 마지막 생일 이후 꽉 찬 개월 수, 그다음 남은 날을 세요.",
      },
      {
        pregunta: "2월 29일생은 어떻게 하나요?",
        respuesta: "윤년이 아닌 해에는 이 계산기에서 2월 28일을 생일로 봐요. 법에 따라 3월 1일로 보는 경우도 있어요.",
      },
      {
        pregunta: "태어난 지 며칠 됐는지 알 수 있나요?",
        respuesta: "“일로” 줄을 보세요. 태어난 날부터 기준일까지의 일수이고, 기준일 당일은 빼고 세요.",
      },
    ],
    glosario: [
      { termino: "만 나이", definicion: "태어난 날부터 꽉 찬 햇수로 세는 나이예요." },
      { termino: "윤년", definicion: "2월 29일이 있는 366일짜리 해예요. 4년에 한 번이지만, 100으로 나누어떨어지는 해 중 일부는 빠져요." },
    ],
  };
};
