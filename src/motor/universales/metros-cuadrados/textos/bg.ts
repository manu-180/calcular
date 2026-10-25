import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosBg: TextosUi<UiMetrosCuadrados> = {
  slug: "kvadratni-metri",
  ui: () => ({
    forma: (n) => `Площ ${n}: форма`,
    formaAyuda: "Ако стаята е Г-образна или с неправилна форма, разделете я на части и ги съберете.",
    ninguna: "Не се използва",
    rectangulo: "Правоъгълник или квадрат",
    triangulo: "Триъгълник",
    circulo: "Кръг",
    medidaA: (n, u) => `Площ ${n}: дължина, основа или диаметър (${u})`,
    medidaAAyuda: "Правоъгълник: дължина и ширина. Триъгълник: основа и височина. Кръг: само диаметърът.",
    medidaB: (n, u) => `Площ ${n}: ширина или височина (${u})`,
    total: (u) => `Обща площ (${u})`,
    equivale: (u) => `Равностойност в ${u}`,
    parcial: (n, u) => `Площ ${n} (${u})`,
    errorMedida: "Тази мярка липсва или е 0.",
  }),
};
