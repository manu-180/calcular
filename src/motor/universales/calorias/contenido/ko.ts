import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `35세, 몸무게 180파운드, 키 5피트 10인치인 남성의 기초대사량은 약 ${n(basal)}kcal예요.`,
          `거의 움직이지 않는다면 하루 약 ${n(basal * FACTORES.sedentaria)}kcal로 체중을 유지해요.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `30세, 몸무게 60kg, 키 165cm인 여성의 기초대사량은 약 ${n(basal)}kcal예요.`,
          `보통 정도로 운동한다면 하루 약 ${n(basal * FACTORES.moderada)}kcal로 체중을 유지해요.`,
        ];
      })();
  return {
    h1: "하루 칼로리 계산기",
    title: tituloQueEntre(`칼로리 계산기 | ${ctx.nombrePais}`, "칼로리 계산기"),
    description: "나이, 몸무게, 키, 활동량으로 하루에 쓰는 칼로리를 계산하고, 체중을 유지하거나 빼거나 늘리려면 얼마나 먹어야 하는지 알려 줘요.",
    intro: [
      "기본 정보와 활동량을 넣으면 기초대사량과 평소 하루에 쓰는 칼로리가 나와요.",
      "대략적인 추정치예요. 의사나 영양사 등 전문가와의 상담을 대신하지 않아요.",
    ],
    comoSeCalcula: [
      `기초대사량(Mifflin-St Jeor 공식): 10 × 몸무게(kg) + ${n(6.25, 2)} × 키(cm) − 5 × 나이에, 남성은 5를 더하고 여성은 161을 빼요.`,
      `유지 칼로리 = 기초대사량 × 활동 계수. 계수는 ${n(1.2, 1)}(거의 움직이지 않음)부터 ${n(1.9, 1)}(매우 많음)까지예요.`,
      `감량은 하루 ${DEFICIT}kcal를 빼고, 증량은 ${SUPERAVIT}kcal를 더해요. 꾸준히 지킬 수 있는 정도의 변화예요.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "기초대사량이 뭔가요?",
        respuesta: "숨 쉬고, 체온을 지키고, 장기가 움직이는 데 몸이 완전히 쉬는 상태에서 쓰는 에너지예요.",
      },
      {
        pregunta: "살을 빼려면 몇 kcal를 먹어야 하나요?",
        respuesta: `유지 칼로리보다 하루 약 ${DEFICIT}kcal 적게 먹는 것이 흔한 출발점이에요. 전문가와 함께 정하는 게 가장 좋아요.`,
      },
      {
        pregunta: "공식은 얼마나 정확한가요?",
        respuesta: "Mifflin-St Jeor 공식은 가장 널리 쓰이는 공식 중 하나지만 평균값을 줘요. 유전, 근육량, 건강 상태에 따라 실제로 쓰는 양은 달라져요.",
      },
    ],
    glosario: [
      { termino: "칼로리(kcal)", definicion: "음식에 든 에너지와 몸이 쓰는 에너지를 나타내는 단위예요." },
      { termino: "기초대사량", definicion: "완전히 쉬고 있을 때 몸이 쓰는 칼로리예요." },
    ],
  };
};
