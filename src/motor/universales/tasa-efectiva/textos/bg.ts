import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosBg: TextosUi<UiTasaEfectiva> = {
  slug: "efektiven-lihven-protsent",
  ui: () => ({
    direccion: "Какъв лихвен процент имате?",
    nominalAEfectiva: "Номинален годишен (превръщане в ефективен)",
    efectivaANominal: "Ефективен годишен (превръщане в номинален)",
    tasa: "Годишен лихвен процент (%)",
    tasaAyuda: "Въведете го точно както е посочен в офертата или договора.",
    capitalizacion: "Капитализация",
    capitalizacionAyuda: "Колко често лихвата се прибавя към сумата. При кредитите и кредитните карти обикновено е всеки месец.",
    mensual: "Месечна (12 пъти в годината)",
    trimestral: "Тримесечна (4 пъти в годината)",
    semestral: "Шестмесечна (2 пъти в годината)",
    diaria: "Дневна (365 пъти в годината)",
    efectiva: "Ефективен годишен лихвен процент",
    nominal: "Номинален годишен лихвен процент",
    periodica: "Лихвен процент за период",
    errorNegativa: "Лихвеният процент не може да е отрицателен. Въведете число от 0 нагоре.",
    observacionDiferencia: (puntos) => `Ефективният процент е с ${puntos} пункта по-висок от номиналния, защото лихвата също носи лихва.`,
  }),
};
