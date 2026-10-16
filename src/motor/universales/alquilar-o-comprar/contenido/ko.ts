import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "집을 사는 쪽" : "월세로 사는 쪽");
  return {
    h1: "월세 vs 매매 비교 계산기",
    title: tituloQueEntre(`월세 vs 매매 비교 계산기 | ${ctx.nombrePais}`, `월세 vs 매매 | ${ctx.nombrePais}`, "월세 vs 매매 계산기"),
    description: "집을 빌려 사는 것과 사는 것을 원하는 기간 동안 비교해요. 어느 쪽이 자산을 더 남기는지, 몇 년 차부터 얼마나 차이 나는지 보여 줘요.",
    intro: [
      "대출 상환액과 월세만 비교해서는 부족해요. 집을 사면 이자, 수리비, 재산세를 내지만 결국 집이 남아요. 빌려 살면 자기자금을 계속 투자할 수 있어요.",
      "이 계산기는 이 모든 걸 해마다 더해서 어느 쪽이 순자산을 더 많이 남기는지 알려 줘요.",
    ],
    comoSeCalcula: [
      "매매: 매달 대출 상환액과 소유 비용을 내요. 순자산은 집값에서 남은 대출을 뺀 금액이에요.",
      "월세: 자기자금과 부대비용을 다른 투자처에 계속 투자하고, 월세는 해마다 올라요.",
      "매달 지출이 적은 쪽이 차액을 투자해서, 두 경우 모두 같은 예산으로 비교해요.",
      "마지막에 순자산이 더 많은 쪽이 유리해요.",
    ],
    ejemplo: [
      `${m(precio)}짜리 집을 자기자금 20%, 금리 7%, 25년 대출로 사는 경우와 월세 ${m(alquiler)}짜리 집에 사는 경우를 비교해요.`,
      `10년이면 ${quien(a10)}이 ${m(Math.abs(a10.comprar - a10.alquilar))} 유리해요. 3년이면 ${quien(a3)}이 ${m(Math.abs(a3.comprar - a3.alquilar))} 유리해요.`,
    ],
    faq: [
      {
        pregunta: "월세는 돈을 버리는 건가요?",
        respuesta: "꼭 그렇지는 않아요. 집을 산 사람도 이자, 재산세, 수리비처럼 돌려받지 못하는 비용을 내요. 중요한 건 마지막에 각각 얼마가 남느냐예요.",
      },
      {
        pregunta: "기간에 따라 결과가 왜 달라지나요?",
        respuesta: "집을 사면 처음에 큰 비용(부대비용과 초기 이자)이 들어서 회수하는 데 시간이 걸려요. 곧 이사할 계획이라면 대개 월세가 유리해요.",
      },
      {
        pregunta: "가장 큰 영향을 주는 값은 뭔가요?",
        respuesta: "집값과 월세의 비율, 대출 금리, 집값 상승률이에요. 집값 상승률과 투자 수익률을 바꿔 보면서 결과가 얼마나 달라지는지 확인해 보세요.",
      },
    ],
    glosario: [
      { termino: "순자산", definicion: "가진 자산에서 빚을 뺀 금액이에요." },
      { termino: "집값 상승률", definicion: "집의 가치가 1년에 얼마나 오르는지예요." },
      { termino: "기회비용", definicion: "자기자금을 투자했다면 얻었을 수익이에요." },
    ],
  };
};
