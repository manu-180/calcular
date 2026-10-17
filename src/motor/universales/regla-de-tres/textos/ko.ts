import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosKo: TextosUi<UiReglaDeTres> = {
  slug: "rule-of-three",
  ui: () => ({
    tipo: "비례 종류",
    directa: "정비례 (A가 커지면 B도 커져요)",
    inversa: "반비례 (A가 커지면 B는 작아져요)",
    a: "A",
    aAyuda: "A : B = C : X로 생각하면 돼요. A, B, C를 넣으세요.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "이 값에는 0을 넣을 수 없어요. 계산할 때 이 값으로 나누기 때문이에요.",
    fraseDirecta: (a, b, c, x) => `${a} : ${b} = ${c} : ${x}. 계산식: ${b} × ${c} ÷ ${a}`,
    fraseInversa: (a, b, c, x) => `${a} × ${b} = ${c} × ${x}. 계산식: ${a} × ${b} ÷ ${c}`,
  }),
};
