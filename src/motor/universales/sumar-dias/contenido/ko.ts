import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "며칠 후 계산기",
    title: tituloQueEntre(`며칠 후·며칠 전 날짜 계산기 | ${ctx.nombrePais}`, `며칠 후 계산기 | ${ctx.nombrePais}`, "며칠 후 계산기"),
    description: "날짜에 달력 기준 일수나 평일 수를 더하거나 빼서 며칠 후, 며칠 전이 무슨 요일인지 알려 줘요. 마감일 확인에 편해요.",
    intro: [
      "날짜와 일수를 넣고 더할지 뺄지 고르면 계산된 날짜와 요일이 나와요.",
      "평일 기준으로 고르면 토요일과 일요일은 건너뛰어요.",
    ],
    comoSeCalcula: [
      "달력 기준이면 넣은 일수만큼 달력에서 하루씩 넘어가요.",
      "평일 기준이면 월요일부터 금요일만 세요. 기준일 자체는 세지 않아요.",
      "공휴일은 나라와 지역마다 달라서 빼지 않아요.",
    ],
    ejemplo: [`${f(inicio)}에서 90일 후는 ${f(mas90)}이에요.`, `${f(inicio)}에서 평일 15일 후는 ${f(aFecha(habil))}이에요.`],
    faq: [
      {
        pregunta: "기준일도 첫째 날로 세나요?",
        respuesta: "아니요. 월요일에 하루를 더하면 화요일이에요. 대부분의 기한이 이렇게 계산돼요.",
      },
      {
        pregunta: "토요일부터 평일을 더하면 어떻게 되나요?",
        respuesta: "첫 평일은 다음 월요일이에요. 토요일에 평일 하루를 더하면 월요일이 돼요.",
      },
      {
        pregunta: "윤년도 계산되나요?",
        respuesta: "네. 기간 안에 2월 29일이 있으면 그날도 하루로 세요.",
      },
    ],
    glosario: [
      { termino: "달력 기준", definicion: "건너뛰는 날 없이 달력의 모든 날을 세는 방법이에요." },
      { termino: "평일", definicion: "이 계산기에서는 월요일부터 금요일까지예요." },
    ],
  };
};
