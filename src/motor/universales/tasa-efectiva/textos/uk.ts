import { formaUk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosUk: TextosUi<UiTasaEfectiva> = {
  slug: "efektyvna-vidsotkova-stavka",
  ui: () => ({
    direccion: "Яка ставка у вас є?",
    nominalAEfectiva: "Номінальна ставка (перерахувати в ефективну)",
    efectivaANominal: "Ефективна ставка (перерахувати в номінальну)",
    tasa: "Річна ставка (%)",
    tasaAyuda: "Введіть її так, як вона зазначена в пропозиції чи договорі.",
    capitalizacion: "Капіталізація відсотків",
    capitalizacionAyuda: "Як часто відсотки додаються до суми боргу чи вкладу. За кредитами й картками зазвичай щомісяця.",
    mensual: "Щомісяця (12 разів на рік)",
    trimestral: "Щокварталу (4 рази на рік)",
    semestral: "Щопівроку (2 рази на рік)",
    diaria: "Щодня (365 разів на рік)",
    efectiva: "Ефективна річна ставка",
    nominal: "Номінальна річна ставка",
    periodica: "Ставка за період",
    errorNegativa: "Ставка не може бути відʼємною. Введіть число від 0.",
    observacionDiferencia: (puntos) =>
      `Ефективна ставка вища за номінальну на ${puntos} ${formaUk(puntos, "відсотковий пункт", "відсоткові пункти", "відсоткових пунктів", "відсоткового пункту")}, бо відсотки нараховуються і на вже нараховані відсотки.`,
  }),
};
