import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosUk: TextosUi<UiMetrosCuadrados> = {
  slug: "kalkuliator-ploshchi",
  ui: () => ({
    forma: (n) => `Частина ${n}: форма`,
    formaAyuda: "Якщо кімната Г-подібна або неправильної форми, поділіть її на частини: калькулятор їх додасть.",
    ninguna: "Не використовується",
    rectangulo: "Прямокутник або квадрат",
    triangulo: "Трикутник",
    circulo: "Коло",
    medidaA: (n, u) => `Частина ${n}: довжина, основа або діаметр (${u})`,
    medidaAAyuda: "Прямокутник: довжина і ширина. Трикутник: основа і висота. Коло: лише діаметр.",
    medidaB: (n, u) => `Частина ${n}: ширина або висота (${u})`,
    total: (u) => `Загальна площа (${u})`,
    equivale: (u) => `Це дорівнює (${u})`,
    parcial: (n, u) => `Частина ${n} (${u})`,
    errorMedida: "Цей розмір не вказано або він дорівнює нулю.",
  }),
};
