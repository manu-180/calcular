import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `벽 길이 48피트, 높이 8피트, 문과 창문이 40제곱피트인 방은 칠할 면적이 ${n(neta, 0)}제곱피트예요.`,
          `두 번 칠하고 1갤런에 350제곱피트를 칠하는 페인트라면 ${n(gal, 2)}갤런, 여유분을 더하면 ${n(gal * (1 + MARGEN), 2)}갤런이에요.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `벽 길이 14m, 높이 ${n(2.6)}m, 문과 창문이 4m²인 방은 칠할 면적이 ${n(neta)}m²예요.`,
          `두 번 칠하고 1리터에 10m²를 칠하는 페인트라면 ${n(litros, 2)}리터, 여유분을 더하면 ${n(litros * (1 + MARGEN), 2)}리터예요.`,
        ];
      })();
  return {
    h1: "페인트 양 계산기",
    title: tituloQueEntre(`페인트 양 계산기 | ${ctx.nombrePais}`, "페인트 양 계산기"),
    description: "벽 크기, 문과 창문 면적, 칠하는 횟수, 통에 적힌 도포 면적으로 페인트가 얼마나 필요한지 계산해요.",
    intro: [
      "벽 길이와 높이(또는 면적), 문과 창문이 차지하는 면적, 칠하는 횟수를 넣으세요.",
      "칠하다가 모자라지 않도록 10% 넉넉하게 계산해요.",
    ],
    comoSeCalcula: ["면적 = 벽 길이 합계 × 높이 − 문과 창문 면적", "페인트 양 = 면적 × 칠하는 횟수 ÷ 도포 면적", `마지막으로 ${MARGEN * 100}% 여유분을 더해요.`],
    ejemplo,
    faq: [
      {
        pregunta: "페인트 1리터로 얼마나 칠할 수 있나요?",
        respuesta: "실내 벽용 페인트는 한 번 칠할 때 리터당 8~12m² 정도가 보통이에요. 정확한 값은 통에 적혀 있어요.",
      },
      {
        pregunta: "몇 번 칠해야 하나요?",
        respuesta: "두 번이 기본이에요. 새로 바른 벽, 흡수가 많은 벽, 색을 크게 바꿀 때는 세 번이 필요할 수도 있어요.",
      },
      {
        pregunta: "문과 창문은 빼야 하나요?",
        respuesta: "크다면 빼세요. 작은 건 빼지 않는 게 좋아요. 모서리나 마감 부분을 칠할 여유가 돼요.",
      },
    ],
    glosario: [
      { termino: "도포 면적", definicion: "페인트 1리터나 1갤런으로 한 번에 칠할 수 있는 면적이에요." },
      { termino: "칠 횟수", definicion: "벽에 페인트를 한 겹씩 바르는 횟수예요." },
    ],
  };
};
