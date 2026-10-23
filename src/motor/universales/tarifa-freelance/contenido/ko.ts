import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "프리랜서 단가 계산기",
    title: tituloQueEntre(`프리랜서 단가 계산기 | ${ctx.nombrePais}`, "프리랜서 단가 계산기"),
    description: "손에 쥐고 싶은 금액, 경비, 세금, 쉬는 날, 청구 가능 시간으로 프리랜서의 시간당 단가와 일당을 계산해요.",
    intro: [
      "프리랜서가 가장 흔히 하는 실수는 직장인으로 받고 싶은 월급을 160시간으로 나누는 거예요. 그러면 세금, 경비, 휴가, 청구할 수 없는 시간이 모두 빠져요.",
      "이 계산기는 손에 쥐고 싶은 금액에서 출발해서 얼마를 청구해야 하는지 알려 줘요.",
    ],
    comoSeCalcula: [
      "필요한 매출 = 손에 쥘 금액 ÷ (1 − 세율) + 사업 경비",
      "일하는 날 = 52주 × 주당 일하는 날 − 쉬는 날",
      "1년 청구 가능 시간 = 일하는 날 × 하루 청구 가능 시간",
      "시간당 단가 = 필요한 매출 ÷ 1년 청구 가능 시간",
    ],
    ejemplo: [
      `경비 ${m(gastos)}, 세율 25%로 1년에 ${m(ingreso)}을 손에 쥐려면 ${m(r.facturado)}의 매출이 필요해요.`,
      `쉬는 날 30일, 주 25시간을 청구할 수 있다면 1년에 ${Math.round(r.horas)}시간이에요. 시간당 ${m(r.hora)}, 하루 ${m(r.dia)}을 받아야 해요.`,
    ],
    faq: [
      {
        pregunta: "주당 몇 시간을 청구할 수 있나요?",
        respuesta: "일하는 시간보다 적어요. 영업, 메일, 정산, 공부에는 아무도 돈을 내지 않아요. 40시간 중 20~30시간이 보통이에요.",
      },
      {
        pregunta: "시간 단위와 프로젝트 단위 중 어떻게 받아야 하나요?",
        respuesta: "둘 다 괜찮아요. 프로젝트 단위로 받더라도 걸릴 시간을 어림해서 이 단가를 곱하면 손해 보지 않아요.",
      },
      {
        pregunta: "세율은 얼마로 넣어야 하나요?",
        respuesta: "나라와 사업자 형태에 따라 달라요. 소득세와 사회보험료를 함께 생각하세요. 잘 모르겠다면 세무사에게 물어보세요.",
      },
    ],
    glosario: [
      { termino: "청구 가능 시간", definicion: "고객에게 청구할 수 있는 작업 시간이에요." },
      { termino: "손에 쥐는 소득", definicion: "세금과 사업 경비를 빼고 남는 금액이에요." },
    ],
  };
};
