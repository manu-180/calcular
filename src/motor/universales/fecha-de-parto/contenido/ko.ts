import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "출산 예정일 계산기",
    title: tituloQueEntre(`출산 예정일 계산기 | ${ctx.nombrePais}`, "출산 예정일 계산기"),
    description: "마지막 생리 시작일이나 수정일로 출산 예정일을 계산하고, 오늘 기준으로 임신 몇 주인지 알려 줘요.",
    intro: [
      "마지막 생리 시작일(알고 있다면 수정일)을 넣으면 출산 예정일, 현재 임신 주수, 임신 시기가 나와요.",
      "추정치예요. 가장 정확한 날짜는 의료진의 정기 검진과 초음파 검사로 확인할 수 있어요.",
    ],
    comoSeCalcula: [
      "네겔레 법칙을 써요. 출산 예정일은 마지막 생리 시작일에 280일(40주)을 더한 날이에요.",
      "생리 주기가 28일보다 길거나 짧으면 그 차이만큼 예정일이 옮겨져요.",
      "수정일로 계산할 때는 266일(38주)을 더해요.",
      "임신 주수는 수정일이 아니라 마지막 생리 시작일부터 세요.",
    ],
    ejemplo: [`마지막 생리 시작일이 ${f(fum)}이고 주기가 28일이면 출산 예정일은 ${f(fpp)}이에요.`, `주기가 32일이면 4일 뒤로 밀려 ${f(fpp32)}이 돼요.`],
    faq: [
      {
        pregunta: "출산 예정일은 어떻게 계산하나요?",
        respuesta: "마지막 생리 시작일에 280일을 더해요. 거의 같은 날짜가 나오는 간단한 방법으로, 월에서 3을 빼고(또는 9를 더하고) 일에 7을 더하는 방법도 있어요.",
      },
      {
        pregunta: "왜 임신 주수를 마지막 생리부터 세나요?",
        respuesta: "대부분이 기억하는 날짜이기 때문이에요. 그래서 임신 2주에는 아직 수정이 되지 않은 상태예요.",
      },
      {
        pregunta: "예정일에 태어나는 아기는 얼마나 되나요?",
        respuesta: "많지 않아요. 대부분 37주에서 42주 사이에 태어나기 때문에 예정일은 정확한 날이라기보다 참고용이에요.",
      },
    ],
    glosario: [
      { termino: "마지막 생리 시작일", definicion: "마지막 생리에서 출혈이 시작된 첫날이에요." },
      { termino: "네겔레 법칙", definicion: "마지막 생리 시작일에 280일을 더해 출산 예정일을 구하는 방법이에요." },
    ],
  };
};
