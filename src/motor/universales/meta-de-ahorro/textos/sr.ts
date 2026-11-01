import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosSr: TextosUi<UiMetaDeAhorro> = {
  slug: "stednja-za-cilj",
  ui: () => ({
    meta: "Koliko želite da uštedite?",
    actual: "Koliko ste već uštedeli (nije obavezno)",
    meses: "Za koliko meseci",
    rendimiento: "Godišnji prinos na ušteđevinu (%, nije obavezno)",
    rendimientoAyuda: "Ako novac stoji na štednom računu ili u ulaganju koje donosi kamatu. Ako ne donosi ništa, ostavite polje prazno.",
    aporteMensual: "Mesečno treba da odvojite",
    aporteSemanal: "To je nedeljno",
    totalAportado: "Ukupno ćete uplatiti",
    intereses: "Zarađena kamata",
    errorMeta: "Unesite koliko želite da uštedite.",
    yaLlegas: "Ono što već imate dostiže cilj u tom roku i bez novih uplata.",
  }),
};
