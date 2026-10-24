import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosJa: TextosUi<UiImc> = {
  slug: "bmi",
  ui: () => ({
    peso: (u) => `体重（${u}）`,
    altura: (u) => `身長（${u}）`,
    pies: "身長：フィート（ft）",
    pulgadas: "身長：インチ（in）",
    imc: "BMI（体格指数）",
    categoria: "判定（WHO基準）",
    pesoMin: (u) => `適正体重の下限（${u}）`,
    pesoMax: (u) => `適正体重の上限（${u}）`,
    rangoAyuda: "この身長でBMIが適正範囲に入る体重の幅です。",
    bajo: "低体重",
    normal: "普通体重",
    sobrepeso: "過体重",
    obesidad1: "肥満（1度）",
    obesidad2: "肥満（2度）",
    obesidad3: "肥満（3度）",
    errorPeso: "体重は0より大きい値を入れてください。",
    errorAltura: "身長は0より大きい値を入れてください。",
    aviso: "BMIは成人向けのおおまかな目安です。筋肉と脂肪の区別はできず、妊娠中の方や子どもには同じようには使えません。医師などの専門家への相談に代わるものではありません。",
  }),
};
