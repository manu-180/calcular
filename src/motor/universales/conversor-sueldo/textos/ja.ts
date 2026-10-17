import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosJa: TextosUi<UiConversorSueldo> = {
  slug: "hourly-to-salary",
  ui: () => ({
    monto: "給与額",
    periodo: "給与の単位",
    hora: "時給",
    dia: "日給",
    semana: "週給",
    quincena: "半月ごと（年24回）",
    mes: "月給",
    anio: "年収",
    horasSemana: "週の労働時間",
    diasSemana: "週の勤務日数",
    semanasAnio: "1年の有給の週数",
    semanasAnioAyuda: "有給休暇があれば52です。働いた週の分しか支払われないなら、それ以外の週を引いてください。",
    porHora: "時給",
    porDia: "日給",
    porSemana: "週給",
    porQuincena: "半月ごと",
    porMes: "月給",
    porAnio: "年収",
    errorHoras: "週の労働時間を入れてください。",
    errorSemanas: "1年の有給の週数は0より大きくしてください。",
    observacionBruto: "同じ金額をほかの単位に換算したものです。賞与は足さず、税金も引いていません。",
  }),
};
