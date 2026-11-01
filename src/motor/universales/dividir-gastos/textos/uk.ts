import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosUk: TextosUi<UiDividirGastos> = {
  slug: "podilyty-rakhunok",
  ui: () => ({
    persona: (n) => `Учасник ${n}`,
    personaAyuda: "Введіть, скільки заплатив кожен. Якщо хтось нічого не платив, але ділить витрати, введіть 0. Решту полів залиште порожніми.",
    total: "Загалом витрачено",
    personas: "Учасники",
    cuota: "Частка кожного",
    transferencias: "Перекази для розрахунку",
    tabla: "Хто кому платить",
    colDe: "Платить",
    colPara: "Отримує",
    colMonto: "Сума",
    errorPocas: "Щоб поділити витрати, потрібно щонайменше двоє учасників.",
    aMano: "Ви в розрахунку: усі заплатили однаково.",
  }),
};
