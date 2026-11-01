import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosHu: TextosUi<UiReglaDeTres> = {
  slug: "aranyossag-kalkulator",
  ui: () => ({
    tipo: "Az arányosság fajtája",
    directa: "Egyenes (ha A nő, B is nő)",
    inversa: "Fordított (ha A nő, B csökken)",
    a: "A",
    aAyuda: "Így olvasd: A úgy aránylik B-hez, mint C az X-hez. Add meg A, B és C értékét.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Ez az érték nem lehet nulla, mert a számítás ezzel oszt.",
    fraseDirecta: (a, b, c, x) => `Egyenes arányosság: ha ${a} esetén az érték ${b}, akkor ${c} esetén ${x}. Számítás: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Fordított arányosság: ha ${a} esetén az érték ${b}, akkor ${c} esetén ${x}. Számítás: ${a} × ${b} ÷ ${c}.`,
  }),
};
