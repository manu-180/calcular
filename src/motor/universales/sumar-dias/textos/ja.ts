import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosJa: TextosUi<UiSumarDias> = {
  slug: "add-days-to-date",
  ui: () => ({
    fecha: "基準日",
    operacion: "計算",
    sumar: "日数を足す（後の日付）",
    restar: "日数を引く（前の日付）",
    dias: "日数",
    tipo: "日数の数え方",
    corridos: "暦日",
    habiles: "営業日（月曜から金曜）",
    resultado: "計算後の日付",
    diaSemana: "曜日",
    diasCorridos: "暦日での合計",
    nombresDias: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    errorDias: "日数は100年以内の整数で入力してください。",
    notaHabiles: "営業日は土曜と日曜を飛ばしますが、祝日は飛ばしません。あいだに祝日がある場合は、その分を足してください。",
  }),
};
