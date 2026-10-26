import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

// La definición pasa los símbolos latinos (km, mi, L, gal); en árabe van los de uso corriente.
const UNIDAD: Readonly<Record<string, string>> = { km: "كم", mi: "ميل", L: "لتر", gal: "غالون" };
const unidad = (u: string) => UNIDAD[u] ?? u;

export const textosAr: TextosUi<UiCombustible> = textosArabes({
  slug: "fuel-cost",
  ui: () => ({
    distancia: (u) => `مسافة الرحلة (${unidad(u)})`,
    idaYVuelta: "ذهاب وعودة",
    tipoConsumo: "طريقة قياس استهلاك الوقود",
    l100: "لتر لكل 100 كم",
    kml: "كيلومتر لكل لتر",
    consumo: "استهلاك الوقود",
    consumoMpg: "استهلاك الوقود (ميل لكل غالون)",
    consumoAyuda: "تجده في دليل السيارة أو في شاشة الكمبيوتر الخاص بالرحلة. والقيادة على الطرق السريعة تستهلك عادة أقل من القيادة في المدينة.",
    precio: (u) => (u === "L" ? "سعر اللتر" : "سعر الغالون"),
    personas: "عدد الأشخاص المشاركين في التكلفة",
    costo: "تكلفة الوقود",
    porPersona: "نصيب كل شخص",
    combustible: (u) => (u === "L" ? "الوقود اللازم (باللتر)" : "الوقود اللازم (بالغالون)"),
    distanciaTotal: (u) => `المسافة الإجمالية (${unidad(u)})`,
    costoPorDistancia: (u) => (u === "mi" ? "التكلفة لكل ميل" : "التكلفة لكل كيلومتر"),
    errorConsumo: "يجب أن يكون استهلاك الوقود أكبر من 0.",
    errorPersonas: "يجب أن يكون هناك شخص واحد على الأقل.",
  }),
});
