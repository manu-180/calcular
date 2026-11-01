import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosUz: TextosUi<UiOvulacion> = {
  slug: "ovulyatsiya-kalkulyatori",
  ui: () => ({
    fum: "Oxirgi hayzning birinchi kuni",
    fumAyuda: "Qon kela boshlagan birinchi kun, oxirgisi emas.",
    ciclo: "Hayz sikli davomiyligi (kun)",
    cicloAyuda: "Bir hayzning birinchi kunidan keyingisidan oldingi kungacha. Har oy oʻzgarsa, oʻrtacha qiymatni yozing.",
    ovulacion: "Taxminiy ovulyatsiya kuni",
    fertilDesde: "Homilador boʻlish ehtimoli yuqori kunlar boshlanishi",
    fertilHasta: "Homilador boʻlish ehtimoli yuqori kunlar tugashi",
    proxima: "Keyingi hayz",
    tabla: "Keyingi sikllar",
    colRegla: "Hayz",
    colDesde: "Qulay kunlar boshlanishi",
    colHasta: "Qulay kunlar tugashi",
    colOvulacion: "Ovulyatsiya",
    errorCiclo: "Sikl davomiyligi 21 kundan 45 kungacha boʻlishi kerak.",
    aviso: "Bu muntazam sikllar uchun taxminiy hisob. U homiladorlikdan saqlanish usuli emas va shifokor maslahatining oʻrnini bosmaydi.",
  }),
};
