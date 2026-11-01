import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

const unidad = (u: string) => ({ kg: "кг", lb: "фунта", cm: "см" })[u] ?? u;

export const textosBg: TextosUi<UiImc> = {
  slug: "indeks-na-telesnata-masa",
  ui: () => ({
    peso: (u) => `Тегло (${unidad(u)})`,
    altura: (u) => `Ръст (${unidad(u)})`,
    pies: "Ръст: футове",
    pulgadas: "Ръст: инчове",
    imc: "Индекс на телесната маса (ИТМ)",
    categoria: "Категория (СЗО)",
    pesoMin: (u) => `Здравословно тегло от (${unidad(u)})`,
    pesoMax: (u) => `Здравословно тегло до (${unidad(u)})`,
    rangoAyuda: "Диапазонът на теглото, при който ИТМ е в здравословни граници за този ръст.",
    bajo: "Поднормено тегло",
    normal: "Нормално тегло",
    sobrepeso: "Наднормено тегло",
    obesidad1: "Затлъстяване I степен",
    obesidad2: "Затлъстяване II степен",
    obesidad3: "Затлъстяване III степен",
    errorPeso: "Теглото трябва да е по-голямо от 0.",
    errorAltura: "Ръстът трябва да е по-голям от 0.",
    aviso:
      "ИТМ е общ ориентир за възрастни: не прави разлика между мускули и мазнини и не се тълкува по същия начин при бременност и при деца. Той не замества консултацията с медицински специалист.",
  }),
};
