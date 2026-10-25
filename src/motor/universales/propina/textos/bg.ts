import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosBg: TextosUi<UiPropina> = {
  slug: "kalkulator-za-bakshish",
  ui: () => ({
    cuenta: "Сума на сметката",
    porcentaje: "Бакшиш (%)",
    porcentajeAyuda: "Обичаите са различни според държавата и заведението. Изберете колкото Ви се струва редно.",
    personas: "Брой хора, които плащат",
    redondear: "Закръгляне на всеки дял нагоре",
    redondearAyuda: "Така всеки плаща кръгла сума. Разликата отива към бакшиша.",
    propina: "Бакшиш",
    total: "Общо с бакшиш",
    porPersona: "Всеки плаща",
    propinaEfectiva: "Бакшиш след закръгляне",
    errorPersonas: "Трябва да плаща поне един човек.",
    observacionRedondeo: (efectiva) => `След закръгляне нагоре бакшишът е ${efectiva}% от сметката.`,
  }),
};
