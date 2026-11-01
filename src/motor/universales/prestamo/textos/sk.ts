import { formaSk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosSk: TextosUi<UiPrestamo> = {
  slug: "kalkulacka-uveru",
  ui: () => ({
    monto: "Výška úveru",
    tasa: "Ročná úroková sadzba (%)",
    tasaAyuda: "Nominálna ročná úroková sadzba z ponuky. Poplatky v nej nie sú, tie zahŕňa až RPMN.",
    meses: "Doba splácania v mesiacoch",
    extra: "Mimoriadna splátka mesačne (nepovinné)",
    extraAyuda: "Koľko by ste každý mesiac pridali navyše, aby ste splatili skôr. Celá suma ide na zníženie istiny.",
    cuota: "Mesačná splátka",
    intereses: "Úroky spolu",
    total: "Zaplatíte spolu",
    mesesReales: "Počet mesiacov s mimoriadnou splátkou",
    ahorro: "Ušetríte na úrokoch",
    tabla: "Splátkový kalendár",
    colMes: "Mesiac",
    colPago: "Splátka",
    colInteres: "Úrok",
    colCapital: "Istina",
    colSaldo: "Zostatok",
    errorMonto: "Zadajte sumu väčšiu ako nula.",
    observacionCostos: "Splátka nezahŕňa poistenie, poplatky ani dane, ktoré môže veriteľ pripočítať. Pred podpisom sa opýtajte na RPMN a celkovú sumu.",
    observacionExtra: (meses, ahorro) =>
      `S mimoriadnou splátkou splatíte úver za ${meses} ${formaSk(meses.replace(/\D/g, ""), "mesiac", "mesiace", "mesiacov")} a na úrokoch ušetríte ${ahorro}.`,
  }),
};
