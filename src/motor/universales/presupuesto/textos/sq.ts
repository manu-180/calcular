import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosSq: TextosUi<UiPresupuesto> = {
  slug: "buxheti-50-30-20",
  ui: () => ({
    ingreso: "Të ardhurat neto mujore",
    ingresoAyuda: "Ajo që hyn në llogari çdo muaj, pas tatimeve dhe kontributeve.",
    pctNecesidades: "Nevoja (%)",
    pctNecesidadesAyuda: "Banesë, ushqime, fatura, transport, shëndet dhe këstet minimale të borxheve.",
    pctGustos: "Dëshira (%)",
    pctGustosAyuda: "Dalje jashtë, blerje që nuk janë të domosdoshme, abonime, udhëtime.",
    pctAhorro: "Kursime (%)",
    pctAhorroAyuda: "Fond emergjence, objektiva, pension dhe pagesa shtesë për borxhet.",
    necesidades: "Për nevojat",
    gustos: "Për dëshirat",
    ahorro: "Për kursimet",
    ahorroAnual: "Kursime në një vit",
    errorIngreso: "Vendosni të ardhurat mujore.",
    errorSuma: (suma) => `Të tria përqindjet së bashku japin ${suma}%. Duhet të japin 100%.`,
    observacionAhorroBajo: "Nëse kurseni nën 10%, mbetet pak hapësirë për të papriturat. Nëse është e mundur, ulni dëshirat.",
  }),
};
