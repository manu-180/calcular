import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosLv: TextosUi<UiMetaDeAhorro> = {
  slug: "uzkrajumu-merka-kalkulators",
  ui: () => ({
    meta: "Cik vēlaties uzkrāt?",
    actual: "Cik jau ir uzkrāts (nav obligāti)",
    meses: "Cik mēnešos",
    rendimiento: "Uzkrājumu ienesīgums gadā (%, nav obligāti)",
    rendimientoAyuda: "Ja nauda glabājas krājkontā vai ieguldījumā, kas nes procentus. Ja tā neko nenes, atstājiet lauku tukšu.",
    aporteMensual: "Mēnesī jāatliek",
    aporteSemanal: "Tas ir nedēļā",
    totalAportado: "Kopā iemaksāsiet",
    intereses: "Saņemtie procenti",
    errorMeta: "Ievadiet, cik vēlaties uzkrāt.",
    yaLlegas: "Tas, kas jums jau ir, šajā laikā sasniegs mērķi arī bez papildu iemaksām.",
  }),
};
