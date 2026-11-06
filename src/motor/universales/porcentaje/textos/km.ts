import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosKm: TextosUi<UiPorcentaje> = {
  slug: "percentage",
  ui: () => ({
    modo: "តើចង់គណនាអ្វី?",
    modoParte: "X% នៃ Y ស្មើនឹងប៉ុន្មាន",
    modoProporcion: "X ស្មើនឹងប៉ុន្មានភាគរយនៃ Y",
    modoAumento: "Y បូកបន្ថែម X%",
    modoRebaja: "Y ដកចេញ X%",
    x: "លេខ X",
    xAyuda: "តម្លៃភាគរយ។ បើជ្រើស «X ស្មើនឹងប៉ុន្មានភាគរយនៃ Y» សូមបញ្ចូលផ្នែកដែលចង់ធៀប។",
    y: "លេខ Y",
    resultado: "លទ្ធផល",
    porcentaje: "ភាគរយ",
    diferencia: "ចំនួនដែលកើន ឬថយ",
    errorYCero: "Y មិនអាចស្មើនឹង 0 បានទេ ព្រោះមិនអាចគិតភាគរយពីសូន្យបាន។",
    fraseParte: (x, y, r) => `${x}% នៃ ${y} ស្មើនឹង ${r}`,
    fraseProporcion: (x, y, p) => `${x} ស្មើនឹង ${p}% នៃ ${y}`,
    fraseAumento: (x, y, r, d) => `${y} បូកបន្ថែម ${x}% បាន ${r} (កើន ${d})`,
    fraseRebaja: (x, y, r, d) => `${y} ដកចេញ ${x}% នៅសល់ ${r} (ថយ ${d})`,
  }),
};
