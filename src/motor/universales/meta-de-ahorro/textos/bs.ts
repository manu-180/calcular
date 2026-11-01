import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosBs: TextosUi<UiMetaDeAhorro> = {
  slug: "stednja-za-cilj",
  ui: () => ({
    meta: "Koliko želite uštedjeti?",
    actual: "Koliko ste već uštedjeli (neobavezno)",
    meses: "Za koliko mjeseci",
    rendimiento: "Godišnji prinos na ušteđevinu (%, neobavezno)",
    rendimientoAyuda: "Ako novac stoji na štednom računu ili u ulaganju koje donosi kamatu. Ako ne donosi ništa, ostavite polje prazno.",
    aporteMensual: "Mjesečno trebate odvojiti",
    aporteSemanal: "Odnosno sedmično",
    totalAportado: "Ukupno ćete uplatiti",
    intereses: "Zarađena kamata",
    errorMeta: "Unesite koliko želite uštedjeti.",
    yaLlegas: "Ono što već imate dostignut će cilj u tom roku i bez novih uplata.",
  }),
};
