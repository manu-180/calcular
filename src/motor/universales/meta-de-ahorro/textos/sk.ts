import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosSk: TextosUi<UiMetaDeAhorro> = {
  slug: "sporenie-na-ciel",
  ui: () => ({
    meta: "Koľko chcete nasporiť?",
    actual: "Koľko už máte nasporené (nepovinné)",
    meses: "Za koľko mesiacov",
    rendimiento: "Ročné zhodnotenie úspor (%, nepovinné)",
    rendimientoAyuda: "Ak sú peniaze na sporiacom účte alebo v investícii, ktorá nesie úrok. Ak nič neprinášajú, nechajte pole prázdne.",
    aporteMensual: "Mesačne si potrebujete odložiť",
    aporteSemanal: "To je týždenne",
    totalAportado: "Celkovo vložíte",
    intereses: "Získané úroky",
    errorMeta: "Zadajte, koľko chcete nasporiť.",
    yaLlegas: "To, čo už máte, za tento čas dosiahne cieľ aj bez ďalších vkladov.",
  }),
};
