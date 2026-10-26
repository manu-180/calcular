import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

// La definición pasa los símbolos latinos; en árabe van los de uso corriente.
const UNIDAD: Readonly<Record<string, string>> = { m: "م", ft: "قدم", "m²": "م²", "ft²": "قدم²" };
const unidad = (u: string) => UNIDAD[u] ?? u;
const NOMBRE: Readonly<Record<string, string>> = { "m²": "المتر المربع", "ft²": "القدم المربع" };

export const textosAr: TextosUi<UiMetrosCuadrados> = textosArabes({
  slug: "square-footage",
  ui: () => ({
    forma: (n) => `الجزء ${n}: الشكل`,
    formaAyuda: "إذا كانت الغرفة على شكل حرف L أو غير منتظمة، فقسّمها إلى أجزاء وستُجمع مساحاتها.",
    ninguna: "غير مستخدم",
    rectangulo: "مستطيل أو مربع",
    triangulo: "مثلث",
    circulo: "دائرة",
    medidaA: (n, u) => `الجزء ${n}: الطول أو القاعدة أو القطر (${unidad(u)})`,
    medidaAAyuda: "المستطيل: الطول والعرض. المثلث: القاعدة والارتفاع. الدائرة: القطر فقط.",
    medidaB: (n, u) => `الجزء ${n}: العرض أو الارتفاع (${unidad(u)})`,
    total: (u) => `المساحة الإجمالية (${unidad(u)})`,
    equivale: (u) => `ما يعادلها ب${NOMBRE[u] ?? unidad(u)}`,
    parcial: (n, u) => `مساحة الجزء ${n} (${unidad(u)})`,
    errorMedida: "هذا القياس ناقص أو يساوي 0.",
  }),
});
