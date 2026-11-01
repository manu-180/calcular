import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosRu: TextosUi<UiDividirGastos> = {
  slug: "razdelit-schet",
  ui: () => ({
    persona: (n) => `Участник ${n}`,
    personaAyuda: "Укажите, сколько заплатил каждый. Если человек ничего не платил, но участвует в расходах, введите 0. Остальные поля оставьте пустыми.",
    total: "Всего потрачено",
    personas: "Участников",
    cuota: "Доля каждого",
    transferencias: "Переводов для расчета",
    tabla: "Кто кому переводит",
    colDe: "Переводит",
    colPara: "Получает",
    colMonto: "Сумма",
    errorPocas: "Чтобы разделить расходы, нужны хотя бы два участника.",
    aMano: "Никто никому не должен: все заплатили поровну.",
  }),
};
