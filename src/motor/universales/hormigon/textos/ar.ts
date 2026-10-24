import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

// La definición pasa los símbolos latinos; en árabe van los de uso corriente.
const UNIDAD: Readonly<Record<string, string>> = {
  m: "م",
  ft: "قدم",
  cm: "سم",
  in: "بوصة",
  "m³": "م³",
  "ft³": "قدم³",
  "yd³": "ياردة مكعبة",
  kg: "كغ",
  lb: "رطل",
};
const unidad = (u: string) => UNIDAD[u] ?? u;

export const textosAr: TextosUi<UiHormigon> = textosArabes({
  slug: "concrete-calculator",
  ui: () => ({
    largo: (u) => `الطول (${unidad(u)})`,
    ancho: (u) => `العرض (${unidad(u)})`,
    espesor: (u) => `السُّمك (${unidad(u)})`,
    espesorAyuda: "أرضية الفناء أو الممر تكون عادة بسُمك 10 سم (4 بوصات)، ومدخل السيارات من 12 إلى 15 سم.",
    margen: "هامش إضافي (%)",
    margenAyuda: "لتعويض عدم استواء الأرض وما ينسكب أثناء الصب. والمعتاد من 5% إلى 10%.",
    bolsa: (u) => `وزن كيس الإسمنت (${unidad(u)})`,
    volumen: (u) => `الحجم الدقيق (${unidad(u)})`,
    volumenTotal: (u) => `كمية الخرسانة اللازمة (${unidad(u)})`,
    volumenPies: "كمية الخرسانة اللازمة (قدم³)",
    cemento: (u) => `الإسمنت (${unidad(u)})`,
    bolsas: "عدد أكياس الإسمنت",
    arena: (u) => `الرمل (${unidad(u)})`,
    piedra: (u) => `الحصى أو الزلط (${unidad(u)})`,
    agua: (u) => (u === "L" ? "الماء (باللتر)" : "الماء (بالغالون)"),
    errorMedida: "يجب أن يكون هذا القياس أكبر من 0.",
    aviso: "كميات المواد تقديرية لخلطة عامة بنسبة 1:2:3 (نحو 350 كغ من الإسمنت لكل م³). وهي تتغير حسب تصميم الخلطة ونوع العمل والمواد المتوفرة محليًا، فراجعها مع المسؤول عن التنفيذ.",
  }),
});
