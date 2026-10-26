import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosCs: TextosUi<UiMetaDeAhorro> = {
  slug: "sporeni-na-cil",
  ui: () => ({
    meta: "Kolik chcete naspořit?",
    actual: "Kolik už máte naspořeno (nepovinné)",
    meses: "Za kolik měsíců",
    rendimiento: "Roční zhodnocení úspor (%, nepovinné)",
    rendimientoAyuda: "Pokud peníze leží na spořicím účtu nebo v investici, která nese úrok. Pokud nic nevynášejí, nechte pole prázdné.",
    aporteMensual: "Měsíčně potřebujete odložit",
    aporteSemanal: "To je týdně",
    totalAportado: "Celkem vložíte",
    intereses: "Získané úroky",
    errorMeta: "Zadejte, kolik chcete naspořit.",
    yaLlegas: "To, co už máte, za tuto dobu dosáhne cíle i bez dalších vkladů.",
  }),
};
