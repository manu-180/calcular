import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosUz: TextosUi<UiPresupuesto> = {
  slug: "byudjet-kalkulyatori",
  ui: () => ({
    ingreso: "Qoʻlga tegadigan oylik daromad",
    ingresoAyuda: "Soliq va ushlanmalardan keyin har oy hisobingizga tushadigan summa.",
    pctNecesidades: "Zarur xarajatlar (%)",
    pctNecesidadesAyuda: "Uy-joy, oziq-ovqat, kommunal xizmatlar, transport, sogʻliq va qarzlar boʻyicha minimal toʻlovlar.",
    pctGustos: "Istaklar (%)",
    pctGustosAyuda: "Kafe va restoranlar, zarur boʻlmagan xaridlar, obunalar, sayohatlar.",
    pctAhorro: "Jamgʻarma (%)",
    pctAhorroAyuda: "Favqulodda jamgʻarma, maqsadlar, pensiya va qarzlarni muddatidan oldin toʻlash.",
    necesidades: "Zarur xarajatlarga",
    gustos: "Istaklarga",
    ahorro: "Jamgʻarmaga",
    ahorroAnual: "Bir yillik jamgʻarma",
    errorIngreso: "Oylik daromadingizni kiriting.",
    errorSuma: (suma) => `Uchta foizning yigʻindisi: ${suma}%. Yigʻindi 100% boʻlishi kerak.`,
    observacionAhorroBajo: "Jamgʻarma daromadning oʻndan bir qismiga ham yetmasa, kutilmagan xarajatlar uchun zaxira kam qoladi. Imkoni boʻlsa, istaklarni biroz qisqartiring.",
  }),
};
