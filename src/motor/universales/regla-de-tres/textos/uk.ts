import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosUk: TextosUi<UiReglaDeTres> = {
  slug: "proportsiia",
  ui: () => ({
    tipo: "Вид пропорції",
    directa: "Пряма (A зростає, і B зростає)",
    inversa: "Обернена (A зростає, а B зменшується)",
    a: "A",
    aAyuda: "Читайте так: A відноситься до B, як C до X. Введіть A, B і C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Це значення не може дорівнювати 0: на нього ділиться.",
    fraseDirecta: (a, b, c, x) => `Якщо ${a} відповідає ${b}, то ${c} відповідає ${x}. Розрахунок: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Якщо ${a} дає ${b}, то ${c} дає ${x}. Розрахунок: ${a} × ${b} ÷ ${c}.`,
  }),
};
