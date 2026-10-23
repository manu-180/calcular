import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "근무 시간 계산기",
    title: tituloQueEntre(`근무 시간 계산기 | ${ctx.nombrePais}`, "근무 시간 계산기"),
    description: "출근·퇴근 시간과 휴게 시간으로 한 주 근무 시간을 더하고, 연장근로 수당까지 포함한 급여를 계산해요.",
    intro: [
      "요일별 출근과 퇴근 시간, 무급 휴게 시간, 시급을 넣으면 총 근무 시간, 연장근로 시간, 한 주 급여가 나와요.",
      "급여명세서를 확인하거나, 근무표를 쓰거나, 시간제 일을 청구할 때 써 보세요.",
    ],
    comoSeCalcula: [
      "하루 근무 시간 = 퇴근 − 출근 − 휴게 시간. 퇴근이 출근보다 이른 시각이면 다음 날 끝난 근무로 봐요.",
      "연장근로 시간 = 주 합계 − 소정 근로시간(합계가 그보다 많을 때)",
      "급여 = 소정 근로시간 × 시급 + 연장근로 시간 × 시급 × (1 + 가산율)",
    ],
    ejemplo: [
      `${hora("09:00")}부터 ${hora("17:30")}까지 휴게 30분이면 하루 ${n(jornada)}시간이에요. 월요일부터 금요일까지 ${n(jornada * 5)}시간, 시급 ${m(pago)}이라면 ${m(jornada * 5 * pago)}이에요.`,
      `${hora("08:00")}부터 ${hora("18:00")}까지 휴게 1시간이면 한 주 ${n(larga * 5)}시간이고, 그중 ${n(extra)}시간이 연장근로예요. 가산율 50%라면 급여는 ${m(40 * pago + extra * pago * 1.5)}이에요.`,
    ],
    faq: [
      {
        pregunta: "근무 시간은 어떻게 계산하나요?",
        respuesta: "퇴근 시간에서 출근 시간을 빼고 휴게 시간을 빼요. 그리고 한 주 동안의 날을 모두 더해요.",
      },
      {
        pregunta: "분을 소수 시간으로 바꾸려면요?",
        respuesta: `분을 60으로 나눠요. 30분은 ${n(0.5, 1)}, 15분은 ${n(0.25, 2)}, 45분은 ${n(0.75, 2)}예요. 7시간 45분이라면 ${n(7.75, 2)}시간이에요.`,
      },
      {
        pregunta: "연장근로는 얼마나 할 수 있고 어떻게 받나요?",
        respuesta: "일하는 곳의 법과 근로계약에 따라 달라요. 이 계산기는 넣은 가산율과 소정 근로시간을 쓰고, 특정 규정은 적용하지 않아요.",
      },
    ],
    glosario: [
      { termino: "연장근로", definicion: "소정 근로시간을 넘겨 일한 시간으로, 더 높은 비율로 받아요." },
      { termino: "가산율", definicion: "연장근로 한 시간에 기본 시급보다 더 얹어 주는 비율이에요." },
    ],
  };
};
