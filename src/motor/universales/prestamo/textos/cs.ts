import { formaCs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosCs: TextosUi<UiPrestamo> = {
  slug: "kalkulacka-uveru",
  ui: () => ({
    monto: "Výše úvěru",
    tasa: "Roční úroková sazba (%)",
    tasaAyuda: "Nominální roční úroková sazba z nabídky. Poplatky v ní nejsou, ty zahrnuje až RPSN.",
    meses: "Doba splácení v měsících",
    extra: "Mimořádná splátka měsíčně (nepovinné)",
    extraAyuda: "Kolik byste každý měsíc přidali navíc, abyste splatili dřív. Celá částka jde na snížení jistiny.",
    cuota: "Měsíční splátka",
    intereses: "Úroky celkem",
    total: "Zaplatíte celkem",
    mesesReales: "Počet měsíců s mimořádnou splátkou",
    ahorro: "Ušetříte na úrocích",
    tabla: "Splátkový kalendář",
    colMes: "Měsíc",
    colPago: "Splátka",
    colInteres: "Úrok",
    colCapital: "Jistina",
    colSaldo: "Zůstatek",
    errorMonto: "Zadejte částku větší než nula.",
    observacionCostos: "Splátka nezahrnuje pojištění, poplatky ani daně, které může věřitel připočítat. Před podpisem se zeptejte na RPSN a celkovou částku.",
    observacionExtra: (meses, ahorro) =>
      `S mimořádnou splátkou splatíte úvěr za ${meses} ${formaCs(meses.replace(/\D/g, ""), "měsíc", "měsíce", "měsíců")} a na úrocích ušetříte ${ahorro}.`,
  }),
};
