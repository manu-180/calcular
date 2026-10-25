import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosUk: TextosUi<UiMetaDeAhorro> = {
  slug: "kalkuliator-zaoshchadzhen",
  ui: () => ({
    meta: "Скільки ви хочете накопичити?",
    actual: "Скільки вже відкладено (необовʼязково)",
    meses: "За скільки місяців",
    rendimiento: "Річна дохідність заощаджень (%, необовʼязково)",
    rendimientoAyuda: "Якщо гроші лежать на рахунку чи в інвестиціях, які приносять відсотки. Залиште порожнім, якщо дохідності немає.",
    aporteMensual: "Потрібно відкладати щомісяця",
    aporteSemanal: "Це на тиждень",
    totalAportado: "Загалом ви внесете",
    intereses: "Нараховані відсотки",
    errorMeta: "Введіть, скільки ви хочете накопичити.",
    yaLlegas: "Того, що ви вже маєте, вистачить, щоб досягти мети за цей строк без нових внесків.",
  }),
};
