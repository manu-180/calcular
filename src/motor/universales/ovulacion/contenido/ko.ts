import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "배란일 계산기",
    title: tituloQueEntre(`배란일 계산기 | ${ctx.nombrePais}`, "배란일 계산기"),
    description: "배란일, 가임기, 다음 생리 예정일을 계산해요. 앞으로 세 번의 주기도 한눈에 볼 수 있어요.",
    intro: [
      "마지막 생리 시작일과 생리 주기를 넣으면 예상 배란일, 가임기, 다음 생리 예정일이 나와요.",
      "주기가 규칙적인 분을 위한 추정치예요. 피임 방법이 아니고, 의사 등 전문가와의 상담을 대신하지 않아요.",
    ],
    comoSeCalcula: [
      `배란은 보통 다음 생리 ${FASE_LUTEA}일 전에 일어나요. 마지막 생리 시작일 + 생리 주기 − ${FASE_LUTEA}일로 계산해요.`,
      "정자는 최대 5일 정도 살 수 있어서, 가임기는 배란일 5일 전부터 배란일 다음 날까지예요.",
      "다음 생리는 지난 생리로부터 한 주기 뒤에 올 예정이에요.",
    ],
    ejemplo: [
      `마지막 생리 시작일이 ${f(fum)}이고 주기가 28일이면 예상 배란일은 ${f(aFecha(v.ovulacion))}이에요.`,
      `가임기는 ${f(aFecha(v.desde))}부터 ${f(aFecha(v.hasta))}까지이고, 다음 생리 예정일은 ${f(aFecha(v.proxima))}이에요.`,
    ],
    faq: [
      {
        pregunta: "임신 가능성이 가장 높은 날은 언제인가요?",
        respuesta: "배란일 2~3일 전과 배란일 당일이에요. 가임기 전체는 6일 정도예요.",
      },
      {
        pregunta: "주기가 불규칙해도 쓸 수 있나요?",
        respuesta: "참고는 되지만 정확도는 떨어져요. 주기가 불규칙하면 배란일이 달마다 며칠씩 달라질 수 있어요.",
      },
      {
        pregunta: "피임용으로 써도 되나요?",
        respuesta: "안 돼요. 계산은 대략적이고 배란이 빨라지거나 늦어질 수도 있어요. 임신을 피하려면 피임법을 쓰세요.",
      },
    ],
    glosario: [
      { termino: "배란", definicion: "난소에서 난자가 나오는 거예요." },
      { termino: "가임기", definicion: "주기 중 임신이 가능한 날들이에요." },
    ],
  };
};
