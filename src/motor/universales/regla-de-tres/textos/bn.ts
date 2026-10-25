import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosBn: TextosUi<UiReglaDeTres> = {
  slug: "rule-of-three",
  ui: () => ({
    tipo: "অনুপাতের ধরন",
    directa: "সরল অনুপাত (A বাড়লে B-ও বাড়ে)",
    inversa: "ব্যস্ত অনুপাত (A বাড়লে B কমে)",
    a: "A",
    aAyuda: "ধরে নিন, A-এর সাথে B-এর যে সম্পর্ক, C-এর সাথে X-এরও সেই সম্পর্ক। A, B আর C লিখুন।",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "এই ঘরে শূন্য দেওয়া যাবে না, কারণ হিসাবে এই মান দিয়ে ভাগ করতে হয়।",
    fraseDirecta: (a, b, c, x) => `${cifrasBn(a)}-এ ${cifrasBn(b)} হলে ${cifrasBn(c)}-এ হয় ${cifrasBn(x)}। হিসাব: ${cifrasBn(b)} × ${cifrasBn(c)} ÷ ${cifrasBn(a)}`,
    fraseInversa: (a, b, c, x) => `${cifrasBn(a)}-এর বেলায় ${cifrasBn(b)} হলে ${cifrasBn(c)}-এর বেলায় হয় ${cifrasBn(x)}। হিসাব: ${cifrasBn(a)} × ${cifrasBn(b)} ÷ ${cifrasBn(c)}`,
  }),
};
