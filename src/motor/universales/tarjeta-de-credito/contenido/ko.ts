import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "카드값 상환 계산기",
    title: tituloQueEntre(`카드값 상환 계산기 | ${ctx.nombrePais}`, "카드값 상환 계산기"),
    description: "신용카드 잔액을 다 갚는 데 몇 개월이 걸리고 이자를 얼마나 내는지, 매달 같은 금액과 최소 결제 금액으로 각각 계산해요.",
    intro: [
      "신용카드 빚은 보통 가진 빚 중에서 이자가 가장 비싸요. 최소 금액만 내면 몇 년씩 이어지고 이자가 쌓여요.",
      "잔액, 연 이자율, 매달 갚을 수 있는 금액을 넣으세요. 언제 다 갚는지, 이자가 얼마인지, 월별 계획을 보여 드려요.",
    ],
    comoSeCalcula: [
      "매달 이자가 붙어요: 잔액 × 연 이자율 ÷ 12",
      "그다음 결제액을 빼요. 최소 결제라면 결제액은 잔액의 일정 비율이고, 하한이 있어요.",
      "잔액이 0이 될 때까지 반복해요. 결제액이 이자보다 크지 않으면 빚은 줄지 않아요.",
    ],
    ejemplo: [
      `잔액 ${m(saldo)}, 연 22%에 매달 ${m(fijo)}씩 갚으면 ${conFijo.meses}개월 만에 다 갚고 이자는 ${m(conFijo.intereses)}이에요.`,
      `최소 3%만 내면 ${conMinimo.meses}개월이 걸리고 이자는 ${m(conMinimo.intereses)}으로 늘어요.`,
    ],
    faq: [
      {
        pregunta: "최소 금액만 내면 어떻게 되나요?",
        respuesta: "잔액이 줄면 최소 금액도 같이 줄어서 매달 부담은 작아지지만 빚은 몇 년씩 이어져요. 가능하다면 조금이라도 더 많은 고정 금액으로 갚으세요.",
      },
      {
        pregunta: "잔액을 대출로 옮기는 게 나을까요?",
        respuesta: "대출 금리가 카드 이자율보다 훨씬 낮다면 대개 이득이에요. 수수료까지 넣은 총이자로 두 가지를 비교하세요.",
      },
      {
        pregunta: "어떤 카드부터 갚아야 하나요?",
        respuesta: "모든 카드의 최소 금액은 내고, 남은 돈은 이자율이 가장 높은 카드에 넣으세요. 그래야 전체 이자가 가장 적어요.",
      },
    ],
    glosario: [
      { termino: "최소 결제 금액", definicion: "연체 없이 그달에 낼 수 있는 가장 적은 금액이에요. 이것만으로는 빚이 잘 줄지 않아요." },
      { termino: "연 이자율", definicion: "카드사가 남은 잔액에 1년 기준으로 매기는 이자율이에요." },
    ],
  };
};
