import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "시급·월급·연봉 환산 계산기",
    title: tituloQueEntre(`시급·월급·연봉 환산 계산기 | ${ctx.nombrePais}`, "시급 연봉 환산 계산기"),
    description: "실제 근무 시간과 급여를 받는 주 수로 급여를 시급, 일급, 주급, 월급, 연봉 사이에서 바꿔 줘요.",
    intro: [
      "내 월급은 시급으로 얼마일까요? 시급으로 제안받은 일은 연봉으로 얼마일까요? 금액과 기준을 고르면 나머지를 모두 보여 줘요.",
      "채용 제안을 비교하거나, 연장근무 수당을 가늠하거나, 내 시간의 가치를 알아볼 때 써 보세요.",
    ],
    comoSeCalcula: [
      "먼저 모든 금액을 연 단위로 바꿔요.",
      "시급 = 연봉 ÷ (주당 근무 시간 × 급여를 받는 주 수)",
      "일급 = 연봉 ÷ (주당 근무 일수 × 급여를 받는 주 수), 주급 = 연봉 ÷ 급여를 받는 주 수",
      "월급 = 연봉 ÷ 12, 반달 급여 = 연봉 ÷ 24",
    ],
    ejemplo: [`연봉 ${m(anual)}에 주 40시간 일하면 시급 ${m(anual / 2080)}, 월급 ${m(anual / 12)}이에요.`, `시급 ${m(hora)}으로 전일 근무하면 연봉은 ${m(hora * 2080)}이에요.`],
    faq: [
      {
        pregunta: "1년에 일하는 시간은 몇 시간인가요?",
        respuesta: `주 40시간, 급여를 받는 주가 52주라면 ${formatearNumero(ctx, 2080)}시간이에요. 그래서 시급에 약 ${formatearNumero(ctx, 2000)}을 곱하면 빠르게 어림할 수 있어요.`,
      },
      {
        pregunta: "주급에 4를 곱해도 월급이 안 나오는 이유는요?",
        respuesta: `한 달은 평균 ${formatearNumero(ctx, 52 / 12, 2)}주라서 4주가 아니에요. 주급을 월급으로 바꾸려면 52를 곱하고 12로 나누세요.`,
      },
      {
        pregunta: "상여금이나 세금이 들어가나요?",
        respuesta: "아니요. 같은 금액을 기준만 바꿔서 보여 줘요. 상여금이 있다면 제안을 비교할 때 따로 더하세요.",
      },
    ],
    glosario: [
      { termino: "세전 급여", definicion: "세금과 공제 전 급여예요." },
      { termino: "급여를 받는 주 수", definicion: "1년 중 급여가 나오는 주의 수예요." },
    ],
  };
};
