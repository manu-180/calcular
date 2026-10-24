import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

export const textosZh: TextosUi<UiPintura> = textosPorEscritura<UiPintura>(
  "paint-calculator",
  () => {
    const volumen = (u: string) => (u === "L" ? "公升" : "加侖");
    return {
      modo: "您有哪些尺寸？",
      modoMedidas: "牆面長度和高度",
      modoSuperficie: "總面積",
      largo: (u) => `牆面總長度（${u}）`,
      largoAyuda: "要粉刷的所有牆面長度加總。整個房間的話就是周長。",
      alto: (u) => `牆面高度（${u}）`,
      superficie: (u) => `粉刷面積（${u}）`,
      aberturas: (u) => `要扣除的門窗面積（${u}）`,
      aberturasAyuda: "一扇門約 2 m²，一般的窗戶約 1 到 2 m²。",
      manos: "塗刷遍數",
      rendimiento: (u) => `塗料塗布率（${u}）`,
      rendimientoAyuda: "標示在油漆桶上：塗一遍能覆蓋多少面積。不清楚的話，保留建議值即可。",
      recomendado: (u) => `建議購買量（${volumen(u)}）`,
      recomendadoAyuda: "多留 10%，用來補漆和抵消滾筒上殘留的量。",
      necesario: (u) => `實際需要量（${volumen(u)}）`,
      neta: (u) => `粉刷面積（${u}）`,
      errorMedidas: "請填入牆面長度和高度。",
      errorSuperficie: "請填入粉刷面積。",
      errorAberturas: "門窗面積不能占滿整面牆。",
      errorRendimiento: "塗布率必須大於 0。",
    };
  },
  () => {
    const volumen = (u: string) => (u === "L" ? "升" : "加仑");
    return {
      modo: "您有哪些尺寸？",
      modoMedidas: "墙面长度和高度",
      modoSuperficie: "总面积",
      largo: (u) => `墙面总长度（${u}）`,
      largoAyuda: "要粉刷的所有墙面长度之和。整个房间的话就是周长。",
      alto: (u) => `墙面高度（${u}）`,
      superficie: (u) => `粉刷面积（${u}）`,
      aberturas: (u) => `要扣除的门窗面积（${u}）`,
      aberturasAyuda: "一扇门约 2 m²，一般的窗户约 1 到 2 m²。",
      manos: "涂刷遍数",
      rendimiento: (u) => `涂料涂布率（${u}）`,
      rendimientoAyuda: "标在涂料桶上：涂一遍能覆盖多少面积。不清楚的话，保留建议值即可。",
      recomendado: (u) => `建议购买量（${volumen(u)}）`,
      recomendadoAyuda: "多留 10%，用于补漆和滚筒上残留的量。",
      necesario: (u) => `实际需要量（${volumen(u)}）`,
      neta: (u) => `粉刷面积（${u}）`,
      errorMedidas: "请填入墙面长度和高度。",
      errorSuperficie: "请填入粉刷面积。",
      errorAberturas: "门窗面积不能占满整面墙。",
      errorRendimiento: "涂布率必须大于 0。",
    };
  },
);
