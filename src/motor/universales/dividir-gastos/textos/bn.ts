import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosBn: TextosUi<UiDividirGastos> = {
  slug: "split-bill",
  ui: () => ({
    persona: (n) => `ব্যক্তি ${cifrasBn(n)}`,
    personaAyuda: "প্রত্যেকে কত টাকা দিয়েছেন তা লিখুন। কেউ কিছু না দিলেও খরচের ভাগ নিলে শূন্য লিখুন। যে ঘর লাগবে না, সেটি খালি রাখুন।",
    total: "মোট খরচ",
    personas: "জনসংখ্যা",
    cuota: "জনপ্রতি ভাগ",
    transferencias: "হিসাব মেটাতে যত লেনদেন লাগবে",
    tabla: "কে কাকে দেবেন",
    colDe: "যিনি দেবেন",
    colPara: "যিনি পাবেন",
    colMonto: "পরিমাণ",
    errorPocas: "খরচ ভাগ করতে অন্তত দুজন লাগবে।",
    aMano: "কাউকে কিছু দিতে হবে না, সবাই সমান টাকা দিয়েছেন।",
  }),
};
