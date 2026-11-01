import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosEt: TextosUi<UiPropina> = {
  slug: "jootraha-kalkulaator",
  ui: () => ({
    cuenta: "Arve summa",
    porcentaje: "Jootraha (%)",
    porcentajeAyuda: "Jootraha andmise tavad erinevad riigiti ja kohati. Vali, mis sulle sobib.",
    personas: "Maksjate arv",
    redondear: "Ümarda iga inimese osa ülespoole",
    redondearAyuda: "Nii maksab igaüks ümmarguse summa. Ülejääk läheb jootrahaks.",
    propina: "Jootraha",
    total: "Kokku koos jootrahaga",
    porPersona: "Igaüks maksab",
    propinaEfectiva: "Jootraha pärast ümardamist",
    errorPersonas: "Maksjaid peab olema vähemalt üks.",
    observacionRedondeo: (efectiva) => `Ülespoole ümardades on jootraha ${efectiva}% arve summast.`,
  }),
};
