import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosUz: TextosUi<UiCombustible> = {
  slug: "yoqilgi-sarfi-kalkulyatori",
  ui: () => ({
    distancia: (u) => `Yoʻl masofasi (${u})`,
    idaYVuelta: "Borish va qaytish",
    tipoConsumo: "Yoqilgʻi sarfi qanday oʻlchanadi",
    l100: "litr/100 km",
    kml: "km/litr",
    consumo: "Yoqilgʻi sarfi",
    consumoMpg: "Yoqilgʻi sarfi (mil/gallon)",
    consumoAyuda: "Avtomobil qoʻllanmasi yoki bort kompyuteriga qarang. Trassada odatda shahardagidan kam sarflanadi.",
    precio: (u) => (u === "L" ? "1 litr narxi" : "1 gallon narxi"),
    personas: "Xarajatni boʻlishadigan odamlar soni",
    costo: "Yoqilgʻi xarajati",
    porPersona: "Bir kishiga",
    combustible: (u) => (u === "L" ? "Kerakli yoqilgʻi (litr)" : "Kerakli yoqilgʻi (gallon)"),
    distanciaTotal: (u) => `Umumiy masofa (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "1 mil narxi" : `1 ${u} narxi`),
    errorConsumo: "Yoqilgʻi sarfi noldan katta boʻlishi kerak.",
    errorPersonas: "Kamida bitta odam boʻlishi kerak.",
  }),
};
