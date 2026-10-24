import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

// La definición pasa los símbolos latinos (km, mi, km/h, mph); en árabe van los de uso corriente.
const UNIDAD: Readonly<Record<string, string>> = { km: "كم", mi: "ميل", "km/h": "كم/ساعة", mph: "ميل/ساعة" };
const unidad = (u: string) => UNIDAD[u] ?? u;

export const textosAr: TextosUi<UiRitmo> = {
  slug: "running-pace",
  ui: () => ({
    calcular: "ماذا تريد أن تحسب؟",
    calcRitmo: "الوتيرة (من المسافة والزمن)",
    calcTiempo: "الزمن (من المسافة والوتيرة)",
    calcDistancia: "المسافة (من الزمن والوتيرة)",
    distancia: "المسافة",
    distanciaAyuda: "اختر سباقًا، أو «مسافة أخرى» لتكتب المسافة بنفسك.",
    otra: "مسافة أخرى",
    cincoK: "5 كم",
    diezK: "10 كم",
    media: "نصف ماراثون",
    maraton: "ماراثون",
    distanciaOtra: (u) => `مسافة أخرى (${unidad(u)})`,
    horas: "الزمن: الساعات",
    minutos: "الزمن: الدقائق",
    segundos: "الزمن: الثواني",
    ritmoMin: (u) => `الوتيرة: الدقائق لكل ${unidad(u)}`,
    ritmoSeg: "الوتيرة: الثواني",
    ritmo: (u) => `الوتيرة (دقيقة/${unidad(u)})`,
    tiempo: "زمن الوصول",
    distanciaRes: (u) => `المسافة (${unidad(u)})`,
    velocidad: (u) => `متوسط السرعة (${unidad(u)})`,
    errorDistancia: "أدخل مسافة أكبر من 0.",
    errorTiempo: "أدخل الزمن: الساعات أو الدقائق أو الثواني.",
    errorRitmo: "أدخل الوتيرة: الدقائق والثواني لكل وحدة مسافة.",
  }),
};
