import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosKo: TextosUi<UiVariacion> = {
  slug: "percentage-change",
  ui: () => ({
    inicial: "처음 값",
    final: "나중 값",
    variacion: "증감률",
    diferencia: "차이",
    vuelta: "원래대로 돌아가려면",
    vueltaAyuda: "나중 값이 처음 값으로 돌아가려면 몇 % 바뀌어야 하는지 보여 줘요.",
    errorInicialCero: "처음 값에는 0을 넣을 수 없어요. 0에서 시작한 증감률은 구할 수 없기 때문이에요.",
    subio: (p) => `${p}% 올랐어요.`,
    bajo: (p) => `${p}% 내렸어요.`,
    igual: "변화가 없어요. 두 값이 같아요.",
  }),
};
