import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosUk: TextosUi<UiCombustible> = {
  slug: "vytrata-palnoho",
  ui: () => ({
    distancia: (u) => `Відстань поїздки (${u})`,
    idaYVuelta: "Туди й назад",
    tipoConsumo: "Як вказана витрата пального",
    l100: "Літрів на 100 км",
    kml: "Кілометрів на літр",
    consumo: "Витрата пального",
    consumoAyuda: "Подивіться в інструкції до авто або на бортовому компʼютері. На трасі витрата зазвичай нижча, ніж у місті.",
    consumoMpg: "Витрата пального (миль на галон)",
    precio: (u) => (u === "L" ? "Ціна літра" : "Ціна галона"),
    personas: "Скільки людей ділять витрати",
    costo: "Вартість пального",
    porPersona: "На одну людину",
    combustible: (u) => (u === "L" ? "Потрібно пального (літрів)" : "Потрібно пального (галонів)"),
    distanciaTotal: (u) => `Загальна відстань (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Вартість однієї милі" : "Вартість одного кілометра"),
    errorConsumo: "Витрата пального має бути більшою за нуль.",
    errorPersonas: "Має бути щонайменше одна людина.",
  }),
};
