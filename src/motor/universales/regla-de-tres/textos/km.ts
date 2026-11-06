import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosKm: TextosUi<UiReglaDeTres> = {
  slug: "rule-of-three",
  ui: () => ({
    tipo: "ប្រភេទសមាមាត្រ",
    directa: "សមាមាត្រផ្ទាល់ (A កើន B ក៏កើន)",
    inversa: "សមាមាត្រច្រាស (A កើន B ថយ)",
    a: "A",
    aAyuda: "អានថា A ធៀបនឹង B ដូច C ធៀបនឹង X។ សូមបញ្ចូលតម្លៃ A B និង C។",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "តម្លៃនេះមិនអាចស្មើ 0 ទេ ព្រោះប្រើជាតួចែក។",
    fraseDirecta: (a, b, c, x) => `បើ ${a} ធៀបនឹង ${b} នោះ ${c} ធៀបនឹង ${x}។ វិធីគិត៖ ${b} × ${c} ÷ ${a}`,
    fraseInversa: (a, b, c, x) => `បើ ${a} បាន ${b} នោះ ${c} បាន ${x}។ វិធីគិត៖ ${a} × ${b} ÷ ${c}`,
  }),
};
