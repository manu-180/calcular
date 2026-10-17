import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosJa: TextosUi<UiConsumoElectrico> = {
  slug: "electricity-cost",
  ui: () => ({
    potencia: "消費電力（W）",
    potenciaAyuda: "本体のラベルや取扱説明書にワット（W）で書かれています。kWの場合は1000を掛けてください。",
    cantidad: "同じ家電の台数",
    horas: "1日の使用時間",
    dias: "1か月の使用日数",
    precio: "1kWhあたりの料金",
    precioAyuda: "電気料金の明細で確認できます。総額を知りたい場合は、税込みの単価を入れてください。",
    kwhDia: "1日の電力量（kWh）",
    kwhMes: "1か月の電力量（kWh）",
    kwhAnio: "1年の電力量（kWh）",
    costoDia: "1日の電気代",
    costoMes: "1か月の電気代",
    costoAnio: "1年の電気代",
    errorHoras: "1日は24時間です。使用時間は0から24のあいだで入れてください。",
  }),
};
