import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "날짜 계산기 (두 날짜 사이)",
    title: tituloQueEntre(`날짜 계산기: 두 날짜 사이 일수 | ${ctx.nombrePais}`, `날짜 계산기 | ${ctx.nombrePais}`, "날짜 계산기"),
    description: "두 날짜 사이가 며칠인지 세요. 달력 기준 일수, 주, 개월과 함께 월요일부터 금요일까지의 평일 수도 알려 줘요.",
    intro: [
      "시작일과 종료일을 고르면 달력 기준 일수, 같은 기간을 주와 개월로 나타낸 값, 평일 수가 나와요.",
      "마감일, 납부일, 휴가, 출산 예정일, D-day 계산에 쓸 수 있어요.",
    ],
    comoSeCalcula: [
      "달력 기준 일수는 두 날짜 사이의 모든 날이에요. 시작일은 세고, 종료일은 옵션을 고르지 않으면 세지 않아요.",
      "평일 수는 같은 기간 안의 월요일부터 금요일까지예요. 공휴일은 빼지 않아요.",
      "윤년은 2월 29일까지 포함해서 세요.",
    ],
    ejemplo: [`${f(desde)}부터 ${f(hasta)}까지는 ${dias}일이에요.`, `그중 월요일부터 금요일은 ${habiles}일이에요.`],
    faq: [
      {
        pregunta: "첫날과 마지막 날을 세나요?",
        respuesta: "기본으로는 날짜를 빼는 것과 같이 첫날은 세고 마지막 날은 세지 않아요. 둘 다 세려면 “종료일 포함”을 체크하세요.",
      },
      {
        pregunta: "평일 수에서 공휴일은 빠지나요?",
        respuesta: "아니요. 월요일부터 금요일까지만 세요. 공휴일은 나라, 지역, 해마다 달라서 따로 빼야 해요.",
      },
      {
        pregunta: "1년은 며칠인가요?",
        respuesta: "365일이고, 윤년은 366일이에요. 그래서 같은 월과 일이라도 해가 다르면 일수가 달라질 수 있어요.",
      },
    ],
    glosario: [
      { termino: "달력 기준 일수", definicion: "주말과 공휴일을 포함한 달력의 모든 날이에요." },
      { termino: "평일", definicion: "이 계산기에서는 월요일부터 금요일까지예요." },
    ],
  };
};
