import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosMk: TextosUi<UiMetrosCuadrados> = {
  slug: "kalkulator-za-kvadratni-metri",
  ui: () => ({
    forma: (n) => `Површина ${n}: форма`,
    formaAyuda: "Ако просторијата е во форма на Г или е неправилна, поделете ја на делови и соберете ги.",
    ninguna: "Не се користи",
    rectangulo: "Правоаголник или квадрат",
    triangulo: "Триаголник",
    circulo: "Круг",
    medidaA: (n, u) => `Површина ${n}: должина, основа или дијаметар (${u})`,
    medidaAAyuda: "Правоаголник: должина и ширина. Триаголник: основа и висина. Круг: само дијаметарот.",
    medidaB: (n, u) => `Површина ${n}: ширина или висина (${u})`,
    total: (u) => `Вкупна површина (${u})`,
    equivale: (u) => `Еквивалент во ${u}`,
    parcial: (n, u) => `Површина ${n} (${u})`,
    errorMedida: "Оваа мерка недостасува или е 0.",
  }),
};
