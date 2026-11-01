import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosMn: TextosUi<UiMetrosCuadrados> = {
  slug: "kvadrat-metriin-tootsooluur",
  ui: () => ({
    forma: (n) => `Талбай ${n}: хэлбэр`,
    formaAyuda: "Өрөө Г хэлбэртэй эсвэл жигд бус бол хэсгүүдэд хувааж, нэмнэ үү.",
    ninguna: "Ашиглахгүй",
    rectangulo: "Тэгш өнцөгт эсвэл квадрат",
    triangulo: "Гурвалжин",
    circulo: "Тойрог",
    medidaA: (n, u) => `Талбай ${n}: урт, суурь эсвэл диаметр (${u})`,
    medidaAAyuda: "Тэгш өнцөгт: урт ба өргөн. Гурвалжин: суурь ба өндөр. Тойрог: зөвхөн диаметр.",
    medidaB: (n, u) => `Талбай ${n}: өргөн эсвэл өндөр (${u})`,
    total: (u) => `Нийт талбай (${u})`,
    equivale: (u) => `Хөрвүүлсэн хэмжээ (${u})`,
    parcial: (n, u) => `Талбай ${n} (${u})`,
    errorMedida: "Энэ хэмжээс дутуу эсвэл 0 байна.",
  }),
};
