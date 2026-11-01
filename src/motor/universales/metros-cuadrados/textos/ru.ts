import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

const unidad = (u: string) => ({ m: "м", ft: "футы", "m²": "м²", "ft²": "кв. футы" })[u] ?? u;

export const textosRu: TextosUi<UiMetrosCuadrados> = {
  slug: "kalkulyator-ploshchadi",
  ui: () => ({
    forma: (n) => `Участок ${n}: форма`,
    formaAyuda: "Если комната Г-образная или неправильной формы, разделите ее на части, и калькулятор их сложит.",
    ninguna: "Не используется",
    rectangulo: "Прямоугольник или квадрат",
    triangulo: "Треугольник",
    circulo: "Круг",
    medidaA: (n, u) => `Участок ${n}: длина, основание или диаметр (${unidad(u)})`,
    medidaAAyuda: "Прямоугольник: длина и ширина. Треугольник: основание и высота. Круг: только диаметр.",
    medidaB: (n, u) => `Участок ${n}: ширина или высота (${unidad(u)})`,
    total: (u) => `Общая площадь (${unidad(u)})`,
    equivale: (u) => `То же в ${u === "m²" ? "квадратных метрах" : "квадратных футах"}`,
    parcial: (n, u) => `Участок ${n} (${unidad(u)})`,
    errorMedida: "Это измерение не указано или равно 0.",
  }),
};
