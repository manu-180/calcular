import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosKo: TextosUi<UiFechaDeParto> = {
  slug: "due-date",
  ui: () => ({
    metodo: "알고 있는 날짜",
    fum: "마지막 생리 시작일",
    concepcion: "수정일",
    fecha: "날짜",
    fechaAyuda: "마지막 생리를 골랐다면 출혈이 시작된 날을 넣으세요.",
    ciclo: "생리 주기(일)",
    cicloAyuda: "마지막 생리로 계산할 때만 써요. 모르면 28을 그대로 두세요.",
    fpp: "출산 예정일",
    edadGestacional: "오늘 기준 임신 주수",
    trimestre: "임신 시기",
    faltan: "예정일까지 남은 날",
    fechaConcepcion: "추정 수정일",
    semanasYDias: (s, d) => (d ? `${s}주 ${d}일` : `${s}주`),
    trimestres: ["임신 초기", "임신 중기", "임신 후기"],
    errorFutura: "날짜는 오늘보다 뒤일 수 없어요.",
    errorCiclo: "생리 주기는 20일에서 45일 사이로 넣어 주세요.",
    notaPasada: "그 날짜로부터 42주가 넘게 지나서 임신 주수는 보여 드리지 않아요.",
    aviso: "추정치예요. 예정일에 딱 맞춰 태어나는 아기는 많지 않아요. 가장 정확한 날짜는 초음파 검사와 의료진의 정기 검진으로 확인할 수 있어요.",
  }),
};
