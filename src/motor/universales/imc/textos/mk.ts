import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

const unidad = (u: string) => ({ kg: "кг", lb: "фунти", cm: "см" })[u] ?? u;

export const textosMk: TextosUi<UiImc> = {
  slug: "kalkulator-za-bmi",
  ui: () => ({
    peso: (u) => `Тежина (${unidad(u)})`,
    altura: (u) => `Висина (${unidad(u)})`,
    pies: "Висина: стапки",
    pulgadas: "Висина: инчи",
    imc: "Индекс на телесна маса (БМИ)",
    categoria: "Категорија (СЗО)",
    pesoMin: (u) => `Здрава тежина од (${unidad(u)})`,
    pesoMax: (u) => `Здрава тежина до (${unidad(u)})`,
    rangoAyuda: "Опсегот на тежина при кој БМИ е во здрави граници за оваа висина.",
    bajo: "Намалена тежина",
    normal: "Нормална тежина",
    sobrepeso: "Прекумерна тежина",
    obesidad1: "Дебелина I степен",
    obesidad2: "Дебелина II степен",
    obesidad3: "Дебелина III степен",
    errorPeso: "Тежината треба да биде поголема од 0.",
    errorAltura: "Висината треба да биде поголема од 0.",
    aviso:
      "БМИ е општ ориентир за возрасни: не прави разлика меѓу мускули и маснотии и не се толкува на ист начин при бременост и кај деца. Не ја заменува консултацијата со медицински специјалист.",
  }),
};
