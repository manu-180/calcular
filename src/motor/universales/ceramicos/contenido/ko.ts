import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [`150제곱피트에 12 × 12인치(장당 1제곱피트) 타일을 로스율 10%로 붙이면 ${piezas}장이 필요해요.`, `한 박스에 10장이 들어 있다면 ${Math.ceil(piezas / 10)}박스예요.`];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [`20m²에 60 × 60cm(장당 ${n(pieza)}m²) 타일을 로스율 10%로 붙이면 ${piezas}장이 필요해요.`, `한 박스에 4장이 들어 있다면 ${Math.ceil(piezas / 4)}박스예요.`];
      })();
  return {
    h1: "타일 수량 계산기",
    title: tituloQueEntre(`타일 수량 계산기 | ${ctx.nombrePais}`, "타일 수량 계산기"),
    description: "바닥이나 벽에 필요한 타일 장수를 재단과 파손 여유분까지 넣어 계산하고, 사야 할 박스 수도 알려 줘요.",
    intro: [
      "시공 면적, 타일 한 장의 크기, 한 박스당 장수를 넣으면 사야 할 장수와 박스 수가 나와요.",
      "로스율은 가장자리 재단과 가끔 깨지는 타일을 위한 여유분이에요.",
    ],
    comoSeCalcula: [
      `타일 한 장 면적 = 세로 × 가로(${imperial ? "제곱피트" : "m²"}로 환산)`,
      "장수 = 면적 × (1 + 로스율 ÷ 100) ÷ 타일 한 장 면적, 올림",
      "박스 수 = 장수 ÷ 한 박스당 장수, 올림",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "로스율은 얼마로 잡아야 하나요?",
        respuesta: "반듯하게 붙이면 10%예요. 대각선이나 헤링본 패턴, 재단이 많은 공간이라면 15~20%로 잡으세요.",
      },
      {
        pregunta: "줄눈 폭도 계산에 넣어야 하나요?",
        respuesta: "아니요. 줄눈은 몇 밀리미터라서 그 차이는 로스율로 충분히 메워져요.",
      },
      {
        pregunta: "여분을 더 사 둬야 하나요?",
        respuesta: "네. 같은 로트로 몇 장 남겨 두세요. 나중에 깨졌을 때 같은 색감을 구하기 어려울 수 있어요.",
      },
    ],
    glosario: [
      { termino: "로스율", definicion: "재단과 파손에 대비해 더 사는 비율이에요." },
      { termino: "로트", definicion: "한 번에 생산된 단위예요. 로트가 다르면 색감이 조금 다를 수 있어요." },
    ],
  };
};
