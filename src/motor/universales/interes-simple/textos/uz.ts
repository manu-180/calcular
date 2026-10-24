import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosUz: TextosUi<UiInteresSimple> = {
  slug: "oddiy-foiz-kalkulyatori",
  ui: () => ({
    capital: "Asosiy summa",
    tasa: "Yillik foiz stavkasi (%)",
    tiempo: "Muddat",
    unidad: "Muddat birligi",
    dias: "Kun",
    meses: "Oy",
    anios: "Yil",
    base: "Yildagi kunlar soni (muddat kunlarda boʻlsa)",
    baseAyuda: "Baʼzi banklar yilni 360 kun deb hisoblaydi. Aniq bilmasangiz, 365 ni qoldiring.",
    base365: "365 kun",
    base360: "360 kun (bank yili)",
    interes: "Foiz summasi",
    montoFinal: "Asosiy summa va foizlar",
    tasaPeriodo: "Muddat uchun stavka",
    errorCapital: "Noldan katta asosiy summani kiriting.",
  }),
};
