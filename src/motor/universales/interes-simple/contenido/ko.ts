import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "단리 계산기",
    title: tituloQueEntre(`단리 계산기 | ${ctx.nombrePais}`, "단리 계산기"),
    description: "원금과 연 이자율로 일, 개월, 년 단위 기간의 단리 이자를 계산해요. 1년을 365일이나 360일로 셀지도 고를 수 있어요.",
    intro: [
      "단리는 언제나 처음 원금을 기준으로 이자를 계산해요. 기간 중에 이자가 원금에 더해지지 않아요.",
      "단기 예금, 개인 간 대여, 수학 문제 등에 자주 쓰여요.",
    ],
    comoSeCalcula: ["이자 = 원금 × 연 이자율 × 기간(년)", "개월이면 12로 나누고, 일이면 금융회사 기준에 따라 365나 360으로 나눠요.", "합계 = 원금 + 이자"],
    ejemplo: [
      `${m(capital)}을 연 10%로 6개월 맡기면 이자는 ${m(capital * 0.1 * 0.5)}이에요.`,
      `같은 원금을 90일 맡기면 1년 365일 기준으로 ${m((capital * 0.1 * 90) / 365)}, 360일 기준으로 ${m((capital * 0.1 * 90) / 360)}이에요.`,
    ],
    faq: [
      {
        pregunta: "단리 공식은 뭔가요?",
        respuesta: `이자 = 원금 × 연 이자율 × 기간(년)이에요. 연 이자율은 소수로 바꿔 넣어요(10%는 ${formatearNumero(ctx, 0.1, 2)}).`,
      },
      {
        pregunta: "복리와는 어떻게 다른가요?",
        respuesta: "단리는 늘 같은 원금에 이자가 붙어요. 복리는 이자가 원금에 더해져서 그 이자에도 이자가 붙어요.",
      },
      {
        pregunta: "1년을 360일로 세는 곳이 있는 이유는요?",
        respuesta: "계산을 쉽게 하려는 금융권 관행이에요. 360일로 세면 이자가 조금 더 많아져요. 이용하는 금융회사가 어느 쪽을 쓰는지 확인하세요.",
      },
    ],
    glosario: [
      { termino: "원금", definicion: "빌려주거나 맡기는 처음의 돈이에요." },
      { termino: "단리", definicion: "처음 원금에만 이자가 붙는 계산 방식이에요." },
    ],
  };
};
