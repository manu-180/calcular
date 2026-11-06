import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosMk: TextosUi<UiTasaEfectiva> = {
  slug: "kalkulator-za-efektivna-kamatna-stapka",
  ui: () => ({
    direccion: "Каква каматна стапка имате?",
    nominalAEfectiva: "Номинална годишна (претворање во ефективна)",
    efectivaANominal: "Ефективна годишна (претворање во номинална)",
    tasa: "Годишна каматна стапка (%)",
    tasaAyuda: "Внесете ја точно како што е наведена во понудата или договорот.",
    capitalizacion: "Капитализација",
    capitalizacionAyuda: "Колку често каматата се додава на износот. Кај кредитите и кредитните картички обично е секој месец.",
    mensual: "Месечна (12 пати годишно)",
    trimestral: "Тримесечна (4 пати годишно)",
    semestral: "Полугодишна (2 пати годишно)",
    diaria: "Дневна (365 пати годишно)",
    efectiva: "Ефективна годишна каматна стапка",
    nominal: "Номинална годишна каматна стапка",
    periodica: "Каматна стапка за период",
    errorNegativa: "Каматната стапка не може да биде негативна. Внесете број од 0 нагоре.",
    observacionDiferencia: (puntos) => `Ефективната стапка е за ${puntos} процентни поени повисока од номиналната, бидејќи и каматата носи камата.`,
  }),
};
