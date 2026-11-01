import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosSq: TextosUi<UiMetaDeAhorro> = {
  slug: "kalkulator-kursimesh",
  ui: () => ({
    meta: "Çfarë shume dëshironi të kurseni?",
    actual: "Sa keni kursyer tashmë (opsional)",
    meses: "Për sa muaj",
    rendimiento: "Kthimi vjetor i kursimeve (%, opsional)",
    rendimientoAyuda: "Nëse paratë qëndrojnë në një llogari ose në një investim me interes. Lëreni bosh nëse nuk sjellin asgjë.",
    aporteMensual: "Duhet të lini mënjanë në muaj",
    aporteSemanal: "Pra në javë",
    totalAportado: "Totali i depozituar nga ju",
    intereses: "Interesi i fituar",
    errorMeta: "Vendosni shumën që dëshironi të kurseni.",
    yaLlegas: "Ajo që keni tashmë e arrin objektivin brenda këtij afati, pa shtuar asgjë tjetër.",
  }),
};
