import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosSk: TextosUi<UiAhorroRetiro> = {
  slug: "sporenie-na-dochodok",
  ui: () => ({
    edadActual: "Váš súčasný vek",
    edadRetiro: "V akom veku chcete ísť do dôchodku",
    actual: "Koľko už máte nasporené",
    aporte: "Mesačný vklad",
    rendimiento: "Reálny ročný výnos (%)",
    rendimientoAyuda: "Koľko investície vynášajú nad infláciu. Pre dlhé obdobie je 2 až 5 % opatrný predpoklad.",
    aniosRenta: "Na koľko rokov dôchodku majú úspory vystačiť",
    aniosRentaAyuda: "Koľko rokov chcete z týchto úspor čerpať peniaze.",
    capital: "Úspory v deň odchodu do dôchodku",
    renta: "Mesačný príjem z týchto úspor",
    aportado: "Spolu vložené",
    intereses: "Celkové zhodnotenie",
    tabla: "Vývoj úspor podľa veku",
    colEdad: "Vek",
    colAportado: "Vložené dovtedy",
    colSaldo: "Úspory",
    errorEdades: "Vek odchodu do dôchodku musí byť vyšší ako váš súčasný vek.",
    errorSinAhorro: "Zadajte, koľko už máte nasporené, alebo mesačný vklad.",
    observacionDineroDeHoy: "Sumy sú v dnešných cenách, pretože výnos je už očistený o infláciu.",
    observacionPublica: "Počítajú sa len vaše vlastné úspory. Štátny dôchodok ani iné dávky, na ktoré môžete mať nárok, zahrnuté nie sú.",
  }),
};
