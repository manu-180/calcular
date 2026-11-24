import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosMk: TextosUi<UiPropina> = {
  slug: "kalkulator-za-bakshish",
  ui: () => ({
    cuenta: "Износ на сметката",
    porcentaje: "Бакшиш (%)",
    porcentajeAyuda: "Обичаите се разликуваат според државата и локалот. Изберете колку што ви се чини соодветно.",
    personas: "Број на луѓе што плаќаат",
    redondear: "Заокружување на секој дел нагоре",
    redondearAyuda: "Така секој плаќа заокружен износ. Разликата оди во бакшишот.",
    propina: "Бакшиш",
    total: "Вкупно со бакшиш",
    porPersona: "Секој плаќа",
    propinaEfectiva: "Бакшиш по заокружувањето",
    errorPersonas: "Мора да плаќа најмалку едно лице.",
    observacionRedondeo: (efectiva) => `По заокружувањето нагоре бакшишот е ${efectiva} % од сметката.`,
  }),
};
