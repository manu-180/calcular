import { pluralSq } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosSq: TextosUi<UiPrestamo> = {
  slug: "kalkulator-kredie",
  ui: () => ({
    monto: "Shuma e kredisë",
    tasa: "Norma vjetore e interesit (%)",
    tasaAyuda: "Interesi vjetor nominal i ofertës. Komisionet nuk përfshihen.",
    meses: "Afati në muaj",
    extra: "Pagesë shtesë në muaj (opsional)",
    extraAyuda: "Sa do të shtonit çdo muaj për ta mbaruar më shpejt. E gjithë shuma shkon për principalin.",
    cuota: "Kësti mujor",
    intereses: "Interesi total",
    total: "Totali për t'u paguar",
    mesesReales: "Muaj deri në shlyerje, me pagesën shtesë",
    ahorro: "Interesi i kursyer",
    tabla: "Plani i shlyerjes",
    colMes: "Muaji",
    colPago: "Kësti",
    colInteres: "Interesi",
    colCapital: "Principali",
    colSaldo: "Teprica",
    errorMonto: "Vendosni një shumë më të madhe se zero.",
    observacionCostos: "Kësti nuk përfshin sigurime, komisione ose tarifa që mund të shtojë kredidhënësi. Kërkoni koston totale të kredisë dhe normën efektive vjetore para se të nënshkruani.",
    observacionExtra: (meses, ahorro) => `Me pagesën shtesë e mbaroni për ${pluralSq(meses, "muaj", "muaj")} dhe kurseni ${ahorro} interes.`,
  }),
};
