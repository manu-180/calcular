import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosRu: TextosUi<UiTasaEfectiva> = {
  slug: "effektivnaya-protsentnaya-stavka",
  ui: () => ({
    direccion: "Какая ставка у вас есть?",
    nominalAEfectiva: "Номинальная (перевести в эффективную)",
    efectivaANominal: "Эффективная (перевести в номинальную)",
    tasa: "Годовая ставка (%)",
    tasaAyuda: "Введите ставку точно так, как она указана в предложении или договоре.",
    capitalizacion: "Капитализация процентов",
    capitalizacionAyuda: "Как часто проценты прибавляются к сумме. По кредитам и картам обычно ежемесячно.",
    mensual: "Ежемесячно (12 раз в год)",
    trimestral: "Ежеквартально (4 раза в год)",
    semestral: "Раз в полгода (2 раза в год)",
    diaria: "Ежедневно (365 раз в год)",
    efectiva: "Эффективная годовая ставка",
    nominal: "Номинальная годовая ставка",
    periodica: "Ставка за период",
    errorNegativa: "Ставка не может быть отрицательной. Введите число от 0.",
    observacionDiferencia: (puntos) => `Эффективная ставка выше номинальной на ${puntos} п. п., потому что проценты начисляются и на уже начисленные проценты.`,
  }),
};
