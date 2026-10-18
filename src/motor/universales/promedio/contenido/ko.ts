import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoKo: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  return {
    h1: "가중 평균 계산기",
    title: tituloQueEntre(`가중 평균 계산기 | ${ctx.nombrePais}`, "가중 평균 계산기"),
    description: "성적의 단순 평균과 가중 평균을 계산해요. 값은 최대 10개까지, 각각의 가중치(비율, 학점, 횟수)와 함께 넣을 수 있어요.",
    intro: [
      "점수와 반영 비율을 넣으면 가중 평균과 단순 평균을 나란히 보여 줘요.",
      "학교나 대학 성적은 물론, 값마다 무게가 다른 평균이라면 어디든 쓸 수 있어요.",
    ],
    comoSeCalcula: [
      "단순 평균 = 값의 합 ÷ 값의 개수",
      "가중 평균 = (값 × 가중치)의 합 ÷ 가중치 합계",
      "가중치 합계가 100이 아니어도 괜찮아요. 가중치 합계로 나누기 때문이에요.",
    ],
    ejemplo: [
      `반영 비율 20%인 7점, 30%인 8점, 50%인 9점의 가중 평균은 ${n(8.3)}점이에요.`,
      `같은 세 점수의 단순 평균은 ${n(8)}점이에요. 비중이 큰 9점이 가중 평균을 끌어올려요.`,
    ],
    faq: [
      {
        pregunta: "가중 평균은 어떻게 계산하나요?",
        respuesta: "각 값에 가중치를 곱해서 모두 더한 뒤, 가중치 합계로 나눠요.",
      },
      {
        pregunta: "가중치를 더해서 100%가 안 되면요?",
        respuesta: "괜찮아요. 3학점 과목과 2학점 과목이라면 3과 2를 넣으세요. 가중치 합계로 나눠서 계산해요.",
      },
      {
        pregunta: "단순 평균과 가중 평균은 어떻게 다른가요?",
        respuesta: "단순 평균은 모든 값을 똑같이 계산해요. 가중 평균은 각 값을 가중치만큼 반영해요.",
      },
    ],
    glosario: [
      { termino: "가중치", definicion: "그 값이 최종 평균에 얼마나 반영되는지 나타내는 수예요." },
      { termino: "가중 평균", definicion: "각 값에 가중치를 곱해서 구하는 평균이에요." },
    ],
  };
};
