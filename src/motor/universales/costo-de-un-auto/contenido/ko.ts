import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "마일" : "km";
  return {
    h1: "자동차 유지비 계산기",
    title: tituloQueEntre(`자동차 유지비 계산기 | ${ctx.nombrePais}`, "자동차 유지비 계산기"),
    description: `주유비, 보험료, 정비비, 주차비, 감가까지 넣어 내 차가 한 달, 1년, 1${unidad}당 실제로 얼마나 드는지 계산해요.`,
    intro: [
      "주유비는 대부분 알고 있지만 보험료, 정비비, 주차비, 그리고 무엇보다 해마다 떨어지는 차의 가치까지 더해 보는 사람은 많지 않아요.",
      "드는 비용을 넣으면 차가 실제로 얼마나 드는지 보여 드려요. 살지, 바꿀지, 다른 교통수단을 쓸지 정할 때 도움이 돼요.",
    ],
    comoSeCalcula: [
      imperial ? "한 달 주유비 = 월 주행 마일 ÷ 연비(마일/갤런) × 갤런당 가격" : "한 달 주유비 = 월 주행 거리(km) × 100km당 리터 ÷ 100 × 리터당 가격",
      "한 달 감가 = 차량 가치 × 1년 감가율 ÷ 12",
      "실제 비용 = 주유비 + 보험료 + 정비비 + 주차비 + 기타 비용 + 감가",
      `1${unidad}당 비용 = 한 달 실제 비용 ÷ 그달 주행 거리`,
    ],
    ejemplo: [
      `${m(g.precio)}짜리 차로 한 달에 ${formatearNumero(ctx, g.distancia)}${imperial ? "마일" : "km"} 달리면 감가까지 넣어 한 달 ${m(mensual)}이 들어요.`,
      `1년이면 ${m(mensual * 12)}, 1${unidad}당 ${formatearMonto(ctx, mensual / g.distancia)}이에요.`,
    ],
    faq: [
      {
        pregunta: "자동차 감가가 뭔가요?",
        respuesta: "시간이 지나면서 차의 가치가 떨어지는 거예요. 매달 내는 돈은 아니지만 팔 때 실감해요. 새 차라면 가장 큰 비용인 경우가 많아요.",
      },
      {
        pregunta: "왜 할부금은 더하지 않나요?",
        respuesta: "할부금 일부는 차값 자체이고, 그건 이미 감가로 계산했어요. 둘 다 더하면 차를 두 번 세는 셈이에요. 할부 이자는 별도 비용이에요.",
      },
      {
        pregunta: "차에 드는 돈을 줄이려면요?",
        respuesta: "보험은 해마다 비교해서 갱신하고, 타이어 공기압과 정비를 잘 챙기고, 차를 자주 바꾸지 마세요. 가치가 가장 많이 떨어지는 건 처음 몇 년이에요.",
      },
    ],
    glosario: [
      { termino: "감가", definicion: "시간과 사용으로 차의 가치가 떨어지는 만큼이에요." },
      { termino: `1${unidad}당 비용`, definicion: `모든 비용을 넣어 1${unidad} 달릴 때마다 드는 평균 비용이에요.` },
    ],
  };
};
