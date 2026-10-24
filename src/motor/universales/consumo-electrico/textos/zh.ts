import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosZh: TextosUi<UiConsumoElectrico> = textosPorEscritura<UiConsumoElectrico>(
  "electricity-cost",
  () => ({
    potencia: "電器功率（W）",
    potenciaAyuda: "標示在電器的銘牌或說明書上，單位是瓦（W）。如果寫的是 kW，請乘以 1000。",
    cantidad: "相同電器的數量",
    horas: "每天使用時數",
    dias: "每月使用天數",
    precio: "每度電（kWh）價格",
    precioAyuda: "可以在電費單上找到。如果想算出含稅的總花費，請填含稅的單價。",
    kwhDia: "每日用電量（kWh）",
    kwhMes: "每月用電量（kWh）",
    kwhAnio: "每年用電量（kWh）",
    costoDia: "每日電費",
    costoMes: "每月電費",
    costoAnio: "每年電費",
    errorHoras: "一天只有 24 小時：使用時數必須在 0 到 24 之間。",
  }),
  () => ({
    potencia: "电器功率（W）",
    potenciaAyuda: "标在电器的铭牌或说明书上，单位是瓦（W）。如果写的是 kW，请乘以 1000。",
    cantidad: "相同电器的数量",
    horas: "每天使用时长（小时）",
    dias: "每月使用天数",
    precio: "每度电（kWh）价格",
    precioAyuda: "可以在电费账单上找到。如果想算出含税的总花费，请填含税的单价。",
    kwhDia: "每日用电量（kWh）",
    kwhMes: "每月用电量（kWh）",
    kwhAnio: "每年用电量（kWh）",
    costoDia: "每日电费",
    costoMes: "每月电费",
    costoAnio: "每年电费",
    errorHoras: "一天只有 24 小时：使用时长必须在 0 到 24 之间。",
  }),
);
